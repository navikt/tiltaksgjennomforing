import React from 'react';
import { shallow } from 'enzyme';
import TilretteleggingIkon from './TilretteleggingIkon';

test('Test that <TilretteleggingIkon> renders correctly', () => {
    const wrapper = shallow(<TilretteleggingIkon />);
    expect(wrapper).toHaveLength(1);
});
