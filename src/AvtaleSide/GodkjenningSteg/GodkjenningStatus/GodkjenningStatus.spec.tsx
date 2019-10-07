
import React from 'react';
import { shallow } from 'enzyme';
import GodkjenningStatus from './GodkjenningStatus';

test('Test that <GodkjenningStatus> renders correctly', () => {
    const avtale = {}
    // @ts-ignore
    const wrapper = shallow(<GodkjenningStatus avtale={avtale}/>);
    expect(wrapper).toHaveLength(1);
});
