import mongoose, { mongo } from "mongoose";
import UserTest from "./UserTest";
import HotelTest from "./HotelTest";
import RoomTest from "./RoomTest";

const ReservationTestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: UserTest,
    },
    hotelId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: HotelTest,
    },
    roomId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: RoomTest,
    },
    numberOfPeople: {
      type: Number,
      required: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    totalCharge: {
      type: Number,
      required: true,
    },
    confirmation: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ReservationTest = mongoose.model(
  "ReservationTest",
  ReservationTestSchema
);
export default ReservationTest;
