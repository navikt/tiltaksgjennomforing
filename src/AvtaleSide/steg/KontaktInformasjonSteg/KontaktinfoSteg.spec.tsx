import { AvtaleContext, Context } from '@/AvtaleProvider';
import arbeidstreningAvtaleMock from '@/mocking/arbeidstrening-avtale-mock';
import { shallow } from 'enzyme';
import React from 'react';
import KontaktinfoSteg from './KontaktinfoSteg';

test('Test that <KontaktinfoSteg> renders correctly', () => {
    const wrapper = shallow(
        <AvtaleContext.Provider value={{ avtale: arbeidstreningAvtaleMock } as Context}>
            <KontaktinfoSteg />
        </AvtaleContext.Provider>
    );
    
    expect(wrapper).toHaveLength(1);
});
