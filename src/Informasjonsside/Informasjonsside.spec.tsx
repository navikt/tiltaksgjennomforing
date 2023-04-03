import React from 'react';
import { shallow } from 'enzyme';
import Informasjonsside from './Informasjonsside';
import { MemoryRouter , Route, Routes } from 'react-router-dom';

test('Test that <Informasjonsside> renders correctly', () => {
    // @ts-ignore
    const wrapper = shallow(
        <MemoryRouter >
            <Routes>
                <Route path="*" element={<Informasjonsside />} />
            </Routes>
        </MemoryRouter>
    );
    expect(wrapper).toHaveLength(1);
});
