import React from 'react';
import { shallow } from 'enzyme';
import RedirectEtterLogin from './RedirectEtterLogin';
import { MemoryRouter , Route, Routes } from 'react-router-dom';

test('Test that <RedirectEtterLogin> renders correctly', () => {
    const wrapper = shallow(
        <MemoryRouter >
            <Routes>
                <Route path="*" element={<RedirectEtterLogin />} />
            </Routes>
        </MemoryRouter>
    );
    expect(wrapper).toHaveLength(1);
});
