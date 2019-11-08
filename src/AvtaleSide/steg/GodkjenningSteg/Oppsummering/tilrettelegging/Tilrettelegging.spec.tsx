import React from 'react';
import { shallow } from 'enzyme';
import Tilrettelegging from './Tilrettelegging';

test('Test that <Tilrettelegging> renders correctly', () => {
    const wrapper = shallow(<Tilrettelegging />);
    expect(wrapper).toHaveLength(1);
});
