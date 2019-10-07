
import React from 'react';
import { shallow } from 'enzyme';
import VeilederinfoDel from './VeilederinfoDel';

test('Test that <VeilederinfoDel> renders correctly', () => {
    const wrapper = shallow(<VeilederinfoDel/>);
    expect(wrapper).toHaveLength(1);
});