import express from "express";
import multer from "multer";

import {
  addTestHotelManager,
  getAllTestHotelManagers,
  getTestHotelManager,
  loginTestHotelManagers,
  logoutTestAdmin,
} from "../controller/HotelManagerTest.js";

import {
  getAllTestHotelManagersCached,
  getTestHotelManagerCached,
} from "../cache/HotelManagerTestCache.js";

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

router.post(
  "/addhmanager/:token",
  upload.single("profilePicture"),
  addTestHotelManager
);
router.post("/login", loginTestHotelManagers);
router.post("/logout/:token", logoutTestAdmin);
router.get("/get/:id/:token", getTestHotelManagerCached, getTestHotelManager);
router.get(
  "/get/:token",
  getAllTestHotelManagersCached,
  getAllTestHotelManagers
);

export default router;
