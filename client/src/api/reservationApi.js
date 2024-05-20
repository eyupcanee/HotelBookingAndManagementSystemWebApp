import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const getReservatşonsByUser = (userId, token) =>
  axios.get(`${baseUrl}/reservationtest/get/user/${userId}/${token}`);

export const addReservation = (reservation, token) =>
  axios.post(`${baseUrl}/reservationtest/addreservation/${token}`, reservation);

export const getAllReservations = (token) =>
  axios.get(`${baseUrl}/reservationtest/get/${token}`);

export const getAllReservationsByManager = (managerId, token) =>
  axios.get(`${baseUrl}/reservationtest/get/manager/${managerId}/${token}`);

export const getAllReservationsByManagerAndUnconfirmed = (managerId, token) =>
  axios.get(
    `${baseUrl}/reservationtest/get/manager/unconfirmed/${managerId}/${token}`
  );

export const confirmReservation = (id, token) =>
  axios.get(`${baseUrl}/reservationtest/confirm/${id}/${token}`);

export const rejectReservation = (id, token) =>
  axios.get(`${baseUrl}/reservationtest/reject/${id}/${token}`);
