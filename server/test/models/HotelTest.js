import mongoose from "mongoose";

const HotelTestSchema = new mongoose.Schema({
  hotelName: {
    type: String,
    required: true,
  },
  managerId: {
    type: mongoose.Schema.ObjectId,
    ref: "HotelManager",
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
      ref: "FacilityTest",
    },
  ],
});

HotelTestSchema.pre("save", function (next) {
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

const HotelTest = mongoose.model("HotelTest", HotelTestSchema);
export default HotelTest;
