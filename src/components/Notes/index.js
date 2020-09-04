import React from "react";
import { connect } from "react-redux";
import { get } from "lodash";
import styled from "styled-components";
import CardItem from "./CardItem";
import { Tag } from "antd";

import { updateFilterAction } from "../../modules/actions/notes";

const NoteLists = ({
  notes,
  users,
  onEdit,
  onDelete,
  filter,
  updateFilter
}) => {
  const onTagClose = value => {
    const updatedFilterTags = filter.tags.filter(tag => tag !== value);
    updateFilter({...filter, tags: updatedFilterTags});
  }

  return (
    <div>
      {!!filter.tags.length && <StyledFilterWrapper>
        <span style={{marginRight: "10px"}}>Filter by:</span>
        {filter.tags.map(tag => <Tag key={tag} closable onClose={() => onTagClose(tag)} color="geekblue">{tag}</Tag>)}
      </StyledFilterWrapper>}
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

const StyledFilterWrapper = styled.div`
  margin-bottom: 10px;
`;

export default connect(state => ({
  users: get(state, "entities.user"),
  filter: get(state, "notes.filter", {})
}), {
  updateFilter: updateFilterAction
})(NoteLists);