import mongoose from "mongoose";

//--------------------------------------------------------------------------------

const ResultSchema = new mongoose.Schema({
  assessment: {
    type: String,
    required: true,
  },
  institution: {
    type: String,
    required: true,
  },
  student: {
    type: String,
    required: true,
  },
  comments: [
    {
      type: String,
      required: false,
    },
  ],
  grade: { type: Number, required: [true, "Enter Student Grade As A %"] },
  created_at: { type: Date, default: Date.now() },
});

const Result = mongoose.model("Results", ResultSchema);
export default Result;
