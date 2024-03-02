import { jwtDecode } from "jwt-decode";

export const authorizeAdmin = async (token) => {
  try {
    if (jwtDecode(token).role == "admin") return true;
    else return false;
  } catch (error) {
    return false;
  }
};

export const getAdminId = async (token) => {
  try {
    if (jwtDecode(token).role == "admin") return jwtDecode(token).id;
    else return null;
  } catch (error) {
    return null;
  }
};

export const authorizeUser = async (token) => {
  try {
    if (jwtDecode(token).role == "user") return true;
    else return false;
  } catch (error) {
    return false;
  }
};

export const getUserId = async (token) => {
  try {
    if (jwtDecode(token).role == "user") return jwtDecode(token).id;
    else return null;
  } catch (error) {
    return null;
  }
};

export const authorizeHotelManager = async (token) => {
  try {
    if (jwtDecode(token).role == "hmanager") return true;
    else return false;
  } catch (error) {
    return false;
  }
};

export const getHotelManagerId = async (token) => {
  try {
    if (jwtDecode(token).role == "hmanager") return jwtDecode(token).id;
    else return null;
  } catch (error) {
    return null;
  }
};
