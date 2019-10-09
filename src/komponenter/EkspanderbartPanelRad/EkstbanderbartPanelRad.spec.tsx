import React from 'react';
import { shallow } from 'enzyme';
import EkstbanderbartPanelRad from './EkstbanderbartPanelRad';

test('Test that <EkstbanderbartPanelRad> renders correctly', () => {
    const wrapper = shallow(<EkstbanderbartPanelRad />);
    expect(wrapper).toHaveLength(1);
});
