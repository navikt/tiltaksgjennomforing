import React from 'react';
import { shallow } from 'enzyme';
import StillingsprosentInput from './StillingsprosentInput';

test('Test that <StillingsprosentInput> renders correctly', () => {
    const wrapper = shallow(<StillingsprosentInput label="dummy" settVerdi={() => void 0} />);
    expect(wrapper).toHaveLength(1);
});
