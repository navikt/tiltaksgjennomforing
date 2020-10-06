import { AvtaleContext, Context } from '@/AvtaleProvider';
import arbeidstreningAvtaleMock from '@/mocking/arbeidstrening-avtale-mock';
import { shallow } from 'enzyme';
import React from 'react';
import AvtaleFetcher from './AvtaleFetcher';

test('Test that <AvtaleFetcher> renders correctly', () => {
    const wrapper = shallow(
        <AvtaleContext.Provider value={{ avtale: arbeidstreningAvtaleMock } as Context}>
            <AvtaleFetcher avtaleId={'123'} />
        </AvtaleContext.Provider>
    );
    expect(wrapper).toHaveLength(1);
});
