import React from 'react';
import { shallow } from 'enzyme';
import InnloggingBoundary from './InnloggingBoundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

test('Test that <InnloggingBoundary> renders correctly', () => {
    const wrapper = shallow(
        <BrowserRouter>
        <Routes>
            <Route path="*" element={<InnloggingBoundary />} />
        </Routes>
    </BrowserRouter>
    );
    expect(wrapper).toHaveLength(1);
});
