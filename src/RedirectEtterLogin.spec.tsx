import React from 'react';
import { shallow } from 'enzyme';
import RedirectEtterLogin from './RedirectEtterLogin';

test('Test that <RedirectEtterLogin> renders correctly', () => {
    const wrapper = shallow(<RedirectEtterLogin />);
    expect(wrapper).toHaveLength(1);
});
