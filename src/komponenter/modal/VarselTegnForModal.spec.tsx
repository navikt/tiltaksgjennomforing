import React from 'react';
import { shallow } from 'enzyme';
import VarselTegnForModal from './VarselTegnForModal';

test('Test that <VarselTegnForModal> renders correctly', () => {
    const wrapper = shallow(<VarselTegnForModal height="" width=""    />);
    expect(wrapper).toHaveLength(1);
});
