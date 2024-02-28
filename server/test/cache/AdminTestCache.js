import redisClient from "../../cache/RedisConfigration";
import AdminTest from "../models/AdminTest";

(async () => {
  try {
    await redisClient.connect();
  } catch (error) {}
})();

export const getTestAdminCached = async (req, res, next) => {
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

export const getAllAdminsCached = async (req, res, next) => {
  const hashKey = "testadmins";
  try {
    const allAdminsFromDB = await AdminTest.countDocuments();
    const cacheAdminCount = await redisClient.hlen(hashKey);

    if (cacheAdminCount == allAdminsFromDB) {
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
