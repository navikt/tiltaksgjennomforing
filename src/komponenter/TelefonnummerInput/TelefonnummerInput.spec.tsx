import React from 'react';
import { shallow } from 'enzyme';
import TelefonnummerInput from './TelefonnummerInput';

test('Test that <TelefonnummerInput> renders correctly', () => {
    const settVerdi = jest.fn();
    const wrapper = shallow(
        <TelefonnummerInput label="dummy" settVerdi={settVerdi} verdi="dummy" />
    );
    expect(wrapper).toHaveLength(1);
});
