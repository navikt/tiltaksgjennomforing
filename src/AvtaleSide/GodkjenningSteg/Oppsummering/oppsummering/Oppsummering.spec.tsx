import React from 'react';
import { shallow } from 'enzyme';
import Oppsummering from './Oppsummering';

test('Test that <Oppsummering> renders correctly', () => {
    const avtale = {};
    // @ts-ignore
    const wrapper = shallow(<Oppsummering avtale={avtale}/>);
    expect(wrapper).toHaveLength(1);
});
