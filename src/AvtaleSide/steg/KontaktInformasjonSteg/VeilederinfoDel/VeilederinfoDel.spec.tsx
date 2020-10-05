import arbeidstreningAvtaleMock from '@/mocking/arbeidstrening-avtale-mock';
import { AvtaleContext, Context } from '@/NyAvtaleProvider';
import { shallow } from 'enzyme';
import React from 'react';
import VeilederinfoDel from './VeilederinfoDel';

test('Test that <VeilederinfoDel> renders correctly', () => {
    const wrapper = shallow(
        <AvtaleContext.Provider value={{ avtale: arbeidstreningAvtaleMock } as Context}>
            <VeilederinfoDel />
        </AvtaleContext.Provider>
    );
    expect(wrapper).toHaveLength(1);
});
