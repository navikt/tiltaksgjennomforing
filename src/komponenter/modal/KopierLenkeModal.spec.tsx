import React from 'react';
import { shallow } from 'enzyme';
import KopierLenkeModal from './KopierLenkeModal';

test('Test that <KopierLenkeModal> renders correctly', () => {
    const wrapper = shallow(<KopierLenkeModal />);
    expect(wrapper).toHaveLength(1);
});
