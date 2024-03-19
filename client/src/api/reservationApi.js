import axios from "axios";

const baseUrl = "http://localhost:5001";

export const getReservatşonsByUser = (userId, token) =>
  axios.get(`${baseUrl}/reservationtest/get/user/${userId}/${token}`);

export const addReservation = (reservation, token) =>
  axios.post(`${baseUrl}/reservationtest/addreservation/${token}`, reservation);
