import { fetchUser, loginApi, registerApi } from "../apis/user";
import {
  FTECH_USER_REQUEST, FTECH_USER_SUCCESS, FTECH_USER_FAILURE,
  USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE,
  USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE
 } from "../constants";
 
export const fetchUserAction = () => {
  return dispatch => {
    dispatch({ type: FTECH_USER_REQUEST })
    return fetchUser()
      .then(response => dispatch({type: FTECH_USER_SUCCESS, payload: response}))
      .catch(error => dispatch({type: FTECH_USER_FAILURE, payload: error}));
  }
};

export const login = data => {
  return dispatch => {
    dispatch({ type: USER_LOGIN_REQUEST })
    return loginApi(data)
      .then(response => dispatch({type: USER_LOGIN_SUCCESS, payload: response}))
      .catch(error => dispatch({type: USER_LOGIN_FAILURE, payload: error}));
  }
}

export const registerAction = data => {
  return dispatch => {
    dispatch({ type: USER_REGISTER_REQUEST })
    return registerApi(data)
      .then(response => {
        const { auth_token } = response.data;
        window.sessionStorage.setItem("jwt", auth_token);
        dispatch({type: USER_REGISTER_SUCCESS, payload: response})
      })
      .catch(error => dispatch({type: USER_REGISTER_FAILURE, payload: error}));
  }
}