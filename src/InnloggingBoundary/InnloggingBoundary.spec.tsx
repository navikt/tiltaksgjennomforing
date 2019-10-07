
import React from 'react';
import { shallow } from 'enzyme';
import InnloggingBoundary from './InnloggingBoundary';

test('Test that <InnloggingBoundary> renders correctly', () => {
    const wrapper = shallow(<InnloggingBoundary/>);
    expect(wrapper).toHaveLength(1);
});