import arbeidstreningAvtaleMock from '@/mocking/arbeidstrening-avtale-mock';
import { AvtaleContext, Context } from '@/NyAvtaleProvider';
import { shallow } from 'enzyme';
import React from 'react';
import NesteForrige from './NesteForrige';

test('Test that <NesteForrige> renders correctly', () => {
    const wrapper = shallow(
        <AvtaleContext.Provider value={{ avtale: arbeidstreningAvtaleMock } as Context}>
            <NesteForrige />
        </AvtaleContext.Provider>
    );
    expect(wrapper).toHaveLength(1);
});
