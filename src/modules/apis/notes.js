import axios from "./axios";

export const fetchNotes = (tags = []) => axios().get(`/notes?tags=${tags.join(",")}`);
export const addNote = params => axios().post("/notes", params);
export const updateNote = params => axios().put(`/notes/${params.id}`, params);
export const deleteNote = id => axios().delete(`/notes/${id}`);
export const fetchTags = () => axios().get('/notes/tags');