import nodemailer from "nodemailer";
import config from "../config/config.mjs";

const transporter = nodemailer.createTransport({
  service: config.email.SENDER_EMAIL_SERVICE,
  auth: {
    user: config.email.SENDER_EMAIL_ADDRESS,
    pass: config.email.SENDER_EMAIL_PASSWORD,
  },
});

const sendEmail = ({ subject, message, email }) => {
  transporter.sendMail({
    from: config.email.SENDER_MAIL_ADDRESS,
    to: email,
    subject: subject,
    html: message,
  });
};

export { transporter, sendEmail };
