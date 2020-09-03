import React, { useState } from "react";
import { Card, Row, Col, Avatar, Tag, Button, Dropdown, Menu } from "antd";
import {
  UserOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import styled from "styled-components";
import moment from "moment";

const CardItem = ({ note, user, onEdit, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const { firstName, lastName } = user;

  const toggleExpand = () => setExpanded(prevValue => !prevValue);
  const handleMenuClick = e => {
    switch(e.key) {
      case "edit":
        onEdit(note.id);
        break;
      default:
        onDelete(note.id);
    }
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="edit" icon={<EditOutlined />}>
        Edit
      </Menu.Item>
      <Menu.Item key="delete" icon={<DeleteOutlined />}>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <StyledCard>
      <Row>
        <Col span={1}>
          <Avatar size="large" icon={<UserOutlined />} />
        </Col>
        <Col span={23}>
          <StyledMetaData>
            <div style={{display: "flex", flexDirection: "column"}}>
              <span>{`${firstName} ${lastName}`}</span>
              <span className="time">{moment(note.createdAt).fromNow()}</span>
            </div>
            <Dropdown overlay={menu}>
              <MoreOutlined style={{fontSize: "25px", transform: "rotate(90deg)"}}/>
            </Dropdown>
          </StyledMetaData>
          <StyledTitle>
            {note.title}
          </StyledTitle>
          {!!note.tags.length && <div>
            { note.tags.map(tag => <Tag>{tag.name}</Tag>) }
          </div>}
          {expanded && <StyledBody dangerouslySetInnerHTML={{__html: note.body}}/>}
          <StyledShowMoreLink type="link" onClick={toggleExpand}>{expanded ? "Show less" : "Show more"}</StyledShowMoreLink>
        </Col>
      </Row>
    </StyledCard>
  );
};

const StyledMetaData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .time {
    color: #64707d;
  }
`;

const StyledTitle = styled.div`
  font-size: 20px;
  margin: 5px 0;
  font-weight: bold;
`;

const StyledBody = styled.div`
margin: 5px 0;
`;

const StyledCard = styled(Card)`
margin-bottom: 20px!important;
`;

const StyledShowMoreLink = styled(Button)`
  padding: 0;
`;

export default CardItem;