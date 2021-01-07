import React from 'react';
import { shallow } from 'enzyme';
import MaalSteg from './MaalSteg';
import arbeidstreningAvtaleMock from '@/mocking/arbeidstrening-avtale-mock';
import { AvtaleContext, Context } from '@/AvtaleProvider';

test('Test that <MaalSteg> renders correctly', () => {
    const wrapper = shallow(
        <AvtaleContext.Provider value={{ avtale: arbeidstreningAvtaleMock } as Context}>
            <MaalSteg />
        </AvtaleContext.Provider>
    );
    expect(wrapper).toHaveLength(1);
});
