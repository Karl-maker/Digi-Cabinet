import { db } from "../../helper/db.mjs";
import { transporter, sendEmail } from "../../helper/email.mjs";
import config from "../../config/config.mjs";

import bcrypt from "bcrypt";

const saltOrRounds = config.bcrypt.SALTORROUNDS;

export default {
  create,
  delete: _delete,
  getByID,
  getAllByName,
};

//GET

async function _delete(req) {
  //Need Password and Email...
  return {};
}

async function getAllByName(req) {
  const page_size = parseInt(req.query.page_size, 10);
  const page_number = parseInt(req.query.page_number, 10);
  const q = req.query.q.toLowerCase();
  const order = "asc";
  var users = [{}];
  var meta_data = { source: "database" };

  //------Pagenation Helpers-------------

  const page = Math.max(0, page_number);

  //------Order Helpers------------------

  var get_order;

  //default
  if (!order) {
    get_order = {
      first_name: "asc",
    };
  } else {
    get_order = {
      first_name: order,
    };
  }

  var query = {
    is_confirmed: true,
  };

  if (q) {
    query = { $regex: `${q}`, $options: `i` };
  } else {
    throw { name: "NotFound", message: "No Users" };
  }

  try {
    users = await db.user
      .find(
        {
          $or: [{ first_name: query }, { last_name: query }, { email: query }],
        },
        {
          is_confirmed: 0,
          use_email_notification: 0,
          token_code: 0,
          token_expiration: 0,
          created_at: 0,
          __v: 0,
        }
      )
      .limit(page_size)
      .skip(page_size * page)
      .sort(get_order); // get all

    meta_data.amount = users.length;
  } catch (e) {
    throw { name: "NotFound", message: `${q} Not Found` };
  }

  return { users, meta_data };
}

async function getByID(req) {
  const id = req.params.id;
  var user, meta_data;

  //... Check in db if not found

  try {
    user = await db.user.find(
      { _id: id },
      {
        is_confirmed: 0,
        use_email_notification: 0,
        token_code: 0,
        token_expiration: 0,
        created_at: 0,
        __v: 0,
      }
    );
    meta_data = {
      source: "database",
    };
  } catch (err) {
    throw {
      name: "NotFound",
      message: `${id} Not Found`,
    };
  }

  return { meta_data, user };
}

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
