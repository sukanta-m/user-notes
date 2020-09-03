import React from "react";
import { Layout } from "antd";
import ErrorHandler from "./components/sharedComponents/ErrorHandler";

import Router from "./routes";

import styled from "styled-components";
import 'antd/dist/antd.css'

function App() {
  return (
    <StyledLayout>
      <Wrapper>
        <ErrorHandler>
          <Router/>
        </ErrorHandler>
      </Wrapper>
    </StyledLayout>
  );
}

const StyledLayout = styled(Layout)`
  background: white;
  .fixed-header {
    top: 0px !important;
  }
  margin-top: 0px;
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin: auto;

  h1 {
    justify-content: center;
    display: flex;
    b {
      margin-left: 5px;
    }
  }
`;

export default App;
