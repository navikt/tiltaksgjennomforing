import React from 'react';
import { shallow } from 'enzyme';
import OppsummeringArbeidstrening from './OppsummeringArbeidstrening';

test('Test that <OppsummeringArbeidstrening> renders correctly', () => {
    const avtale = {};
    // @ts-ignore
    const wrapper = shallow(<OppsummeringArbeidstrening avtaleinnhold={avtale} />);
    expect(wrapper).toHaveLength(1);
});
