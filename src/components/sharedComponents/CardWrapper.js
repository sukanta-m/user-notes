import React from "react";

import { Card } from "antd";
import styled from "styled-components";

const CardWrapper = (props) => {
  return (
    <StyledCard {...props}/>
  )
}

const StyledCard = styled(Card)`
  box-shadow: 0 0 0 1px rgba(8, 9, 10, 0.1);
  .ant-card-head-title {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  }
  @media only screen and (max-width: 676px) {
    width: auto!important;
  }
`;

export default CardWrapper;