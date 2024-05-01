import axios from "axios";

const baseUrl = "http://localhost:5001";

export const addRoom = (room, token) =>
  axios.post(`${baseUrl}/roomtest/addroom/${token}`, room);
