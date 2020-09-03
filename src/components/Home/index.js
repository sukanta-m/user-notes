
import { fetchNotesAction } from "../../modules/actions/notes";

import { connect } from "react-redux";
import { get } from "lodash";

import UserNotes from "./container/UserNotes";

export default connect((state) => ({
  fetching: get(state, "notes.fetching", false),
  notes: get(state, "notes.lists", [])
}), {
  fetchNotes: fetchNotesAction
})(UserNotes);