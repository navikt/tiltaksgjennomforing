import React from 'react';
import { shallow } from 'enzyme';
import AvtaleOversikt from './AvtaleOversikt';
import AvtaleTabell from '@/AvtaleOversikt/AvtaleTabell';

test('Test that <AvtaleOversikt> renders correctly', () => {
    const wrapper = shallow(
        <AvtaleTabell
            innloggetBruker={{ erNavAnsatt: false, identifikator: '' }}
            avtaler={[]}
            varsler={[]}
        />
    );
    expect(wrapper).toHaveLength(1);
});
