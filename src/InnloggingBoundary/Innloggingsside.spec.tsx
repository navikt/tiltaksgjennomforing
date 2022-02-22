import React from 'react';
import { shallow } from 'enzyme';
import Innloggingsside from './Innloggingsside';
import { Innloggingskilde } from '@/types/innlogget-bruker';

test('Test that <Innloggingsside> renders correctly', () => {
    const kilder: Innloggingskilde[] = [
        {
            tittel: 'string',
            part: 'string',
            url: 'string',
        },
    ];
    const wrapper = shallow(<Innloggingsside innloggingskilder={kilder} />);
    expect(wrapper).toHaveLength(1);
});
