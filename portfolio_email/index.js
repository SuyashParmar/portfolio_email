const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
require('dotenv').config();


const app = express();
const port = process.env.PORT;

app.use(cors());

// Middleware to parse JSON requests
app.use(bodyParser.json());

app.post('/sendemail', async (req, res) => {
  const { email, message  } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // recipient email
    subject: 'Message from Your Portfolio',
    html: `
      <h2>From ${email}</h2>
      <p>${message},</p>
    `,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
});

// Start the server
app.listen(port, () => {
  console.log('Server running at http://localhost:');
});