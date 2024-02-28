import mongoose from "mongoose";
import UserTest from "./UserTest";
import HotelTest from "./HotelTest";

const CommentTestSchema = new mongoose.Schema({
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
  comment: {
    type: String,
    min: 10,
  },
});

const CommentTest = mongoose.Model("CommentTest", CommentTestSchema);
export default CommentTest;
