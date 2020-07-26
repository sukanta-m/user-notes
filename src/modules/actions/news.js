import { fetchNewsList } from "../apis/news";
import {
  FTECH_NEWS_FAILURE, FTECH_NEWS_SUCCESS, FTECH_NEWS_REQUEST
 } from "../constants";
 
export const fetchNewsAction = (params) => {
  return dispatch => {
    dispatch({ type: FTECH_NEWS_REQUEST })
    return fetchNewsList(params)
    .then(response => dispatch({type: FTECH_NEWS_SUCCESS, payload: response}))
    .catch(error => dispatch({type: FTECH_NEWS_FAILURE, error}));
  }
}