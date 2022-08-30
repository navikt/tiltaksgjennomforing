import React from 'react';
import { shallow } from 'enzyme';
import DeltakerInstruks from './DeltakerInstruks';

test('Test that <DeltakerInstruks> renders correctly', () => {
    const wrapper = shallow(<DeltakerInstruks erLaast={false} tiltakstype={'ARBEIDSTRENING'} />);
    expect(wrapper).toHaveLength(1);
});
