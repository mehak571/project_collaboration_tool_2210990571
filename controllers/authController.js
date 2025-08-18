const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
<<<<<<< HEAD
const User = require("../models/User");
const sendMail = require("../utils/mailer");
=======
const sendEmail = require("../utils/mailer"); // ✅ import sendEmail
>>>>>>> 226b099 (first commit")

// Signup
exports.register = async (req, res) => {
  try {
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({ msg: "Request body is required" });
    }
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "name, email and password are required" });
    }

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

<<<<<<< HEAD
    const user = new User({ name, email, password }); // password will auto-hash
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
=======
    // save user (password will be hashed by pre-save hook)
    const newUser = new User({ name, email, password });
    await newUser.save();
>>>>>>> 226b099 (first commit")

    // send welcome email
    await sendMail(email, "Welcome!", `Hi ${name}, your account is ready.`);

<<<<<<< HEAD
    res.status(201).json({ msg: "User registered successfully", token });
=======
    // ✅ Send welcome email
    await sendEmail(email, "Welcome to Our App", `Hello ${name}, thanks for signing up!`);

    res.json({
      msg: "User registered successfully",
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email }
    });
>>>>>>> 226b099 (first commit")
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({ msg: "Request body is required" });
    }
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    await sendMail(email, "Login Successful", `Hi ${user.name}, you just logged in!`);

    res.json({
      msg: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};
