import React from 'react';
import { shallow } from 'enzyme';
import GodkjenningStatus from './GodkjenningStatus';
import lonnstilskuddAvtaleMock from "@/mocking/lonnstilskudd-avtale-mock";

test('Test that <GodkjenningStatus> renders correctly', () => {
    const wrapper = shallow(<GodkjenningStatus avtale={lonnstilskuddAvtaleMock} />);
    expect(wrapper).toHaveLength(1);
});
