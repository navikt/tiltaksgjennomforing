import React from 'react';
import { shallow } from 'enzyme';
import DeltakerinfoDel from './DeltakerinfoDel';
import arbeidstreningAvtaleMock from '@/mocking/arbeidstrening-avtale-mock';

test('Test that <DeltakerinfoDel> renders correctly', () => {
    const wrapper = shallow(
        <DeltakerinfoDel
            avtale={arbeidstreningAvtaleMock}
            settAvtaleVerdi={() => {}}
            lagreAvtale={() => Promise.resolve()}
        />
    );
    expect(wrapper).toHaveLength(1);
});
