import React from 'react';
import { shallow } from 'enzyme';
import VarighetSteg from './VarighetSteg';
import arbeidstreningAvtaleMock from '@/mocking/arbeidstrening-avtale-mock';

test('Test that <VarighetSteg> renders correctly', () => {
    const wrapper = shallow(
        <VarighetSteg
            avtale={arbeidstreningAvtaleMock}
            settAvtaleVerdi={() => {}}
            lagreAvtale={() => Promise.resolve()}
        />
    );
    expect(wrapper).toHaveLength(1);
});
