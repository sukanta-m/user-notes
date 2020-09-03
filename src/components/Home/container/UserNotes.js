import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { get } from "lodash";
import { Spin, Table, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

import { StyledActionsWrapper } from "../style";

import styled from "styled-components";

const UserNotes = ({}) => {
  return (
    <div>User Notes</div>
  )
};

PropTypes.defaultProps = {
  fetching: false,
  notes: []
};

UserNotes.propTypes = {
  fetching: PropTypes.bool,
  notes: PropTypes.arrayOf(PropTypes.object),
};

export default connect(state => ({
  notes: get(state, "notes.lists")
}), {

})(UserNotes);