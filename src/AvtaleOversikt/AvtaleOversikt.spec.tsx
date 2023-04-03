import React from 'react';
import { shallow } from 'enzyme';
import AvtaleOversikt from './AvtaleOversikt';
import { MemoryRouter , Route, Routes } from 'react-router-dom';

test('Test that <AvtaleOversikt> renders correctly', () => {
    const wrapper = shallow(
        <MemoryRouter >
            <Routes>
                <Route path="*" element={<AvtaleOversikt />} />
            </Routes>
        </MemoryRouter>
    );
    expect(wrapper).toHaveLength(1);
});
