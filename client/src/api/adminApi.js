import axios from "axios";

const baseUrl = "http://localhost:5001";

export const loginAdmin =  (admin) => axios.post(`${baseUrl}/admintest/login`,admin);

export const logoutAdmin = (token) => axios.post(`${baseUrl}/admintest/logout/${token}`);

export const getAdmin = (id,token) => axios.get(`${baseUrl}/admintest/get/${id}/${token}`).then().catch((error) => {});

