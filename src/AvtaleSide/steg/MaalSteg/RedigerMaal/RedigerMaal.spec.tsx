import React from 'react';
import { shallow } from 'enzyme';
import RedigerMaal from './RedigerMaal';

test('Test that <RedigerMaal> renders correctly', () => {
    const stub = jest.fn();
    const wrapper = shallow(<RedigerMaal avbrytRedigering={stub} ledigeMaalkategorier={[]} lagreMaal={stub} />);
    expect(wrapper).toHaveLength(1);
});
