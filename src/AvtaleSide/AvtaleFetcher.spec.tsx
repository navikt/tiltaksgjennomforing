import arbeidstreningAvtaleMock from '@/mocking/arbeidstrening-avtale-mock';
import { AvtaleContext, Context } from '@/NyAvtaleProvider';
import { shallow } from 'enzyme';
import React from 'react';
import AvtaleFetcher from './AvtaleFetcher';

test('Test that <AvtaleFetcher> renders correctly', () => {
    const wrapper = shallow(
        <AvtaleContext.Provider value={{ avtale: arbeidstreningAvtaleMock } as Context}>
            <AvtaleFetcher />
        </AvtaleContext.Provider>
    );
    expect(wrapper).toHaveLength(1);
});
