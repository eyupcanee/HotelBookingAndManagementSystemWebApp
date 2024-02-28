import mongoose from "mongoose";
import Facility from "./Facility";
import Comment from "./Comment";
import Room from "./Room";

const HotelSchema = new mongoose.Schema({
  hotelName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    min: 10,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  district: {
    type: String,
  },
  addressDetail: String,
  phoneNumber: String,
  averagePrice: {
    type: Number,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  facilities: [
    {
      type: mongoose.Schema.ObjectId,
      ref: Facility,
    },
  ],
  comments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: Comment,
    },
  ],
  rooms: [
    {
      type: mongoose.Schema.ObjectId,
      ref: Room,
    },
  ],
});

HotelSchema.pre("save", function (next) {
  if (this.country) {
    this.country = this.country.toLowerCase();
  }

  if (this.city) {
    this.city = this.city.toLowerCase();
  }

  if (this.district) {
    this.district = this.district.toLowerCase();
  }

  next();
});

const Hotel = mongoose.model("Hotel", HotelSchema);
export default Hotel;
