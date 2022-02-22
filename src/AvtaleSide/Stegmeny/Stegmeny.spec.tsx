import { AvtaleContext, Context } from '@/AvtaleProvider';
import arbeidstreningAvtaleMock from '@/mocking/arbeidstrening-avtale-mock';
import { shallow } from 'enzyme';
import React from 'react';
import Stegmeny from './Stegmeny';

test('Test that <Stegmeny> renders correctly', () => {
    const wrapper = shallow(
        <AvtaleContext.Provider value={{ avtale: arbeidstreningAvtaleMock } as Context}>
            <Stegmeny steg={[]} aktivtSteg={{ id: 'maal', label: 'test', komponent: <>test</> }} />
        </AvtaleContext.Provider>
    );
    expect(wrapper).toHaveLength(1);
});
