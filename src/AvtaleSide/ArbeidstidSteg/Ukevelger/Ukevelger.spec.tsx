import React from 'react';
import { shallow } from 'enzyme';
import Ukevelger from './Ukevelger';

test('Test that <Ukevelger> renders correctly', () => {
    const wrapper = shallow(<Ukevelger label={'dummy'}/>);
    expect(wrapper).toHaveLength(1);
});
