import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Layout, Button, Input } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PlusCircleFilled,
  LogoutOutlined
} from '@ant-design/icons';
import styled from "styled-components";

import { toggleNoteModalAction, updateSearchAction } from "../modules/actions/notes";
import { logOutAction } from "../modules/actions/user";

const { Header: HeaderLayout } = Layout;
const { Search } = Input;

const Header = ({
  collapsed,
  toggleSidebar,
  authenticated,
  toggleNoteModal,
  logOut,
  searchNote,
  filter
}) => {
  const onAddNote = () => toggleNoteModal(true);
  const isMobile = window.isMobile;

  return (
    <StyledHeaderLayout className="site-layout-background" collapsed={collapsed} authenticated={authenticated} >
      {authenticated && React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: toggleSidebar
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
      {authenticated && <StyledSearch
        placeholder="Search notes"
        onSearch={value => searchNote({...filter, search: value})}
        isMobile={isMobile}
      />}
      {authenticated && (
        <StyledRightMenu isMobile={isMobile}>
          <StyledAddButton type="primary" onClick={onAddNote} isMobile={isMobile}>{window.isMobile ? <PlusCircleFilled/> : <><PlusCircleFilled/>Add Note</>}</StyledAddButton>
          <div onClick={logOut} style={{display: "flex"}}><LogoutOutlined style={{fontSize: window.isMobile ? "18px" :"25px", marginLeft: window.isMobile ? "10px" : "20px"}} /></div>
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
  margin-right: ${({isMobile}) => isMobile ? "10px" : "20px"};
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  width: 100%;
  text-align: right;
  padding-right: 20px;
`;

const StyledSearch = styled(Search)`
  width: 400px;
  height: ${({isMobile}) => isMobile ? "32px" : "40px"};
  margin: ${({isMobile}) => isMobile ? "15px 0" : "10px 0"};
`;

const StyledAddButton = styled(Button)`
  height: ${({isMobile}) => isMobile ? "32px" : "29px"};
  padding: ${({isMobile}) => isMobile ? "4px 7px" : "4px 15px"};
  margin-left: 10px;
`;

export default connect(state => ({
  filter: state.notes.filter
}), {
  toggleNoteModal: toggleNoteModalAction,
  logOut: logOutAction,
  searchNote: updateSearchAction
})(Header);