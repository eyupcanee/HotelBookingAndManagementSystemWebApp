import HotelTest from "../models/HotelTest.js";
import RoomTest from "../models/RoomTest.js";
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

export const getTestHotel = async (req, res) => {
  const { id } = req.params;

  try {
    await redisClient.del(id);
    HotelTest.findById(id)
      .then((hotel) => {
        redisClient.set(id, JSON.stringify(hotel));
        res.status(200).json({ status: "ok", fromCache: false, data: hotel });
      })
      .catch((error) => {
        res.status(404).json({ status: "no", message: error.message });
      });
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};

export const getAllTestHotels = async (req, res) => {
  try {
    const testhotels = await HotelTest.find();
    await testhotels.forEach((testhotel) => {
      redisClient.hsetnx(
        "testhotels",
        testhotel._id,
        JSON.stringify(testhotel),
        (error, result) => {
          if (error) {
            console.log(`Error : ${error.message}`);
          } else if (result == 1) {
            console.log(`Hotel ${testhotel._id} has added succesfully.`);
          } else {
            console.log(`${testhotel._id} is already exists.`);
          }
        }
      );
    });
    res.status(200).json({ status: "ok", fromCache: false, data: testhotels });
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};

export const addTestHotel = async (req, res) => {
  const { facilities, images } = req.body;
  let imageList;
  if (req.files) {
    imageList = req.files.map((file) => {
      return `http://localhost:5001/` + file.path;
    });
  } else {
    imageList = images;
  }
  try {
    const { token } = req.params;
    if (await authorizeAdmin(token)) {
      const {
        hotelName,
        managerId,
        description,
        country,
        city,
        district,
        addressDetail,
        phoneNumber,
        averagePrice,
        images,
        facilities,
      } = req.body;
      let imageList;
      if (req.files) {
        imageList = req.files.map((file) => {
          return `http://localhost:5001/` + file.path;
        });
      } else {
        imageList = images;
      }

      const newTestHotel = new HotelTest({
        hotelName,
        managerId,
        description,
        country,
        city,
        district,
        addressDetail,
        phoneNumber,
        averagePrice,
        images: imageList,
        facilities,
      });

      await newTestHotel.save().then(() => {
        res.status(200).json({ status: "ok"});
      });
    } else if (await authorizeHotelManager(token)) {
      const managerId = await getHotelManagerId(token);
      const {
        hotelName,
        description,
        country,
        city,
        district,
        addressDetail,
        phoneNumber,
        averagePrice,
        images,
        facilities,
      } = req.body;

      let imageList;
      if (req.files) {
        imageList = req.files.map((file) => {
          return `http://localhost:5001/` + file.path;
        });
      } else {
      }

      const newTestHotel = new HotelTest({
        hotelName,
        managerId: managerId,
        description,
        country,
        city,
        district,
        addressDetail,
        phoneNumber,
        averagePrice,
        images: imageList,
        facilities,
      });

      await newTestHotel.save().then(() => {
        res.status(200).json({
          status: "ok",
        });
      });
    } else {
      res.status(404).json({ status: "no", message: "Unauthorized process!" });
    }
  } catch (error) {
    res
      .status(404)
      .json({ status: "no", message: error.message, data: facilities });
  }
};

export const getTestHotelsByLocation = async (req, res) => {
  const { country, city, district } = req.params;
  let query = {};
  if (country) query.country = country.toLowerCase();
  if (city) query.city = city.toLowerCase();
  if (district) query.district = district.toLowerCase();
  try {
    const testhotels = await HotelTest.find(query);

    res.status(200).json({ status: "ok", data: testhotels });
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};

export const getTestHotelsByManager = async (req, res) => {
  const { managerId } = req.params;
  try {
    const testhotels = await HotelTest.find({
      managerId: managerId,
    });

    res.status(200).json({ status: "ok", data: testhotels });
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};

export const getTestHotelsByMaxPrice = async (req, res) => {
  const { maxPrice } = req.params;
  try {
    const testhotels = await HotelTest.find({
      averagePrice: { $lte: maxPrice },
    });

    res.status(200).json({ status: "ok", data: testhotels });
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};

export const getTestHotelsByFacilities = async (req, res) => {
  const { facilities } = req.body;
  try {
    const facilityObjects = await FacilityTest.find({
      _id: { $in: facilities },
    });

    const facilityIds = facilityObjects.map((facility) => facility._id);
    const testhotels = await HotelTest.find({
      facilities: { $all: facilityIds },
    });

    res.status(200).json({ status: "ok", data: testhotels });
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};

export const getTestHotelsByCriteria = async (req, res) => {
  const { country, city, district, maxPrice, facilities, numberOfPeople } =
    req.body;

  try {
    if (facilities && facilities.length > 0) {
      let query = {};
      if (country) query.country = country.toLowerCase();
      if (city) query.city = city.toLowerCase();
      if (district) query.district = district.toLowerCase();
      if (maxPrice) query.averagePrice = { $lte: maxPrice };

      const facilityObjects = await FacilityTest.find({
        _id: { $in: facilities },
      });

      const facilityIds = facilityObjects.map((facility) => facility._id);

      query.facilities = { $all: facilityIds };

      const testhotels = await HotelTest.find(query);

      const testhotelsIds = testhotels.map((testhotel) => testhotel._id);

      if (numberOfPeople) {
        var rooms = await RoomTest.find({
          hotelId: { $in: testhotelsIds },
          capacity: { $gte: numberOfPeople },
        });

        const hotelIds = rooms.map((room) => room.hotelId);
        const finaltesthotels = await HotelTest.find({
          _id: { $in: hotelIds },
        });
        res.status(200).json({ status: "ok", data: finaltesthotels });
      } else {
        res.status(200).json({ status: "ok", data: testhotels });
      }
    } else {
      let query = {};
      if (country) query.country = country.toLowerCase();
      if (city) query.city = city.toLowerCase();
      if (district) query.district = district.toLowerCase();
      if (maxPrice) query.averagePrice = { $lte: maxPrice };

      const testhotels = await HotelTest.find(query);

      const testhotelsIds = testhotels.map((testhotel) => testhotel._id);

      if (numberOfPeople) {
        var rooms = await RoomTest.find({
          hotelId: { $in: testhotelsIds },
          capacity: { $gte: numberOfPeople },
        });

        const hotelIds = rooms.map((room) => room.hotelId);
        const finaltesthotels = await HotelTest.find({
          _id: { $in: hotelIds },
        });
        res.status(200).json({ status: "ok", data: finaltesthotels });
      } else {
        res.status(200).json({ status: "ok", data: testhotels });
      }
    }
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};
