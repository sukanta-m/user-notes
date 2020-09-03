import {
  FTECH_NOTES_REQUEST, FTECH_NOTES_SUCCESS, FTECH_NOTES_FAILURE
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

    default:
      return state
  }
}

