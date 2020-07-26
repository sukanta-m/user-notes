import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Spin, Table, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

import { StyledActionsWrapper } from "../style";

import styled from "styled-components";

const HackerNews = ({}) => {
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

export default HackerNews;