import React from 'react';
import { shallow } from 'enzyme';
import StegmenyLenke from './StegmenyLenke';

test('Test that <StegmenyLenke> renders correctly', () => {
    const wrapper = shallow(<StegmenyLenke aktiv ferdig id='1' label='' url=''  />);
    expect(wrapper).toHaveLength(1);
});
