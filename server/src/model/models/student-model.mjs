import mongoose from "mongoose";
import config from "../../config/config.mjs";

const MIN_NAME = 1;
const MAX_NAME = 100;
const DEFAULT_PROFILE_URL_PATH = config.resource.DEFAULT_IMAGE_PATH;

//--------------------------------------------------------------------------------

const StudentSchema = new mongoose.Schema({
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
  info: {
    address: {
      street_address: { type: String, maxlength: 255, required: false },
      address_line_2: { type: String, maxlength: 150, required: false },
      city: { type: String, maxlength: 255, required: false },
      provence: { type: String, maxlength: 255, required: false },
      postal_code: { type: String, maxlength: 15, required: false },
      country: { type: String, maxlength: 255, required: false },
    },
    date_of_birth: { type: Date, required: false },
    sex: { type: String, required: false },
    ethnicity: { type: String, required: false },
    religion: { type: String, required: false },
    citizen_status: { type: String, required: false },
    country_of_birth: { type: String, required: false },
    birth_certificate_pin: { type: String, required: false },
    guardian_name: [
      {
        relation: { type: String, required: false },
        name: { type: String, required: false },
      },
    ],
    parents_email: [
      {
        relation: { type: String, required: false },
        email: { type: String, required: false },
      },
    ],
    parents_number: [
      {
        relation: { type: String, required: false },
        number: { type: String, required: false },
      },
    ],
  },
  house: { type: String, required: false },
  profile_picture: {
    type: String,
    required: false,
    default: DEFAULT_PROFILE_URL_PATH,
  },
  contact_info: {
    email: { type: String, required: false, trim: true },
    number: { type: String, required: false, trim: true },
  },
  institution: { type: String, required: true },
  created_at: { type: Date, default: Date.now() },
});

const Student = mongoose.model("Students", StudentSchema);
export default Student;
