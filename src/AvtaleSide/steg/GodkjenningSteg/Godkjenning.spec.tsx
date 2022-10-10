import arbeidstreningAvtaleMock from '@/mocking/arbeidstrening-avtale-mock';
import { shallow } from 'enzyme';
import React from 'react';
import Godkjenning from './Godkjenning/Godkjenning';

test('Test that <Godkjenning> renders correctly', () => {
    const avtale = arbeidstreningAvtaleMock;
    const wrapper = shallow(<Godkjenning avtale={avtale} rolle="VEILEDER" />);
    expect(wrapper).toHaveLength(1);
});
