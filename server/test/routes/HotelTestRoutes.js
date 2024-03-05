import express from "express";
import multer from "multer";

import {
  addTestHotel,
  getAllTestHotels,
  getTestHotel,
  getTestHotelsByCriteria,
  getTestHotelsByFacilities,
  getTestHotelsByLocation,
  getTestHotelsByManager,
  getTestHotelsByMaxPrice,
} from "../controller/HotelTest.js";

import {
  getAllHotelsCached,
  getTestHotelCached,
} from "../cache/HotelTestCache.js";

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

router.post("/addhotel/:token", upload.array("images"), addTestHotel);
router.get("/get/:id", getTestHotelCached, getTestHotel);
router.get("/get", getAllHotelsCached, getAllTestHotels);
router.get("/get/location", getTestHotelsByLocation);
router.get("/get/manager/:managerId", getTestHotelsByManager);
router.get("/get/maxprice", getTestHotelsByMaxPrice);
router.get("/get/facilities", getTestHotelsByFacilities);
router.get("/get/criteria", getTestHotelsByCriteria);

export default router;
