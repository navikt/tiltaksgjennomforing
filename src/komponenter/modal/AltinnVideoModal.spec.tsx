import React from 'react';
import { shallow } from 'enzyme';
import AltinnVideoModal from './AltinnVideoModal';

test('Test that <AltinnVideoModal> renders correctly', () => {
    const wrapper = shallow(<AltinnVideoModal isOpen={true} lukkModal={() => void 0} />);
    expect(wrapper).toHaveLength(1);
});
