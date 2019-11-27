import React from 'react';
import { shallow } from 'enzyme';
import AvtaleStatus from './AvtaleStatus';
import avtaleMock from '@/mocking/avtale-mock';

test('Test that <AvtaleStatus> renders correctly', () => {
    const rolle = {};
    // @ts-ignore
    const wrapper = shallow(<AvtaleStatus avtale={avtaleMock} rolle={rolle} />);
    expect(wrapper).toHaveLength(1);
});
