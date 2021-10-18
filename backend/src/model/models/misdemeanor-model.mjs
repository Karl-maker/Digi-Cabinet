import mongoose from "mongoose";

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
  description: {
    type: String,
    required: false,
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
