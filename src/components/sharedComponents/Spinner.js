import React from "react";
import { Spin } from "antd";

import styled from "styled-components";

const Spinner = ({ size = "large" }) => {
  return (
    <SpinnerWrapper>
      <Spin size={size} />
    </SpinnerWrapper>
  )
};

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export default Spinner;