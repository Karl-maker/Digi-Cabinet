import { db } from "../../helper/db.mjs";

import bcrypt from "bcrypt";

const saltOrRounds = 10;

export default {
    create
};

async function create(req){
  // Get user input and sanitize it
  const { password, confirmed_password, title, first_name, last_name, middle_name, email } = req.body; 

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

    //   try {
    //     await getConfirmationEmail(new_user);
    //   } catch (err) {
    //     throw { name: "UnexpectedError", message: err.message };
    //   }

  return;
}
