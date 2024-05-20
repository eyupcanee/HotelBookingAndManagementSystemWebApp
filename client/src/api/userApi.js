import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const loginUser = (user) =>
  axios.post(`${baseUrl}/usertest/login`, user);

export const logoutUser = (token) =>
  axios.post(`${baseUrl}/usertest/logout/${token}`);

export const getUserAsUser = (id, token) =>
  axios.get(`${baseUrl}/usertest/get/${id}/${token}`);

export const getUserAsAdmin = (id, token) =>
  axios.get(`${baseUrl}/usertest/get/${id}/${token}`);

export const getAllUsers = (token) =>
  axios.get(`${baseUrl}/usertest/get/${token}`);

export const register = (user) =>
  axios.post(`${baseUrl}/usertest/register`, user);

export const deleteUser = (id, token) =>
  axios.delete(`${baseUrl}/usertest/del/${id}/${token}`);
