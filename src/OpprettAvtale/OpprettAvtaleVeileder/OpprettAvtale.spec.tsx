import { shallow } from 'enzyme';
import React from 'react';
import OpprettAvtaleVeileder from './OpprettAvtaleVeileder';

test('Test that <OpprettAvtale> renders correctly', () => {
    const wrapper = shallow(<OpprettAvtaleVeileder />);
    expect(wrapper).toHaveLength(1);
});
