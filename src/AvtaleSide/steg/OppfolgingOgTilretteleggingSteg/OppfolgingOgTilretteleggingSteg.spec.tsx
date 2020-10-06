import { AvtaleContext, Context } from '@/AvtaleProvider';
import arbeidstreningAvtaleMock from '@/mocking/arbeidstrening-avtale-mock';
import { shallow } from 'enzyme';
import React from 'react';
import OppfolgingOgTilretteleggingSteg from './OppfolgingOgTilretteleggingSteg';

test('Test that <OppfolgingOgTilretteleggingSteg> renders correctly', () => {
    const wrapper = shallow(
        <AvtaleContext.Provider value={{ avtale: arbeidstreningAvtaleMock } as Context}>
            <OppfolgingOgTilretteleggingSteg />
        </AvtaleContext.Provider>
    );
    expect(wrapper).toHaveLength(1);
});
