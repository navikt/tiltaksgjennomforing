import React from 'react';
import { shallow } from 'enzyme';
import Informasjonsside from './Informasjonsside';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

test('Test that <Informasjonsside> renders correctly', () => {
    // @ts-ignore
    const wrapper = shallow(
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Informasjonsside />} />
            </Routes>
        </BrowserRouter>
    );
    expect(wrapper).toHaveLength(1);
});
