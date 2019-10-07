import React from 'react';
import { shallow } from 'enzyme';
import Innloggingslinje from './Innloggingslinje';

test('Test that <Innloggingslinje> renders correctly', () => {
    const innloggetBruker = {
        identifikator: "0000000"
    };
    const wrapper = shallow(<Innloggingslinje innloggetBruker={innloggetBruker}/>);
    expect(wrapper).toHaveLength(1);
});
