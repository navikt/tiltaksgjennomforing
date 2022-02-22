import React from 'react';
import { shallow } from 'enzyme';
import StegmenyLenke from './StegmenyLenke';

test('Test that <StegmenyLenke> renders correctly', () => {
    const wrapper = shallow(<StegmenyLenke id="1" label="test" aktiv={true} ferdig={true} url="nav.no" />);
    expect(wrapper).toHaveLength(1);
});
