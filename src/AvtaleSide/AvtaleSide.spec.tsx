import arbeidstreningAvtaleMock from '@/mocking/arbeidstrening-avtale-mock';
import { AvtaleContext, Context } from '@/NyAvtaleProvider';
import { shallow } from 'enzyme';
import React from 'react';
import AvtaleSide from './AvtaleSide';

test('Test at <AvtaleSide> rendres', () => {
    const wrapper = shallow(
        <AvtaleContext.Provider value={{ avtale: arbeidstreningAvtaleMock } as Context}>
            <AvtaleSide />
        </AvtaleContext.Provider>
    );
    expect(wrapper).toHaveLength(1);
});
