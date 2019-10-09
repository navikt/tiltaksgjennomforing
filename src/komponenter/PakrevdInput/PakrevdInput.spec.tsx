import React from 'react';
import { shallow } from 'enzyme';
import PakrevdInput from './PakrevdInput';

test('Test that <PakrevdInput> renders correctly', () => {
    const wrapper = shallow(<PakrevdInput label="dummy" />);
    expect(wrapper).toHaveLength(1);
});
