import React from 'react';
import { shallow } from 'enzyme';
import MaalKort from './MaalKort';

test('Test that <MaalKort> renders correctly', () => {
    const wrapper = shallow(<MaalKort maal={{ id: '', beskrivelse: '', kategori: 'FÅ_JOBB_I_BEDRIFTEN' }} />);
    expect(wrapper).toHaveLength(1);
});
