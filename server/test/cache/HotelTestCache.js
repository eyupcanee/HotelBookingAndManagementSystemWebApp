import redisClient from "../../cache/RedisConfigration.js";
import HotelTest from "../models/HotelTest.js";
import { authorizeAdmin, getAdminId } from "../../util/Authorize.js";

(async () => {
  try {
    await redisClient.connect();
  } catch (error) {}
})();

export const getTestHotelCached = async (req, res, next) => {
  const { token } = req.params;

  const { id } = req.params;
  let results;
  try {
    const cacheResults = await redisClient.get(id);
    if (cacheResults) {
      results = JSON.parse(cacheResults);
      res.status(200).json({ status: "ok", fromCache: true, data: results });
    } else {
      next();
    }
  } catch (error) {
    next();
  }
};

export const getAllHotelsCached = async (req, res, next) => {
  const { token } = req.params;

  const hashKey = "testhotels";
  try {
    const allHotelsFromDB = await HotelTest.countDocuments();
    const cacheHotelCount = await redisClient.hlen(hashKey);

    if (cacheHotelCount == allHotelsFromDB) {
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
