import React from 'react';
import { shallow } from 'enzyme';
import VerticalSpacer from './VerticalSpacer';

test('Test that <VerticalSpacer> renders correctly', () => {
    const wrapper = shallow(<VerticalSpacer />);
    expect(wrapper).toHaveLength(1);
});
