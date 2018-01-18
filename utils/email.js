// import nodemailer from 'nodemailer';
// import mg from 'nodemailer-mailgun-transport';
import nodemailer from 'nodemailer';
export default function sendEmail(body, config) {
  return new Promise((resolve, reject) => {
    if (!body.to) {
      reject(false);
    }
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.email_username,
        pass: config.email_password
      }
    });
    transporter.sendMail({
      from: body.from,
      to: body.to,
      subject: body.subject,
      html: body.text
    }, (error, response) => {
      if(error) return reject(error);
      transporter.close();
      resolve('true')
  });
  });
}
