import axios from "./axios";

export const fetchUser = () => {
  return axios.get(`/user/auto_login`);
};

export const loginApi = params => axios.post('/login', params);
export const registerApi = params => axios.post('/signup', params);