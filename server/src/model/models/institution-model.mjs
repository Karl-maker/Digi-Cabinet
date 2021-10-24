import mongoose from "mongoose";
import config from "../../config/config.mjs";

const DEFAULT_PROFILE_URL_PATH = config.resource.DEFAULT_INSTITUTION_PATH;

//--------------------------------------------------------------------------------

const InstitutionSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Enter Name Of Insitutition"] },
  type: {
    type: String,
    required: [true, "Enter Type Of Insitutition (e.g. Government)"],
  },
  level: {
    type: String,
    required: [true, "Enter Level Of Insitutition (e.g. High School etc)"],
  },
  description: { type: String, required: false, trim: true },
  info: {
    number: { type: String, required: false, trim: true },
    email: { type: String, required: false, trim: true },
  },
  address: {
    street_address: { type: String, maxlength: 255, required: false },
    address_line_2: { type: String, maxlength: 150, required: false },
    city: { type: String, maxlength: 255, required: false },
    provence: { type: String, maxlength: 255, required: false },
    postal_code: { type: String, maxlength: 15, required: false },
    country: { type: String, maxlength: 255, required: false },
  },
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: false,
    },
    coordinates: {
      type: [Number],
      required: false,
    },
  },
  school_logo: {
    type: String,
    required: false,
    default: DEFAULT_PROFILE_URL_PATH,
  },
  country: { type: String, required: false },
  verified: { type: Boolean, required: false, default: 0 },
  registered_date: { type: Date, default: Date.now() },
});

const Institution = mongoose.model("Institutions", InstitutionSchema);
export default Institution;
