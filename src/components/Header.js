import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Layout, Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PlusCircleFilled
} from '@ant-design/icons';
import styled from "styled-components";

import { toggleNoteModalAction } from "../modules/actions/notes";

const { Header: HeaderLayout } = Layout;

const Header = ({
  collapsed,
  toggleSidebar,
  authenticated,
  toggleNoteModal
}) => {
  const onAddNote = () => toggleNoteModal(true);

  return (
    <StyledHeaderLayout className="site-layout-background" >
      {authenticated && React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: toggleSidebar,
      })}
      {!authenticated && <Link to="/signup">
        <Button>Create account</Button>
      </Link>}
      {authenticated && (
        <StyledRightMenu>
          <Button type="primary" onClick={onAddNote}><PlusCircleFilled/>Add Note</Button>
        </StyledRightMenu>
      )}
    </StyledHeaderLayout>
  )
}

const StyledHeaderLayout = styled(HeaderLayout)`
  padding: 0;
  position: fixed;
  z-index: 1;
  width: calc(100% - 200px);
  display: flex;
  justify-content: space-between;
`;

const StyledRightMenu = styled.div`
  margin-right: 20px;
`;

export default connect(null, {
  toggleNoteModal: toggleNoteModalAction
})(Header);