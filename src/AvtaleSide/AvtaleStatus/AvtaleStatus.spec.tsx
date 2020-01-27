import React from 'react';
import { shallow } from 'enzyme';
import AvtaleStatus from './AvtaleStatus';
import arbeidstreningAvtaleMock from '@/mocking/arbeidstrening-avtale-mock';

test('Test that <AvtaleStatus> renders correctly', () => {
    const rolle = {};
    // @ts-ignore
    const wrapper = shallow(<AvtaleStatus avtale={arbeidstreningAvtaleMock} rolle={rolle} />);
    expect(wrapper).toHaveLength(1);
});
