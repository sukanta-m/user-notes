import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { get } from "lodash";
import { Spin, Empty, message } from "antd";
import { fetchNotesAction, toggleNoteModalAction, addNoteAction, updateNoteAction } from "../modules/actions/notes";

import styled from "styled-components";

import Notes from "../components/Notes";
import NoteForm from "../components/sharedComponents/NoteForm";

const UserNotes = ({
  fetchNotes,
  notes,
  showNoteModal,
  toogleNoteModal,
  addNote,
  updateNote,
  creating,
  fetching
}) => {
  const [editableNoteId, setEditabeNoteId] = useState();
  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCancel = () => toogleNoteModal(false);
  const onEdit = id => {
    toogleNoteModal(true);
    setEditabeNoteId(id);
  };
  const onDelete = id => {

  };

  if (fetching) {
    return <Spin spinning/>
  }

  const note = notes.find(({id}) => parseInt(id, 10) === parseInt(editableNoteId, 10));

  return (
    <div>
      { notes.length === 0 && <Empty description="No notes found"/> }
      {showNoteModal && (
        <NoteForm
          handleCancel={handleCancel}
          addNote={addNote}
          updateNote={updateNote}
          loading={creating}
          note={note?.attributes || {}}
        />
      )}
      <Notes notes={notes} onEdit={onEdit} onDelete={onDelete} />
    </div>
  )
};

PropTypes.defaultProps = {
  fetching: false,
  notes: []
};

UserNotes.propTypes = {
  fetching: PropTypes.bool,
  notes: PropTypes.arrayOf(PropTypes.object),
};

export default connect(state => ({
  notes: get(state, "notes.lists"),
  showNoteModal: get(state, "notes.showNoteModal", false),
  creating: get(state, "notes.fetching"),
  fetching: get(state, "notes.fetching")
}), {
  fetchNotes: fetchNotesAction,
  toogleNoteModal: toggleNoteModalAction,
  addNote: addNoteAction,
  updateNote: updateNoteAction
})(UserNotes);