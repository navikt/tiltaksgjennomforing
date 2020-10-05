import arbeidstreningAvtaleMock from '@/mocking/arbeidstrening-avtale-mock';
import { AvtaleContext, Context } from '@/NyAvtaleProvider';
import { shallow } from 'enzyme';
import React from 'react';
import DeltakerinfoDel from './DeltakerinfoDel';

test('Test that <DeltakerinfoDel> renders correctly', () => {
    const wrapper = shallow(
        <AvtaleContext.Provider value={{ avtale: arbeidstreningAvtaleMock } as Context}>
            <DeltakerinfoDel />
        </AvtaleContext.Provider>
    );
    expect(wrapper).toHaveLength(1);
});
