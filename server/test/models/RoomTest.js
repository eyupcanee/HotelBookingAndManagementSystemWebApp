import mongoose from "mongoose";

const RoomTestSchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.ObjectId,
      ref: "HotelTest",
    },
    description: String,
    pricePerNight: {
      type: Number,
      required: true,
    },
    facilities: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "FacilityTest",
      },
    ],
    images: [
      {
        type: String,
      },
    ],
    capacity: {
      type: Number,
      required: true,
    },
    available: Boolean,
  },
  { timestamps: true }
);

const RoomTest = mongoose.model("RoomTest", RoomTestSchema);
export default RoomTest;
