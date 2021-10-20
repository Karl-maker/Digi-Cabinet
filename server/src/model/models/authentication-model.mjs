import mongoose from "mongoose";

//--------------------------------------------------

const AuthenticationSchema = new mongoose.Schema({
  refresh_token: { type: String },
  user_id: { type: String },
  expire_date: { type: Date },
  created_date: { type: Date, default: Date.now() },
});

const Authentication = mongoose.model("Authentications", AuthenticationSchema);
export default Authentication;
