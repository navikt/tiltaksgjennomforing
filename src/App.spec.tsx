import React from 'react';
import {mount, shallow} from 'enzyme';
import App from './App';
import InnloggingBoundary from './InnloggingBoundary/InnloggingBoundary';
import AvtaleOversikt from "@/AvtaleOversikt/AvtaleOversikt";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import { createMemoryHistory } from 'history';
import { MemoryRouter } from 'react-router';
import Informasjonsside from "@/Informasjonsside/Informasjonsside";
import {pathTilInformasjonssideUinnlogget} from "@/paths";


test('Test that <App> renders correctly', () => {

    const history = createMemoryHistory({ initialEntries: ['/tiltaksgjennomforing/'] });

    const wrapper = shallow(
            <App />
    );
    expect(wrapper).toHaveLength(1);
    const routesRenderer = wrapper.find(Routes);
    expect(routesRenderer).toHaveLength(1);
});
