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
    res.status(200).json({ status: "ok", fromCache: false, data: testhotel });
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};

export const addTestHotel = async (req, res) => {
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

      if (!images || images.length < 1) {
        const promises = req.files.map((file) =>
          cloudinary.uploader.upload(file.buffer)
        );
        const uploadedResults = await Promise.all(promises);

        var imageUrls = uploadedResults.map((result) => result.secure_url);
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
        images: imageUrls,
        facilities,
      });

      await newTestHotel.save().then(() => {
        res.status(200).json({ status: "ok" });
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

      if (!images || length(images) < 1) {
        const promises = req.files.map((file) =>
          cloudinary.uploader.upload(file.buffer)
        );
        const uploadedResults = await Promise.all(promises);

        var imageUrls = uploadedResults.map((result) => result.secure_url);
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
        images: imageUrls,
        facilities,
      });

      await newTestHotel.save().then(() => {
        res.status(200).json({ status: "ok" });
      });
    } else {
      res.status(404).json({ status: "no", message: "Unauthorized process!" });
    }
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};

export const getTestHotelsByLocation = async (req, res) => {
  const { country, city, district } = req.body;
  let query = {};
  if (country) query.country = country.toLowerCase();
  if (city) query.city = country.toLowerCase();
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
  const { maxPrice } = req.body;
  try {
    const testhotels = await HotelTest.find({
      averagePrice: { $lt: maxPrice },
    });

    res.status(200).json({ status: "ok", data: testhotels });
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};

export const getTestHotelsByFacilities = async (req, res) => {
  const { facilities } = req.body;
  try {
    const facilityNames = facilities.split(",");
    const facilityObjects = await FacilityTest.find({
      facilityName: { $in: facilityNames },
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
  const { country, city, district, maxPrice, facilities } = req.body;

  try {
    if (facilities && len(facilities) > 0) {
      let query = {};
      if (country) query.country = country.toLowerCase();
      if (city) query.city = country.toLowerCase();
      if (district) query.district = district.toLowerCase();
      if (maxPrice) query.averagePrice = { $lt: maxPrice };

      const facilityNames = facilities.split(",");
      const facilityObjects = await FacilityTest.find({
        facilityName: { $in: facilityNames },
      });

      const facilityIds = facilityObjects.map((facility) => facility._id);

      query.facilities = { $all: facilityIds };

      const testhotels = await HotelTest.find(query);
      res.status(200).json({ status: "ok", data: testhotels });
    } else {
      let query = {};
      if (country) query.country = country.toLowerCase();
      if (city) query.city = country.toLowerCase();
      if (district) query.district = district.toLowerCase();
      if (maxPrice) query.averagePrice = { $lt: maxPrice };

      const testhotels = await HotelTest.find(query);

      const testhotels = await HotelTest.find(query);
      res.status(200).json({ status: "ok", data: testhotels });
    }
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};
