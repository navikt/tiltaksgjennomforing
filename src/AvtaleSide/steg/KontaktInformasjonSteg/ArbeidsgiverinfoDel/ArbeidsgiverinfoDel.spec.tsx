import { AvtaleContext, Context } from '@/AvtaleProvider';
import arbeidstreningAvtaleMock from '@/mocking/arbeidstrening-avtale-mock';
import { shallow } from 'enzyme';
import React from 'react';
import ArbeidsgiverinfoDel from './ArbeidsgiverinfoDel';

test('Test that <ArbeidsgiverinfoDel> renders correctly', () => {
    const wrapper = shallow(
        <AvtaleContext.Provider value={{ avtale: arbeidstreningAvtaleMock } as Context}>
            <ArbeidsgiverinfoDel />
        </AvtaleContext.Provider>
    );
    expect(wrapper).toHaveLength(1);
});
