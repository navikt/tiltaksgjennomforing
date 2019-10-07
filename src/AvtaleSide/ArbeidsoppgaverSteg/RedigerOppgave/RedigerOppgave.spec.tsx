
import React from 'react';
import { shallow } from 'enzyme';
import RedigerOppgave from './RedigerOppgave';

test('Test that <RedigerOppgave> renders correctly', () => {
    const wrapper = shallow(<RedigerOppgave/>);
    expect(wrapper).toHaveLength(1);
});