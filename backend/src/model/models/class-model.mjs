import mongoose from "mongoose";

//--------------------------------------------------------------------------------

const ClassSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  group: {
    type: String,
    required: [true, "Which Standard/Form is this class associated with"],
  },
  name: {
    type: String,
    required: [true, "e.g. Mathematics Form 5 Advanced Class"],
  },
  supervisor: { type: String, required: false },
  enroll_list: [], //List of student IDs
  created_at: { type: Date, default: Date.now() },
});

const Class = mongoose.model("Classes", ClassSchema);
export default Class;
