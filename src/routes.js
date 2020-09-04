/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, lazy, useEffect, useState } from "react";
import { Route, Switch, useHistory } from 'react-router-dom'
import { connect } from "react-redux";
import { get } from "lodash";
import './App.css';
import { Layout } from "antd";
import Progress from "./components/sharedComponents/Progress";
import { fetchUserAction } from "./modules/actions/user";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Spinner from "./components/sharedComponents/Spinner";

const { Content } = Layout;

const UserNotes = lazy(() => import("./container/Notes"));
const Login = lazy(() => import("./components/Login"));
const Signup = lazy(() => import("./components/Signup"));

const PrivateRoute = ({ component, authenticating, authenticated, ...options }) => {
  const history = useHistory();

  useEffect(() => {
    if (!authenticating && !authenticated) {
      history.push("/login");
    }
  }, [authenticated, authenticating]);

  return <Route {...options} component={component} />;
};

const Router = ({
  fetchUser,
  authenticating,
  authenticated,
  tags
}) => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const toggleSidebar = () => setCollapsed(prevCollapsed => !prevCollapsed);

  if (authenticating && !authenticated) {
    return <Spinner size="large"/>;
  }

  const authProps = {
    authenticated,
    authenticating
  };

  return (
    <Suspense fallback={<Progress />}>
      <StyledLayout>
        {authenticated && <Sidebar collapsed={collapsed} tags={tags}/>}
        <Layout className="site-layout">
          <Header collapsed={collapsed} toggleSidebar={toggleSidebar} authenticated={authenticated} />
          <StyledContent
            className="site-layout-background"
            authenticated={authenticated}
          >
            <Switch>
              <Route path="/login" render={props => <Login {...props} authenticated={authenticated}/>} />
              <Route path="/signup" render={props => <Signup {...props} authenticated={authenticated} />} />
              <PrivateRoute exact path="/" component={UserNotes} {...authProps} />
            </Switch>
          </StyledContent>
        </Layout>
      </StyledLayout>
    </Suspense>
  );
};

const StyledLayout = styled(Layout)`
  .site-layout-background {
    background: #fff;
    .trigger {
      font-size: 18px;
      line-height: 64px;
      padding: 0 24px;
      cursor: pointer;
      transition: color 0.3s;
      &:hover {
        color: #1890ff;
      }
    }
  }
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
`;

const StyledContent = styled(Content)`
  margin: 88px 16px 24px 16px;
  padding: 24px;
  min-height: 100vh;
  background: ${({authenticated}) => !authenticated && "#f0f2f5!important"};
`;

export default connect(state => ({
  authenticating: get(state, "user.authenticating", true),
  authenticated: get(state, "user.authenticated", false),
  tags: get(state, "notes.tags")
}), {
  fetchUser: fetchUserAction
})(Router);