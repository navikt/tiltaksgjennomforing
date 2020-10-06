import { AvtaleContext, Context } from '@/AvtaleProvider';
import arbeidstreningAvtaleMock from '@/mocking/arbeidstrening-avtale-mock';
import { shallow } from 'enzyme';
import React from 'react';
import OmMentorSteg from './OmMentorSteg';

test('Test that <OmMentorSteg> renders correctly', () => {
    const wrapper = shallow(
        <AvtaleContext.Provider value={{ avtale: arbeidstreningAvtaleMock } as Context}>
            <OmMentorSteg />
        </AvtaleContext.Provider>
    );
    expect(wrapper).toHaveLength(1);
});
