import redisClient from "../../cache/RedisConfigration.js";
import UserTest from "../models/UserTest.js";
import {
  authorizeAdmin,
  getAdminId,
  authorizeUser,
  getUserId,
} from "../../util/Authorize.js";

(async () => {
  try {
    await redisClient.connect();
  } catch (error) {}
})();

export const getTestUserCached = async (req, res, next) => {
  const { id, token } = req.params;
  let results;
  const getUser = async (id) => {
    const cacheResults = await redisClient.get(id);
    if (cacheResults) {
      results = JSON.parse(cacheResults);
      res.status(200).json({ status: "ok", fromCache: true, data: results });
    } else {
      next();
    }
  };
  try {
    if (await authorizeAdmin(token)) {
      await getUser(id);
    } else if (
      (await authorizeUser(token)) &&
      (await getUserId(token)) === id
    ) {
      await getUser(id);
    } else {
      res.status(404).json({ status: "no", message: "Unauthorized process!" });
    }
  } catch (error) {
    next();
  }
};

export const getAllTestUsersCached = async (req, res, next) => {
  const { token } = req.params;
  if (await authorizeAdmin(token)) {
    const hashKey = "testusers";
    try {
      const allUsersFromDB = await UserTest.countDocuments();
      const cacheUserCount = await redisClient.hlen(hashKey);

      if (cacheUserCount == allUsersFromDB) {
        redisClient.hgetall(hashKey, (error, results) => {
          if (error) {
            res.status(404).json({ status: "no", message: error.message });
          } else {
            const data = Object.values(results).map((value) =>
              JSON.parse(value)
            );
            res.status(200).json({ status: "ok", fromCache: true, data: data });
          }
        });
      } else {
        next();
      }
    } catch (error) {
      next();
    }
  } else {
    res.status(404).json({ status: "no", message: "Unauthorized process!" });
  }
};
