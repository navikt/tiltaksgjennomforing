import React from 'react';
import { shallow } from 'enzyme';
import AvtaleOversikt from './AvtaleOversikt';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

test('Test that <AvtaleOversikt> renders correctly', () => {
    const wrapper = shallow(
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<AvtaleOversikt />} />
            </Routes>
        </BrowserRouter>
    );
    expect(wrapper).toHaveLength(1);
});
