import React from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  OrderedListOutlined,
  FilterOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = ({ collapsed, tags }) => {
  const onClickFilter = e => console.log(e.key);
  const onClickTag = e => console.log(e.key)
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} breakpoint="lg">
      <div className="logo" />
      <div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["all"]} onClick={onClickFilter}>
          <Menu.Item key="all" icon={<OrderedListOutlined />}>
            All
          </Menu.Item>
          <Menu.Item key="authorByMe" icon={<UserOutlined />}>
            Author by me
          </Menu.Item>
        </Menu>
        <Menu onClick={onClickTag} mode="inline" theme="dark">
          <Menu.SubMenu key="tags" icon={<FilterOutlined />} title="Filter by tags">
            {tags.map(tag => <Menu.Item key={tag}>
              #{tag}
            </Menu.Item>)}
          </Menu.SubMenu>
        </Menu>
      </div>
    </Sider>
  );
};

export default Sidebar;