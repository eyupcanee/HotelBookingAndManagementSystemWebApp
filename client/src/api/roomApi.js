import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const addRoom = (room, token) =>
  axios.post(`${baseUrl}/roomtest/addroom/${token}`, room);

export const addHotel = (hotel, token) =>
  axios.post(`${baseUrl}/hoteltest/addhotel/${token}`, hotel);
