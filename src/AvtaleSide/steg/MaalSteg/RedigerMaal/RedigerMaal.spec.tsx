import React from 'react';
import RedigerMaal from './RedigerMaal';
import { shallowWithIntl } from 'enzyme-react-intl';

test('Test that <RedigerMaal> renders correctly', () => {
    const stub = jest.fn();
    const wrapper = shallowWithIntl(<RedigerMaal avbrytRedigering={stub} ledigeMaalkategorier={[]} lagreMaal={stub} />);
    expect(wrapper).toHaveLength(1);
});
