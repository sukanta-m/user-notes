import { fetchNotes, addNote, updateNote, deleteNote, fetchTags } from "../apis/notes";
import {
  FTECH_NOTES_FAILURE, FTECH_NOTES_SUCCESS, FTECH_NOTES_REQUEST, TOGGLE_NOTE_MODAL,
  ADD_NOTE_REQUEST, ADD_NOTE_SUCCESS, ADD_NOTE_FAILURE, UPDATE_NOTE_REQUEST, UPDATE_NOTE_SUCCESS, UPDATE_NOTE_FAILURE,
  DELETE_NOTE_REQUEST, DELETE_NOTE_SUCCESS, DELETE_NOTE_FAILURE,
  NOTE_TAGS_SUCCESS, UPDATE_NOTES_FILTER
 } from "../constants";
 import { notification } from "antd";
 
export const fetchNotesAction = (tags, search = "", page = 1) => {
  return dispatch => {
    dispatch({ type: FTECH_NOTES_REQUEST })
    return fetchNotes(tags, search, page)
    .then(response => {
      dispatch(fetchTagsAction());
      return dispatch({type: FTECH_NOTES_SUCCESS, payload: response.data});
    })
    .catch(error => dispatch({type: FTECH_NOTES_FAILURE, payload: error}));
  }
};

export const addNoteAction = params => {
  return dispatch => {
    dispatch({ type: ADD_NOTE_REQUEST })
    return addNote(params)
    .then(response => {
      dispatch(fetchTagsAction());
      dispatch(toggleNoteModalAction(false));
      notification.success({
        message: 'Note created successfully',
        description: ''
      });
      return dispatch({type: ADD_NOTE_SUCCESS, payload: response.data})
    })
    .catch(({response}) => {
      const msg = response.data.errors;
      notification.error({
        message: msg,
        description: ''
      });
      return dispatch({type: ADD_NOTE_FAILURE, payload: msg});
    });
  }
}

export const updateNoteAction = params => {
  return dispatch => {
    dispatch({ type: UPDATE_NOTE_REQUEST })
    return updateNote(params)
    .then(response => {
      dispatch(fetchTagsAction());
      dispatch(toggleNoteModalAction(false));
      notification.success({
        message: 'Note updated successfully',
        description: ''
      });
      return dispatch({type: UPDATE_NOTE_SUCCESS, payload: response.data})
    })
    .catch(({response}) => {
      const msg = response.data.errors;
      notification.error({
        message: msg,
        description: ''
      });
      dispatch({type: UPDATE_NOTE_FAILURE, payload: msg});
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
    .catch(({response}) => {
      const msg = response.data.errors;
      notification.error({
        message: msg,
        description: ''
      });
      return dispatch({type: DELETE_NOTE_FAILURE, payload: msg});
    });
  }
}

export const fetchTagsAction = () =>
  dispatch => fetchTags()
  .then(response => dispatch({type: NOTE_TAGS_SUCCESS, payload: response}));

export const toggleNoteModalAction = value => dispatch => dispatch({ type: TOGGLE_NOTE_MODAL, payload: value });

export const updateFilterAction = filter => dispatch => {
  const { tags, search, page } = filter;
  dispatch(fetchNotesAction(tags, search, page));
  return dispatch({ type: UPDATE_NOTES_FILTER, payload: filter });
}