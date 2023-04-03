import React from 'react';
import { shallow } from 'enzyme';
import RedirectEtterLogin from './RedirectEtterLogin';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

test('Test that <RedirectEtterLogin> renders correctly', () => {
    const wrapper = shallow(
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<RedirectEtterLogin />} />
            </Routes>
        </BrowserRouter>
    );
    expect(wrapper).toHaveLength(1);
});
