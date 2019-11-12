import React from 'react';
import { shallow } from 'enzyme';
import InfoBoks from './InfoBoks';

test('Test that <InfoBoks> renders correctly', () => {
    const wrapper = shallow(<InfoBoks />);
    expect(wrapper).toHaveLength(1);
});
