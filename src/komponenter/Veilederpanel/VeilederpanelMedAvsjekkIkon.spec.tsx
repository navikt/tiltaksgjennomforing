
import React from 'react';
import { shallow } from 'enzyme';
import VeilederpanelMedAvsjekkIkon from './VeilederpanelMedAvsjekkIkon';

test('Test that <VeilederpanelMedAvsjekkIkon> renders correctly', () => {
    const wrapper = shallow(<VeilederpanelMedAvsjekkIkon/>);
    expect(wrapper).toHaveLength(1);
});