import FacilityTest from "../models/FacilityTest.js";
import { jwtDecode } from "jwt-decode";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { authorizeAdmin, getAdminId } from "../../util/Authorize.js";
import { v2 as cloudinary } from "cloudinary";
import redisClient from "../../cache/RedisConfigration.js";

dotenv.config({ path: "./.env" });

(async () => {
  try {
    await redisClient.connect();
  } catch (error) {}
})();

export const getTestFacilty = async (req, res) => {
  try {
    const { id } = req.params;
    await redisClient.del(id);
    FacilityTest.findById(id)
      .then((facilty) => {
        redisClient.set(id, JSON.stringify(facilty));
        res.status(200).json({ status: "ok", fromCache: false, data: facilty });
      })
      .catch((error) => {
        res.status(404).json({ status: "no", message: error.message });
      });
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};

export const getAllTestFacilities = async (req, res) => {
  try {
    const testfacilities = await FacilityTest.find();
    await testfacilities.forEach((testfacility) => {
      redisClient.hsetnx(
        "testfacilities",
        testfacility._id,
        JSON.stringify(testfacility),
        (error, result) => {
          if (error) {
            console.log(`Error : ${error.message}`);
          } else if (result == 1) {
            console.log(`Facility ${testfacility._id} has added succesfully.`);
          } else {
            console.log(`${testfacility._id} is already exists.`);
          }
        }
      );
    });
    res
      .status(200)
      .json({ status: "ok", fromCache: false, data: testfacilities });
  } catch (error) {
    res
      .status(404)
      .json({ status: "no", fromCache: false, message: error.message });
  }
};

export const addTestFacility = async (req, res) => {
  try {
    const { token } = req.params;
    const { facilityName } = req.body;
    if (await authorizeAdmin(token)) {
      const newFacility = new FacilityTest({
        facilityName,
      });

      await newFacility.save().then(() => {
        res.status(200).json({ status: "ok" });
      });
    } else {
      res.status(404).json({ status: "no", message: "Unauthorized process!" });
    }
  } catch (error) {
    res.status(404).json({ status: "no", message: error.message });
  }
};
