import React from 'react';
import { shallow } from 'enzyme';
import TilbakeTilOversiktLenke from './TilbakeTilOversiktLenke';

test('Test that <TilbakeTilOversiktLenke> renders correctly', () => {
    const wrapper = shallow(<TilbakeTilOversiktLenke />);
    expect(wrapper).toHaveLength(1);
});
