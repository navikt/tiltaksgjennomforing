import React from 'react';
import { shallow } from 'enzyme';
import ArbeidsgiverinfoDel from './ArbeidsgiverinfoDel';
import avtaleMock from '@/mocking/avtale-mock';

test('Test that <ArbeidsgiverinfoDel> renders correctly', () => {
    const wrapper = shallow(
        <ArbeidsgiverinfoDel avtale={avtaleMock} settAvtaleVerdi={() => {}} lagreAvtale={() => Promise.resolve()} />
    );
    expect(wrapper).toHaveLength(1);
});
