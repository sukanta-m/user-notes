import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Layout, Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PlusCircleFilled,
  LogoutOutlined
} from '@ant-design/icons';
import styled from "styled-components";

import { toggleNoteModalAction } from "../modules/actions/notes";
import { logOutAction } from "../modules/actions/user";
import { get } from "lodash";

const { Header: HeaderLayout } = Layout;

const Header = ({
  collapsed,
  toggleSidebar,
  authenticated,
  toggleNoteModal,
  logOut
}) => {
  const onAddNote = () => toggleNoteModal(true);

  return (
    <StyledHeaderLayout className="site-layout-background" collapsed={collapsed} authenticated={authenticated} >
      {authenticated && React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: toggleSidebar,
      })}
      {!authenticated && 
        <div style={{width: "100%", textAlign: "right"}}>
          <StyledLink to="/login">
            <Button type="link">Login</Button>
          </StyledLink>
          <StyledLink to="/signup">
            <Button type="primary">Create account</Button>
          </StyledLink>
        </div>
      }
      {authenticated && (
        <StyledRightMenu>
          <Button type="primary" onClick={onAddNote}><PlusCircleFilled/>Add Note</Button>
          <div onClick={logOut} style={{display: "flex"}}><LogoutOutlined style={{fontSize: "25px", marginLeft: "20px"}} /></div>
        </StyledRightMenu>
      )}
    </StyledHeaderLayout>
  )
}

const StyledHeaderLayout = styled(HeaderLayout)`
  padding: 0;
  position: fixed;
  z-index: 1;
  width: ${({collapsed, authenticated}) => collapsed ? "calc(100% - 80px)" : (authenticated ? "calc(100% - 200px)" : "100%")};
  display: flex;
  justify-content: space-between;
`;

const StyledRightMenu = styled.div`
  margin-right: 20px;
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
width: 100%;
text-align: right;
padding-right: 20px;
`;

export default connect(null, {
  toggleNoteModal: toggleNoteModalAction,
  logOut: logOutAction
})(Header);