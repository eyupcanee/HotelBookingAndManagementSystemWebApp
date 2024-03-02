import redisClient from "../../cache/RedisConfigration.js";
import FacilityTest from "../models/FacilityTest.js";
import { authorizeAdmin, getAdminId } from "../../util/Authorize.js";

(async () => {
  try {
    await redisClient.connect();
  } catch (error) {}
})();

export const getTestFacilityCached = async (req, res, next) => {
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

export const getAllFacilitiesCached = async (req, res, next) => {
  const hashKey = "testfacilities";
  try {
    const allFacilitiesFromDB = await FacilityTest.countDocuments();
    const cacheFacilityCount = await redisClient.hlen(hashKey);

    if (allFacilitiesFromDB == cacheFacilityCount) {
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
