import arbeidstreningAvtaleMock from '@/mocking/arbeidstrening-avtale-mock';
import { AvtaleContext, Context } from '@/NyAvtaleProvider';
import { shallow } from 'enzyme';
import React from 'react';
import Stegmeny from './Stegmeny';

test('Test that <Stegmeny> renders correctly', () => {
    const wrapper = shallow(
        <AvtaleContext.Provider value={{ avtale: arbeidstreningAvtaleMock } as Context}>
            <Stegmeny />
        </AvtaleContext.Provider>
    );
    expect(wrapper).toHaveLength(1);
});
