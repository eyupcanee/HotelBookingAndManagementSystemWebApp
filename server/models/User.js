import mongoose from "mongoose";
import Reservation from "./Reservation";

const UserSchema = mongoose.Schema(
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
      max: 90,
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
      enum: ["user"],
      default: "user",
    },
    reservations: [
      {
        type: mongoose.Schema.ObjectId,
        ref: Reservation,
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.Schema("User", UserSchema);
export default User;
