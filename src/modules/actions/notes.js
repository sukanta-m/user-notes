import { fetchNotes, addNote, updateNote, deleteNote } from "../apis/notes";
import {
  FTECH_NOTES_FAILURE, FTECH_NOTES_SUCCESS, FTECH_NOTES_REQUEST, TOGGLE_NOTE_MODAL,
  ADD_NOTE_REQUEST, ADD_NOTE_SUCCESS, ADD_NOTE_FAILURE, UPDATE_NOTE_REQUEST, UPDATE_NOTE_SUCCESS, UPDATE_NOTE_FAILURE,
  DELETE_NOTE_REQUEST, DELETE_NOTE_SUCCESS, DELETE_NOTE_FAILURE
 } from "../constants";
 import { notification } from "antd";
 
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
      notification.success({
        message: 'Note created successfully',
        description: ''
      });
      return dispatch({type: ADD_NOTE_SUCCESS, payload: response.data})
    })
    .catch(error => {
      notification.error({
        message: 'Failed to created',
        description: ''
      });
      return dispatch({type: ADD_NOTE_FAILURE, payload: error});
    });
  }
}

export const updateNoteAction = params => {
  return dispatch => {
    dispatch({ type: UPDATE_NOTE_REQUEST })
    return updateNote(params)
    .then(response => {
      dispatch(toggleNoteModalAction(false));
      notification.success({
        message: 'Note updated successfully',
        description: ''
      });
      return dispatch({type: UPDATE_NOTE_SUCCESS, payload: response.data})
    })
    .catch(error => {
      notification.error({
        message: 'Failed to update',
        description: ''
      });
      dispatch({type: UPDATE_NOTE_FAILURE, payload: error});
    });
  }
}

export const deleteNoteAction = id => {
  return dispatch => {
    dispatch({ type: DELETE_NOTE_REQUEST })
    return deleteNote(id)
    .then(response => {
      notification.success({
        message: 'Note deleted successfully',
        description: ''
      });
      return dispatch({type: DELETE_NOTE_SUCCESS, payload: response.data})
    })
    .catch(error => {
      notification.error({
        message: 'Failed to delete',
        description: ''
      });
      return dispatch({type: DELETE_NOTE_FAILURE, payload: error});
    });
  }
}

export const toggleNoteModalAction = value => dispatch => dispatch({ type: TOGGLE_NOTE_MODAL, payload: value });