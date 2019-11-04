import React from 'react';
import { shallow } from 'enzyme';
import { AvtaleProvider } from './AvtaleContext';

test('Test at AvtaleContext  ', () => {
    const wrapper = shallow(<AvtaleProvider />);
    expect(wrapper).toHaveLength(1);
});
