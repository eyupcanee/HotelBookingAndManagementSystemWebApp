import ReservationTest from "../models/ReservationTest.js";
import redisClient from "../../cache/RedisConfigration.js";
import CommentTest from "../models/CommentTest.js";
import {
  authorizeAdmin,
  getAdminId,
  authorizeHotelManager,
  getHotelManagerId,
  authorizeUser,
  getUserId,
} from "../../util/Authorize.js";

(async () => {
  try {
    await redisClient.connect();
  } catch (error) {}
})();

export const getTestReservationCached = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { id } = req.params;
    if (await authorizeAdmin(token)) {
      let results;
      const cacheResults = await redisClient.get(id);
      if (cacheResults) {
        results = JSON.parse(cacheResults);
        res.status(200).json({ status: "ok", fromCache: true, data: results });
      } else {
        next();
      }
    } else if (await authorizeHotelManager(token)) {
      const managerId = await getHotelManagerId(token);
      const managershotels = await HotelTest.find({
        managerId: managerId,
      }).select("_id");
      const hotelIds = managershotels.map((hotel) => hotel._id.toString());
      const testreservation = await ReservationTest.findById(id);
      if (hotelIds.includes(testreservation._id)) {
        let results;
        const cacheResults = await redisClient.get(id);
        if (cacheResults) {
          results = JSON.parse(cacheResults);
          res
            .status(200)
            .json({ status: "ok", fromCache: true, data: results });
        } else {
          next();
        }
      } else {
        res
          .status(404)
          .json({ status: "no", message: "Unauthorized process!" });
      }
    } else if (await authorizeUser(token)) {
      const userId = await getUserId(token);
      const testreservation = await ReservationTest.findById(id);
      if (testreservation.userId === userId) {
        let results;
        const cacheResults = await redisClient.get(id);
        if (cacheResults) {
          results = JSON.parse(cacheResults);
          res
            .status(200)
            .json({ status: "ok", fromCache: true, data: results });
        } else {
          next();
        }
      } else {
        res
          .status(404)
          .json({ status: "no", message: "Unauthorized process!" });
      }
    } else {
      res.status(404).json({ status: "no", message: "Unauthorized process!" });
    }
  } catch (error) {}
};

export const getAllTestReservationsCached = async (req, res, next) => {
  const { token } = req.params;
  if (await authorizeAdmin(token)) {
    const hashKey = "testreservations";
    try {
      const allReservationsFromDB = await ReservationTest.countDocuments();
      const cacheReservationCount = await redisClient.hlen(hashKey);

      if (cacheReservationCount == allReservationsFromDB) {
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
