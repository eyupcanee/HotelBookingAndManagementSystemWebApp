import mongoose from "mongoose";

const UserTestSchema = mongoose.Schema(
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
        ref: "ReservationTest",
      },
    ],
  },
  { timestamps: true }
);

const UserTest = mongoose.model("UserTest", UserTestSchema);
export default UserTest;
