import React from 'react';
import { shallow } from 'enzyme';
import OmMentorSteg from './OmMentorSteg';

test('Test that <OmMentorSteg> renders correctly', () => {
    const wrapper = shallow(<OmMentorSteg />);
    expect(wrapper).toHaveLength(1);
});
