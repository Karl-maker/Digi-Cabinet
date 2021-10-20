import mongoose from "mongoose";

//--------------------------------------------------------------------------------

const AssociationSchema = new mongoose.Schema({
  user: { type: String, required: true },
  institution: { type: String, required: true },
  is_admin: { type: Boolean, required: false, default: 0 },
  permission_level: { type: Number, required: false, default: 0 },
  is_confirmed: { type: Boolean, required: false, default: 0 },
  created_at: { type: Date, default: Date.now() },
});

const Association = mongoose.model("Associations", AssociationSchema);
export default Association;
