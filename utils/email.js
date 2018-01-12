import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';

export default function sendEmail(body, config) {
  return new Promise((resolve, reject) => {

    if (!body.to) {
      reject(false);
    }
    
    const auth = {
      auth: {
        api_key: config.mailgun_secret,
        domain: config.mailgun_domain
      }
    };

    let transporter = nodemailer.createTransport(mg(auth));

    // setup email data with unicode symbols
    let mailOptions = {
        from: body.from, // sender address
        to: body.to, // list of receivers
        subject: body.subject, // Subject line
        [body.textType]: body.text, // plain text body
    };
    
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return reject(error);
      console.log(`Message ${info.messageId} sent: ${info.messageId, info.response}`);
      resolve(true);
    });
  });
}
