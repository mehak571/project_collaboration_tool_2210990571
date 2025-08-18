const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // or use SMTP config if not Gmail
  auth: {
    user: "mehak28042005@gmail.com",  
    pass: "rhxlmmrtfexqfhho"   // remove spaces from app password  // app password (not your real password)
  }
});

// function to send email
const sendMail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: `"Project Collab Tool" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text
    });
    console.log("✅ Email sent to " + to);
  } catch (err) {
    console.error("❌ Email error:", err);
  }
};

module.exports = sendMail;
