import React from 'react';
import { shallow } from 'enzyme';
import { FeatureToggleProvider } from './FeatureToggleProvider';

test('Test that <FeatureToggleProvider> renders correctly', () => {
    const wrapper = shallow(<FeatureToggleProvider />);
    expect(wrapper).toHaveLength(1);
});
