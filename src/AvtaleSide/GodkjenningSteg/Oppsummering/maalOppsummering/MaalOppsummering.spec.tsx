
import React from 'react';
import { shallow } from 'enzyme';
import MaalOppsummering from './MaalOppsummering';

test('Test that <MaalOppsummering> renders correctly', () => {
    const wrapper = shallow(<MaalOppsummering maal={[]}/>);
    expect(wrapper).toHaveLength(1);
});
