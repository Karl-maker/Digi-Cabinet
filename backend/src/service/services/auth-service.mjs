import { db } from "../../helper/db.mjs";
import { transporter, sendEmail } from "../../helper/email.mjs";
import config from "../../config/config.mjs";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  authenticate,
  getAccessToken,
  confirmEmail,
};

async function confirmEmail(req) {
  const PIN = req.body.code;
  const email = req.body.email.toLowerCase() || null;
  var user;
  var select = {
    token_code: req.body.code,
  };

  //Email OR Username OR OTHER

  if (email) {
    select.email = email.toLowerCase();
  } else {
    throw { name: "UnexpectedError", message: err.message };
  }

  user = await db.user.findOne(select);

  if (new Date(user.token_expiration).valueOf() > new Date().valueOf()) {
    throw { name: "UnexpectedError", message: err.message };
  }

  select.token_code = PIN;

  try {
    user = await db.user.findOneAndUpdate(select, {
      is_confirmed: true,
      token_code: null,
      token_expiration: null,
    });
  } catch (err) {
    throw { name: "UnexpectedError", message: err.message };
  }

  return;
}

async function getAccessToken(req) {
  const email = req.body.email.toLowerCase();
  const origin = "Digi-Cabinet";
  const cookie_token = req.cookies["refresh_token"];
  //Verify Token

  try {
    //Get Key
    const REFRESH_TOKEN_PUBLIC_KEY = config.jwt.REFRESH_TOKEN_PUBLIC_KEY;
    const ACCESS_TOKEN_PRIVATE_KEY = config.jwt.ACCESS_TOKEN_PRIVATE_KEY;

    const payload = jwt.verify(cookie_token, REFRESH_TOKEN_PUBLIC_KEY, {
      issuer: config.jwt.ISSUER,
      subject: email, //Stored In Local Storage
      audience: origin, //Stored In Local Storage
      expiresIn: `${config.jwt.REFRESH_TOKEN_LIFE}d`,
      algorithm: [config.jwt.ALGORITHM],
    });

    if (!payload) {
      throw { name: "UnauthorizedError" };
    }

    const login_info = await db.authentication.findOne({
      user_id: payload.id,
      refresh_token: cookie_token,
    });

    //Check if login expire

    if (new Date(login_info.expire_date).valueOf() < new Date().valueOf()) {
      await db.authentication.findOneAndDelete({
        user_id: payload.id,
        refresh_token: cookie_token,
      });
      throw { name: "UnauthorizedError" };
    }

    //Get New Token

    const access_token = jwt.sign(
      { id: payload.id },
      ACCESS_TOKEN_PRIVATE_KEY,
      {
        issuer: config.jwt.ISSUER,
        subject: email,
        audience: [origin],
        expiresIn: `${config.jwt.ACCESS_TOKEN_LIFE * 60}s`,
        algorithm: config.jwt.ALGORITHM,
      }
    );

    const access_expire = config.jwt.ACCESS_TOKEN_LIFE;

    return {
      access_token: { token: access_token, expires: access_expire },
    };
  } catch (err) {
    throw { message: err.message };
  }
}

async function authenticate(req) {
  const password = req.body.password || null;
  const email = req.body.email.toLowerCase() || null;

  if (!email || !password) {
    throw { name: "UnauthorizedError", message: "Fill In Fields" };
  }

  var user;
  var query = {};
  var origin = "Digi-Cabinet";

  //Email OR Username OR OTHER

  if (email) {
    query.email = email;
  }

  user = await db.user.findOne(query, {
    password: 1,
    is_confirmed: 1,
    email: 1,
    first_name: 1,
    last_name: 1,
    middle_name: 1,
    title: 1,
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw { name: "UnauthorizedError", message: "User is unauthorized" };
  }

  try {
    const payload = {
      id: user._id,
    };

    const ACCESS_TOKEN_PRIVATE_KEY = config.jwt.ACCESS_TOKEN_PRIVATE_KEY;
    const REFRESH_TOKEN_PRIVATE_KEY = config.jwt.REFRESH_TOKEN_PRIVATE_KEY;

    const access_token = await jwt.sign(payload, ACCESS_TOKEN_PRIVATE_KEY, {
      issuer: config.jwt.ISSUER,
      subject: user.email,
      audience: [origin],
      expiresIn: `${config.jwt.ACCESS_TOKEN_LIFE * 60}s`,
      algorithm: config.jwt.ALGORITHM,
    });

    const refresh_token = await jwt.sign(payload, REFRESH_TOKEN_PRIVATE_KEY, {
      issuer: config.jwt.ISSUER,
      subject: user.email,
      audience: [origin],
      expiresIn: `${config.jwt.REFRESH_TOKEN_LIFE}d`,
      algorithm: config.jwt.ALGORITHM,
    });

    const refresh_expire = new Date(
      Date.now() + config.jwt.REFRESH_TOKEN_LIFE * 24 * 60 * 60 * 1000
    ); //first digit for days
    const access_expire = config.jwt.ACCESS_TOKEN_LIFE;

    //Delete latest login if they're 4 and save this one

    const login_amount = await db.authentication.count({ user_id: user._id });

    if (login_amount > 4) {
      await db.authentication.findOneAndDelete({ user_id: user._id });
    }

    await db.authentication.create({
      refresh_token: refresh_token,
      user_id: user._id,
      expire_date: refresh_expire,
    });

    user.password = null;

    return {
      user: user,
      access_token: { token: access_token, expires: access_expire },
      refresh_token: { token: refresh_token, expires: refresh_expire },
    };
  } catch (err) {
    throw { name: "UnexpectedError", message: err.message };
  }
}
