import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const addComment = (token, comment) =>
  axios.post(`${baseUrl}/commenttest/add/${token}`, comment);
