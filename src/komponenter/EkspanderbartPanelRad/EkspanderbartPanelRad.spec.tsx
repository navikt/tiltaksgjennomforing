import React from 'react';
import { shallow } from 'enzyme';
import IkonTekstRad from './IkonTekstRad';

test('Test that <EkspanderbartPanelRad> renders correctly', () => {
    const wrapper = shallow(<IkonTekstRad svgIkon={null} />);
    expect(wrapper).toHaveLength(1);
});
