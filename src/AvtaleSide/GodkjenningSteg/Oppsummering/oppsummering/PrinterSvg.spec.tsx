import React from 'react';
import { shallow } from 'enzyme';
import PrinterSvg from './PrinterSvg';

test('Test that <PrinterSvg> renders correctly', () => {
    const wrapper = shallow(<PrinterSvg />);
    expect(wrapper).toHaveLength(1);
});
