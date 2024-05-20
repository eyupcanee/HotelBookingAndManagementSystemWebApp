import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

export const getHotelsByCriteria = (criteria) =>
  axios.post(`${baseUrl}/hoteltest/get/criteria`, criteria);

export const getFacilities = () => axios.get(`${baseUrl}/facilitytest/getall`);

export const getHotel = (id) => axios.get(`${baseUrl}/hoteltest/get/${id}`);

export const getAllHotels = () => axios.get(`${baseUrl}/hoteltest/get`);

export const getFacility = (id) =>
  axios.get(`${baseUrl}/facilitytest/get/${id}`);

export const getRoomsByHotel = (id) =>
  axios.get(`${baseUrl}/roomtest/get/hotel/${id}`);

export const getCommentsByHotel = (id) =>
  axios.get(`${baseUrl}/commenttest/get/hotel/${id}`);

export const getRoom = (id) => axios.get(`${baseUrl}/roomtest/get/${id}`);

export const getAllHotelsByManager = (id) =>
  axios.get(`${baseUrl}/hoteltest/get/manager/${id}`);

export const addHotel = (hotel, token) =>
  axios.post(`${baseUrl}/hoteltest/addhotel/${token}`, hotel);
