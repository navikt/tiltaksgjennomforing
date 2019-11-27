import React from 'react';
import { shallow } from 'enzyme';
import OpprettAvtale from './OpprettAvtale';

test('Test that <OpprettAvtale> renders correctly', () => {
    const wrapper = shallow(<OpprettAvtale />);
    expect(wrapper).toHaveLength(1);
});
