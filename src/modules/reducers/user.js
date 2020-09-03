import {
  FTECH_USER_REQUEST, FTECH_USER_SUCCESS, FTECH_USER_FAILURE
} from "../constants";

const initialState = {
  authenticating: true,
  authenticated: false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FTECH_USER_REQUEST:
      return {
        ...state,
        authenticating: true
      }

    case FTECH_USER_SUCCESS:
      return {
        ...state,
        user: payload.data,
        authenticated: true,
        authenticating: false
      }

    case FTECH_USER_FAILURE:
      return {
        ...state,
        authenticating: false,
        authenticated: false,
        error: payload.errors
      }

    default:
      return state
  }
}

