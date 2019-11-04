import React from 'react';
import { shallow } from 'enzyme';
import StillingsprosentInput from './StillingsprosentInput';

test('Test that <StillingsprosentInput> renders correctly', () => {
    const wrapper = shallow(<StillingsprosentInput label="dummy" />);
    expect(wrapper).toHaveLength(1);
});
