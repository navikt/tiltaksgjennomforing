import React from 'react';
import { shallow } from 'enzyme';
import KontaktinfoSteg from './KontaktinfoSteg';

test('Test that <KontaktinfoSteg> renders correctly', () => {
    const wrapper = shallow(<KontaktinfoSteg />);
    expect(wrapper).toHaveLength(1);
});
