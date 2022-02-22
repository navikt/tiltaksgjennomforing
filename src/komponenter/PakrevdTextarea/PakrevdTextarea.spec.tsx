import React from 'react';
import { shallow } from 'enzyme';
import PakrevdTextarea from './PakrevdTextarea';

test('Test that <PakrevdTextarea> renders correctly', () => {
    const wrapper = shallow(<PakrevdTextarea label="dummy" maxLengde={32} settVerdi={() => void 0} />);
    expect(wrapper).toHaveLength(1);
});
