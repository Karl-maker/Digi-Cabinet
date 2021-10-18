import mongoose from "mongoose";

//--------------------------------------------------------------------------------

const GroupSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  name: { type: String, required: [true, "e.g. Form 5N"] },
  level: { type: Number, required: false },
  supervisor: { type: String, required: false },
  enroll_list: [], //List of student IDs
  created_at: { type: Date, default: Date.now() },
});

const Group = mongoose.model("Groups", GroupSchema);
export default Group;
