import React from 'react';
import { shallow } from 'enzyme';
import LagreKnapp from './LagreKnapp';

test('Test that <LagreKnapp> renders correctly', () => {
    const wrapper = shallow(<LagreKnapp lagre={() => new Promise((resolve) => resolve)} label="test" />);
    expect(wrapper).toHaveLength(1);
});
