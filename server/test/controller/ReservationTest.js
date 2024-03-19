import ReservationTest from "../models/ReservationTest.js";
import HotelTest from "../models/HotelTest.js";
import { jwtDecode } from "jwt-decode";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import {
  authorizeAdmin,
  getAdminId,
  authorizeUser,
  getUserId,
  authorizeHotelManager,
  getHotelManagerId,
} from "../../util/Authorize.js";
import { v2 as cloudinary } from "cloudinary";
import redisClient from "../../cache/RedisConfigration.js";
import RoomTest from "../models/RoomTest.js";

dotenv.config({ path: "../../.env.development.local" });

(async () => {
  try {
    await redisClient.connect();
  } catch (error) {}
})();

export const deleteTestReservation = async (req, res) => {
  try {
    const { id, token } = req.params;
    await redisClient.del(id);
    if (await authorizeAdmin(token)) {
      await ReservationTest.findByIdAndDelete(id).then(() => {
        res.status(200).json({ status: "ok" });
      });
    } else if (await authorizeHotelManager(token)) {
      const managerId = await getHotelManagerId(token);
      const managershotels = await HotelTest.find({
        managerId: managerId,
      }).select("_id");
      const hotelIds = managershotels.map((hotel) => hotel._id.toString());
      const testreservation = await ReservationTest.findById(id);
      if (hotelIds.includes(testreservation._id)) {
        await ReservationTest.findByIdAndDelete(id).then(() => {
          res.status(200).json({ status: "ok" });
        });
      } else {
        res
          .status(404)
          .json({ status: "no", message: "Unauthorized process!" });
      }
    } else if (await authorizeUser(token)) {
      const userId = await getUserId(token);
      const testreservation = await ReservationTest.findById(id);
      if (testreservation.userId === userId) {
        await ReservationTest.findByIdAndDelete(id).then(() => {
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

export const getTestReservation = async (req, res) => {
  try {
    const { id, token } = req.params;
    await redisClient.del(id);
    if (await authorizeAdmin(token)) {
      const testreservation = await ReservationTest.findById(id);
      res
        .status(200)
        .json({ status: "ok", fromCache: false, data: testreservation });
    } else if (await authorizeHotelManager(token)) {
      const managerId = await getHotelManagerId(token);
      const managershotels = await HotelTest.find({
        managerId: managerId,
      }).select("_id");
      const hotelIds = managershotels.map((hotel) => hotel._id.toString());
      const testreservation = await ReservationTest.findById(id);
      if (hotelIds.includes(testreservation._id)) {
        res
          .status(200)
          .json({ status: "ok", fromCache: false, data: testreservation });
      } else {
        res
          .status(404)
          .json({ status: "no", message: "Unauthorized process!" });
      }
    } else if (await authorizeUser(token)) {
      const userId = await getUserId(token);
      const testreservation = await ReservationTest.findById(id);
      if (testreservation.userId === userId) {
        res
          .status(200)
          .json({ status: "ok", fromCache: false, data: testreservation });
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

export const getAllTestReservations = async (req, res) => {
  try {
    const { token } = req.params;
    if (await authorizeAdmin(token)) {
      const testreservations = await ReservationTest.find();
      await testreservations.forEach((testreservation) => {
        redisClient.hsetnx(
          "testreservations",
          testreservation._id,
          JSON.stringify(testreservation),
          (error, result) => {
            if (error) {
              console.log(`Error : ${error.message}`);
            } else if (result == 1) {
              console.log(
                `Reservation ${testreservation._id} has added succesfully.`
              );
            } else {
              console.log(`${testreservation._id} is already exists.`);
            }
          }
        );
      });
      res
        .status(200)
        .json({ status: "ok", fromCache: false, data: testreservations });
    } else {
      res.status(404).json({ status: "no", message: "Unauthorized process!" });
    }
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};

export const addTestReservation = async (req, res) => {
  try {
    const { token } = req.params;
    if (
      (await authorizeAdmin(token)) ||
      (await authorizeHotelManager(token)) ||
      (await authorizeUser(token))
    ) {
      const {
        userId,
        hotelId,
        roomId,
        numberOfPeople,
        checkIn,
        checkOut,
        totalCharge,
      } = req.body;

      const overlappingReservations = await ReservationTest.find({
        hotelId: hotelId,
        roomId: roomId,
        $or: [
          {
            checkIn: { $lt: checkOut },
            checkOut: { $gt: checkIn },
          },
        ],
      });

      const overcapacity = await RoomTest.find({
        _id: roomId,
        capacity: { $lt: numberOfPeople },
      });

      if (overlappingReservations.length > 0) {
        res
          .status(404)
          .json({ status: "no", message: "Overlapping reservation!" });
      }
      if (overcapacity.length > 0) {
        res
          .status(404)
          .json({ status: "no", message: "Overcapacity reservation!" });
      } else {
        const newTestReservation = new ReservationTest({
          userId,
          hotelId,
          roomId,
          numberOfPeople,
          checkIn,
          checkOut,
          totalCharge,
        });
        await newTestReservation
          .save()
          .then(() => {
            res.status(200).json({ status: "ok" });
          })
          .catch((error) => {
            res.status(404).json({ status: "no", message: error.message });
          });
      }
    }
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};

export const getTestReservationsByUser = async (req, res) => {
  try {
    const { userId, token } = req.params;
    if ((await authorizeAdmin(token)) || (await authorizeHotelManager(token))) {
      const testreservations = await ReservationTest.find({
        userId: userId,
      });

      res.status(200).json({ status: "ok", data: testreservations });
    } else if (await authorizeUser(token)) {
      const uId = await getUserId(token);
      if (uId === userId) {
        const testreservations = await ReservationTest.find({
          userId: userId,
        });

        res.status(200).json({ status: "ok", data: testreservations });
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

export const getTestReservationsByHotel = async (req, res) => {
  try {
    const { token } = req.params;
    const { hotelId } = req.body;
    if (await authorizeAdmin(token)) {
      const testreservations = await ReservationTest.find({
        hotelId: hotelId,
      });

      res.status(200).json({ status: "ok", data: testreservations });
    } else if (await authorizeHotelManager(token)) {
      const managerId = await getHotelManagerId(token);
      const managershotels = await HotelTest.find({
        managerId: managerId,
      }).select("_id");
      const hotelIds = managershotels.map((hotel) => hotel._id.toString());
      if (hotelIds.includes(hotelId)) {
        const testreservations = await ReservationTest.find({
          hotelId: hotelId,
        });

        res.status(200).json({ status: "ok", data: testreservations });
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

export const getTestReservationsByConfirmation = async (req, res) => {
  try {
    const { token } = req.params;
    const { hotelId, roomId, userId, confirmation } = req.body;
    query.hotelId = hotelId;
    query.confirmation = confirmation;
    if (roomId) query.roomId = roomId;
    if (userId) query.userId = userId;

    if (await authorizeAdmin(token)) {
      const testreservations = await ReservationTest.find(query);
      res.status(200).json({ status: "ok", data: testreservations });
    } else if (await authorizeHotelManager(token)) {
      const managerId = await getHotelManagerId(token);
      const managershotels = await HotelTest.find({
        managerId: managerId,
      }).select("_id");
      const hotelIds = managershotels.map((hotel) => hotel._id.toString());
      if (hotelIds.includes(hotelId)) {
        const testreservations = await ReservationTest.find(query);
        res.status(200).json({ status: "ok", data: testreservations });
      } else {
        res
          .status(404)
          .json({ status: "no", message: "Unauthorized process!" });
      }
    }
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};

export const getTestReservationsByConfirmationFromUser = async (req, res) => {
  try {
    const { token } = req.params;
    const { userId, confirmation } = req.body;
    if (await authorizeAdmin(token)) {
      const testreservations = await ReservationTest.find({
        userId: userId,
        confirmation: confirmation,
      });

      res.status(200).json({ status: "ok", data: testreservations });
    } else if (await authorizeUser(token)) {
      const testreservations = await ReservationTest.find({
        userId: userId,
        confirmation: confirmation,
      });

      const uId = await getUserId(token);

      if (uId === testreservations.userId) {
        res.status(200).json({ status: "ok", data: testreservations });
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
