import { fetchNotesList } from "../apis/notes";
import {
  FTECH_NOTES_FAILURE, FTECH_NOTES_SUCCESS, FTECH_NOTES_REQUEST
 } from "../constants";
 
export const fetchNotesAction = (params) => {
  return dispatch => {
    dispatch({ type: FTECH_NOTES_REQUEST })
    return fetchNotesList(params)
    .then(response => dispatch({type: FTECH_NOTES_SUCCESS, payload: response}))
    .catch(error => dispatch({type: FTECH_NOTES_FAILURE, error}));
  }
}