import { j as t, S as o, B as n, f as e, N as r } from './Gjennomføres-DDe6u6XI.js';
const i = ({ avtaleInngått: s, startDato: a }) =>
    t.jsx(o, {
        header: 'Avtalen er ferdig utfylt og godkjent',
        body: t.jsxs(n, {
            size: 'small',
            children: ['Avtale ble inngått ', e(s, r), '. Tiltaket starter', ' ', e(a, r), '.'],
        }),
    });
i.__docgenInfo = {
    description: '',
    methods: [],
    displayName: 'KlarForOppstart',
    props: {
        avtaleInngått: { required: !1, tsType: { name: 'string' }, description: '' },
        startDato: { required: !1, tsType: { name: 'string' }, description: '' },
    },
};
export { i as K };
