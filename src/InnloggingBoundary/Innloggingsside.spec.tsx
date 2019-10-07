import React from 'react';
import { shallow } from 'enzyme';
import Innloggingsside from './Innloggingsside';

test('Test that <Innloggingsside> renders correctly', () => {
    const kilder = [{
        tittel: 'string',
        url: 'string',
    }];
    const wrapper = shallow(<Innloggingsside innloggingskilder={kilder}/>);
    expect(wrapper).toHaveLength(1);
});
