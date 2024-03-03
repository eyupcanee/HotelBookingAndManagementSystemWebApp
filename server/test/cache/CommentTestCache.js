import redisClient from "../../cache/RedisConfigration.js";
import CommentTest from "../models/CommentTest.js";
import { authorizeAdmin, getAdminId } from "../../util/Authorize.js";

(async () => {
  try {
    await redisClient.connect();
  } catch (error) {}
})();

export const getTestCommentsCached = async (req, res, next) => {
  try {
    const hashKey = "testcomments";

    const allCommentsFromDB = await CommentTest.countDocuments();
    const cacheCommentCount = await redisClient.hlen(hashKey);

    if (cacheCommentCount == allCommentsFromDB) {
      redisClient.hgetall(hashKey, (error, results) => {
        if (error) {
          res.status(404).json({ status: "no", message: error.message });
        } else {
          const data = Object.values(results).map((value) => JSON.parse(value));
          res.status(200).json({ status: "ok", fromCache: true, data: data });
        }
      });
    } else {
      next();
    }
  } catch (error) {
    next();
  }
};
