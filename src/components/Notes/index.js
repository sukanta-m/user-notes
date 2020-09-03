import React from "react";
import { connect } from "react-redux";
import { get } from "lodash";
import styled from "styled-components";
import CardItem from "./CardItem";

const NoteLists = ({
  notes,
  users,
  onEdit,
  onDelete
}) => {
  return (
    <div>
      <StyledHeader>Notes</StyledHeader>
      {notes.map(note => {
        const userId = get(note, "relationships.user.data.id");
        const user = users[userId]?.attributes || {};
        const noteData = note.attributes;
        return <CardItem note={noteData} user={user} onEdit={onEdit} onDelete={onDelete} />
      })}
    </div>
  )
};

const StyledHeader = styled.div`
font-size: 30px;
margin-bottom: 10px;
`;

export default connect(state => ({
  users: get(state, "entities.user")
}))(NoteLists);