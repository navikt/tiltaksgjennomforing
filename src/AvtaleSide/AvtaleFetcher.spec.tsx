
import React from 'react';
import { shallow } from 'enzyme';
import AvtaleFetcher from './AvtaleFetcher';

test('Test that <AvtaleFetcher> renders correctly', () => {
    const wrapper = shallow(<AvtaleFetcher/>);
    expect(wrapper).toHaveLength(1);
});