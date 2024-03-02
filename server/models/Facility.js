import mongoose from "mongoose";

const FaciltySchema = new mongoose.Schema(
  {
    faciltyName: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: false }
);

const Facility = mongoose.Model("Facilty", FaciltySchema);
export default Facilty;
