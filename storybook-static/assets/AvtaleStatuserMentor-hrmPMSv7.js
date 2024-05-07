import { j as n } from './Gjennomføres-DDe6u6XI.js';
import { useMDXComponents as l } from './index-DLsXyOuj.js';
import { M as i, d as t } from './index-Vg9IHUb1.js';
import {
    Annullert as o,
    Avbrutt as a,
    Påbegynt as d,
    ManglerGodkjenning as j,
    KlarForOppstart as p,
    Gjennomføres as h,
    Avsluttet as m,
} from './AvtaleStatuserMentor.stories-B70D3xFe.js';
import './index-CsdIBAqE.js';
import './iframe-D-y7xxYP.js';
import '../sb-preview/runtime.js';
import './index-5f0m1pej.js';
import './index-DYADbu9O.js';
import './index-CwJzlvYf.js';
import './index-DrFu-skq.js';
import './KlarForOppstart-D5TZALq-.js';
function s(r) {
    const e = { h1: 'h1', h2: 'h2', p: 'p', ...l(), ...r.components };
    return n.jsxs(n.Fragment, {
        children: [
            n.jsx(i, { title: 'Avtale Status Meldinger/Mentor' }),
            `
`,
            n.jsx(e.h1, {
                id: 'status-meldinger-deltaker-får-men-han-går-på-tiltak',
                children: 'Status meldinger deltaker får men han går på tiltak',
            }),
            `
`,
            n.jsx(e.p, { children: 'De forskjellige statusene er' }),
            `
`,
            n.jsx(e.h2, { id: 'annullert', children: 'ANNULLERT' }),
            `
`,
            n.jsx(e.p, { children: 'Avtallen har blitt annullert' }),
            `
`,
            n.jsx(t, { of: o }),
            `
`,
            n.jsx(e.h2, { id: 'avbrutt', children: 'AVBRUTT' }),
            `
`,
            n.jsx(e.p, { children: 'Avtalen er blitt avbrutt' }),
            `
`,
            n.jsx(t, { of: a }),
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
            n.jsx(t, { of: h }),
            `
`,
            n.jsx(e.h2, { id: 'avsluttet', children: 'AVSLUTTET' }),
            `
`,
            n.jsx(e.p, { children: 'Avtalen er avsluttet' }),
            `
`,
            n.jsx(t, { of: m }),
        ],
    });
}
function N(r = {}) {
    const { wrapper: e } = { ...l(), ...r.components };
    return e ? n.jsx(e, { ...r, children: n.jsx(s, { ...r }) }) : s(r);
}
export { N as default };
