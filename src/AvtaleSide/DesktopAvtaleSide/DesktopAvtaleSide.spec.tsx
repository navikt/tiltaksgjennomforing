import React from 'react';
import { shallow } from 'enzyme';
import DesktopAvtaleSide from './DesktopAvtaleSide';

test('Test that <DesktopAvtaleSide> renders correctly', () => {
    const stub = jest.fn();
    const avtale = {}

    const wrapper = shallow(<DesktopAvtaleSide
        // @ts-ignore
        aktivtSteg={'fasd'}
        avbrytAvtale={stub}
        avtaleSteg={[]}
        // @ts-ignore
        avtale={avtale}
        tilbakeTilOversiktKlikk={stub}
        rolle={'DELTAKER'}
    />);
    expect(wrapper).toHaveLength(1);
});



