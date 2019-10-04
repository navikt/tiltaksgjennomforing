
import React from 'react';
import { shallow } from 'enzyme';
import DeltakerinfoDel from './DeltakerinfoDel';

test('Test that <DeltakerinfoDel> renders correctly', () => {
    const wrapper = shallow(<DeltakerinfoDel/>);
    expect(wrapper).toHaveLength(1);
});