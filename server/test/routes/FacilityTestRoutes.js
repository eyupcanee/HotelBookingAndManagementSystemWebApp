import express from "express";
import multer from "multer";

import {
  getAllTestFacilities,
  getTestFacilty,
  addTestFacility,
} from "../controller/FacilityTest.js";

import {
  getAllFacilitiesCached,
  getTestFacilityCached,
} from "../cache/FacilityTestCache.js";

const router = express.Router();

router.post("/addfacility/:token", addTestFacility);
router.get("/get/:id", getTestFacilityCached, getTestFacilty);
router.get("/getall", getAllFacilitiesCached, getAllTestFacilities);

export default router;
