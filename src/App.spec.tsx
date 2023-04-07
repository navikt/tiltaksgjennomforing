import React from 'react';
import App from './App';
import { MemoryRouter } from 'react-router';
import {render, fireEvent, waitFor, screen, findByText, findByRole} from '@testing-library/react'
import '@testing-library/jest-dom'

import  * as rrd from 'react-router-dom';
import PropTypes from "prop-types";
import {basename} from "@/paths";

const MockBrowserRouter = ({ children }:any) => (
    <MemoryRouter initialEntries={[basename]}>
        { children }
    </MemoryRouter>
);

beforeEach(()=>{
    // @ts-ignore
    rrd.BrowserRouter = MockBrowserRouter
})
test('Test that <App> renders correctly', async () => {



    const wrapper = render(
        <App />
    );
    console.log(wrapper.debug())

    await screen.findByRole(/presentation/)
    const knapp = await screen.findByText(/Logg inn/)
    expect(knapp).toBeInTheDocument();
    wrapper.unmount();
});
