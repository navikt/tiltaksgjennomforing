import React from 'react';
import { shallow } from 'enzyme';
import KnappMedIkon from './KnappMedIkon';

test('Test that <KnappMedIkon> renders correctly', () => {
    const wrapper = shallow(<KnappMedIkon />);
    expect(wrapper).toHaveLength(1);
});
