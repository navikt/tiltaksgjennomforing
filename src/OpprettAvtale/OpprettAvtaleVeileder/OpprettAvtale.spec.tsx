import { shallow } from 'enzyme';
import React from 'react';
import OpprettAvtaleVeileder from './OpprettAvtaleVeileder';
import { MemoryRouter , Route, Routes } from 'react-router-dom';

test('Test that <OpprettAvtale> renders correctly', () => {
    const wrapper = shallow(
        <MemoryRouter >
            <Routes>
                <Route path="*" element={<OpprettAvtaleVeileder />} />
            </Routes>
        </MemoryRouter>
    );
    expect(wrapper).toHaveLength(1);
});
