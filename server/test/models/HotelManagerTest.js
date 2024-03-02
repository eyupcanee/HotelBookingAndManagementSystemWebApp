import mongoose from "mongoose";

const HotelManagerTestSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      max: 80,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: String,
    phoneNumber: String,
    role: {
      type: String,
      enum: ["hmanager"],
      default: "hmanager",
    },
    hotels: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "HotelTest",
      },
    ],
  },
  { timestamps: true }
);

const HotelManagerTest = mongoose.model(
  "HotelManagerTest",
  HotelManagerTestSchema
);
export default HotelManagerTest;
