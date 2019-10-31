import React from 'react';
import { shallow } from 'enzyme';
import VeilederinfoDel from './VeilederinfoDel';
import avtaleMock from '@/mocking/avtale-mock';

test('Test that <VeilederinfoDel> renders correctly', () => {
    const wrapper = shallow(
        <VeilederinfoDel
            avtale={avtaleMock}
            settAvtaleVerdi={() => {}}
            lagreAvtale={() => Promise.resolve()}
        />
    );
    expect(wrapper).toHaveLength(1);
});
