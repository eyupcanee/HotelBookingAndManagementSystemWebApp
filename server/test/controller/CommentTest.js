import CommentTest from "../models/CommentTest.js";
import { jwtDecode } from "jwt-decode";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import {
  authorizeAdmin,
  getAdminId,
  authorizeUser,
  getUserId,
} from "../../util/Authorize.js";
import { v2 as cloudinary } from "cloudinary";
import redisClient from "../../cache/RedisConfigration.js";

dotenv.config({ path: "../../.env.development.local" });

(async () => {
  try {
    await redisClient.connect();
  } catch (error) {}
})();

export const getAllTestComments = async (req, res) => {
  try {
    const testcomments = await CommentTest.find();
    await testcomments.forEach((testcomment) => {
      redisClient.hsetnx(
        "testcomments",
        testcomment._id,
        JSON.stringify(testcomment),
        (error, result) => {
          if (error) {
            console.log(`Error : ${error.message}`);
          } else if (result == 1) {
            console.log(`User ${testcomment._id} has added succesfully.`);
          } else {
            console.log(`${testcomment._id} is already exists.`);
          }
        }
      );
    });
    res
      .status(200)
      .json({ status: "ok", fromCache: false, data: testcomments });
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};

export const getAllTestCommentsByHotelId = async (req, res) => {
  const { hotelId } = req.params;
  try {
    const testcomments = await CommentTest.find({ hotelId: hotelId });
    res
      .status(200)
      .json({ status: "ok", fromCache: false, data: testcomments });
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};

export const getAllTestCommentsByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const testcomments = await CommentTest.find({ userId: userId });
    res
      .status(200)
      .json({ status: "ok", fromCache: false, data: testcomments });
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};

export const addTestComment = async (req, res) => {
  const { token } = req.params;
  try {
    if (await authorizeAdmin(token)) {
      const { hotelId, comment } = req.body;
      const userId = await getAdminId(token);
      const newTestComment = new CommentTest({
        userId,
        hotelId,
        comment,
      });

      await newTestComment.save().then(() => {
        res.status(200).json({ status: "ok" });
      });
    } else if (await authorizeUser(token)) {
      const { hotelId, comment } = req.body;
      const userId = await getUserId(token);
      const newTestComment = new CommentTest({
        userId,
        hotelId,
        comment,
      });

      await newTestComment.save().then(() => {
        res.status(200).json({ status: "ok" });
      });
    } else {
      res.status(404).json({ status: "no", message: "Unauthorized process!" });
    }
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};

export const deleteTestComment = async (req, res) => {
  const { id, token } = req.params;
  try {
    if (await authorizeAdmin(token)) {
      await CommentTest.findOneAndDelete(id).then(() => {
        redisClient.hdel("testcomments", id);
        res.status(200).json({ status: "ok" });
      });
    } else if (await authorizeUser(token)) {
      const user = CommentTest.findById(id);
      if (user.userId == (await getUserId(token))) {
        await CommentTest.findOneAndDelete(id).then(() => {
          redisClient.hdel("testcomments", id);
          res.status(200).json({ status: "ok" });
        });
      } else {
        res
          .status(404)
          .json({ status: "no", message: "Unauthorized process!" });
      }
    } else {
      res.status(404).json({ status: "no", message: "Unauthorized process!" });
    }
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};
