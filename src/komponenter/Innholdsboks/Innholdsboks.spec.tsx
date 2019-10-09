import React from 'react';
import { shallow } from 'enzyme';
import Innholdsboks from './Innholdsboks';

test('Test that <Innholdsboks> renders correctly', () => {
    const wrapper = shallow(<Innholdsboks />);
    expect(wrapper).toHaveLength(1);
});
