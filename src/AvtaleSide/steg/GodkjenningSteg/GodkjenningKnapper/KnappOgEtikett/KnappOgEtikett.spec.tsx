import React from 'react';
import { shallow } from 'enzyme';
import KnappOgEtikett from './KnappOgEtikett';

test('Test that <KnappOgEtikett> renders correctly', () => {
    const wrapper = shallow(<KnappOgEtikett />);
    expect(wrapper).toHaveLength(1);
});
