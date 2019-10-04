
import React from 'react';
import { shallow } from 'enzyme';
import OppgaverOppsummering from './OppgaverOppsummering';

test('Test that <OppgaverOppsummering> renders correctly', () => {
    const wrapper = shallow(<OppgaverOppsummering oppgaver={[]}/>);
    expect(wrapper).toHaveLength(1);
});
