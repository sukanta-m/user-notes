import React from "react";
import { Spin } from "antd";

import styled from "styled-components";

const Spinner = ({ size = "large", height }) => {
  return (
    <SpinnerWrapper height={height}>
      <Spin size={size} />
    </SpinnerWrapper>
  )
};

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({height}) => height};
  width: 100%;
`;

export default Spinner;