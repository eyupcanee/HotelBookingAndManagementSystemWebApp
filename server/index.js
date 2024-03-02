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

dotenv.config({ path: "./.env.development.local" });

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

// Mongoose Configration
const PORT = process.env.PORT || 8000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port : ${PORT}`));
  })
  .catch((error) => {
    console.log(`Error : ${error}. Server has not connected!`);
  });
