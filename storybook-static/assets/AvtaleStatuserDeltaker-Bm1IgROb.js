import { j as n } from './Gjennomføres-DDe6u6XI.js';
import { useMDXComponents as a } from './index-DLsXyOuj.js';
import { M as s, d as t } from './index-Vg9IHUb1.js';
import {
    Annullert as i,
    Avbrutt as o,
    Påbegynt as d,
    ManglerGodkjenningDeltakerHarGodkjent as j,
    ManglerGodkjenningDeltakerHarIkkeGodkjent as h,
    KlarForOppstart as p,
    Gjennomføres as m,
    Avsluttet as x,
} from './AvtaleStatuserDeltaker.stories-DS6P9WAr.js';
import './index-CsdIBAqE.js';
import './iframe-D-y7xxYP.js';
import '../sb-preview/runtime.js';
import './index-5f0m1pej.js';
import './index-DYADbu9O.js';
import './index-CwJzlvYf.js';
import './index-DrFu-skq.js';
import './KlarForOppstart-D5TZALq-.js';
function l(r) {
    const e = { h1: 'h1', h2: 'h2', p: 'p', ...a(), ...r.components };
    return n.jsxs(n.Fragment, {
        children: [
            n.jsx(s, { title: 'Avtale Status Meldinger/Deltaker' }),
            `
`,
            n.jsx(e.h1, {
                id: 'status-meldinger-deltaker-får-men-han-går-på-tiltak',
                children: 'Status meldinger deltaker får men han går på tiltak',
            }),
            `
`,
            n.jsx(e.p, {
                children: `De forskjellige statusene er ANNULLERT, AVBRUTT, PÅBEGYNT, MANGLER_GODKJENNING, KLAR_FOR_OPPSTART, GJENNOMFØRES og AVSLUTTET.
Deltaker har ikke statusen UFORDELT`,
            }),
            `
`,
            n.jsx(e.h2, { id: 'annullert', children: 'ANNULLERT' }),
            `
`,
            n.jsx(e.p, { children: 'Avtallen har blitt annullert' }),
            `
`,
            n.jsx(t, { of: i }),
            `
`,
            n.jsx(e.h2, { id: 'avbrutt', children: 'AVBRUTT' }),
            `
`,
            n.jsx(e.p, { children: 'Avtalen er blitt avbrutt' }),
            `
`,
            n.jsx(t, { of: o }),
            `
`,
            n.jsx(e.h2, { id: 'påbegynt', children: 'PÅBEGYNT' }),
            `
`,
            n.jsx(e.p, { children: 'avtale er påbegynt' }),
            `
`,
            n.jsx(t, { of: d }),
            `
`,
            n.jsx(e.h2, { id: 'mangler_godkjenning', children: 'MANGLER_GODKJENNING' }),
            `
`,
            n.jsx(e.p, { children: 'Avtale er godkjent av deltaker men mangler godkjenning fra arbeidsgiver' }),
            `
`,
            n.jsx(t, { of: j }),
            `
`,
            n.jsx(e.h2, { id: 'mangler_godkjenning-1', children: 'MANGLER_GODKJENNING' }),
            `
`,
            n.jsx(e.p, { children: 'Avtale er ikke godkjent av deltaker' }),
            `
`,
            n.jsx(t, { of: h }),
            `
`,
            n.jsx(e.h2, { id: 'klar_for_oppstart', children: 'KLAR_FOR_OPPSTART' }),
            `
`,
            n.jsx(e.p, { children: 'Avtale er KlarForOppstart' }),
            `
`,
            n.jsx(t, { of: p }),
            `
`,
            n.jsx(e.h2, { id: 'gjennomføres', children: 'GJENNOMFØRES' }),
            `
`,
            n.jsx(e.p, { children: 'Avtalen Gjennomføres' }),
            `
`,
            n.jsx(t, { of: m }),
            `
`,
            n.jsx(e.h2, { id: 'avsluttet', children: 'AVSLUTTET' }),
            `
`,
            n.jsx(e.p, { children: 'Avtalen er avsluttet' }),
            `
`,
            n.jsx(t, { of: x }),
        ],
    });
}
function _(r = {}) {
    const { wrapper: e } = { ...a(), ...r.components };
    return e ? n.jsx(e, { ...r, children: n.jsx(l, { ...r }) }) : l(r);
}
export { _ as default };
