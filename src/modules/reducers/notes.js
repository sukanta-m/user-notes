import {
  FTECH_NOTES_REQUEST, FTECH_NOTES_SUCCESS, FTECH_NOTES_FAILURE, TOGGLE_NOTE_MODAL,
  ADD_NOTE_REQUEST, ADD_NOTE_SUCCESS, ADD_NOTE_FAILURE, UPDATE_NOTE_REQUEST, UPDATE_NOTE_SUCCESS, UPDATE_NOTE_FAILURE
} from "../constants";

const initialState = {
  fetching: false,
  lists: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FTECH_NOTES_REQUEST:
      return {
        ...state,
        fetching: true,
        updatingStatus: false
      }

    case FTECH_NOTES_SUCCESS:
      return {
        ...state,
        lists: payload.data,
        fetching: false
      }

    case FTECH_NOTES_FAILURE:
      return {
        ...state,
        fetching: false,
        error: payload.error
      }
    case TOGGLE_NOTE_MODAL:
      return {
        ...state,
        showNoteModal: payload
      }
    case ADD_NOTE_REQUEST:
      return {
        ...state,
        creating: true
      }
    case ADD_NOTE_SUCCESS:
      return {
        ...state,
        creating: false,
        lists: [payload.data, ...state.lists]
      }
    case ADD_NOTE_FAILURE:
      return {
        ...state,
        error: payload.error
      }
    case UPDATE_NOTE_REQUEST:
      return {
        ...state,
        creating: true
      }
    
    case UPDATE_NOTE_SUCCESS:
      const lists = state.lists.map(note => {
        if (note.id === payload.data.id) {
          return payload.data;
        }
        return note;
      })
      return {
        ...state,
        lists
      }
    default:
      return state
  }
}

