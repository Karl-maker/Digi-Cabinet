/*

Model for users for user can be teachers OR administration

1. Password verification is done within service because it will be encrypted before it is entered in the database

*/

import mongoose from "mongoose";
import config from "../../config/config.mjs"

const MIN_NAME = 1;
const MAX_NAME = 100;
const MIN_EMAIL = 3;
const MAX_EMAIL = 400;
const DEFAULT_PROFILE_URL_PATH = config.resource.DEFAULT_IMAGE_PATH;

//--------------------------------------------------------------------------------

const UserSchema = new mongoose.Schema({
    title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    },
    first_name: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    minLength: [
      MIN_NAME,
      `First name must have more than ${MIN_NAME} characters`,
    ],
    maxlength: [
      MAX_NAME,
      `First name must have less than ${MAX_NAME} characters`,
    ],
    },
    middle_name: {
    type: String,
    required: false,
    trim: true,
    minLength: [
      MIN_NAME,
      `Middle name must have more than ${MIN_NAME} characters`,
    ],
    maxlength: [
      MAX_NAME,
      `Middle name must have less than ${MAX_NAME} characters`,
    ],
    },
    last_name: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    minLength: [
      MIN_NAME,
      `First name must have more than ${MIN_NAME} characters`,
    ],
    maxlength: [
      MAX_NAME,
      `Last name must have less than ${MAX_NAME} characters`,
    ],
    },
    email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please use a valid email address",
    ],
    trim: true,
    minLength: [MIN_EMAIL, `Please use a valid email address`],
    maxLength: [MAX_EMAIL, `Please use a valid email address`],
    },
    password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
    },
    profile_picture: { type: String, required: false, default: DEFAULT_PROFILE_URL_PATH },
    is_confirmed: { type: Boolean, default: 0 },
    use_email_notification: { type: Boolean, default: 1 },
    token_code: { type: String },
    token_expiration: { type: Date },
    registered_date: { type: Date, default: Date.now() },
});

const User = mongoose.model("Users", UserSchema);
export default User;
