import React from 'react';
import { shallow } from 'enzyme';
import PakrevdInput from './PakrevdInput';

test('Test that <PakrevdInput> renders correctly', () => {
    const wrapper = shallow(<PakrevdInput label="dummy" verdi="test" settVerdi={() => void 0} />);
    expect(wrapper).toHaveLength(1);
});
