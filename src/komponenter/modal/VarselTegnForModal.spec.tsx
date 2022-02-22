import React from 'react';
import { shallow } from 'enzyme';
import VarselTegnForModal from './VarselTegnForModal';

test('Test that <VarselTegnForModal> renders correctly', () => {
    const wrapper = shallow(<VarselTegnForModal width="32" height="32" />);
    expect(wrapper).toHaveLength(1);
});
