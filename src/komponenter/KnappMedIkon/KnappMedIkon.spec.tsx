import React from 'react';
import { shallow } from 'enzyme';
import KnappMedIkon from './KnappMedIkon';

test('Test that <KnappMedIkon> renders correctly', () => {
    const wrapper = shallow(<KnappMedIkon label="test" onClick={() => void 0} ikonType="blyant" />);
    expect(wrapper).toHaveLength(1);
});
