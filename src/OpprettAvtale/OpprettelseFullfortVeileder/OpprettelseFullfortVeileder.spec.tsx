import React from 'react';
import { shallow } from 'enzyme';
import OpprettelseFullfortVeileder from './OpprettelseFullfortVeileder';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

test('Test that <OpprettelseFullfort> renders correctly', () => {
    // @ts-ignore
    const wrapper = shallow(
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<OpprettelseFullfortVeileder />} />
            </Routes>
        </BrowserRouter>
    );
    expect(wrapper).toHaveLength(1);
});
