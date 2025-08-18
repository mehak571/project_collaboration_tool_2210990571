// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const sendMail = require("../utils/mailer");

// exports.register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // check existing user
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ msg: "User already exists" });

//     // hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // create user
//     const user = new User({ name, email, password: hashedPassword });
//     await user.save();

//     // send confirmation email
//     await sendMail(email, "Welcome to Project Collab Tool", 
//       `Hi ${name},\n\nYour account has been created successfully! 🎉\n\nHappy collaborating!`);

//     res.json({ msg: "User registered successfully" });
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // find user
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: "Invalid credentials" });

//     // check password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

//     // create token
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     // send login email
//     await sendMail(email, "Login Successful",
//       `Hi ${user.name},\n\nYou have successfully logged in to Project Collab Tool at ${new Date().toLocaleString()}.`);

//     res.json({ token, user });
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };


const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail"); // ✅ import sendEmail

// ---------------- Signup ----------------
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // save user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // generate token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // ✅ Send welcome email
    await sendEmail(email, "Welcome to Our App", `Hello ${name}, thanks for signing up!`);

    res.json({ msg: "User registered successfully", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------- Login ----------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // send login email
    await sendEmail(email, "Login Successful", `Hello ${user.name}, you just logged in!`);

    res.json({ msg: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};