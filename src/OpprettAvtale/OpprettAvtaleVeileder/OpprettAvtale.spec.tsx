import { shallow } from 'enzyme';
import React from 'react';
import OpprettAvtaleVeileder from './OpprettAvtaleVeileder';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

test('Test that <OpprettAvtale> renders correctly', () => {
    const wrapper = shallow(
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<OpprettAvtaleVeileder />} />
            </Routes>
        </BrowserRouter>
    );
    expect(wrapper).toHaveLength(1);
});
