import { db } from "../../helper/db.mjs";
import { transporter, sendEmail } from "../../helper/email.mjs";
import config from "../../config/config.mjs";

import bcrypt from "bcrypt";

const saltOrRounds = 10;

export default {
  create,
};

async function create(req) {
  // Get user input and sanitize it
  const {
    password,
    confirmed_password,
    title,
    first_name,
    last_name,
    middle_name,
    email,
  } = req.body;

  // check if user email already exist--------------
  if (await db.user.findOne({ email: email.toLowerCase() })) {
    throw {
      name: "AlreadyExist",
      message: {
        prompt: "Already Exist",
        field: { email: "Email already in use" },
      },
    };
  }

  //Check Password
  if (confirmed_password !== password) {
    throw {
      name: "ValidationFailed",
      message: {
        prompt: "Validation Error",
        field: { confirmed_password: "Passwords must match" },
      },
    };
  }

  //Encrypt user password
  const encryptedPassword = await bcrypt.hash(password, saltOrRounds);

  // Create user in our database
  const new_user = await db.user.create({
    first_name,
    last_name,
    middle_name,
    title,
    email: email.toLowerCase(), //sanitize
    password: encryptedPassword,
  });

  //--------------------------------Send Email To Confirm User-----------------------------------

  try {
    await getConfirmationEmail(new_user);
  } catch (err) {
    throw { name: "UnexpectedError", message: err.message };
  }

  new_user.password = null;

  return new_user;
}

//----------Utils---------------------------------

async function getConfirmationEmail(user) {
  const PIN = await (Math.random() + 1).toString(36).substring(5);

  try {
    await db.user.findOneAndUpdate(
      { email: user.email },
      {
        token_code: PIN,
        token_expiration: new Date(Date.now() + 1 * 60 * 1000),
      }
    );
  } catch (err) {
    throw { name: "UnexpectedError", message: err.message };
  }

  try {
    await sendEmail({
      subject: "Confirmation Email",
      message: `Hi ${user.first_name}, your confirmation code is ${PIN}`,
      email: user.email,
    });
  } catch (err) {
    throw { name: "UnexpectedError", message: err.message };
  }

  return `Hi ${user.first_name}, your confirmation code has been sent to your Email`;
}
