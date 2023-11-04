import nodemailer from 'nodemailer';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { name, phone, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'Outlook', // Use a lowercase service name
      auth: {
        user: 'edhadigitalservices@outlook.com', // Your domain email address
        pass: process.env.OUTLOOK_APP_PASSWORD, // Your app password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: 'edhadigitalservices@outlook.com', // Use your domain email address
      to: 'edhadigitalservices@outlook.com', // Set the recipient's email address (could be the same)
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nPhone Number: ${phone}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email' });
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
};
