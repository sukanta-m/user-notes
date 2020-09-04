import React from "react";
import {connect} from "react-redux";
import { Layout, Menu, Avatar, Tooltip } from "antd";
import { get } from "lodash";
import {
  UserOutlined,
  FilterOutlined
} from '@ant-design/icons';
import styled from "styled-components";

import { updateFilterAction } from "../modules/actions/notes";

const { Sider } = Layout;

const Sidebar = ({ collapsed, tags, filter, updateFilter, user: { firstName, lastName } }) => {
  const { by, tags: selectedtags } = filter;

  const onClickFilter = e => updateFilter({...filter, by: e.key});
  const onClickTag = e => {
    const { key } = e;
    const isSelected = !!selectedtags.find(tag => tag === key);
    let filterTags = [...selectedtags];
    if (!isSelected) {
      filterTags.push(key);
    } else {
      filterTags = filterTags.filter(tag => tag !== key);
    }
    updateFilter({...filter, tags: filterTags});
  }

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} breakpoint="lg">
      <StyledLogo collapsed={collapsed}>
        <div className="logo" >
          <Tooltip title="Company">
            <img src={require("../assets/images/company-logo.png")} alt="company"/>
          </Tooltip>
          {!collapsed && <span>Company</span>}
        </div>
      </StyledLogo>
      <div style={{marginTop: "60px"}}>
        <Menu theme="dark" mode="inline" selectedKeys={[by]} onClick={onClickFilter}>
          <Menu.Item key="authorByMe" icon={<UserOutlined />}>
            Author by me
          </Menu.Item>
        </Menu>
        <Menu onClick={onClickTag} mode="inline" theme="dark" selectedKeys={selectedtags} multiple defaultOpenKeys={['tags']}>
          <Menu.SubMenu key="tags" icon={<FilterOutlined />} title="Filter by tags" >
            {tags.map(tag => <Menu.Item key={tag}>
              #{tag}
            </Menu.Item>)}
          </Menu.SubMenu>
        </Menu>
      </div>
      <StyledUser>
        <Tooltip title={`${firstName} ${lastName}`}>
          <Avatar icon={<UserOutlined/>} style={{marginRight: "5px"}}/>{!collapsed && `${firstName} ${lastName}`}
        </Tooltip>
      </StyledUser>
    </Sider>
  );
};

const StyledLogo = styled.div`
  position: fixed;
  top: 0;
  width: ${({collapsed}) => collapsed ? "80px" : "200px"};
  z-index: 11;
  background: #001529;
  img {
    width: 32px;
  }
  span {
    color: white;
    font-size: 18px;
    margin-left: 5px;
  }
`;

const StyledUser = styled.div`
  position: fixed;
  bottom: 0;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  margin-left: 20px;
  color: white;
  font-size: 17px;
  align-items: center;
`;

export default connect(state => ({
  filter: get(state, "notes.filter", {}),
  user: get(state, "user.user", {})
}), { updateFilter: updateFilterAction })(Sidebar);