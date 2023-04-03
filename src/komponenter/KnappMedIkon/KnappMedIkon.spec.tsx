import React from 'react';
import { shallow } from 'enzyme';
import KnappMedIkon from './KnappMedIkon';

test('Test that <KnappMedIkon> renders correctly', () => {
    const wrapper = shallow(<KnappMedIkon ikonType='blyant' label="" />);
    expect(wrapper).toHaveLength(1);
});
