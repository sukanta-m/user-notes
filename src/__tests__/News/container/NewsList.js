import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import NewsLists from '../../../components/Home/container/NewsList';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
const mockStore = configureMockStore();
const store = mockStore({});

const newss = [
  {
    "name": "SUkanta Mangal",
    "age": 32,
    "angular": "male",
    "createdAt": "2020-07-12T05:00:55.954Z",
    "updatedAt": "2020-07-12T05:05:07.467Z",
    "id": 1
  }
];

describe('NewsList', () => {
  const props = {
    fetchNewss: jest.fn()
  };

  it('should render correctly', () => {
    const component = mount(<MemoryRouter><NewsLists newss={newss} {...props}/></MemoryRouter>);
    expect(component.find("NewsLists")).not.toBeNull();
  });
});