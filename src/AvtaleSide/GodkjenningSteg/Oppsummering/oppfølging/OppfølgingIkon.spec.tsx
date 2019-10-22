import React from 'react';
import { shallow } from 'enzyme';
import OppfolgingIkon from './OppfolgingIkon';

test('Test that <OppfølgingIkon> renders correctly', () => {
    const wrapper = shallow(<OppfolgingIkon />);
    expect(wrapper).toHaveLength(1);
});
