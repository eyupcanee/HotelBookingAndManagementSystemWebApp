import mongoose from "mongoose";

const FaciltyTestSchema = new mongoose.Schema(
  {
    faciltyName: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

const FacilityTest = mongoose.Schema("FacilityTest", FaciltyTestSchema);
export default FacilityTest;
