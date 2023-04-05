import React from 'react';
import App from './App';
import { MemoryRouter } from 'react-router';
import {render, fireEvent, waitFor, screen, findByText, findByRole} from '@testing-library/react'
import '@testing-library/jest-dom'
import {basename} from "@/paths";

test('Test that <App> renders correctly', async () => {
    const wrapper = render(
        <App MedMemoryRouter={true} />
    );
    console.log(wrapper.debug())

    await screen.findByRole(/presentation/)
    const knapp = await screen.findByText(/Logg inn/)
    expect(knapp).toBeInTheDocument();
    wrapper.unmount();
});
