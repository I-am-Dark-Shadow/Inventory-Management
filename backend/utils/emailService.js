import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, htmlContent) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to, // Ekhon dynamic email address nibe
    subject: subject,
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;