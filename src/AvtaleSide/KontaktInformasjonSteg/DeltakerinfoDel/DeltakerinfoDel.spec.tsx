import React from 'react';
import { shallow } from 'enzyme';
import DeltakerinfoDel from './DeltakerinfoDel';
import avtaleMock from '@/mocking/avtale-mock';

test('Test that <DeltakerinfoDel> renders correctly', () => {
    const wrapper = shallow(
        <DeltakerinfoDel
            avtale={avtaleMock}
            settAvtaleVerdi={() => {}}
            lagreAvtale={() => Promise.resolve()}
        />
    );
    expect(wrapper).toHaveLength(1);
});
