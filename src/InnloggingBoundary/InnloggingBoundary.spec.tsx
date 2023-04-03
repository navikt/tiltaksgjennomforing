import React from 'react';
import { shallow } from 'enzyme';
import InnloggingBoundary from './InnloggingBoundary';
import { MemoryRouter , Route, Routes } from 'react-router-dom';

test('Test that <InnloggingBoundary> renders correctly', () => {
    const wrapper = shallow(
        <MemoryRouter >
        <Routes>
            <Route path="*" element={<InnloggingBoundary />} />
        </Routes>
    </MemoryRouter>
    );
    expect(wrapper).toHaveLength(1);
});
