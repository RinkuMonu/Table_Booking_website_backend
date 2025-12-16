const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1️⃣ Transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: process.env.SMTP_PORT || 587,
    secure: false, // true only for port 465
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // 2️⃣ Mail options
  const mailOptions = {
    from: `Your App Name <${process.env.SMTP_USERNAME}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3️⃣ Send mail
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
