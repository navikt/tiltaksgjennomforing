import React from 'react';
import { shallow } from 'enzyme';
import OpprettMaal from './OpprettMaal';

test('Test that <OpprettMaal> renders correctly', () => {
    const stub = jest.fn();
    const mellomLagretMaal = {
        maal: 'string',
        maalTekst: 'string',
    };
    const wrapper = shallow(<OpprettMaal
        fjernMellomLagring={stub}
        lagreMaal={stub}
        ledigeMaalkategorier={[]}
        mellomLagretMaal={mellomLagretMaal}
    />);
    expect(wrapper).toHaveLength(1);
});
