import axios from "axios";

const baseUrl = "http://localhost:5001";
export const loginUser = (user) => axios.post(`${baseUrl}/usertest/login`,user);

export const logoutUser = (token) => axios.post(`${baseUrl}/usertest/logout/${token}`);