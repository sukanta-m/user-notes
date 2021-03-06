import axios from "./axios";

export const fetchNotes = (tags = [], search, page = 1) => axios().get(`/notes?tags=${tags.join(",")}&search=${search}&page=${page}`);
export const addNote = params => axios().post("/notes", params);
export const updateNote = params => axios().put(`/notes/${params.id}`, params);
export const deleteNote = id => axios().delete(`/notes/${id}`);
export const fetchTags = () => axios().get('/notes/tags');