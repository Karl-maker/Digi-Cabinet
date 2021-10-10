import nodemailer from "nodemailer";
import config from "../config/config.mjs";

const transporter = nodemailer.createTransport({
  service: config.email.SENDER_EMAIL_SERVICE,
  auth: {
    user: config.email.SENDER_EMAIL_ADDRESS,
    pass: config.email.SENDER_EMAIL_PASSWORD,
  },
});

export default transporter;
