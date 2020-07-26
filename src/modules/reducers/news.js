import {
  FTECH_NEWS_REQUEST, FTECH_NEWS_SUCCESS, FTECH_NEWS_FAILURE
} from "../constants";

const initialState = {
  fetching: false,
  lists: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FTECH_NEWS_REQUEST:
      return {
        ...state,
        fetching: true,
        updatingStatus: false
      }

    case FTECH_NEWS_SUCCESS:
      return {
        ...state,
        lists: payload.data,
        fetching: false
      }

    case FTECH_NEWS_FAILURE:
      return {
        ...state,
        fetching: false,
        error: payload.error
      }

    default:
      return state
  }
}

