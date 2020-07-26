import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { get } from "lodash";
import { Spin, Table, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

import { StyledActionsWrapper } from "./style";

import { fetchNewsAction } from "../../modules/actions/news";
import styled from "styled-components";

export const HackerNews = ({}) => {
  return (
    <div>Hacker news</div>
  )
};

PropTypes.defaultProps = {
  fetching: false,
  news: []
};

HackerNews.propTypes = {
  fetching: PropTypes.bool,
  news: PropTypes.arrayOf(PropTypes.object),
};

export default connect((state) => ({
  fetching: get(state, "news.fetching", false),
  news: get(state, "news.lists", [])
}), {
  fetchNews: fetchNewsAction
})(HackerNews);