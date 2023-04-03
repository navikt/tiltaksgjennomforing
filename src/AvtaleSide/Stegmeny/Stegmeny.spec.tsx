import { AvtaleContext, Context } from '@/AvtaleProvider';
import arbeidstreningAvtaleMock from '@/mocking/arbeidstrening-avtale-mock';
import { shallow } from 'enzyme';
import React from 'react';
import { StegInfo } from '../AvtaleSide';
import Stegmeny from './Stegmeny';



test('Test that <Stegmeny> renders correctly', () => {

    const aktivtSteg : StegInfo = {
        id: 'arbeidsoppgaver',
        label : "",
        komponent : <></>
    }

    const wrapper = shallow(
        <AvtaleContext.Provider value={{ avtale: arbeidstreningAvtaleMock } as Context}>
            <Stegmeny aktivtSteg={aktivtSteg} steg={[]} />
        </AvtaleContext.Provider>
    );
    expect(wrapper).toHaveLength(1);
});
