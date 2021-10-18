import mongoose from "mongoose";

const MAX_TITLE = 20;
const MAX_DESCRIPTION = 1000;

//--------------------------------------------------------------------------------

const MisdemeanorSchema = new mongoose.Schema({
  student: {
    type: String,
    required: [true, "Student ID Required"],
  },
  institution: {
    type: String,
    required: [true, "Institution ID Required"],
  },
  title:{
    type: String,
    required: [true, "Add A Short Title e.g. Punched A Teacher"],
    maxlength: [
      MAX_TITLE,
      `Title Should Have Less Than ${MAX_TITLE} Characters`,
    ],
  }
  description: {
    type: String,
    required: [true, "Give A Detailed Description"],
    maxlength: [
      MAX_DESCRIPTION,
      `Description Should Have Less Than ${MAX_DESCRIPTION} Characters`,
    ],
  },

  is_confirmed: {
    type: Boolean,
    default: 0,
  },
  reported_by: {
    type: String,
    required: [true, "User Data Is Required"],
  },
  created_at: { type: Date, default: Date.now() },
});

const Misdemeanor = mongoose.model("Misdemeanors", MisdemeanorSchema);
export default Misdemeanor;
