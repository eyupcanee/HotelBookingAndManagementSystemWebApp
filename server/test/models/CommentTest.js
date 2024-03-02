import mongoose from "mongoose";

const CommentTestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "UserTest",
  },
  hotelId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "HotelTest",
  },
  comment: {
    type: String,
    min: 10,
  },
});

const CommentTest = mongoose.model("CommentTest", CommentTestSchema);
export default CommentTest;
