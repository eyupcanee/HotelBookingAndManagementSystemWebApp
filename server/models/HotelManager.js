import mongoose from "mongoose";
import Hotel from "./Hotel";

const HotelManagerSchema = new mongoose.Schema(
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
      unique: true,
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
        ref: Hotel,
      },
    ],
  },
  { timestamps: true }
);

const HotelManager = mongoose.model("HotelManager", HotelManagerSchema);
export default HotelManager;
