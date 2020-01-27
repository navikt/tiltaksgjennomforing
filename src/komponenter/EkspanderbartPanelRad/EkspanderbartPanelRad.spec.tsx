import React from 'react';
import { shallow } from 'enzyme';
import EkspanderbartPanelRad from './EkspanderbartPanelRad';

test('Test that <EkspanderbartPanelRad> renders correctly', () => {
    const wrapper = shallow(<EkspanderbartPanelRad svgIkon={null} />);
    expect(wrapper).toHaveLength(1);
});
