import React from 'react';
import { shallow } from 'enzyme';
import Datovelger from './Datovelger';
import moment from 'moment';

test('Test that <Datovelger> renders correctly', () => {
    const stub = jest.fn();
    const wrapper = shallow(<Datovelger
        dato={moment()}
        velgDato={stub}
        className={'string'}
        settRiktigFormatert={stub}
        inputRiktigFormatert={false}
    />);
    expect(wrapper).toHaveLength(1);
});
