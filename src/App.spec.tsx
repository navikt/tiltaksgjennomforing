import React from 'react';
import {mount} from 'enzyme';
import App from './App';
import InnloggingBoundary from './InnloggingBoundary/InnloggingBoundary';

import { MemoryRouter } from 'react-router';
import  * as rrd from 'react-router-dom';
import PropTypes from "prop-types";

const oldBrowserRoiuter = rrd.BrowserRouter
const MockBrowserRouter = ({ children }) => (
    <MemoryRouter initialEntries={['/tiltaksgjennomforing/']}>
        { children }
    </MemoryRouter>
);



test('Test that <App> renders correctly', () => {

     MockBrowserRouter.propTypes = { children: PropTypes.node.isRequired };
     rrd.BrowserRouter = MockBrowserRouter;

    const wrapper = mount(<App />);
    const {BrowserRouter} = import("react-router-dom")
    rrd.BrowserRouter = BrowserRouter
    
    expect(wrapper).toHaveLength(1);
    const innloggingBoundary = wrapper.find(InnloggingBoundary);
    expect(innloggingBoundary).toHaveLength(1);

});
