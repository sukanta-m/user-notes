import {
  FTECH_USER_REQUEST, FTECH_USER_SUCCESS, FTECH_USER_FAILURE, USER_LOGOUT_SUCCESS, USER_LOGOUT_FAILURE,
  USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS
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
        user: payload.data.data,
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

    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        authenticated: false
      }
    case USER_REGISTER_REQUEST:
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        authenticating: true
      }
    case USER_REGISTER_SUCCESS:
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        user: payload.data.data,
        authenticated: true,
        authenticating: false
      }
    case USER_LOGOUT_FAILURE: {
      return {
        ...state,
        authenticating: false
      }
    }
    default:
      return state
  }
}

