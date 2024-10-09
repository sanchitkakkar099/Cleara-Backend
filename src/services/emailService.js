const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sauravsingh92177@gmail.com',
    pass: 'gqsu xpyy qzxo uhxh'
  }
});

function sendEmail(to, subject, html) {
  const mailOptions = {
    from: 'sauravsingh92177@gmail.com',
    to: to,
    subject: subject,
    html: html
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendEmail };
