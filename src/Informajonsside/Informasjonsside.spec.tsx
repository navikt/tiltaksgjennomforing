import React from 'react';
import { shallow } from 'enzyme';
import Informasjonsside from './Informasjonsside';

test('Test that <Informasjonsside> renders correctly', () => {
    const location = {
        pathname: '/dummy',
    };
    // @ts-ignore
    const wrapper = shallow(<Informasjonsside location={location} />);
    expect(wrapper).toHaveLength(1);
});
