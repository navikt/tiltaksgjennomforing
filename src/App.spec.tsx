import React from 'react';
import { mount } from 'enzyme';
import App from './App';
import InnloggingBoundary from './InnloggingBoundary/InnloggingBoundary';

import { MemoryRouter } from 'react-router';
import * as reactRouter from 'react-router-dom';
import PropTypes from 'prop-types';
/*
const MockBrowserRouter = ({ children }) => (
    <MemoryRouter initialEntries={['/tiltaksgjennomforing/']}>
        { children }
    </MemoryRouter>
);
*/
test('Test that <App> renders correctly', () => {
    // MockBrowserRouter.propTypes = { children: PropTypes.node.isRequired };
    //const oldBrowserRoiuter = reactRouter.BrowserRouter
    //reactRouter.BrowserRouter = MockBrowserRouter;
    const wrapper = mount(<App />);
    //reactRouter.BrowserRouter = oldBrowserRoiuter;
    expect(wrapper).toHaveLength(1);
    const innloggingBoundary = wrapper.find(InnloggingBoundary);
    console.log("inloggetBoundary", innloggingBoundary)
    expect(innloggingBoundary).toHaveLength(0);
});
