import { shallow } from 'enzyme';
import React from 'react';
import ArbeidsgiverInstruks from './ArbeidsgiverInstruks';

test('Test that <ArbeidsgiverInstruks> renders correctly', () => {
    const wrapper = shallow(<ArbeidsgiverInstruks tiltakstype={'ARBEIDSTRENING'} erLaast={false} />);
    expect(wrapper).toHaveLength(1);
});
