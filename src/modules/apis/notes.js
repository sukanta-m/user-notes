import axios from "./axios";

export const fetchNotes = (tag = "") => {
  return axios.get(`/notes?tag=${tag}`);
};

export const addNote = params => axios.post("/notes", params);
export const updateNote = params => axios.put(`/notes/${params.id}`, params);
export const deleteNote = id => axios.delete(`/notes/${id}`);