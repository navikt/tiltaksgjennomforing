import { AvtaleContext, Context } from '@/AvtaleProvider';
import arbeidstreningAvtaleMock from '@/mocking/arbeidstrening-avtale-mock';
import { shallow } from 'enzyme';
import React from 'react';
import VarighetSteg from './VarighetSteg';

test('Test that <VarighetSteg> renders correctly', () => {
    const wrapper = shallow(
        <AvtaleContext.Provider value={{ avtale: arbeidstreningAvtaleMock } as Context}>
            <VarighetSteg />
        </AvtaleContext.Provider>
    );
    expect(wrapper).toHaveLength(1);
});
