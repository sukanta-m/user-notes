import React from "react";
import { Link } from "react-router-dom";
import { Layout, Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
const { Header: HeaderLayout } = Layout;

const Header = ({
  collapsed,
  toggleSidebar,
  authenticated
}) => {
  return (
    <HeaderLayout className="site-layout-background" style={{ padding: 0, position: 'fixed', zIndex: 1, width: '100%' }}>
      {authenticated && React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: toggleSidebar,
      })}
      <Link to="/signup">
        <Button>Create account</Button>
      </Link>
    </HeaderLayout>
  )
}

export default Header;