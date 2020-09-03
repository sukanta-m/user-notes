import { fetchNotes, addNote, updateNote } from "../apis/notes";
import {
  FTECH_NOTES_FAILURE, FTECH_NOTES_SUCCESS, FTECH_NOTES_REQUEST, TOGGLE_NOTE_MODAL,
  ADD_NOTE_REQUEST, ADD_NOTE_SUCCESS, ADD_NOTE_FAILURE, UPDATE_NOTE_REQUEST, UPDATE_NOTE_SUCCESS, UPDATE_NOTE_FAILURE
 } from "../constants";
 
export const fetchNotesAction = (params) => {
  return dispatch => {
    dispatch({ type: FTECH_NOTES_REQUEST })
    return fetchNotes(params)
    .then(response => dispatch({type: FTECH_NOTES_SUCCESS, payload: response.data}))
    .catch(error => dispatch({type: FTECH_NOTES_FAILURE, payload: error}));
  }
};

export const addNoteAction = params => {
  return dispatch => {
    dispatch({ type: ADD_NOTE_REQUEST })
    return addNote(params)
    .then(response => {
      dispatch(toggleNoteModalAction(false));
      return dispatch({type: ADD_NOTE_SUCCESS, payload: response.data})
    })
    .catch(error => dispatch({type: ADD_NOTE_FAILURE, payload: error}));
  }
}

export const updateNoteAction = params => {
  return dispatch => {
    dispatch({ type: UPDATE_NOTE_REQUEST })
    return updateNote(params)
    .then(response => {
      dispatch(toggleNoteModalAction(false));
      return dispatch({type: UPDATE_NOTE_SUCCESS, payload: response.data})
    })
    .catch(error => dispatch({type: UPDATE_NOTE_FAILURE, payload: error}));
  }
}

export const toggleNoteModalAction = value => dispatch => dispatch({ type: TOGGLE_NOTE_MODAL, payload: value });