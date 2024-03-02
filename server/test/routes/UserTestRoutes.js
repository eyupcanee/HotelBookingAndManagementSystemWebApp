import express from "express";
import multer from "multer";

import {
  getTestUser,
  getAllTestUsers,
  loginTestUser,
  logoutTestUser,
  registerTestUser,
  deleteTestUser,
} from "../controller/UserTest.js";

import {
  getTestUserCached,
  getAllTestUsersCached,
} from "../cache/UserTestCache.js";

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

router.post("/register", upload.single("profilePicture"), registerTestUser);
router.post("/login", loginTestUser);
router.post("/logout/:token", logoutTestUser);
router.delete("/del/:id/:token", deleteTestUser);
router.get("/get/:id/:token", getTestUserCached, getTestUser);
router.get("/get/:token", getAllTestUsersCached, getAllTestUsers);

export default router;
