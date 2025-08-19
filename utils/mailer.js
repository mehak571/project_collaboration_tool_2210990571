const nodemailer = require("nodemailer");

const sendMail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nipunr288@gmail.com",
        pass: "bgrnqmzsrnsagqvj", // app password
      },
    });

    const mailOptions = {
      from: "nipunr288@gmail.com",
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent to", to);
  } catch (err) {
    console.error("❌ Email error:", err);
  }
};

module.exports = sendMail;
