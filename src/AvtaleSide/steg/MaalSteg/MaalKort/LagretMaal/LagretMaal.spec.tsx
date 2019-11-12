import React from 'react';
import { shallow } from 'enzyme';
import LagretMaal from './LagretMaal';
import { Maal } from '@/types/avtale';

test('Test that <LagretMaal> renders correctly', () => {
    const stub = jest.fn();
    const maal: Maal = {
        kategori: 'Få jobb i bedriften',
        beskrivelse: 'string',
    };
    const wrapper = shallow(<LagretMaal endreOnClick={stub} maal={maal} slettOnClick={stub} />);
    expect(wrapper).toHaveLength(1);
});
