import axios from "axios";

const baseUrl = "http://localhost:5001";

export const getHotelsByCriteria = (criteria) =>
  axios.post(`${baseUrl}/hoteltest/get/criteria`, criteria);

export const getFacilities = () => axios.get(`${baseUrl}/facilitytest/getall`);

export const getHotel = (id) => axios.get(`${baseUrl}/hoteltest/get/${id}`);

export const getFacility = (id) =>
  axios.get(`${baseUrl}/facilitytest/get/${id}`);

export const getRoomsByHotel = (id) => axios.get(`${baseUrl}/roomtest/get/hotel/${id}`);

export const getCommentsByHotel = (id) => axios.get(`${baseUrl}/commenttest/get/hotel/${id}`)