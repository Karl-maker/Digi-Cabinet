import mongoose from "mongoose";

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
    address: {},
    date_of_birth: {},
    sex: {},
    ethnicity: {},
    religion: {},
    citizen_status: {},
    country_of_birth: {},
    birth_certificate_pin: {},
    parents_name: {},
    parents_email: {},
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
