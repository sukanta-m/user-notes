/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { get } from "lodash";
import { Empty, Modal } from "antd";
import { fetchNotesAction, toggleNoteModalAction, addNoteAction, updateNoteAction, deleteNoteAction } from "../modules/actions/notes";
import {
  ExclamationCircleOutlined
} from '@ant-design/icons';

import Notes from "../components/Notes";
import NoteForm from "../components/sharedComponents/NoteForm";
import Spinner from "../components/sharedComponents/Spinner";

const UserNotes = ({
  fetchNotes,
  notes,
  showNoteModal,
  toogleNoteModal,
  addNote,
  updateNote,
  deleteNote,
  creating,
  fetching
}) => {
  const [editableNoteId, setEditabeNoteId] = useState();
  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCancel = () => {
    toogleNoteModal(false);
    setEditabeNoteId();
  }

  const onEdit = id => {
    toogleNoteModal(true);
    setEditabeNoteId(id);
  };

  const onDelete = id => {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure ?',
      onOk: () => deleteNote(id),
      onCancel: () => Modal.destroyAll()
    });
  };

  const onUpdateNote = params => {
    updateNote(params).then(() => setEditabeNoteId());
  }
  if (fetching) {
    return <Spinner size="small"/>
  }

  const note = notes.find(({id}) => parseInt(id, 10) === parseInt(editableNoteId, 10));

  return (
    <div>
      { notes.length === 0 && <Empty description="No notes found"/> }
      {showNoteModal && (
        <NoteForm
          handleCancel={handleCancel}
          addNote={addNote}
          updateNote={onUpdateNote}
          loading={creating}
          note={note?.attributes || {}}
        />
      )}
      {notes.length > 0 && <Notes notes={notes} onEdit={onEdit} onDelete={onDelete} />}
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
  creating: get(state, "notes.creating"),
  fetching: get(state, "notes.fetching")
}), {
  fetchNotes: fetchNotesAction,
  toogleNoteModal: toggleNoteModalAction,
  addNote: addNoteAction,
  updateNote: updateNoteAction,
  deleteNote: deleteNoteAction
})(UserNotes);