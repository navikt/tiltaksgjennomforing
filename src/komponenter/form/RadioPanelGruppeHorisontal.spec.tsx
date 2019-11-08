import React from 'react';
import { shallow } from 'enzyme';
import RadioPanelGruppeHorisontal from './RadioPanelGruppeHorisontal';

test('Test that <RadioPanelGruppeHorisontal> renders correctly', () => {
    const wrapper = shallow(
        <RadioPanelGruppeHorisontal legend="legendaric" name="named" radios={[]} onChange={() => {}} />
    );
    expect(wrapper).toHaveLength(1);
});
