import React from 'react';
import { shallow } from 'enzyme';
import OppretteNyttMaal from '@/AvtaleSide/steg/MaalSteg/OpprettMaal/OppretteNyttMaal';

test('Test that <OppretteNyttMaalMaal> renders correctly', () => {
    const wrapper = shallow(<OppretteNyttMaal />);
    expect(wrapper).toHaveLength(1);
});
