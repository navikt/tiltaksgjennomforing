import React from 'react';
import { shallow } from 'enzyme';
import AvbryteAvtalen from './AvbryteAvtalen';

test('Test that <AvbryteAvtalen> renders correctly', () => {
    const stub = jest.fn();
    const wrapper = shallow(<AvbryteAvtalen avbrytOnclick={stub}/>);
    expect(wrapper).toHaveLength(1);
});
