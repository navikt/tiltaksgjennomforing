import arbeidstreningAvtaleMock from '@/mocking/arbeidstrening-avtale-mock';
import { Avtale } from '@/types/avtale';
import { shallow } from 'enzyme';
import React from 'react';
import Godkjenning from './Godkjenning';
import { rejects } from 'assert';

test('Test that <Godkjenning> renders correctly', () => {
    const avtale = arbeidstreningAvtaleMock;

    const wrapper = shallow(<Godkjenning avtale={avtale} />);
    expect(wrapper).toHaveLength(1);
});
