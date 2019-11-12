import React from 'react';
import { mount } from 'enzyme';
import KontonummerInput from './KontonummerInput';

test('Test that <KontonummerInput> renders correctly', () => {
    const testState = { value: undefined };
    const newValue = '8238238832';
    const wrapper = mount(
        <KontonummerInput
            label="dummy"
            value={testState.value}
            onChange={e => {
                // @ts-ignore
                testState.value = e.target.value;
            }}
        />
    );
    expect(wrapper).toHaveLength(1);
    wrapper
        .find('input')
        .at(0)
        .simulate('change', { target: { value: newValue } });
    wrapper
        .find('input')
        .at(0)
        .simulate('blur');
    expect(testState.value).toBe(newValue);
});
