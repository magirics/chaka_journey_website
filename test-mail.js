import 'dotenv/config';
import nodemailer from 'nodemailer';

async function sendTest() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  const info = await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.SMTP_USER,
    subject: 'Prueba Nodemailer',
    text: 'Si recibes esto, ¡funcionó!',
  });

  console.log('Mensaje enviado:', info.messageId);
}

sendTest().catch(err => console.error('Error enviando test-mail:', err));
