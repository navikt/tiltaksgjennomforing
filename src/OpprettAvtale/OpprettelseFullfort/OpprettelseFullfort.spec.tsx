import React from 'react';
import { shallow } from 'enzyme';
import OpprettelseFullfort from './OpprettelseFullfort';

test('Test that <OpprettelseFullfort> renders correctly', () => {
    const match = {
        params: {
            avtaleId: '1dsafa',
        },
    };
    // @ts-ignore
    const wrapper = shallow(<OpprettelseFullfort match={match} />);
    expect(wrapper).toHaveLength(1);
});
