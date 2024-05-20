import AdminTest from "../models/AdminTest.js";
import { jwtDecode } from "jwt-decode";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { authorizeAdmin, getAdminId } from "../../util/Authorize.js";
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

export const getTestAdmin = async (req, res) => {
  try {
    const { id, token } = req.params;
    if (await authorizeAdmin(token)) {
      await redisClient.del(id);
      AdminTest.findById(id)
        .then((admin) => {
          redisClient.set(id, JSON.stringify(admin));
          res.status(200).json({ status: "ok", fromCache: false, data: admin });
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

export const getAllTestAdmins = async (req, res) => {
  try {
    const { token } = req.params;
    if (await authorizeAdmin(token)) {
      const testadmins = await AdminTest.find().select("-password");
      await testadmins.forEach((testadmin) => {
        redisClient.hsetnx(
          "testadmins",
          testadmin._id,
          JSON.stringify(testadmin),
          (error, result) => {
            if (error) {
              console.log(`Error : ${error.message}`);
            } else if (result == 1) {
              console.log(`Admin ${testadmin._id} has added succesfully.`);
            } else {
              console.log(`${testadmin._id} is already exists.`);
            }
          }
        );
      });
      res
        .status(200)
        .json({ status: "ok", fromCache: false, data: testadmins });
    } else {
      res.status(404).json({ status: "no", message: "Unauthorized process!" });
    }
  } catch (error) {
    res
      .status(404)
      .json({ status: "no", fromCache: false, message: error.message });
  }
};

export const loginTestAdmin = async (req, res) => {
  try {
    const password = req.body.password;
    const testadmin = await AdminTest.findOne({
      email: req.body.email,
    });

    if (!testadmin) {
      res.status(404).json({
        status: "no",
        message: "There isn't admin that have this id!",
      });
    } else {
      if (await bcrypt.compare(password, testadmin.password)) {
        const token = jwt.sign(
          {
            id: testadmin._id,
            role: testadmin.role,
          },
          process.env.JWT_CODE
        );
        res.status(200).json({ status: "ok", token: token });
      } else {
        res.status(404).json({ status: "no", message: "Wrong password!" });
      }
    }
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};

export const logoutTestAdmin = async (req, res) => {
  try {
    const { token } = req.params;
    if (await authorizeAdmin(token)) {
      res.status(200).json({ status: "ok" });
    } else {
      res.status(404).json({ status: "no", message: "Unauthorized process!" });
    }
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};

export const addTestAdmin = async (req, res) => {
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

      if (!profilePicture) {
        var result = await cloudinary.uploader.upload(req.file.path);
      }

      const newTestAdmin = new AdminTest({
        firstName,
        lastName,
        email,
        password: encryptedPassword,
        profilePicture: `${result ? result.secure_url : profilePicture}`,
        phoneNumber,
      });

      await newTestAdmin.save().then(() => {
        res.status(200).json({ status: "ok" });
      });
    } else {
      res.status(404).json({ status: "no", message: "Unauthorized process!" });
    }
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};
