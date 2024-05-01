import express from "express";

import {
  addTestReservation,
  getAllTestReservations,
  getTestReservation,
  getTestReservationsByConfirmation,
  getTestReservationsByConfirmationFromUser,
  getTestReservationsByHotel,
  getTestReservationsByUser,
  getTestReservationsByManager,
  deleteTestReservation,
  confirmReservation,
  rejectReservation,
  getTestReservationsByManagerAndUnconfirmed,
} from "../controller/ReservationTest.js";

import {
  getAllTestReservationsCached,
  getTestReservationCached,
} from "../cache/ReservationTestCache.js";

const router = express.Router();

router.post("/addreservation/:token", addTestReservation);
router.get("/get/:id/:token", getTestReservationCached, getTestReservation);
router.get("/get/:token", getAllTestReservationsCached, getAllTestReservations);
router.get("/get/hotel/:token", getTestReservationsByHotel);
router.get("/get/user/:userId/:token", getTestReservationsByUser);
router.get("/get/confirmation/:token", getTestReservationsByConfirmation);
router.get(
  "/get/user/confirmation/:token",
  getTestReservationsByConfirmationFromUser
);

router.get("/get/manager/:managerId/:token", getTestReservationsByManager);
router.get(
  "/get/manager/unconfirmed/:managerId/:token",
  getTestReservationsByManagerAndUnconfirmed
);

router.delete("/del/:id/:token", deleteTestReservation);

router.get("/confirm/:id/:token", confirmReservation);
router.get("/reject/:id/:token", rejectReservation);

export default router;
