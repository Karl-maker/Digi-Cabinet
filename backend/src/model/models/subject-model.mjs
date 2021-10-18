import mongoose from "mongoose";

//--------------------------------------------------------------------------------

const SubjectSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Enter Name Of Subject"], trim: true },
  description: {
    type: String,
    required: [true, "Enter Name Of Subject"],
    trim: true,
  },
});

const Subject = mongoose.model("Subjects", SubjectSchema);
export default Subject;
