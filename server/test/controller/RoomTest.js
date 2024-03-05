import RoomTest from "../models/RoomTest.js";
import HotelTest from "../models/HotelTest.js";
import FacilityTest from "../models/FacilityTest.js";
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

dotenv.config({ path: "../../.env.development.local" });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

(async () => {
  try {
    await redisClient.connect();
  } catch (error) {}
})();

export const getTestRoom = async (req, res) => {
  const { id } = req.params;

  try {
    await redisClient.del(id);
    RoomTest.findById(id)
      .then((room) => {
        redisClient.set(id, JSON.stringify(room));
        res.status(200).json({ status: "ok", fromCache: false, data: room });
      })
      .catch((error) => {
        res.status(404).json({ status: "no", message: error.message });
      });
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};

export const getAllTestRooms = async (req, res) => {
  try {
    const testrooms = await RoomTest.find();
    await testrooms.forEach((testroom) => {
      redisClient.hsetnx(
        "testrooms",
        testroom._id,
        JSON.stringify(testroom),
        (error, result) => {
          if (error) {
            console.log(`Error : ${error.message}`);
          } else if (result == 1) {
            console.log(`Room ${testroom._id} has added succesfully.`);
          } else {
            console.log(`${testroom._id} is already exists.`);
          }
        }
      );
    });
    res.status(200).json({ status: "ok", fromCache: false, data: testhotel });
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};

export const addTestRoom = async (req, res) => {
  try {
    const { token } = req.params;
    if (await authorizeAdmin(token)) {
      const {
        hotelId,
        description,
        pricePerNight,
        faclities,
        images,
        capacity,
        available,
      } = req.body;

      if (!images || images.length < 1) {
        const promises = req.files.map((file) =>
          cloudinary.uploader.upload(file.buffer)
        );
        const uploadedResults = await Promise.all(promises);

        var imageUrls = uploadedResults.map((result) => result.secure_url);
      }

      const newTestRoom = new RoomTest({
        hotelId,
        description,
        pricePerNight,
        facilities,
        images: `${!images || images.length < 1 ? imageUrls : images}`,
        capacity,
        available,
      });

      await newTestRoom.save().then(() => {
        res.status(200).json({ status: "ok" });
      });
    } else if (await authorizeHotelManager(token)) {
      const managerId = await getHotelManagerId(token);
      const managershotels = await HotelTest.find({
        managerId: managerId,
      }).select("_id");
      const { hotelId } = req.body;
      const hotelIds = managershotels.map((hotel) => hotel._id.toString());
      if (hotelIds.includes(hotelId)) {
        const {
          hotelId,
          description,
          pricePerNight,
          faclities,
          images,
          capacity,
          available,
        } = req.body;

        if (!images || images.length < 1) {
          const promises = req.files.map((file) =>
            cloudinary.uploader.upload(file.buffer)
          );
          const uploadedResults = await Promise.all(promises);

          var imageUrls = uploadedResults.map((result) => result.secure_url);
        }

        const newTestRoom = new RoomTest({
          hotelId,
          description,
          pricePerNight,
          facilities,
          images: `${!images || images.length < 1 ? imageUrls : images}`,
          capacity,
          available,
        });

        await newTestRoom.save().then(() => {
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

export const getTestRoomsByHotel = async (req, res) => {
  const { hotelId } = req.params;
  try {
    const testrooms = await RoomTest.find({ hotelId: hotelId });
    res.status(200).json({ status: "ok", data: testrooms });
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};

export const getTestRoomsByMaxPrice = async (req, res) => {
  const { maxPrice } = req.body;
  try {
    const testrooms = await RoomTest.find({
      pricePerNight: { $lt: maxPrice },
    });
    res.status(200).json({ status: "ok", data: testrooms });
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};

export const getTestRoomsByMaxCapacity = async (req, res) => {
  const { maxCapacity } = req.body;
  try {
    const testrooms = await RoomTest.find({
      capacity: { $lt: maxCapacity },
    });
    res.status(200).json({ status: "ok", data: testrooms });
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};

export const getTestRoomsByCapacity = async (req, res) => {
  const { capacity } = req.body;
  try {
    const testrooms = await RoomTest.find({
      capacity: capacity,
    });
    res.status(200).json({ status: "ok", data: testrooms });
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};

export const getTestRoomsByAvailability = async (req, res) => {
  const { available } = req.body;
  try {
    const testrooms = await RoomTest.find({
      available: available,
    });
    res.status(200).json({ status: "ok", data: testrooms });
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};

export const getTestRoomsByFacilities = async (req, res) => {
  const { facilities } = req.body;
  try {
    const facilityNames = facilities.split(",");
    const facilityObjects = await FacilityTest.find({
      facilityName: { $in: facilityNames },
    });

    const facilityIds = facilityObjects.map((facility) => facility._id);
    const testrooms = await RoomTest.find({
      facilities: { $all: facilityIds },
    });

    res.status(200).json({ status: "ok", data: testrooms });
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};
