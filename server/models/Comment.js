import mongoose from "mongoose";
import User from "./User";
import Hotel from "./Hotel";

const CommentSchema = new mongoose.Schema({
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
  comment: {
    type: String,
    min: 10,
  },
});

const Comment = mongoose.Model("Comment", CommentSchema);
export default Comment;
