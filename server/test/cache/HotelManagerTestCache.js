import redisClient from "../../cache/RedisConfigration.js";
import HotelManagerTest from "../models/HotelManagerTest.js";
import { authorizeAdmin, authorizeHotelManager, getAdminId, getHotelManagerId } from "../../util/Authorize.js";

(async () => {
  try {
    await redisClient.connect();
  } catch (error) {}
})();

export const getTestHotelManagerCached = async (req, res, next) => {
  const { id,token } = req.params;
  if (await authorizeAdmin(token)) {
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
  } else if ((await authorizeHotelManager(token)) && (await getHotelManagerId(token)) == id) {
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
  } 
  
  
  else {
    res.status(404).json({ status: "no", message: "Unauthorized process!" });
  }
};

export const getAllTestHotelManagersCached = async (req, res, next) => {
  const { token } = req.params;
  if (await authorizeAdmin(token)) {
    const hashKey = "testhotelmanagers";
    try {
      const allHotelManagersFromDB = await HotelManagerTest.countDocuments();
      const cacheHotelManagerCount = await redisClient.hlen(hashKey);

      if (cacheHotelManagerCount == allHotelManagersFromDB) {
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
