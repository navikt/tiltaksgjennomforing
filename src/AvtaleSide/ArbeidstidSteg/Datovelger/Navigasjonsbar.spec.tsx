import React from 'react';
import { shallow } from 'enzyme';
import Navigasjonsbar from './Navigasjonsbar';

test('Test that <Navigasjonsbar> renders correctly', () => {
    const wrapper = shallow(<Navigasjonsbar showPreviousButton={true} showNextButton={true}/>);
    expect(wrapper).toHaveLength(1);
});
