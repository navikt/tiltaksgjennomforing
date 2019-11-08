import React from 'react';
import { shallow } from 'enzyme';
import SelectInput from './SelectInput';

test('Test that <SelectInput> renders correctly', () => {
    const wrapper = shallow(<SelectInput children={<div />} label="dummy" options={[]} />);
    expect(wrapper).toHaveLength(1);
});
