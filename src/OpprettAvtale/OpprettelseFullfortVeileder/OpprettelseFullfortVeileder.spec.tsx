import React from 'react';
import { shallow } from 'enzyme';
import OpprettelseFullfortVeileder from './OpprettelseFullfortVeileder';

test('Test that <OpprettelseFullfort> renders correctly', () => {
    const match = {
        params: {
            avtaleId: '1dsafa',
        },
    };
    // @ts-ignore
    const wrapper = shallow(<OpprettelseFullfortVeileder match={match} />);
    expect(wrapper).toHaveLength(1);
});
