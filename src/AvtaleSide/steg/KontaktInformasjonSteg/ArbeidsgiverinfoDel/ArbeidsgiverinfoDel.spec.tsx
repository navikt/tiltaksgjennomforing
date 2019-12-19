import React from 'react';
import { shallow } from 'enzyme';
import ArbeidsgiverinfoDel from './ArbeidsgiverinfoDel';
import arbeidstreningAvtaleMock from '@/mocking/arbeidstrening-avtale-mock';

test('Test that <ArbeidsgiverinfoDel> renders correctly', () => {
    const wrapper = shallow(
        <ArbeidsgiverinfoDel
            avtale={arbeidstreningAvtaleMock}
            settAvtaleVerdi={() => {}}
            lagreAvtale={() => Promise.resolve()}
        />
    );
    expect(wrapper).toHaveLength(1);
});
