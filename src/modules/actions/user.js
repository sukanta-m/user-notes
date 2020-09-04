import { fetchUser, loginApi, registerApi, logout } from "../apis/user";
import {
  FTECH_USER_REQUEST, FTECH_USER_SUCCESS, FTECH_USER_FAILURE,
  USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE,
  USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE,
  USER_LOGOUT_SUCCESS, USER_LOGOUT_FAILURE
 } from "../constants";
 import { notification } from "antd";
 
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
      .then(response => {
        const { auth_token } = response.data;
        window.sessionStorage.setItem("jwt", auth_token);
        return dispatch({type: USER_LOGIN_SUCCESS, payload: response});
      }).catch(({response}) => {
        const msg = response.data.errors;
        notification.error({
          message: msg,
          description: ''
        });
        return dispatch({type: USER_LOGIN_FAILURE, payload: msg});
      });
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
      .catch(({response}) => {
        const msg = response.data.errors;
        notification.error({
          message: msg,
          description: ''
        });
        return dispatch({type: USER_REGISTER_FAILURE, payload: msg});
      });
  }
}

export const logOutAction = () => {
  return dispatch => {
    return logout()
      .then(response => {
        window.sessionStorage.removeItem("jwt");
        notification.success({
          message: 'Logout successfully',
          description: ''
        });
        return dispatch({type: USER_LOGOUT_SUCCESS, payload: response})
      })
      .catch(error => dispatch({type: USER_LOGOUT_FAILURE, payload: error}));
  }
}