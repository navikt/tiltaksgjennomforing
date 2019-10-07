
import React from 'react';
import { shallow } from 'enzyme';
import OppgaverIkon from './OppgaverIkon';

test('Test that <OppgaverIkon> renders correctly', () => {
    const wrapper = shallow(<OppgaverIkon/>);
    expect(wrapper).toHaveLength(1);
});