import axios from "axios";

const baseUrl = "http://localhost:5001";

export const loginHotelManager = (hotelManager) =>
  axios.post(`${baseUrl}/hmanagertest/login`, hotelManager);

export const logoutHotelManager = (token) =>
  axios.post(`${baseUrl}/hmanagertest/logout/${token}`);

export const getHotelManager = (id, token) =>
  axios.get(`${baseUrl}/hmanagertest/get/${id}/${token}`);

export const getAllHotelManagers = (token) =>
  axios.get(`${baseUrl}/hmanagertest/get/${token}`);

export const addHotelManager = (hotelManager, token) =>
  axios.post(`${baseUrl}/hmanagertest/addhmanager/${token}`, hotelManager);

export const deleteHotelManager = (id, token) =>
  axios.delete(`${baseUrl}/hmanagertest/delete/${id}/${token}`);
