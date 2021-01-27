import arbeidstreningAvtaleMock from '@/mocking/arbeidstrening-avtale-mock';
import { shallow } from 'enzyme';
import React from 'react';
import Godkjenning from './Godkjenning';

test('Test that <Godkjenning> renders correctly', () => {
    const avtale = arbeidstreningAvtaleMock;
    const wrapper = shallow(<Godkjenning avtale={avtale} />);
    expect(wrapper).toHaveLength(1);
});
