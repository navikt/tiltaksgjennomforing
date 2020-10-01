import React from 'react';
import { shallow } from 'enzyme';
import OpprettelseFullfortArbeidsgiver from './OpprettelseFullfortArbeidsgiver';

test('Test that <OpprettelseFullfortArbeidsgiver> renders correctly', () => {
    const match = {
        params: {
            avtaleId: '1dsafa',
        },
    };
    // @ts-ignore
    const wrapper = shallow(<OpprettelseFullfortArbeidsgiver match={match} />);
    expect(wrapper).toHaveLength(1);
});
