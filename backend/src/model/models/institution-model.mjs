import mongoose from "mongoose";

//--------------------------------------------------------------------------------

const InstitutionSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Enter Name Of Insitutition"] },
  info: {
    description: { type: String, required: false, trim: true },
    number: { type: String, required: false, trim: true },
    email: { type: String, required: false, trim: true },
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
  },
  verified: { type: Boolean, required: false, default: 0 },
  registered_date: { type: Date, default: Date.now() },
});

const Institution = mongoose.model("Institutions", InstitutionSchema);
export default Institution;
