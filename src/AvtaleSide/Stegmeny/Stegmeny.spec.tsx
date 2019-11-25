import React from 'react';
import { shallow } from 'enzyme';
import Stegmeny from './Stegmeny';

test('Test that <Stegmeny> renders correctly', () => {
    const wrapper = shallow(<Stegmeny />);
    expect(wrapper).toHaveLength(1);
});
