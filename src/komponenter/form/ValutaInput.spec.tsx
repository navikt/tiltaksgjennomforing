import React from 'react';
import { shallow } from 'enzyme';
import ValutaInput from './ValutaInput';

test('Test that <ValutaInput> renders correctly', () => {
    const wrapper = shallow(<ValutaInput label="dummy" />);
    expect(wrapper).toHaveLength(1);
});
