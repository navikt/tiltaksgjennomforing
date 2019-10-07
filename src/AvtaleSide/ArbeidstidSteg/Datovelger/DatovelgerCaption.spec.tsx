
import React from 'react';
import { shallow } from 'enzyme';
import DatovelgerCaption from './DatovelgerCaption';
import {IntlProvider} from 'react-intl';

test('Test that <DatovelgerCaption> renders correctly', () => {
    const wrapper = shallow(<IntlProvider locale={"no"}><DatovelgerCaption
        date={new Date()}
    /></IntlProvider>);
    expect(wrapper).toHaveLength(1);
});
