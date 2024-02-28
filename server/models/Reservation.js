import mongoose, { mongo } from "mongoose";
import User from "./User";
import Hotel from "./Hotel";
import Room from "./Room";

const ReservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: User,
    },
    hotelId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: Hotel,
    },
    roomId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: Room,
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

const Reservation = mongoose.model("Reservation", ReservationSchema);
export default Reservation;
