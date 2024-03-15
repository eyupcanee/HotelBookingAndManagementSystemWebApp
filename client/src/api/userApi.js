import axios from "axios";

const baseUrl = "http://localhost:5001";
export const loginUser = (user) => axios.post(`${baseUrl}/usertest/login`,user);

export const logoutUser = (token) => axios.post(`${baseUrl}/usertest/logout/${token}`);

export const getUserAsUser = (id,token) => axios.get(`${baseUrl}/usertest/get/${id}/${token}`);

export const getUserAsAdmin = (id,token) => axios.get(`${baseUrl}/usertest/get/${id}/${token}`);