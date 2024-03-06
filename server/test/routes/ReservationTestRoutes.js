import express from "express";

import {
  addTestReservation,
  getAllTestReservations,
  getTestReservation,
  getTestReservationsByConfirmation,
  getTestReservationsByConfirmationFromUser,
  getTestReservationsByHotel,
  getTestReservationsByUser,
  deleteTestReservation,
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
router.get("/get/user/:token", getTestReservationsByUser);
router.get("/get/confirmation/:token", getTestReservationsByConfirmation);
router.get(
  "/get/user/confirmation/:token",
  getTestReservationsByConfirmationFromUser
);
router.delete("/del/:id/:token", deleteTestReservation);

export default router;
