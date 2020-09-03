import axios from "axios";

const getAuthToken = () => {
  const token =  window.sessionStorage.getItem('jwt');
  return { Authorization: `${token}` };
}

export default axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
    ...getAuthToken()
  }
});