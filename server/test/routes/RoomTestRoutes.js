import express from "express";
import multer from "multer";

import {
  addTestRoom,
  getAllTestRooms,
  getTestRoom,
  getTestRoomsByAvailability,
  getTestRoomsByCapacity,
  getTestRoomsByHotel,
  getTestRoomsByMaxCapacity,
  getTestRoomsByMaxPrice,
  getTestRoomsByFacilities,
  getTestRoomsByCriteria,
} from "../controller/RoomTest.js";

import {
  getAllRoomsCached,
  getTestRoomCached,
} from "../cache/RoomTestCache.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filnename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalName);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file type!" }, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const router = express.Router();

router.post("/addroom/:token", addTestRoom);
router.get("/get/:id", getTestRoomCached, getTestRoom);
router.get("/get", getAllRoomsCached, getAllTestRooms);
router.get("/get/hotel/:hotelId", getTestRoomsByHotel);
router.get("/get/maxprice/:maxPrice", getTestRoomsByMaxPrice);
router.get("/get/maxcapacity/:maxCapacity", getTestRoomsByMaxCapacity);
router.get("/get/capacity/:capacity", getTestRoomsByCapacity);
router.get("/get/availability/:available", getTestRoomsByAvailability);
router.post("/get/facilities", getTestRoomsByFacilities);
router.post("/get/criteria", getTestRoomsByCriteria);

export default router;
