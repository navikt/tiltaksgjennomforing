import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import InnloggingBoundary from './InnloggingBoundary/InnloggingBoundary';

test('Test that <App> renders correctly', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toHaveLength(1);
    const innloggingBoundary = wrapper.find(InnloggingBoundary);
    expect(innloggingBoundary).toHaveLength(1);
});
