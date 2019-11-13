import React from 'react';
import { shallow } from 'enzyme';
import OppfolgingOgTilretteleggingSteg from './OppfolgingOgTilretteleggingSteg';

test('Test that <OppfolgingOgTilretteleggingSteg> renders correctly', () => {
    const wrapper = shallow(<OppfolgingOgTilretteleggingSteg />);
    expect(wrapper).toHaveLength(1);
});
