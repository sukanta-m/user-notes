import React, { lazy, Suspense } from "react";
import { Layout } from "antd";
import { Route, Switch } from 'react-router-dom'
import './App.css';
import ErrorHandler from "./components/sharedComponents/ErrorHandler";
import Progress from "./components/sharedComponents/Progress";

import styled from "styled-components";
import 'antd/dist/antd.css'

const HackerNews = lazy(() => import("./components/Home"));

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

const Router = () => {
  return (
    <Suspense fallback={<Progress />}>
      <Switch>
        <Route exact path="/" component={HackerNews} />
      </Switch>
    </Suspense>
  );
};


const StyledLayout = styled(Layout)`
  background: white;
  .fixed-header {
    top: 0px !important;
  }
  margin-top: 0px;
`;

const Wrapper = styled.div`
  position: relative;
  width: 90%;
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
