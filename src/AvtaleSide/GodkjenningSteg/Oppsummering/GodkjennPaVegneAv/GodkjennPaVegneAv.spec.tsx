import React from 'react';
import { shallow } from 'enzyme';
import GodkjennPaVegneAv from './GodkjennPaVegneAv';

test('Test that <GodkjennPaVegneAv> renders correctly', () => {
    const grunner = {
        ikkeBankId: false,
        reservert: false,
        digitalKompetanse: false,
    };
    const moderState = {

    }
    // @ts-ignore
    const wrapper = shallow(<GodkjennPaVegneAv
        godkjentPaVegneGrunn={grunner}
        moderState={moderState}
    />);
    expect(wrapper).toHaveLength(1);
});
