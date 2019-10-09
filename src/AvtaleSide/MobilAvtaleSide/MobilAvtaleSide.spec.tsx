import React from 'react';
import { shallow } from 'enzyme';
import MobilAvtaleSide from './MobilAvtaleSide';

test('Test that <MobilAvtaleSide> renders correctly', () => {
    const stub = jest.fn();
    const wrapper = shallow(
        <MobilAvtaleSide
            avtaleSteg={[]}
            rolle={'DELTAKER'}
            tilbakeTilOversiktKlikk={stub}
        />
    );
    expect(wrapper).toHaveLength(1);
});
