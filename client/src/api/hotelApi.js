import axios from "axios";

const baseUrl = "http://localhost:5001";

export const getHotelsByCriteria = (criteria) =>
  axios.post(`${baseUrl}/hoteltest/get/criteria`, criteria);
