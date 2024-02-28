import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
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
      enum: ["admin"],
      default: "admin",
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;
