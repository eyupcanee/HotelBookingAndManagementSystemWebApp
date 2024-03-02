import express from "express";
import multer from "multer";

import {
  addTestAdmin,
  loginTestAdmin,
  logoutTestAdmin,
  getTestAdmin,
  getAllTestAdmins,
} from "../controller/AdminTest.js";

import {
  getTestAdminCached,
  getAllAdminsCached,
} from "../cache/AdminTestCache.js";

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

router.post("/addadmin", upload.single("profilePicture"), addTestAdmin);
router.post("/login", loginTestAdmin);
router.post("/logout/:token", logoutTestAdmin);
router.get("/get/:id/:token", getTestAdminCached, getTestAdmin);
router.get("/get/:token", getAllAdminsCached, getAllTestAdmins);

export default router;
