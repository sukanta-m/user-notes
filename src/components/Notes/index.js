import React from "react";
import { connect } from "react-redux";
import { get } from "lodash";
import styled from "styled-components";
import CardItem from "./CardItem";
import { Tag, Pagination } from "antd";

import { updateFilterAction } from "../../modules/actions/notes";

const NoteLists = ({
  notes,
  users,
  onEdit,
  onDelete,
  filter,
  updateFilter,
  total = 0
}) => {
  const onTagClose = value => {
    const updatedFilterTags = filter.tags.filter(tag => tag !== value);
    updateFilter({...filter, tags: updatedFilterTags});
  }

  const onPageChange = page => {
    updateFilter({...filter, page});
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
      {!!total && <StyledPaginationWrapper>
        <Pagination
          current={filter.page}
          defaultCurrent={1}
          total={total}
          onChange={onPageChange}
          showSizeChanger={false}
          responsive
        />
      </StyledPaginationWrapper>}
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
const StyledPaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default connect(state => ({
  users: get(state, "entities.user"),
  filter: get(state, "notes.filter", {})
}), {
  updateFilter: updateFilterAction
})(NoteLists);