import mongoose from "mongoose";

//--------------------------------------------------------------------------------

const AssessmentSchema = new mongoose.Schema({
  class: {
    type: String,
    required: true,
  },
  institution: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: [true, "e.g. Homework"],
  },
  description: { type: String, required: false },
  created_at: { type: Date, default: Date.now() },
});

const Assessment = mongoose.model("Assessments", AssessmentSchema);
export default Assessment;
