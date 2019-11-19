import React from 'react';
import { shallow } from 'enzyme';
import AvtaleStatus from './AvtaleStatus';

test('Test that <AvtaleStatus> renders correctly', () => {
    const avtale = {};
    const rolle = {};
    // @ts-ignore
    const wrapper = shallow(<AvtaleStatus avtale={avtale} rolle={rolle} />);
    expect(wrapper).toHaveLength(1);
});
