import React from 'react';
import { shallow } from 'enzyme';
import Kalender from './Kalender';

test('Test that <Kalender> renders correctly', () => {
    const stub = jest.fn();
    const wrapper = shallow(<Kalender
        valgtDato={new Date()}
        velgDato={stub}
        lukk={stub}
        datoTilbakeITid={stub}
    />);
    expect(wrapper).toHaveLength(1);
});
