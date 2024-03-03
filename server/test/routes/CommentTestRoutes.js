import express from "express";

import {
  addTestComment,
  deleteTestComment,
  getAllTestComments,
  getAllTestCommentsByUserId,
  getAllTestCommentsByHotelId,
} from "../controller/CommentTest.js";

import { getTestCommentsCached } from "../cache/CommentTestCache.js";

const router = express.Router();

router.post("/add/:token", addTestComment);
router.delete("/del/:id/:token", deleteTestComment);
router.get("/get", getTestCommentsCached, getAllTestComments);
router.get("/get/hotel/:hotelId", getAllTestCommentsByHotelId);
router.get("/get/user/:userId", getAllTestCommentsByUserId);

export default router;
