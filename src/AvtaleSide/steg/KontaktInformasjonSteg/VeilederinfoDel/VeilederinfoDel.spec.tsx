import React from 'react';
import { shallow } from 'enzyme';
import VeilederinfoDel from './VeilederinfoDel';
import arbeidstreningAvtaleMock from '@/mocking/arbeidstrening-avtale-mock';

test('Test that <VeilederinfoDel> renders correctly', () => {
    const wrapper = shallow(
        <VeilederinfoDel
            avtale={arbeidstreningAvtaleMock}
            settAvtaleVerdi={() => {}}
            lagreAvtale={() => Promise.resolve()}
        />
    );
    expect(wrapper).toHaveLength(1);
});
