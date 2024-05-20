import HotelManagerTest from "../models/HotelManagerTest.js";
import { jwtDecode } from "jwt-decode";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import {
  authorizeAdmin,
  getAdminId,
  authorizeHotelManager,
  getHotelManagerId,
} from "../../util/Authorize.js";
import { v2 as cloudinary } from "cloudinary";
import redisClient from "../../cache/RedisConfigration.js";

dotenv.config({ path: "./.env" });

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

export const getTestHotelManager = async (req, res) => {
  try {
    const { id, token } = req.params;
    if (await authorizeAdmin(token)) {
      await redisClient.del(id);
      HotelManagerTest.findById(id)
        .then((hmanager) => {
          redisClient.set(id, JSON.stringify(hmanager));
          res
            .status(200)
            .json({ status: "ok", fromCache: false, data: hmanager });
        })
        .catch((error) => {
          res.status(404).json({ status: "no", message: error.message });
        });
    } else if (
      (await authorizeHotelManager(token)) &
      ((await getHotelManagerId(token)) == id)
    ) {
      await redisClient.del(id);
      HotelManagerTest.findById(id)
        .then((hmanager) => {
          redisClient.set(id, JSON.stringify(hmanager));
          res
            .status(200)
            .json({ status: "ok", fromCache: false, data: hmanager });
        })
        .catch((error) => {
          res.status(404).json({ status: "no", message: error.message });
        });
    } else {
      res
        .status(404)
        .json({ status: "no", message: "Unauthorized process!", token });
    }
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};

export const getAllTestHotelManagers = async (req, res) => {
  try {
    const { token } = req.params;
    if (await authorizeAdmin(token)) {
      const testhotelmanagers = await HotelManagerTest.find();
      await testhotelmanagers.forEach((testhotelmanager) => {
        redisClient.hsetnx(
          "testhotelmanagers",
          testhotelmanager._id,
          JSON.stringify(testhotelmanager),
          (error, result) => {
            if (error) {
              console.log(`Error : ${error.message}`);
            } else if (result == 1) {
              console.log(
                `Admin ${testhotelmanager._id} has added succesfully.`
              );
            } else {
              console.log(`${testhotelmanager._id} is already exists.`);
            }
          }
        );
      });
      res
        .status(200)
        .json({ status: "ok", fromCache: false, data: testhotelmanagers });
    } else {
      res.status(404).json({ status: "no", message: "Unauthorized process!" });
    }
  } catch (error) {
    res
      .status(404)
      .json({ status: "no", fromCache: false, message: error.message });
  }
};

export const loginTestHotelManagers = async (req, res) => {
  try {
    const password = req.body.password;
    const testhotelmanager = await HotelManagerTest.findOne({
      email: req.body.email,
    });

    if (!testhotelmanager) {
      res.status(404).json({
        status: "no",
        message: "There isn't admin that have this id!",
      });
    } else {
      if (await bcrypt.compare(password, testhotelmanager.password)) {
        const token = jwt.sign(
          {
            id: testhotelmanager._id,
            role: testhotelmanager.role,
          },
          process.env.JWT_CODE
        );
        res.status(200).json({ status: "ok", token: token });
      } else {
        res.status(200).json({ status: "no", message: "Wrong password!" });
      }
    }
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};

export const logoutTestAdmin = async (req, res) => {
  try {
    const { token } = req.params;
    if (await authorizeHotelManager(token)) {
      res.status(200).json({ status: "ok" });
    } else {
      res.status(404).json({ status: "no", message: "Unauthorized process!" });
    }
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};

export const addTestHotelManager = async (req, res) => {
  try {
    const { token } = req.params;

    if (await authorizeAdmin(token)) {
      const {
        firstName,
        lastName,
        email,
        password,
        profilePicture,
        phoneNumber,
      } = req.body;
      const encryptedPassword = await bcrypt.hash(password, 8);

      const newTestHotelManager = new HotelManagerTest({
        firstName,
        lastName,
        email,
        password: encryptedPassword,
        profilePicture: `${
          profilePicture
            ? profilePicture
            : `http://localhost:5001/` + req.file.path
        }`,
        phoneNumber,
      });

      await newTestHotelManager.save().then(() => {
        res.status(200).json({ status: "ok" });
      });
    } else {
      res.status(404).json({ status: "no", message: "Unauthorized process!" });
    }
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};

export const deleteHotelManager = async (req, res) => {
  const { id, token } = req.params;
  try {
    if (await authorizeAdmin(token)) {
      await HotelManagerTest.findByIdAndDelete(id)
        .then(() => {
          redisClient.hdel("testhotelmanagers", id);
          res.status(200).json({ status: "ok" });
        })
        .catch((error) => {
          res.status(404).json({ status: "no", message: error.message });
        });
    } else {
      res.status(404).json({ status: "no", message: "Unauthorized process!" });
    }
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};
