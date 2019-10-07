
import React from 'react';
import { shallow } from 'enzyme';
import VeilederpanelMedIkon from './VeilederpanelMedIkon';

test('Test that <VeilederpanelMedIkon> renders correctly', () => {
    const wrapper = shallow(<VeilederpanelMedIkon svg="dummy"/>);
    expect(wrapper).toHaveLength(1);
});
