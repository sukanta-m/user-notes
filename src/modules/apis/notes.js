import axios from "./axios";

export const fetchNotesList = ({q = '', page = 0, pageSize = 30}) => {
  return axios.get(`/search?query=${q}&page=${page}&hitsPerPage=${pageSize}`);
};