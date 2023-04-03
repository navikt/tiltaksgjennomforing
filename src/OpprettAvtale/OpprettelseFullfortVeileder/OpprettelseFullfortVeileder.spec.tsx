import React from 'react';
import { shallow } from 'enzyme';
import OpprettelseFullfortVeileder from './OpprettelseFullfortVeileder';
import { MemoryRouter , Route, Routes } from 'react-router-dom';

test('Test that <OpprettelseFullfort> renders correctly', () => {
    // @ts-ignore
    const wrapper = shallow(
        <MemoryRouter >
            <Routes>
                <Route path="*" element={<OpprettelseFullfortVeileder />} />
            </Routes>
        </MemoryRouter>
    );
    expect(wrapper).toHaveLength(1);
});
