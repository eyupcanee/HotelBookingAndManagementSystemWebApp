import mongoose from "mongoose";

const FaciltyTestSchema = new mongoose.Schema(
  {
    facilityName: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

const FacilityTest = mongoose.model("FacilityTest", FaciltyTestSchema);
export default FacilityTest;
