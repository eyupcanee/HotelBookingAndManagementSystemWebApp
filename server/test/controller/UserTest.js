import UserTest from "../models/UserTest.js";
import { jwtDecode } from "jwt-decode";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import {
  authorizeAdmin,
  getAdminId,
  authorizeUser,
  getUserId,
} from "../../util/Authorize.js";
import { v2 as cloudinary } from "cloudinary";
import redisClient from "../../cache/RedisConfigration.js";

dotenv.config({ path: "../../.env.development.local" });
var c_name;
var a_key;
var s_key;
async () => {
  c_name = "dknqfhayy";
  a_key = "dknqfhayy";
  s_key = process.env.CLOUD_SECRET;
};

cloudinary.config({
  cloud_name: "dknqfhayy",
  api_key: "992737114653158",
  api_secret: "mZwp6oeqnHgGV7rKkKgCkY5rHF8",
  secure: false,
});

(async () => {
  try {
    await redisClient.connect();
  } catch (error) {}
})();

export const getTestUser = async (req, res) => {
  const { id, token } = req.params;
  try {
    if (await authorizeAdmin(token)) {
      await redisClient.del(id);
      UserTest.findById(id)
        .then((user) => {
          redisClient.set(id, JSON.stringify(user));
          res.status(200).json({ status: "ok", fromCache: false, data: user });
        })
        .catch((error) => {
          res.status(404).json({ status: "no", message: error.message });
        });
    } else if (
      (await authorizeUser(token)) &&
      (await getUserId(token)) === id
    ) {
      await redisClient.del(id);
      UserTest.findById(id)
        .then((user) => {
          redisClient.set(id, JSON.stringify(user));
          res.status(200).json({ status: "ok", fromCache: false, data: user });
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

export const getAllTestUsers = async (req, res) => {
  try {
    const { token } = req.params;
    if (await authorizeAdmin(token)) {
      const testusers = await UserTest.find();
      await testusers.forEach((testuser) => {
        redisClient.hsetnx(
          "testusers",
          testuser._id,
          JSON.stringify(testuser),
          (error, result) => {
            if (error) {
              console.log(`Error : ${error.message}`);
            } else if (result == 1) {
              console.log(`User ${testuser._id} has added succesfully.`);
            } else {
              console.log(`${testuser._id} is already exists.`);
            }
          }
        );
      });
      res.status(200).json({ status: "ok", fromCache: false, data: testusers });
    } else {
      res.status(404).json({ status: "no", message: "Unauthorized process!" });
    }
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};

export const loginTestUser = async (req, res) => {
  try {
    const password = req.body.password;
    const testuser = await UserTest.findOne({
      email: req.body.email,
    });

    if (!testuser) {
      res.status(404).json({
        status: "no",
        message: "There isn't user that have this id!",
      });
    } else {
      if (await bcrypt.compare(password, testuser.password)) {
        const token = jwt.sign(
          {
            id: testuser._id,
            role: testuser.role,
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

export const logoutTestUser = async (req, res) => {
  try {
    const { token } = req.params;
    if (await authorizeUser(token)) {
      res.status(200).json({ status: "ok" });
    } else {
      res.status(404).json({ status: "no", message: "Unauthorized process!" });
    }
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};

export const registerTestUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      profilePicture,
      phoneNumber,
    } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 8);

    const newTestUser = new UserTest({
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

    await newTestUser.save().then(() => {
      res.status(200).json({ status: "ok", message: req.file });
    });
  } catch (error) {
    res.status(404).json({
      status: "no",
      message: error.message,
    });
  }
};

export const deleteTestUser = async (req, res) => {
  const { id, token } = req.params;
  try {
    if (await authorizeAdmin(token)) {
      await UserTest.findByIdAndDelete(id)
        .then(() => {
          redisClient.hdel("testusers", id);
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
