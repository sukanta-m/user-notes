/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, lazy, useEffect, useState, useRef } from "react";
import { Route, Switch, useHistory } from 'react-router-dom'
import { connect } from "react-redux";
import { get } from "lodash";
import './App.css';
import { Layout, BackTop } from "antd";
import Progress from "./components/sharedComponents/Progress";
import { fetchUserAction } from "./modules/actions/user";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Spinner from "./components/sharedComponents/Spinner";
import {
  ArrowUpOutlined
} from '@ant-design/icons';
const { Content } = Layout;

const UserNotes = lazy(() => import("./container/Notes"));
const Login = lazy(() => import("./components/Login"));
const Signup = lazy(() => import("./components/Signup"));

const backTopstyle = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
};

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
  const contentRef = useRef();

  useEffect(() => {
    fetchUser();
  }, []);

  const toggleSidebar = () => setCollapsed(prevCollapsed => !prevCollapsed);

  if (authenticating && !authenticated) {
    return <Spinner size="large" height="100vh"/>;
  }

  const authProps = {
    authenticated,
    authenticating
  };

  return (
    <Suspense fallback={<Progress />}>
      <StyledLayout isMobile={window.isMobile}>
        {authenticated && <Sidebar collapsed={collapsed} tags={tags}/>}
        <Layout className="site-layout">
          <Header collapsed={collapsed} toggleSidebar={toggleSidebar} authenticated={authenticated} />
          <div ref={contentRef} className="main-container">
            <StyledContent
              className="site-layout-background"
              authenticated={authenticated}
              isMobile={window.isMobile}
            >
              <Switch>
                <Route path="/login" render={props => <Login {...props} authenticated={authenticated}/>} />
                <Route path="/signup" render={props => <Signup {...props} authenticated={authenticated} />} />
                <PrivateRoute exact path="/" component={UserNotes} {...authProps} />
              </Switch>
              <BackTop target={() => contentRef?.current}>
                <div style={backTopstyle}><ArrowUpOutlined/></div>
              </BackTop>
            </StyledContent>
          </div>
        </Layout>
      </StyledLayout>
    </Suspense>
  );
};

const StyledLayout = styled(Layout)`
  .site-layout-background {
    background: #fff;
    .trigger {
      font-size: ${({isMobile}) => isMobile ? "16px" : "18px"};
      line-height: 64px;
      padding: ${({isMobile}) => isMobile ? "0 7px" : "0 24px"};
      cursor: pointer;
      transition: color 0.3s;
      &:hover {
        color: #1890ff;
      }
    }
  }
  .main-container {
    height: 100vh;
  overflow: auto;
  }
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
    text-align: center;
  }
`;

const StyledContent = styled(Content)`
  margin: ${({isMobile}) => isMobile ? "88px 5px 24px 5px" : "88px 16px 24px 16px"};
  padding: ${({isMobile}) => isMobile ? "5px" : "24px"};
  background: ${({authenticated}) => !authenticated && "#f0f2f5!important"};
`;

export default connect(state => ({
  authenticating: get(state, "user.authenticating", true),
  authenticated: get(state, "user.authenticated", false),
  tags: get(state, "notes.tags")
}), {
  fetchUser: fetchUserAction
})(Router);