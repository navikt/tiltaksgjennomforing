import { j as e } from './Gjennomføres-DDe6u6XI.js';
import { useMDXComponents as i } from './index-DLsXyOuj.js';
import { M as s, d as r } from './index-Vg9IHUb1.js';
import {
    ErUfordelt as o,
    Annullert as a,
    Avbrutt as d,
    Påbegynt as j,
    ManglerGodkjenningArbeidsgiverHarGodkjent as h,
    ManglerGodkjenningArbeidsgiverHarIkkeGodkjent as x,
    KlarForOppstart as p,
    Gjennomføres as m,
    Avsluttet as g,
} from './AvtaleStatuserArbeidsgiver.stories-B0n9AdMc.js';
import './index-CsdIBAqE.js';
import './iframe-D-y7xxYP.js';
import '../sb-preview/runtime.js';
import './index-5f0m1pej.js';
import './index-DYADbu9O.js';
import './index-CwJzlvYf.js';
import './index-DrFu-skq.js';
import './KlarForOppstart-D5TZALq-.js';
function l(t) {
    const n = { h1: 'h1', h2: 'h2', p: 'p', ...i(), ...t.components };
    return e.jsxs(e.Fragment, {
        children: [
            e.jsx(s, { title: 'Avtale Status Meldinger/Arbeidsgiver' }),
            `
`,
            e.jsx(n.h1, {
                id: 'status-meldinger-deltaker-får-men-han-går-på-tiltak',
                children: 'Status meldinger deltaker får men han går på tiltak',
            }),
            `
`,
            e.jsx(n.p, { children: 'De forskjellige statusene er' }),
            `
`,
            e.jsx(n.h2, { id: 'ufordelt', children: 'UFORDELT' }),
            `
`,
            e.jsx(n.p, { children: 'Avtallen er ufordelt' }),
            `
`,
            e.jsx(r, { of: o }),
            `
`,
            e.jsx(n.h2, { id: 'annullert', children: 'ANNULLERT' }),
            `
`,
            e.jsx(n.p, { children: 'Avtallen har blitt annullert' }),
            `
`,
            e.jsx(r, { of: a }),
            `
`,
            e.jsx(n.h2, { id: 'avbrutt', children: 'AVBRUTT' }),
            `
`,
            e.jsx(n.p, { children: 'Avtalen er blitt avbrutt' }),
            `
`,
            e.jsx(r, { of: d }),
            `
`,
            e.jsx(n.h2, { id: 'påbegynt', children: 'PÅBEGYNT' }),
            `
`,
            e.jsx(n.p, { children: 'avtale er påbegynt' }),
            `
`,
            e.jsx(r, { of: j }),
            `
`,
            e.jsx(n.h2, { id: 'mangler_godkjenning', children: 'MANGLER_GODKJENNING' }),
            `
`,
            e.jsx(n.p, {
                children: 'Avtale er godkjent av arbeidsgiver men mangler godkjenning fra deltaker eller veileder',
            }),
            `
`,
            e.jsx(r, { of: h }),
            `
`,
            e.jsx(n.h2, { id: 'mangler_godkjenning-1', children: 'MANGLER_GODKJENNING' }),
            `
`,
            e.jsx(n.p, { children: 'Avtale er ikke godkjent av deltaker' }),
            `
`,
            e.jsx(r, { of: x }),
            `
`,
            e.jsx(n.h2, { id: 'klar_for_oppstart', children: 'KLAR_FOR_OPPSTART' }),
            `
`,
            e.jsx(n.p, { children: 'Avtale er KlarForOppstart' }),
            `
`,
            e.jsx(r, { of: p }),
            `
`,
            e.jsx(n.h2, { id: 'gjennomføres', children: 'GJENNOMFØRES' }),
            `
`,
            e.jsx(n.p, { children: 'Avtalen Gjennomføres' }),
            `
`,
            e.jsx(r, { of: m }),
            `
`,
            e.jsx(n.h2, { id: 'avsluttet', children: 'AVSLUTTET' }),
            `
`,
            e.jsx(n.p, { children: 'Avtalen er avsluttet' }),
            `
`,
            e.jsx(r, { of: g }),
        ],
    });
}
function R(t = {}) {
    const { wrapper: n } = { ...i(), ...t.components };
    return n ? e.jsx(n, { ...t, children: e.jsx(l, { ...t }) }) : l(t);
}
export { R as default };
