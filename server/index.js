import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

//TEST ROUTES
import AdminTestRoutes from "./test/routes/AdminTestRoutes.js";
import UserTestRoutes from "./test/routes/UserTestRoutes.js";
import FacilityTestRoutes from "./test/routes/FacilityTestRoutes.js";
import CommentTestRoutes from "./test/routes/CommentTestRoutes.js";
import HotelManagerTestRoutes from "./test/routes/HotelManagerTestRoutes.js";
import HotelTestRoutes from "./test/routes/HotelTestRoutes.js";
import RoomTestRoutes from "./test/routes/RoomTestRoutes.js";
import ReservationTestRoutes from "./test/routes/ReservationTestRoutes.js";

dotenv.config({ path: "./.env" });

// APP Configration
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//TEST ROUTES
app.use("/admintest", AdminTestRoutes);
app.use("/usertest", UserTestRoutes);
app.use("/facilitytest", FacilityTestRoutes);
app.use("/commenttest", CommentTestRoutes);
app.use("/hmanagertest", HotelManagerTestRoutes);
app.use("/hoteltest", HotelTestRoutes);
app.use("/roomtest", RoomTestRoutes);
app.use("/reservationtest", ReservationTestRoutes);
app.use("/uploads", express.static("uploads"));
// Mongoose Configration
const PORT = process.env.PORT || 8000;
mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port : ${PORT}`));
  })
  .catch((error) => {
    console.log(`Error : ${error}. Server has not connected!`);
  });
