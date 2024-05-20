import axios from "axios";

const baseUrl = "http://localhost:5001";

export const addRoom = (room, token) =>
  axios.post(`${baseUrl}/roomtest/addroom/${token}`, room);

  export const addHotel = (hotel, token) =>
  axios.post(`${baseUrl}/hoteltest/addhotel/${token}`, hotel);