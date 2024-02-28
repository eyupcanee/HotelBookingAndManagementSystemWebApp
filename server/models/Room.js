import mongoose from "mongoose";
import Hotel from "./Hotel";
import Facility from "./Facility";

const RoomSchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.ObjectId,
      ref: Hotel,
    },
    description: String,
    pricePerNight: {
      type: Number,
      required: true,
    },
    facilities: [
      {
        type: mongoose.Schema.ObjectId,
        ref: Facility,
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

const Room = mongoose.model("Room", RoomSchema);
export default Room;
