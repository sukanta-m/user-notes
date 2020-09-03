import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import NotesLists from '../../../components/Home/container/NotesList';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
const mockStore = configureMockStore();
const store = mockStore({});

const notess = [
  {
    "name": "SUkanta Mangal",
    "age": 32,
    "angular": "male",
    "createdAt": "2020-07-12T05:00:55.954Z",
    "updatedAt": "2020-07-12T05:05:07.467Z",
    "id": 1
  }
];

describe('NotesList', () => {
  const props = {
    fetchNotess: jest.fn()
  };

  it('should render correctly', () => {
    const component = mount(<MemoryRouter><NotesLists notess={notess} {...props}/></MemoryRouter>);
    expect(component.find("NotesLists")).not.toBeNull();
  });
});