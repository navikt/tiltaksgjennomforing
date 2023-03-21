import React from 'react';
import { shallow } from 'enzyme';
import StillingsprosentInput from './StillingsprosentInput';

test('Test that <StillingsprosentInput> renders correctly', () => {
    const testFunc = (verdi: number) => console.log('verdi', verdi);
    const wrapper = shallow(<StillingsprosentInput label="dummy" settVerdi={testFunc} />);
    expect(wrapper).toHaveLength(1);
});
