import { tomAvtale } from '@/AvtaleContext';
import { shallow } from 'enzyme';
import React from 'react';
import Godkjenning from './Godkjenning';

test('Test that <Godkjenning> renders correctly', () => {
    const wrapper = shallow(<Godkjenning avtale={tomAvtale} />);
    expect(wrapper).toHaveLength(1);
});
