const nodemailer = require("nodemailer");

// 1. Aapka existing function (No change)
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `Your App Name <${process.env.SMTP_USERNAME}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html, // Support for HTML
  };

  await transporter.sendMail(mailOptions);
};

// 2. Naya function specifically for Booking Template
const sendBookingDataConfirmation = async (userEmail, details) => {
  const htmlTemplate = `
    <div style="max-width: 600px; margin: auto; border: 1px solid #e0e0e0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <div style="background-color: #462110; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0;">Booking Confirmed! 🎉</h1>
      </div>
      <div style="padding: 30px; color: #333;">
        <p>Namaste <b>${details.userName}</b>,</p>
        <p>Aapki booking successfully confirm ho gayi hai. Details niche di gayi hain:</p>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <p><b>Booking ID:</b> #${details.bookingId}</p>
          <p><b>Date:</b> ${details.bookingDay}</p>
          <p><b>Time:</b> ${details.bookingTime}</p>
          <p><b>Guests:</b> ${details.totalGuests}</p>
          <p><b>Total Paid:</b> ₹${details.totalAmount}</p>
        </div>

        <p>Aapki booking details aapke dashboard par bhi available hain.</p>
        <p>Hum aapka swagat karne ke liye utsuk hain!</p>
      </div>
      <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #777;">
        <p>© 2025 Your App Name. All rights reserved.</p>
      </div>
    </div>
  `;

  return await sendEmail({
    email: userEmail,
    subject: `Booking Confirmed - #${details.bookingId}`,
    message: `Aapki booking confirm ho gayi hai. ID: ${details.bookingId}`, // Fallback
    html: htmlTemplate,
  });
};

module.exports = { sendEmail, sendBookingDataConfirmation };