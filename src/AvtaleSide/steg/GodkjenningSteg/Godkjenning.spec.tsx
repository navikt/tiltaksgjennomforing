import arbeidstreningAvtaleMock from '@/mocking/arbeidstrening-avtale-mock';
import { Avtale } from '@/types/avtale';
import { shallow } from 'enzyme';
import React from 'react';
import Godkjenning from './Godkjenning';

test('Test that <Godkjenning> renders correctly', () => {
    const wrapper = shallow(<Godkjenning avtale={arbeidstreningAvtaleMock as Avtale} />);
    expect(wrapper).toHaveLength(1);
});
