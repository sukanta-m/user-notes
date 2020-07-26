import axios from "./axios";

export const fetchNewsList = ({q = '', page = 0, pageSize = 30}) => {
  return axios.get(`/search?query=${q}&page=${page}&hitsPerPage=${pageSize}`);
};