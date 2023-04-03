import { AvtaleContext, Context } from '@/AvtaleProvider';
import arbeidstreningAvtaleMock from '@/mocking/arbeidstrening-avtale-mock';
import { shallow } from 'enzyme';
import React from 'react';
import NesteForrige from './NesteForrige';
import { StegInfo } from '../AvtaleSide';

test('Test that <NesteForrige> renders correctly', () => {
    const aktivtSteg: StegInfo = {
        id: 'arbeidsoppgaver',
        label: '',
        komponent: <></>,
    };

    const wrapper = shallow(
        <AvtaleContext.Provider value={{ avtale: arbeidstreningAvtaleMock } as Context}>
            <NesteForrige aktivtSteg={aktivtSteg} avtaleSteg={[]} />
        </AvtaleContext.Provider>
    );
    expect(wrapper).toHaveLength(1);
});
