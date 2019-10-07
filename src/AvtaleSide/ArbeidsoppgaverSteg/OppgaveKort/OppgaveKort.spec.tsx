
import React from 'react';
import { shallow } from 'enzyme';
import OppgaveKort from './OppgaveKort';

test('Test that <OppgaveKort> renders correctly', () => {
    const wrapper = shallow(<OppgaveKort/>);
    expect(wrapper).toHaveLength(1);
});