import axios from "axios";

const baseUrl = "http://localhost:5001";

export const addComment = (token, comment) =>
  axios.post(`${baseUrl}/commenttest/add/${token}`, comment);
