import React from 'react';
import { shallow } from 'enzyme';
import VeilederpanelMedUtklippstavleIkon from './VeilederpanelMedUtklippstavleIkon';

test('Test that <VeilederpanelMedUtklippstavleIkon> renders correctly', () => {
    const wrapper = shallow(<VeilederpanelMedUtklippstavleIkon />);
    expect(wrapper).toHaveLength(1);
});
