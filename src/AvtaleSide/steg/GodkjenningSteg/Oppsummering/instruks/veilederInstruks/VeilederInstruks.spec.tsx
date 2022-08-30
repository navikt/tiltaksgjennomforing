import React from 'react';
import { shallow } from 'enzyme';
import VeilederInstruks from './VeilederInstruks';

test('Test that <VeilederInstruks> renders correctly', () => {
    const wrapper = shallow(<VeilederInstruks tiltakstype={'ARBEIDSTRENING'} />);
    expect(wrapper).toHaveLength(1);
});
