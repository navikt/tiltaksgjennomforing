import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { Routes } from 'react-router-dom';

test('Test that <App> renders correctly', () => {

    const wrapper = shallow(<App />);
    expect(wrapper).toHaveLength(1);
    const routesRenderer = wrapper.find(Routes);
    expect(routesRenderer).toHaveLength(1);
});
