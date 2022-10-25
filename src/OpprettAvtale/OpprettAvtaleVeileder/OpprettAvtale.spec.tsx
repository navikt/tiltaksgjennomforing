import { shallow } from 'enzyme';
import React from 'react';
import OpprettAvtaleVeileder from './OpprettAvtaleVeileder';

/**
 * Mock useLocation
 */
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
        pathname: 'http://localhost:3000/tiltaksgjennomforing/opprett-avtale',
    }),
}));

test('Test that <OpprettAvtale> renders correctly', () => {
    const wrapper = shallow(<OpprettAvtaleVeileder />);
    expect(wrapper).toHaveLength(1);
});
