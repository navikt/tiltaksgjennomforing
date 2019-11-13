import React from 'react';
import { shallow } from 'enzyme';
import ProsentInput from './ProsentInput';

test('Test that <ProsentInput> renders correctly', () => {
    const wrapper = shallow(<ProsentInput label="dummy" />);
    expect(wrapper).toHaveLength(1);
});
