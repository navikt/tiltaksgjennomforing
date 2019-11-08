import React from 'react';
import { shallow } from 'enzyme';
import VarighetSteg from './VarighetSteg';
import avtaleMock from '@/mocking/avtale-mock';

test('Test that <VarighetSteg> renders correctly', () => {
    const wrapper = shallow(
        <VarighetSteg avtale={avtaleMock} settAvtaleVerdi={() => {}} lagreAvtale={() => Promise.resolve()} />
    );
    expect(wrapper).toHaveLength(1);
});
