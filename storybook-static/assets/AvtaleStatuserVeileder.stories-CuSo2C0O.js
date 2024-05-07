import {
    c as Ce,
    a as Wi,
    H as Xi,
    L as Da,
    j as N,
    b as wa,
    I as La,
    V as ue,
    B as se,
    f as Be,
    d as Pa,
    S as _e,
    A as Ua,
    G as Ka,
    N as _t,
} from './Gjennomføres-DDe6u6XI.js';
import { r as k, R as K, c as Ve, g as $n } from './index-CsdIBAqE.js';
function zn(e, t) {
    return Object.entries(e)
        .filter(([n]) => !t.includes(n))
        .reduce((n, [r, i]) => Object.assign(Object.assign({}, n), { [r]: i }), {});
}
const Ga = globalThis != null && globalThis.document ? k.useLayoutEffect : () => {};
let Pr = 0;
function ja(e) {
    const [t, n] = k.useState(e),
        r = e || t;
    return (
        k.useEffect(() => {
            t == null && ((Pr += 1), n(`aksel-id-${Pr}`));
        }, [t]),
        r
    );
}
const Ur = K.useId;
function Ca(e) {
    var t;
    if (Ur !== void 0) {
        const n = Ur();
        return e ?? n.replace(/(:)/g, '');
    }
    return (t = ja(e)) !== null && t !== void 0 ? t : '';
}
function Kr(e, t = []) {
    const n = k.useRef(e);
    return (
        k.useEffect(() => {
            n.current = e;
        }),
        k.useCallback((...r) => {
            var i;
            return (i = n.current) === null || i === void 0 ? void 0 : i.call(n, ...r);
        }, t)
    );
}
function Fa({ value: e, defaultValue: t, onChange: n }) {
    const r = Kr(n),
        [i, s] = k.useState(t),
        a = e !== void 0,
        o = a ? e : i,
        l = Kr(
            (p) => {
                const c = typeof p == 'function' ? p(o) : p;
                a || s(c), r(c);
            },
            [a, r, o],
        );
    return [o, l];
}
const Yn = k.createContext({ headingSize: 'small', size: 'medium', openItems: [], mounted: !1 });
var Ma = function (e, t) {
    var n = {};
    for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
        for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
            t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
    return n;
};
const Wn = k.createContext(null),
    xa = k.forwardRef((e, t) => {
        var { children: n, className: r, open: i, defaultOpen: s = !1, onOpenChange: a } = e,
            o = Ma(e, ['children', 'className', 'open', 'defaultOpen', 'onOpenChange']);
        const [l, p] = Fa({ defaultValue: s, value: i, onChange: a }),
            f = k.useContext(Yn),
            c = k.useRef(!(i || s)),
            g = () => {
                p((h) => !h), (c.current = !0);
            };
        return (
            (f != null && f.mounted) || console.error('<Accordion.Item> has to be used within an <Accordion>'),
            K.createElement(
                'div',
                Object.assign(
                    {
                        className: Ce('navds-accordion__item', r, {
                            'navds-accordion__item--open': l,
                            'navds-accordion__item--neutral': (f == null ? void 0 : f.variant) === 'neutral',
                            'navds-accordion__item--no-animation': !c.current,
                        }),
                        ref: t,
                    },
                    zn(o, ['onClick']),
                ),
                K.createElement(Wn.Provider, { value: { open: l, toggleOpen: g } }, n),
            )
        );
    });
var Ba = function (e, t) {
    var n = {};
    for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
        for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
            t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
    return n;
};
const Va = k.forwardRef((e, t) => {
    var { children: n, className: r } = e,
        i = Ba(e, ['children', 'className']);
    const s = k.useContext(Wn);
    return s === null
        ? (console.error('<Accordion.Content> has to be used within an <Accordion.Item>'), null)
        : K.createElement(
              Wi,
              Object.assign({}, i, {
                  as: 'div',
                  ref: t,
                  className: Ce('navds-accordion__content', { 'navds-accordion__content--closed': !s.open }, r),
                  'aria-hidden': !s.open || void 0,
              }),
              n,
          );
});
let Gr = 0;
function qa(e) {
    const [t, n] = k.useState(e),
        r = e || t;
    return (
        k.useEffect(() => {
            t == null && ((Gr += 1), n(`aksel-icon-${Gr}`));
        }, [t]),
        r
    );
}
const jr = K.useId;
function ze(e) {
    var t;
    if (jr !== void 0) {
        const n = jr();
        return e ?? n.replace(/(:)/g, '');
    }
    return (t = qa(e)) !== null && t !== void 0 ? t : '';
}
var Ha = function (e, t) {
    var n = {};
    for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
        for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
            t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
    return n;
};
const Ja = k.forwardRef((e, t) => {
        var { title: n, titleId: r } = e,
            i = Ha(e, ['title', 'titleId']);
        let s = ze();
        return (
            (s = n ? r || 'title-' + s : void 0),
            k.createElement(
                'svg',
                Object.assign(
                    {
                        width: '1em',
                        height: '1em',
                        viewBox: '0 0 24 24',
                        fill: 'none',
                        xmlns: 'http://www.w3.org/2000/svg',
                        focusable: !1,
                        role: 'img',
                        ref: t,
                        'aria-labelledby': s,
                    },
                    i,
                ),
                n ? k.createElement('title', { id: s }, n) : null,
                k.createElement('path', {
                    fillRule: 'evenodd',
                    clipRule: 'evenodd',
                    d: 'M12 21.75c5.385 0 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25 2.25 6.615 2.25 12s4.365 9.75 9.75 9.75Zm4.954-12.475a.813.813 0 0 0-1.24-1.05l-5.389 6.368L7.7 11.967a.812.812 0 0 0-1.15 1.15l3.25 3.25a.812.812 0 0 0 1.195-.05l5.959-7.042Z',
                    fill: 'currentColor',
                }),
            )
        );
    }),
    $a = Ja;
var za = function (e, t) {
    var n = {};
    for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
        for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
            t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
    return n;
};
const Ya = k.forwardRef((e, t) => {
        var { title: n, titleId: r } = e,
            i = za(e, ['title', 'titleId']);
        let s = ze();
        return (
            (s = n ? r || 'title-' + s : void 0),
            k.createElement(
                'svg',
                Object.assign(
                    {
                        width: '1em',
                        height: '1em',
                        viewBox: '0 0 24 24',
                        fill: 'none',
                        xmlns: 'http://www.w3.org/2000/svg',
                        focusable: !1,
                        role: 'img',
                        ref: t,
                        'aria-labelledby': s,
                    },
                    i,
                ),
                n ? k.createElement('title', { id: s }, n) : null,
                k.createElement('path', {
                    fillRule: 'evenodd',
                    clipRule: 'evenodd',
                    d: 'M5.97 9.47a.75.75 0 0 1 1.06 0L12 14.44l4.97-4.97a.75.75 0 1 1 1.06 1.06l-5.5 5.5a.75.75 0 0 1-1.06 0l-5.5-5.5a.75.75 0 0 1 0-1.06Z',
                    fill: 'currentColor',
                }),
            )
        );
    }),
    Wa = Ya;
var Xa = function (e, t) {
    var n = {};
    for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
        for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
            t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
    return n;
};
const Za = k.forwardRef((e, t) => {
        var { title: n, titleId: r } = e,
            i = Xa(e, ['title', 'titleId']);
        let s = ze();
        return (
            (s = n ? r || 'title-' + s : void 0),
            k.createElement(
                'svg',
                Object.assign(
                    {
                        width: '1em',
                        height: '1em',
                        viewBox: '0 0 24 24',
                        fill: 'none',
                        xmlns: 'http://www.w3.org/2000/svg',
                        focusable: !1,
                        role: 'img',
                        ref: t,
                        'aria-labelledby': s,
                    },
                    i,
                ),
                n ? k.createElement('title', { id: s }, n) : null,
                k.createElement('path', {
                    fillRule: 'evenodd',
                    clipRule: 'evenodd',
                    d: 'M12 2.25a.75.75 0 0 1 .656.387l9.527 17.25A.75.75 0 0 1 21.526 21H2.474a.75.75 0 0 1-.657-1.113l9.526-17.25A.75.75 0 0 1 12 2.25ZM12 8.75a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0v-4a.75.75 0 0 1 .75-.75Zm-1 7.75a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z',
                    fill: 'currentColor',
                }),
            )
        );
    }),
    Qa = Za;
var eo = function (e, t) {
    var n = {};
    for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
        for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
            t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
    return n;
};
const to = k.forwardRef((e, t) => {
        var { title: n, titleId: r } = e,
            i = eo(e, ['title', 'titleId']);
        let s = ze();
        return (
            (s = n ? r || 'title-' + s : void 0),
            k.createElement(
                'svg',
                Object.assign(
                    {
                        width: '1em',
                        height: '1em',
                        viewBox: '0 0 24 24',
                        fill: 'none',
                        xmlns: 'http://www.w3.org/2000/svg',
                        focusable: !1,
                        role: 'img',
                        ref: t,
                        'aria-labelledby': s,
                    },
                    i,
                ),
                n ? k.createElement('title', { id: s }, n) : null,
                k.createElement('path', {
                    fillRule: 'evenodd',
                    clipRule: 'evenodd',
                    d: 'M3.25 4A.75.75 0 0 1 4 3.25h16a.75.75 0 0 1 .75.75v16a.75.75 0 0 1-.75.75H4a.75.75 0 0 1-.75-.75V4ZM11 7.75a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm-1.25 3a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 .75.75v4.75h.75a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1 0-1.5h.75v-4h-.75a.75.75 0 0 1-.75-.75Z',
                    fill: 'currentColor',
                }),
            )
        );
    }),
    no = to;
var ro = function (e, t) {
    var n = {};
    for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
        for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
            t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
    return n;
};
const io = k.forwardRef((e, t) => {
        var { title: n, titleId: r } = e,
            i = ro(e, ['title', 'titleId']);
        let s = ze();
        return (
            (s = n ? r || 'title-' + s : void 0),
            k.createElement(
                'svg',
                Object.assign(
                    {
                        width: '1em',
                        height: '1em',
                        viewBox: '0 0 24 24',
                        fill: 'none',
                        xmlns: 'http://www.w3.org/2000/svg',
                        focusable: !1,
                        role: 'img',
                        ref: t,
                        'aria-labelledby': s,
                    },
                    i,
                ),
                n ? k.createElement('title', { id: s }, n) : null,
                k.createElement('path', {
                    d: 'M6.53 5.47a.75.75 0 0 0-1.06 1.06L10.94 12l-5.47 5.47a.75.75 0 1 0 1.06 1.06L12 13.06l5.47 5.47a.75.75 0 1 0 1.06-1.06L13.06 12l5.47-5.47a.75.75 0 0 0-1.06-1.06L12 10.94 6.53 5.47Z',
                    fill: 'currentColor',
                }),
            )
        );
    }),
    so = io;
var ao = function (e, t) {
    var n = {};
    for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
        for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
            t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
    return n;
};
const oo = k.forwardRef((e, t) => {
        var { title: n, titleId: r } = e,
            i = ao(e, ['title', 'titleId']);
        let s = ze();
        return (
            (s = n ? r || 'title-' + s : void 0),
            k.createElement(
                'svg',
                Object.assign(
                    {
                        width: '1em',
                        height: '1em',
                        viewBox: '0 0 24 24',
                        fill: 'none',
                        xmlns: 'http://www.w3.org/2000/svg',
                        focusable: !1,
                        role: 'img',
                        ref: t,
                        'aria-labelledby': s,
                    },
                    i,
                ),
                n ? k.createElement('title', { id: s }, n) : null,
                k.createElement('path', {
                    fillRule: 'evenodd',
                    clipRule: 'evenodd',
                    d: 'M7.742 2.47a.75.75 0 0 1 .53-.22h7.456a.75.75 0 0 1 .53.22l5.272 5.272c.141.14.22.331.22.53v7.456a.75.75 0 0 1-.22.53l-5.272 5.272a.75.75 0 0 1-.53.22H8.272a.75.75 0 0 1-.53-.22L2.47 16.258a.75.75 0 0 1-.22-.53V8.272a.75.75 0 0 1 .22-.53L7.742 2.47Zm1.288 5.5a.75.75 0 0 0-1.06 1.06L10.94 12l-2.97 2.97a.75.75 0 1 0 1.06 1.06L12 13.06l2.97 2.97a.75.75 0 1 0 1.06-1.06L13.06 12l2.97-2.97a.75.75 0 0 0-1.06-1.06L12 10.94 9.03 7.97Z',
                    fill: 'currentColor',
                }),
            )
        );
    }),
    lo = oo;
function Zi(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
    return function (i) {
        if ((e == null || e(i), n === !1 || !i.defaultPrevented)) return t == null ? void 0 : t(i);
    };
}
var uo = function (e, t) {
    var n = {};
    for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
        for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
            t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
    return n;
};
const co = k.forwardRef((e, t) => {
    var n,
        { children: r, className: i, onClick: s } = e,
        a = uo(e, ['children', 'className', 'onClick']);
    const o = k.useContext(Wn),
        l = k.useContext(Yn);
    return o === null
        ? (console.error(
              '<Accordion.Header> has to be used within an <Accordion.Item>, which in turn must be within an <Accordion>',
          ),
          null)
        : K.createElement(
              'button',
              Object.assign({ ref: t }, a, {
                  className: Ce('navds-accordion__header', i),
                  onClick: Zi(s, o.toggleOpen),
                  'aria-expanded': o.open,
                  type: 'button',
              }),
              K.createElement(
                  'span',
                  { className: 'navds-accordion__icon-wrapper' },
                  K.createElement(Wa, {
                      className: 'navds-accordion__header-chevron',
                      title: 'Vis mer',
                      'aria-hidden': !0,
                  }),
              ),
              K.createElement(
                  Xi,
                  {
                      size: (n = l == null ? void 0 : l.headingSize) !== null && n !== void 0 ? n : 'small',
                      as: 'span',
                      className: 'navds-accordion__header-content',
                  },
                  r,
              ),
          );
});
var fo = function (e, t) {
    var n = {};
    for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
        for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
            t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
    return n;
};
const Bt = k.forwardRef((e, t) => {
    var { className: n, variant: r = 'default', headingSize: i = 'small', size: s = 'medium', indent: a = !0 } = e,
        o = fo(e, ['className', 'variant', 'headingSize', 'size', 'indent']);
    return K.createElement(
        Yn.Provider,
        { value: { variant: r, headingSize: i, size: s, mounted: !0 } },
        K.createElement(
            'div',
            Object.assign({}, o, {
                className: Ce('navds-accordion', n, `navds-accordion--${s}`, { 'navds-accordion--indent': a }),
                ref: t,
            }),
        ),
    );
});
Bt.Header = co;
Bt.Content = Va;
Bt.Item = xa;
const Et = Bt;
function po(e) {
    return (t) => {
        e.forEach((n) => {
            typeof n == 'function' ? n(t) : n != null && (n.current = t);
        });
    };
}
function go(...e) {
    return K.useCallback(po(e), e);
}
var mo = function (e, t) {
    var n = {};
    for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
        for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
            t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
    return n;
};
const ho = k.forwardRef((e, t) => {
    var {
            className: n,
            size: r = 'medium',
            title: i = 'venter...',
            transparent: s = !1,
            variant: a = 'neutral',
            id: o,
        } = e,
        l = mo(e, ['className', 'size', 'title', 'transparent', 'variant', 'id']);
    const p = Ca();
    return K.createElement(
        'svg',
        Object.assign(
            {
                'aria-labelledby': o ?? `loader-${p}`,
                ref: t,
                className: Ce('navds-loader', n, `navds-loader--${r}`, `navds-loader--${a}`, {
                    'navds-loader--transparent': s,
                }),
                focusable: 'false',
                viewBox: '0 0 50 50',
                preserveAspectRatio: 'xMidYMid',
            },
            zn(l, ['children']),
        ),
        K.createElement('title', { id: o ?? `loader-${p}` }, i),
        K.createElement('circle', {
            className: 'navds-loader__background',
            xmlns: 'http://www.w3.org/2000/svg',
            cx: '25',
            cy: '25',
            r: '20',
            fill: 'none',
        }),
        K.createElement('circle', {
            className: 'navds-loader__foreground',
            cx: '25',
            cy: '25',
            r: '20',
            fill: 'none',
            strokeDasharray: '50 155',
        }),
    );
});
var vo = function (e, t) {
    var n = {};
    for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
        for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
            t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
    return n;
};
const Xn = k.forwardRef((e, t) => {
    var {
            as: n = 'button',
            variant: r = 'primary',
            className: i,
            children: s,
            size: a = 'medium',
            loading: o = !1,
            disabled: l,
            style: p,
            icon: f,
            iconPosition: c = 'left',
        } = e,
        g = vo(e, [
            'as',
            'variant',
            'className',
            'children',
            'size',
            'loading',
            'disabled',
            'style',
            'icon',
            'iconPosition',
        ]);
    const h = k.useRef(null),
        [u, d] = k.useState(),
        y = go(h, t);
    Ga(() => {
        if (o) {
            const D = window.requestAnimationFrame(() => {
                var L, m;
                d(
                    (m =
                        (L = h == null ? void 0 : h.current) === null || L === void 0
                            ? void 0
                            : L.getBoundingClientRect()) === null || m === void 0
                        ? void 0
                        : m.width,
                );
            });
            return () => {
                d(void 0), cancelAnimationFrame(D);
            };
        }
    }, [o, s]);
    const P = l ?? u ? zn(g, ['href']) : g,
        q = (D) => {
            D.key === ' ' && !l && !u && D.currentTarget.click();
        };
    return K.createElement(
        n,
        Object.assign({}, n !== 'button' ? { role: 'button' } : {}, P, {
            ref: y,
            onKeyUp: Zi(P.onKeyUp, q),
            className: Ce(i, 'navds-button', `navds-button--${r}`, `navds-button--${a}`, {
                'navds-button--loading': u,
                'navds-button--icon-only': !!f && !s,
                'navds-button--disabled': l ?? u,
            }),
            style: Object.assign(Object.assign({}, p), { width: u }),
            disabled: l ?? u ? !0 : void 0,
        }),
        u
            ? K.createElement(ho, { size: a })
            : K.createElement(
                  K.Fragment,
                  null,
                  f && c === 'left' && K.createElement('span', { className: 'navds-button__icon' }, f),
                  s && K.createElement(Da, { as: 'span', size: a === 'medium' ? 'medium' : 'small' }, s),
                  f && c === 'right' && K.createElement('span', { className: 'navds-button__icon' }, f),
              ),
    );
});
var Qi = function (e, t) {
    var n = {};
    for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
        for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
            t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
    return n;
};
const _o = (e) => {
        var { variant: t } = e,
            n = Qi(e, ['variant']);
        switch (t) {
            case 'error':
                return K.createElement(lo, Object.assign({ title: 'Feil' }, n));
            case 'warning':
                return K.createElement(Qa, Object.assign({ title: 'Advarsel' }, n));
            case 'info':
                return K.createElement(no, Object.assign({ title: 'Informasjon' }, n));
            case 'success':
                return K.createElement($a, Object.assign({ title: 'Suksess' }, n));
            default:
                return null;
        }
    },
    es = k.forwardRef((e, t) => {
        var {
                children: n,
                className: r,
                variant: i,
                size: s = 'medium',
                fullWidth: a = !1,
                inline: o = !1,
                closeButton: l = !1,
                onClose: p,
            } = e,
            f = Qi(e, ['children', 'className', 'variant', 'size', 'fullWidth', 'inline', 'closeButton', 'onClose']);
        return K.createElement(
            'div',
            Object.assign({}, f, {
                ref: t,
                className: Ce(r, 'navds-alert', `navds-alert--${i}`, `navds-alert--${s}`, {
                    'navds-alert--full-width': a,
                    'navds-alert--inline': o,
                    'navds-alert--close-button': l,
                }),
            }),
            K.createElement(_o, { variant: i, className: 'navds-alert__icon' }),
            K.createElement(Wi, { as: 'div', size: s, className: 'navds-alert__wrapper' }, n),
            l &&
                !o &&
                K.createElement(
                    'div',
                    { className: 'navds-alert__button-wrapper' },
                    K.createElement(Xn, {
                        className: 'navds-alert__button',
                        size: 'small',
                        variant: 'tertiary-neutral',
                        onClick: p,
                        type: 'button',
                        icon: K.createElement(so, { title: 'Lukk Alert' }),
                    }),
                ),
        );
    });
let Cr = 0;
function Eo(e) {
    const [t, n] = k.useState(e),
        r = e || t;
    return (
        k.useEffect(() => {
            t == null && ((Cr += 1), n(`aksel-icon-${Cr}`));
        }, [t]),
        r
    );
}
const Fr = K.useId;
function yo(e) {
    var t;
    if (Fr !== void 0) {
        const n = Fr();
        return e ?? n.replace(/(:)/g, '');
    }
    return (t = Eo(e)) !== null && t !== void 0 ? t : '';
}
var Io = function (e, t) {
    var n = {};
    for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
        for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
            t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
    return n;
};
const bo = k.forwardRef((e, t) => {
    var { title: n, titleId: r } = e,
        i = Io(e, ['title', 'titleId']);
    let s = yo();
    return (
        (s = n ? r || 'title-' + s : void 0),
        k.createElement(
            'svg',
            Object.assign(
                {
                    width: '1em',
                    height: '1em',
                    viewBox: '0 0 24 24',
                    fill: 'none',
                    xmlns: 'http://www.w3.org/2000/svg',
                    focusable: !1,
                    role: 'img',
                    ref: t,
                    'aria-labelledby': s,
                },
                i,
            ),
            n ? k.createElement('title', { id: s }, n) : null,
            k.createElement('path', {
                fillRule: 'evenodd',
                clipRule: 'evenodd',
                d: 'M21 4.385 13.385 12 21 19.615 19.615 21 12 13.385 4.385 21 3 19.615 10.615 12 3 4.385 4.385 3 12 10.615 19.615 3 21 4.385Z',
                fill: 'currentColor',
            }),
        )
    );
});
class Sn extends k.Component {
    constructor(t) {
        super(t),
            (this.componentDidMount = () => {
                this.props.timeout &&
                    (this.timerHandle = setTimeout(() => {
                        this.lukkVarsel();
                    }, this.props.timeout));
            }),
            (this.lukkVarsel = () => {
                this.setState({ display: !1 }), this.props.onLukkVarsel && this.props.onLukkVarsel();
            }),
            (this.state = { display: !0 });
    }
    componentWillUnmount() {
        clearTimeout(this.timerHandle);
    }
    render() {
        return N.jsx('div', {
            children:
                this.state.display &&
                N.jsx('div', {
                    ref: this.props.varselRef,
                    id: 'varsel_innhold',
                    tabIndex: this.state.display ? 0 : -1,
                    children: N.jsx(es, {
                        variant: this.props.type,
                        className: wa('varsel', this.props.className),
                        children: N.jsxs('div', {
                            className: 'varsel__innhold',
                            children: [
                                N.jsx('div', { children: this.props.children }),
                                this.props.kanLukkes &&
                                    N.jsx(N.Fragment, {
                                        children: N.jsx(Xn, {
                                            className: 'varsel__innhold__lukknapp',
                                            variant: 'tertiary',
                                            icon: N.jsx(bo, { color: 'black', style: { backgroundColor: 'none' } }),
                                            onClick: this.lukkVarsel,
                                        }),
                                    }),
                            ],
                        }),
                    }),
                }),
        });
    }
}
Sn.__docgenInfo = {
    description: '',
    methods: [
        { name: 'componentDidMount', docblock: null, modifiers: [], params: [], returns: { type: { name: 'void' } } },
        { name: 'lukkVarsel', docblock: null, modifiers: [], params: [], returns: null },
    ],
    displayName: 'VarselKomponent',
    props: {
        timeout: { required: !1, tsType: { name: 'number' }, description: '' },
        kanLukkes: { required: !1, tsType: { name: 'boolean' }, description: '' },
        onLukkVarsel: {
            required: !1,
            tsType: {
                name: 'signature',
                type: 'function',
                raw: '() => void',
                signature: { arguments: [], return: { name: 'void' } },
            },
            description: '',
        },
        type: {
            required: !0,
            tsType: { name: "AlertProps['variant']", raw: "AlertProps['variant']" },
            description: '',
        },
        className: { required: !1, tsType: { name: 'string' }, description: '' },
        varselRef: { required: !1, tsType: { name: 'any' }, description: '' },
    },
};
k.createContext(() => {});
class Vt extends Error {}
class ts extends Vt {}
class So extends Vt {}
class To extends Error {}
class ns extends Error {}
function Zn() {
    return typeof window == 'object' && (window == null ? void 0 : window.document) !== void 0;
}
var Ao = function () {
        var e;
        if (Zn()) {
            var t = window,
                n = Array;
            if (t.Prototype !== void 0 && ((e = n.prototype) === null || e === void 0 ? void 0 : e.toJSON) !== void 0)
                return delete n.prototype.toJSON, !0;
        }
        return !1;
    },
    rs = { exports: {} };
(function (e) {
    (function (t) {
        function n(m, O) {
            var E = (m & 65535) + (O & 65535),
                G = (m >> 16) + (O >> 16) + (E >> 16);
            return (G << 16) | (E & 65535);
        }
        function r(m, O) {
            return (m << O) | (m >>> (32 - O));
        }
        function i(m, O, E, G, V, H) {
            return n(r(n(n(O, m), n(G, H)), V), E);
        }
        function s(m, O, E, G, V, H, Z) {
            return i((O & E) | (~O & G), m, O, V, H, Z);
        }
        function a(m, O, E, G, V, H, Z) {
            return i((O & G) | (E & ~G), m, O, V, H, Z);
        }
        function o(m, O, E, G, V, H, Z) {
            return i(O ^ E ^ G, m, O, V, H, Z);
        }
        function l(m, O, E, G, V, H, Z) {
            return i(E ^ (O | ~G), m, O, V, H, Z);
        }
        function p(m, O) {
            (m[O >> 5] |= 128 << O % 32), (m[(((O + 64) >>> 9) << 4) + 14] = O);
            var E,
                G,
                V,
                H,
                Z,
                b = 1732584193,
                I = -271733879,
                S = -1732584194,
                T = 271733878;
            for (E = 0; E < m.length; E += 16)
                (G = b),
                    (V = I),
                    (H = S),
                    (Z = T),
                    (b = s(b, I, S, T, m[E], 7, -680876936)),
                    (T = s(T, b, I, S, m[E + 1], 12, -389564586)),
                    (S = s(S, T, b, I, m[E + 2], 17, 606105819)),
                    (I = s(I, S, T, b, m[E + 3], 22, -1044525330)),
                    (b = s(b, I, S, T, m[E + 4], 7, -176418897)),
                    (T = s(T, b, I, S, m[E + 5], 12, 1200080426)),
                    (S = s(S, T, b, I, m[E + 6], 17, -1473231341)),
                    (I = s(I, S, T, b, m[E + 7], 22, -45705983)),
                    (b = s(b, I, S, T, m[E + 8], 7, 1770035416)),
                    (T = s(T, b, I, S, m[E + 9], 12, -1958414417)),
                    (S = s(S, T, b, I, m[E + 10], 17, -42063)),
                    (I = s(I, S, T, b, m[E + 11], 22, -1990404162)),
                    (b = s(b, I, S, T, m[E + 12], 7, 1804603682)),
                    (T = s(T, b, I, S, m[E + 13], 12, -40341101)),
                    (S = s(S, T, b, I, m[E + 14], 17, -1502002290)),
                    (I = s(I, S, T, b, m[E + 15], 22, 1236535329)),
                    (b = a(b, I, S, T, m[E + 1], 5, -165796510)),
                    (T = a(T, b, I, S, m[E + 6], 9, -1069501632)),
                    (S = a(S, T, b, I, m[E + 11], 14, 643717713)),
                    (I = a(I, S, T, b, m[E], 20, -373897302)),
                    (b = a(b, I, S, T, m[E + 5], 5, -701558691)),
                    (T = a(T, b, I, S, m[E + 10], 9, 38016083)),
                    (S = a(S, T, b, I, m[E + 15], 14, -660478335)),
                    (I = a(I, S, T, b, m[E + 4], 20, -405537848)),
                    (b = a(b, I, S, T, m[E + 9], 5, 568446438)),
                    (T = a(T, b, I, S, m[E + 14], 9, -1019803690)),
                    (S = a(S, T, b, I, m[E + 3], 14, -187363961)),
                    (I = a(I, S, T, b, m[E + 8], 20, 1163531501)),
                    (b = a(b, I, S, T, m[E + 13], 5, -1444681467)),
                    (T = a(T, b, I, S, m[E + 2], 9, -51403784)),
                    (S = a(S, T, b, I, m[E + 7], 14, 1735328473)),
                    (I = a(I, S, T, b, m[E + 12], 20, -1926607734)),
                    (b = o(b, I, S, T, m[E + 5], 4, -378558)),
                    (T = o(T, b, I, S, m[E + 8], 11, -2022574463)),
                    (S = o(S, T, b, I, m[E + 11], 16, 1839030562)),
                    (I = o(I, S, T, b, m[E + 14], 23, -35309556)),
                    (b = o(b, I, S, T, m[E + 1], 4, -1530992060)),
                    (T = o(T, b, I, S, m[E + 4], 11, 1272893353)),
                    (S = o(S, T, b, I, m[E + 7], 16, -155497632)),
                    (I = o(I, S, T, b, m[E + 10], 23, -1094730640)),
                    (b = o(b, I, S, T, m[E + 13], 4, 681279174)),
                    (T = o(T, b, I, S, m[E], 11, -358537222)),
                    (S = o(S, T, b, I, m[E + 3], 16, -722521979)),
                    (I = o(I, S, T, b, m[E + 6], 23, 76029189)),
                    (b = o(b, I, S, T, m[E + 9], 4, -640364487)),
                    (T = o(T, b, I, S, m[E + 12], 11, -421815835)),
                    (S = o(S, T, b, I, m[E + 15], 16, 530742520)),
                    (I = o(I, S, T, b, m[E + 2], 23, -995338651)),
                    (b = l(b, I, S, T, m[E], 6, -198630844)),
                    (T = l(T, b, I, S, m[E + 7], 10, 1126891415)),
                    (S = l(S, T, b, I, m[E + 14], 15, -1416354905)),
                    (I = l(I, S, T, b, m[E + 5], 21, -57434055)),
                    (b = l(b, I, S, T, m[E + 12], 6, 1700485571)),
                    (T = l(T, b, I, S, m[E + 3], 10, -1894986606)),
                    (S = l(S, T, b, I, m[E + 10], 15, -1051523)),
                    (I = l(I, S, T, b, m[E + 1], 21, -2054922799)),
                    (b = l(b, I, S, T, m[E + 8], 6, 1873313359)),
                    (T = l(T, b, I, S, m[E + 15], 10, -30611744)),
                    (S = l(S, T, b, I, m[E + 6], 15, -1560198380)),
                    (I = l(I, S, T, b, m[E + 13], 21, 1309151649)),
                    (b = l(b, I, S, T, m[E + 4], 6, -145523070)),
                    (T = l(T, b, I, S, m[E + 11], 10, -1120210379)),
                    (S = l(S, T, b, I, m[E + 2], 15, 718787259)),
                    (I = l(I, S, T, b, m[E + 9], 21, -343485551)),
                    (b = n(b, G)),
                    (I = n(I, V)),
                    (S = n(S, H)),
                    (T = n(T, Z));
            return [b, I, S, T];
        }
        function f(m) {
            var O,
                E = '',
                G = m.length * 32;
            for (O = 0; O < G; O += 8) E += String.fromCharCode((m[O >> 5] >>> O % 32) & 255);
            return E;
        }
        function c(m) {
            var O,
                E = [];
            for (E[(m.length >> 2) - 1] = void 0, O = 0; O < E.length; O += 1) E[O] = 0;
            var G = m.length * 8;
            for (O = 0; O < G; O += 8) E[O >> 5] |= (m.charCodeAt(O / 8) & 255) << O % 32;
            return E;
        }
        function g(m) {
            return f(p(c(m), m.length * 8));
        }
        function h(m, O) {
            var E,
                G = c(m),
                V = [],
                H = [],
                Z;
            for (V[15] = H[15] = void 0, G.length > 16 && (G = p(G, m.length * 8)), E = 0; E < 16; E += 1)
                (V[E] = G[E] ^ 909522486), (H[E] = G[E] ^ 1549556828);
            return (Z = p(V.concat(c(O)), 512 + O.length * 8)), f(p(H.concat(Z), 640));
        }
        function u(m) {
            var O = '0123456789abcdef',
                E = '',
                G,
                V;
            for (V = 0; V < m.length; V += 1) (G = m.charCodeAt(V)), (E += O.charAt((G >>> 4) & 15) + O.charAt(G & 15));
            return E;
        }
        function d(m) {
            return unescape(encodeURIComponent(m));
        }
        function y(m) {
            return g(d(m));
        }
        function P(m) {
            return u(y(m));
        }
        function q(m, O) {
            return h(d(m), d(O));
        }
        function D(m, O) {
            return u(q(m, O));
        }
        function L(m, O, E) {
            return O ? (E ? q(O, m) : D(O, m)) : E ? y(m) : P(m);
        }
        e.exports ? (e.exports = L) : (t.md5 = L);
    })(Ve);
})(rs);
var No = rs.exports;
const Ro = $n(No),
    is = '%[a-f0-9]{2}',
    Mr = new RegExp('(' + is + ')|([^%]+?)', 'gi'),
    xr = new RegExp('(' + is + ')+', 'gi');
function Tn(e, t) {
    try {
        return [decodeURIComponent(e.join(''))];
    } catch {}
    if (e.length === 1) return e;
    t = t || 1;
    const n = e.slice(0, t),
        r = e.slice(t);
    return Array.prototype.concat.call([], Tn(n), Tn(r));
}
function Oo(e) {
    try {
        return decodeURIComponent(e);
    } catch {
        let t = e.match(Mr) || [];
        for (let n = 1; n < t.length; n++) (e = Tn(t, n).join('')), (t = e.match(Mr) || []);
        return e;
    }
}
function ko(e) {
    const t = { '%FE%FF': '��', '%FF%FE': '��' };
    let n = xr.exec(e);
    for (; n; ) {
        try {
            t[n[0]] = decodeURIComponent(n[0]);
        } catch {
            const i = Oo(n[0]);
            i !== n[0] && (t[n[0]] = i);
        }
        n = xr.exec(e);
    }
    t['%C2'] = '�';
    const r = Object.keys(t);
    for (const i of r) e = e.replace(new RegExp(i, 'g'), t[i]);
    return e;
}
function Do(e) {
    if (typeof e != 'string')
        throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof e + '`');
    try {
        return decodeURIComponent(e);
    } catch {
        return ko(e);
    }
}
function ss(e, t) {
    if (!(typeof e == 'string' && typeof t == 'string'))
        throw new TypeError('Expected the arguments to be of type `string`');
    if (e === '' || t === '') return [];
    const n = e.indexOf(t);
    return n === -1 ? [] : [e.slice(0, n), e.slice(n + t.length)];
}
function wo(e, t) {
    const n = {};
    if (Array.isArray(t))
        for (const r of t) {
            const i = Object.getOwnPropertyDescriptor(e, r);
            i != null && i.enumerable && Object.defineProperty(n, r, i);
        }
    else
        for (const r of Reflect.ownKeys(e)) {
            const i = Object.getOwnPropertyDescriptor(e, r);
            if (i.enumerable) {
                const s = e[r];
                t(r, s, e) && Object.defineProperty(n, r, i);
            }
        }
    return n;
}
const Lo = (e) => e == null,
    Po = (e) => encodeURIComponent(e).replace(/[!'()*]/g, (t) => `%${t.charCodeAt(0).toString(16).toUpperCase()}`),
    An = Symbol('encodeFragmentIdentifier');
function Uo(e) {
    switch (e.arrayFormat) {
        case 'index':
            return (t) => (n, r) => {
                const i = n.length;
                return r === void 0 || (e.skipNull && r === null) || (e.skipEmptyString && r === '')
                    ? n
                    : r === null
                      ? [...n, [W(t, e), '[', i, ']'].join('')]
                      : [...n, [W(t, e), '[', W(i, e), ']=', W(r, e)].join('')];
            };
        case 'bracket':
            return (t) => (n, r) =>
                r === void 0 || (e.skipNull && r === null) || (e.skipEmptyString && r === '')
                    ? n
                    : r === null
                      ? [...n, [W(t, e), '[]'].join('')]
                      : [...n, [W(t, e), '[]=', W(r, e)].join('')];
        case 'colon-list-separator':
            return (t) => (n, r) =>
                r === void 0 || (e.skipNull && r === null) || (e.skipEmptyString && r === '')
                    ? n
                    : r === null
                      ? [...n, [W(t, e), ':list='].join('')]
                      : [...n, [W(t, e), ':list=', W(r, e)].join('')];
        case 'comma':
        case 'separator':
        case 'bracket-separator': {
            const t = e.arrayFormat === 'bracket-separator' ? '[]=' : '=';
            return (n) => (r, i) =>
                i === void 0 || (e.skipNull && i === null) || (e.skipEmptyString && i === '')
                    ? r
                    : ((i = i === null ? '' : i),
                      r.length === 0 ? [[W(n, e), t, W(i, e)].join('')] : [[r, W(i, e)].join(e.arrayFormatSeparator)]);
        }
        default:
            return (t) => (n, r) =>
                r === void 0 || (e.skipNull && r === null) || (e.skipEmptyString && r === '')
                    ? n
                    : r === null
                      ? [...n, W(t, e)]
                      : [...n, [W(t, e), '=', W(r, e)].join('')];
    }
}
function Ko(e) {
    let t;
    switch (e.arrayFormat) {
        case 'index':
            return (n, r, i) => {
                if (((t = /\[(\d*)]$/.exec(n)), (n = n.replace(/\[\d*]$/, '')), !t)) {
                    i[n] = r;
                    return;
                }
                i[n] === void 0 && (i[n] = {}), (i[n][t[1]] = r);
            };
        case 'bracket':
            return (n, r, i) => {
                if (((t = /(\[])$/.exec(n)), (n = n.replace(/\[]$/, '')), !t)) {
                    i[n] = r;
                    return;
                }
                if (i[n] === void 0) {
                    i[n] = [r];
                    return;
                }
                i[n] = [...i[n], r];
            };
        case 'colon-list-separator':
            return (n, r, i) => {
                if (((t = /(:list)$/.exec(n)), (n = n.replace(/:list$/, '')), !t)) {
                    i[n] = r;
                    return;
                }
                if (i[n] === void 0) {
                    i[n] = [r];
                    return;
                }
                i[n] = [...i[n], r];
            };
        case 'comma':
        case 'separator':
            return (n, r, i) => {
                const s = typeof r == 'string' && r.includes(e.arrayFormatSeparator),
                    a = typeof r == 'string' && !s && Ie(r, e).includes(e.arrayFormatSeparator);
                r = a ? Ie(r, e) : r;
                const o = s || a ? r.split(e.arrayFormatSeparator).map((l) => Ie(l, e)) : r === null ? r : Ie(r, e);
                i[n] = o;
            };
        case 'bracket-separator':
            return (n, r, i) => {
                const s = /(\[])$/.test(n);
                if (((n = n.replace(/\[]$/, '')), !s)) {
                    i[n] = r && Ie(r, e);
                    return;
                }
                const a = r === null ? [] : r.split(e.arrayFormatSeparator).map((o) => Ie(o, e));
                if (i[n] === void 0) {
                    i[n] = a;
                    return;
                }
                i[n] = [...i[n], ...a];
            };
        default:
            return (n, r, i) => {
                if (i[n] === void 0) {
                    i[n] = r;
                    return;
                }
                i[n] = [...[i[n]].flat(), r];
            };
    }
}
function as(e) {
    if (typeof e != 'string' || e.length !== 1)
        throw new TypeError('arrayFormatSeparator must be single character string');
}
function W(e, t) {
    return t.encode ? (t.strict ? Po(e) : encodeURIComponent(e)) : e;
}
function Ie(e, t) {
    return t.decode ? Do(e) : e;
}
function os(e) {
    return Array.isArray(e)
        ? e.sort()
        : typeof e == 'object'
          ? os(Object.keys(e))
                .sort((t, n) => Number(t) - Number(n))
                .map((t) => e[t])
          : e;
}
function ls(e) {
    const t = e.indexOf('#');
    return t !== -1 && (e = e.slice(0, t)), e;
}
function Go(e) {
    let t = '';
    const n = e.indexOf('#');
    return n !== -1 && (t = e.slice(n)), t;
}
function Br(e, t) {
    return (
        t.parseNumbers && !Number.isNaN(Number(e)) && typeof e == 'string' && e.trim() !== ''
            ? (e = Number(e))
            : t.parseBooleans &&
              e !== null &&
              (e.toLowerCase() === 'true' || e.toLowerCase() === 'false') &&
              (e = e.toLowerCase() === 'true'),
        e
    );
}
function Qn(e) {
    e = ls(e);
    const t = e.indexOf('?');
    return t === -1 ? '' : e.slice(t + 1);
}
function er(e, t) {
    (t = {
        decode: !0,
        sort: !0,
        arrayFormat: 'none',
        arrayFormatSeparator: ',',
        parseNumbers: !1,
        parseBooleans: !1,
        ...t,
    }),
        as(t.arrayFormatSeparator);
    const n = Ko(t),
        r = Object.create(null);
    if (typeof e != 'string' || ((e = e.trim().replace(/^[?#&]/, '')), !e)) return r;
    for (const i of e.split('&')) {
        if (i === '') continue;
        const s = t.decode ? i.replace(/\+/g, ' ') : i;
        let [a, o] = ss(s, '=');
        a === void 0 && (a = s),
            (o =
                o === void 0
                    ? null
                    : ['comma', 'separator', 'bracket-separator'].includes(t.arrayFormat)
                      ? o
                      : Ie(o, t)),
            n(Ie(a, t), o, r);
    }
    for (const [i, s] of Object.entries(r))
        if (typeof s == 'object' && s !== null) for (const [a, o] of Object.entries(s)) s[a] = Br(o, t);
        else r[i] = Br(s, t);
    return t.sort === !1
        ? r
        : (t.sort === !0 ? Object.keys(r).sort() : Object.keys(r).sort(t.sort)).reduce((i, s) => {
              const a = r[s];
              return a && typeof a == 'object' && !Array.isArray(a) ? (i[s] = os(a)) : (i[s] = a), i;
          }, Object.create(null));
}
function us(e, t) {
    if (!e) return '';
    (t = { encode: !0, strict: !0, arrayFormat: 'none', arrayFormatSeparator: ',', ...t }), as(t.arrayFormatSeparator);
    const n = (a) => (t.skipNull && Lo(e[a])) || (t.skipEmptyString && e[a] === ''),
        r = Uo(t),
        i = {};
    for (const [a, o] of Object.entries(e)) n(a) || (i[a] = o);
    const s = Object.keys(i);
    return (
        t.sort !== !1 && s.sort(t.sort),
        s
            .map((a) => {
                const o = e[a];
                return o === void 0
                    ? ''
                    : o === null
                      ? W(a, t)
                      : Array.isArray(o)
                        ? o.length === 0 && t.arrayFormat === 'bracket-separator'
                            ? W(a, t) + '[]'
                            : o.reduce(r(a), []).join('&')
                        : W(a, t) + '=' + W(o, t);
            })
            .filter((a) => a.length > 0)
            .join('&')
    );
}
function ds(e, t) {
    var i;
    t = { decode: !0, ...t };
    let [n, r] = ss(e, '#');
    return (
        n === void 0 && (n = e),
        {
            url: ((i = n == null ? void 0 : n.split('?')) == null ? void 0 : i[0]) ?? '',
            query: er(Qn(e), t),
            ...(t && t.parseFragmentIdentifier && r ? { fragmentIdentifier: Ie(r, t) } : {}),
        }
    );
}
function cs(e, t) {
    t = { encode: !0, strict: !0, [An]: !0, ...t };
    const n = ls(e.url).split('?')[0] || '',
        r = Qn(e.url),
        i = { ...er(r, { sort: !1 }), ...e.query };
    let s = us(i, t);
    s && (s = `?${s}`);
    let a = Go(e.url);
    if (e.fragmentIdentifier) {
        const o = new URL(n);
        (o.hash = e.fragmentIdentifier), (a = t[An] ? o.hash : `#${e.fragmentIdentifier}`);
    }
    return `${n}${s}${a}`;
}
function fs(e, t, n) {
    n = { parseFragmentIdentifier: !0, [An]: !1, ...n };
    const { url: r, query: i, fragmentIdentifier: s } = ds(e, n);
    return cs({ url: r, query: wo(i, t), fragmentIdentifier: s }, n);
}
function jo(e, t, n) {
    const r = Array.isArray(t) ? (i) => !t.includes(i) : (i, s) => !t(i, s);
    return fs(e, r, n);
}
const cn = Object.freeze(
    Object.defineProperty(
        {
            __proto__: null,
            exclude: jo,
            extract: Qn,
            parse: er,
            parseUrl: ds,
            pick: fs,
            stringify: us,
            stringifyUrl: cs,
        },
        Symbol.toStringTag,
        { value: 'Module' },
    ),
);
var Nn = { exports: {} };
(function (e, t) {
    (function (n, r) {
        var i = '0.7.33',
            s = '',
            a = '?',
            o = 'function',
            l = 'undefined',
            p = 'object',
            f = 'string',
            c = 'major',
            g = 'model',
            h = 'name',
            u = 'type',
            d = 'vendor',
            y = 'version',
            P = 'architecture',
            q = 'console',
            D = 'mobile',
            L = 'tablet',
            m = 'smarttv',
            O = 'wearable',
            E = 'embedded',
            G = 350,
            V = 'Amazon',
            H = 'Apple',
            Z = 'ASUS',
            b = 'BlackBerry',
            I = 'Browser',
            S = 'Chrome',
            T = 'Edge',
            ct = 'Firefox',
            ft = 'Google',
            Tr = 'Huawei',
            rn = 'LG',
            sn = 'Microsoft',
            Ar = 'Motorola',
            pt = 'Opera',
            an = 'Samsung',
            Nr = 'Sharp',
            gt = 'Sony',
            on = 'Xiaomi',
            ln = 'Zebra',
            Rr = 'Facebook',
            Ra = function (j, x) {
                var C = {};
                for (var Y in j) x[Y] && x[Y].length % 2 === 0 ? (C[Y] = x[Y].concat(j[Y])) : (C[Y] = j[Y]);
                return C;
            },
            mt = function (j) {
                for (var x = {}, C = 0; C < j.length; C++) x[j[C].toUpperCase()] = j[C];
                return x;
            },
            Or = function (j, x) {
                return typeof j === f ? Qe(x).indexOf(Qe(j)) !== -1 : !1;
            },
            Qe = function (j) {
                return j.toLowerCase();
            },
            Oa = function (j) {
                return typeof j === f ? j.replace(/[^\d\.]/g, s).split('.')[0] : r;
            },
            un = function (j, x) {
                if (typeof j === f) return (j = j.replace(/^\s\s*/, s)), typeof x === l ? j : j.substring(0, G);
            },
            et = function (j, x) {
                for (var C = 0, Y, F, vt, J, tt, ge; C < x.length && !tt; ) {
                    var wr = x[C],
                        Lr = x[C + 1];
                    for (Y = F = 0; Y < wr.length && !tt; )
                        if (((tt = wr[Y++].exec(j)), tt))
                            for (vt = 0; vt < Lr.length; vt++)
                                (ge = tt[++F]),
                                    (J = Lr[vt]),
                                    typeof J === p && J.length > 0
                                        ? J.length === 2
                                            ? typeof J[1] == o
                                                ? (this[J[0]] = J[1].call(this, ge))
                                                : (this[J[0]] = J[1])
                                            : J.length === 3
                                              ? typeof J[1] === o && !(J[1].exec && J[1].test)
                                                  ? (this[J[0]] = ge ? J[1].call(this, ge, J[2]) : r)
                                                  : (this[J[0]] = ge ? ge.replace(J[1], J[2]) : r)
                                              : J.length === 4 &&
                                                (this[J[0]] = ge ? J[3].call(this, ge.replace(J[1], J[2])) : r)
                                        : (this[J] = ge || r);
                    C += 2;
                }
            },
            dn = function (j, x) {
                for (var C in x)
                    if (typeof x[C] === p && x[C].length > 0) {
                        for (var Y = 0; Y < x[C].length; Y++) if (Or(x[C][Y], j)) return C === a ? r : C;
                    } else if (Or(x[C], j)) return C === a ? r : C;
                return j;
            },
            ka = {
                '1.0': '/8',
                1.2: '/1',
                1.3: '/3',
                '2.0': '/412',
                '2.0.2': '/416',
                '2.0.3': '/417',
                '2.0.4': '/419',
                '?': '/',
            },
            kr = {
                ME: '4.90',
                'NT 3.11': 'NT3.51',
                'NT 4.0': 'NT4.0',
                2e3: 'NT 5.0',
                XP: ['NT 5.1', 'NT 5.2'],
                Vista: 'NT 6.0',
                7: 'NT 6.1',
                8: 'NT 6.2',
                8.1: 'NT 6.3',
                10: ['NT 6.4', 'NT 10.0'],
                RT: 'ARM',
            },
            Dr = {
                browser: [
                    [/\b(?:crmo|crios)\/([\w\.]+)/i],
                    [y, [h, 'Chrome']],
                    [/edg(?:e|ios|a)?\/([\w\.]+)/i],
                    [y, [h, 'Edge']],
                    [
                        /(opera mini)\/([-\w\.]+)/i,
                        /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
                        /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i,
                    ],
                    [h, y],
                    [/opios[\/ ]+([\w\.]+)/i],
                    [y, [h, pt + ' Mini']],
                    [/\bopr\/([\w\.]+)/i],
                    [y, [h, pt]],
                    [
                        /(kindle)\/([\w\.]+)/i,
                        /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
                        /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,
                        /(ba?idubrowser)[\/ ]?([\w\.]+)/i,
                        /(?:ms|\()(ie) ([\w\.]+)/i,
                        /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
                        /(weibo)__([\d\.]+)/i,
                    ],
                    [h, y],
                    [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],
                    [y, [h, 'UC' + I]],
                    [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i],
                    [y, [h, 'WeChat(Win) Desktop']],
                    [/micromessenger\/([\w\.]+)/i],
                    [y, [h, 'WeChat']],
                    [/konqueror\/([\w\.]+)/i],
                    [y, [h, 'Konqueror']],
                    [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],
                    [y, [h, 'IE']],
                    [/yabrowser\/([\w\.]+)/i],
                    [y, [h, 'Yandex']],
                    [/(avast|avg)\/([\w\.]+)/i],
                    [[h, /(.+)/, '$1 Secure ' + I], y],
                    [/\bfocus\/([\w\.]+)/i],
                    [y, [h, ct + ' Focus']],
                    [/\bopt\/([\w\.]+)/i],
                    [y, [h, pt + ' Touch']],
                    [/coc_coc\w+\/([\w\.]+)/i],
                    [y, [h, 'Coc Coc']],
                    [/dolfin\/([\w\.]+)/i],
                    [y, [h, 'Dolphin']],
                    [/coast\/([\w\.]+)/i],
                    [y, [h, pt + ' Coast']],
                    [/miuibrowser\/([\w\.]+)/i],
                    [y, [h, 'MIUI ' + I]],
                    [/fxios\/([-\w\.]+)/i],
                    [y, [h, ct]],
                    [/\bqihu|(qi?ho?o?|360)browser/i],
                    [[h, '360 ' + I]],
                    [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i],
                    [[h, /(.+)/, '$1 ' + I], y],
                    [/(comodo_dragon)\/([\w\.]+)/i],
                    [[h, /_/g, ' '], y],
                    [
                        /(electron)\/([\w\.]+) safari/i,
                        /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
                        /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i,
                    ],
                    [h, y],
                    [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i],
                    [h],
                    [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],
                    [[h, Rr], y],
                    [/safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i],
                    [h, y],
                    [/\bgsa\/([\w\.]+) .*safari\//i],
                    [y, [h, 'GSA']],
                    [/headlesschrome(?:\/([\w\.]+)| )/i],
                    [y, [h, S + ' Headless']],
                    [/ wv\).+(chrome)\/([\w\.]+)/i],
                    [[h, S + ' WebView'], y],
                    [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],
                    [y, [h, 'Android ' + I]],
                    [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],
                    [h, y],
                    [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],
                    [y, [h, 'Mobile Safari']],
                    [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],
                    [y, h],
                    [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],
                    [h, [y, dn, ka]],
                    [/(webkit|khtml)\/([\w\.]+)/i],
                    [h, y],
                    [/(navigator|netscape\d?)\/([-\w\.]+)/i],
                    [[h, 'Netscape'], y],
                    [/mobile vr; rv:([\w\.]+)\).+firefox/i],
                    [y, [h, ct + ' Reality']],
                    [
                        /ekiohf.+(flow)\/([\w\.]+)/i,
                        /(swiftfox)/i,
                        /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
                        /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
                        /(firefox)\/([\w\.]+)/i,
                        /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
                        /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
                        /(links) \(([\w\.]+)/i,
                    ],
                    [h, y],
                    [/(cobalt)\/([\w\.]+)/i],
                    [h, [y, /master.|lts./, '']],
                ],
                cpu: [
                    [/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],
                    [[P, 'amd64']],
                    [/(ia32(?=;))/i],
                    [[P, Qe]],
                    [/((?:i[346]|x)86)[;\)]/i],
                    [[P, 'ia32']],
                    [/\b(aarch64|arm(v?8e?l?|_?64))\b/i],
                    [[P, 'arm64']],
                    [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],
                    [[P, 'armhf']],
                    [/windows (ce|mobile); ppc;/i],
                    [[P, 'arm']],
                    [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],
                    [[P, /ower/, s, Qe]],
                    [/(sun4\w)[;\)]/i],
                    [[P, 'sparc']],
                    [
                        /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i,
                    ],
                    [[P, Qe]],
                ],
                device: [
                    [/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],
                    [g, [d, an], [u, L]],
                    [/\b((?:s[cgp]h|gt|sm)-\w+|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i],
                    [g, [d, an], [u, D]],
                    [/((ipod|iphone)\d+,\d+)/i],
                    [g, [d, H], [u, D]],
                    [/(ipad\d+,\d+)/i],
                    [g, [d, H], [u, L]],
                    [/\((ip(?:hone|od)[\w ]*);/i],
                    [g, [d, H], [u, D]],
                    [
                        /\((ipad);[-\w\),; ]+apple/i,
                        /applecoremedia\/[\w\.]+ \((ipad)/i,
                        /\b(ipad)\d\d?,\d\d?[;\]].+ios/i,
                    ],
                    [g, [d, H], [u, L]],
                    [/(macintosh);/i],
                    [g, [d, H]],
                    [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],
                    [g, [d, Tr], [u, L]],
                    [
                        /(?:huawei|honor)([-\w ]+)[;\)]/i,
                        /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i,
                    ],
                    [g, [d, Tr], [u, D]],
                    [
                        /\b(poco[\w ]+)(?: bui|\))/i,
                        /\b; (\w+) build\/hm\1/i,
                        /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
                        /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
                        /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i,
                    ],
                    [
                        [g, /_/g, ' '],
                        [d, on],
                        [u, D],
                    ],
                    [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],
                    [
                        [g, /_/g, ' '],
                        [d, on],
                        [u, L],
                    ],
                    [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i],
                    [g, [d, 'OPPO'], [u, D]],
                    [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i],
                    [g, [d, 'Vivo'], [u, D]],
                    [/\b(rmx[12]\d{3})(?: bui|;|\))/i],
                    [g, [d, 'Realme'], [u, D]],
                    [
                        /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
                        /\bmot(?:orola)?[- ](\w*)/i,
                        /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i,
                    ],
                    [g, [d, Ar], [u, D]],
                    [/\b(mz60\d|xoom[2 ]{0,2}) build\//i],
                    [g, [d, Ar], [u, L]],
                    [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],
                    [g, [d, rn], [u, L]],
                    [
                        /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
                        /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
                        /\blg-?([\d\w]+) bui/i,
                    ],
                    [g, [d, rn], [u, D]],
                    [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i],
                    [g, [d, 'Lenovo'], [u, L]],
                    [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i],
                    [
                        [g, /_/g, ' '],
                        [d, 'Nokia'],
                        [u, D],
                    ],
                    [/(pixel c)\b/i],
                    [g, [d, ft], [u, L]],
                    [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],
                    [g, [d, ft], [u, D]],
                    [
                        /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i,
                    ],
                    [g, [d, gt], [u, D]],
                    [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i],
                    [
                        [g, 'Xperia Tablet'],
                        [d, gt],
                        [u, L],
                    ],
                    [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],
                    [g, [d, 'OnePlus'], [u, D]],
                    [/(alexa)webm/i, /(kf[a-z]{2}wi)( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i],
                    [g, [d, V], [u, L]],
                    [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],
                    [
                        [g, /(.+)/g, 'Fire Phone $1'],
                        [d, V],
                        [u, D],
                    ],
                    [/(playbook);[-\w\),; ]+(rim)/i],
                    [g, d, [u, L]],
                    [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i],
                    [g, [d, b], [u, D]],
                    [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],
                    [g, [d, Z], [u, L]],
                    [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],
                    [g, [d, Z], [u, D]],
                    [/(nexus 9)/i],
                    [g, [d, 'HTC'], [u, L]],
                    [
                        /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
                        /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
                        /(alcatel|geeksphone|nexian|panasonic|sony(?!-bra))[-_ ]?([-\w]*)/i,
                    ],
                    [d, [g, /_/g, ' '], [u, D]],
                    [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],
                    [g, [d, 'Acer'], [u, L]],
                    [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i],
                    [g, [d, 'Meizu'], [u, D]],
                    [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],
                    [g, [d, Nr], [u, D]],
                    [
                        /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,
                        /(hp) ([\w ]+\w)/i,
                        /(asus)-?(\w+)/i,
                        /(microsoft); (lumia[\w ]+)/i,
                        /(lenovo)[-_ ]?([-\w]+)/i,
                        /(jolla)/i,
                        /(oppo) ?([\w ]+) bui/i,
                    ],
                    [d, g, [u, D]],
                    [
                        /(archos) (gamepad2?)/i,
                        /(hp).+(touchpad(?!.+tablet)|tablet)/i,
                        /(kindle)\/([\w\.]+)/i,
                        /(nook)[\w ]+build\/(\w+)/i,
                        /(dell) (strea[kpr\d ]*[\dko])/i,
                        /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
                        /(trinity)[- ]*(t\d{3}) bui/i,
                        /(gigaset)[- ]+(q\w{1,9}) bui/i,
                        /(vodafone) ([\w ]+)(?:\)| bui)/i,
                    ],
                    [d, g, [u, L]],
                    [/(surface duo)/i],
                    [g, [d, sn], [u, L]],
                    [/droid [\d\.]+; (fp\du?)(?: b|\))/i],
                    [g, [d, 'Fairphone'], [u, D]],
                    [/(u304aa)/i],
                    [g, [d, 'AT&T'], [u, D]],
                    [/\bsie-(\w*)/i],
                    [g, [d, 'Siemens'], [u, D]],
                    [/\b(rct\w+) b/i],
                    [g, [d, 'RCA'], [u, L]],
                    [/\b(venue[\d ]{2,7}) b/i],
                    [g, [d, 'Dell'], [u, L]],
                    [/\b(q(?:mv|ta)\w+) b/i],
                    [g, [d, 'Verizon'], [u, L]],
                    [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],
                    [g, [d, 'Barnes & Noble'], [u, L]],
                    [/\b(tm\d{3}\w+) b/i],
                    [g, [d, 'NuVision'], [u, L]],
                    [/\b(k88) b/i],
                    [g, [d, 'ZTE'], [u, L]],
                    [/\b(nx\d{3}j) b/i],
                    [g, [d, 'ZTE'], [u, D]],
                    [/\b(gen\d{3}) b.+49h/i],
                    [g, [d, 'Swiss'], [u, D]],
                    [/\b(zur\d{3}) b/i],
                    [g, [d, 'Swiss'], [u, L]],
                    [/\b((zeki)?tb.*\b) b/i],
                    [g, [d, 'Zeki'], [u, L]],
                    [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i],
                    [[d, 'Dragon Touch'], g, [u, L]],
                    [/\b(ns-?\w{0,9}) b/i],
                    [g, [d, 'Insignia'], [u, L]],
                    [/\b((nxa|next)-?\w{0,9}) b/i],
                    [g, [d, 'NextBook'], [u, L]],
                    [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],
                    [[d, 'Voice'], g, [u, D]],
                    [/\b(lvtel\-)?(v1[12]) b/i],
                    [[d, 'LvTel'], g, [u, D]],
                    [/\b(ph-1) /i],
                    [g, [d, 'Essential'], [u, D]],
                    [/\b(v(100md|700na|7011|917g).*\b) b/i],
                    [g, [d, 'Envizen'], [u, L]],
                    [/\b(trio[-\w\. ]+) b/i],
                    [g, [d, 'MachSpeed'], [u, L]],
                    [/\btu_(1491) b/i],
                    [g, [d, 'Rotor'], [u, L]],
                    [/(shield[\w ]+) b/i],
                    [g, [d, 'Nvidia'], [u, L]],
                    [/(sprint) (\w+)/i],
                    [d, g, [u, D]],
                    [/(kin\.[onetw]{3})/i],
                    [
                        [g, /\./g, ' '],
                        [d, sn],
                        [u, D],
                    ],
                    [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],
                    [g, [d, ln], [u, L]],
                    [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],
                    [g, [d, ln], [u, D]],
                    [/(ouya)/i, /(nintendo) ([wids3utch]+)/i],
                    [d, g, [u, q]],
                    [/droid.+; (shield) bui/i],
                    [g, [d, 'Nvidia'], [u, q]],
                    [/(playstation [345portablevi]+)/i],
                    [g, [d, gt], [u, q]],
                    [/\b(xbox(?: one)?(?!; xbox))[\); ]/i],
                    [g, [d, sn], [u, q]],
                    [/smart-tv.+(samsung)/i],
                    [d, [u, m]],
                    [/hbbtv.+maple;(\d+)/i],
                    [
                        [g, /^/, 'SmartTV'],
                        [d, an],
                        [u, m],
                    ],
                    [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],
                    [
                        [d, rn],
                        [u, m],
                    ],
                    [/(apple) ?tv/i],
                    [d, [g, H + ' TV'], [u, m]],
                    [/crkey/i],
                    [
                        [g, S + 'cast'],
                        [d, ft],
                        [u, m],
                    ],
                    [/droid.+aft(\w)( bui|\))/i],
                    [g, [d, V], [u, m]],
                    [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i],
                    [g, [d, Nr], [u, m]],
                    [/(bravia[\w ]+)( bui|\))/i],
                    [g, [d, gt], [u, m]],
                    [/(mitv-\w{5}) bui/i],
                    [g, [d, on], [u, m]],
                    [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w ]*; *(\w[^;]*);([^;]*)/i],
                    [
                        [d, un],
                        [g, un],
                        [u, m],
                    ],
                    [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],
                    [[u, m]],
                    [/((pebble))app/i],
                    [d, g, [u, O]],
                    [/droid.+; (glass) \d/i],
                    [g, [d, ft], [u, O]],
                    [/droid.+; (wt63?0{2,3})\)/i],
                    [g, [d, ln], [u, O]],
                    [/(quest( 2)?)/i],
                    [g, [d, Rr], [u, O]],
                    [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],
                    [d, [u, E]],
                    [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i],
                    [g, [u, D]],
                    [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],
                    [g, [u, L]],
                    [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],
                    [[u, L]],
                    [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],
                    [[u, D]],
                    [/(android[-\w\. ]{0,9});.+buil/i],
                    [g, [d, 'Generic']],
                ],
                engine: [
                    [/windows.+ edge\/([\w\.]+)/i],
                    [y, [h, T + 'HTML']],
                    [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],
                    [y, [h, 'Blink']],
                    [
                        /(presto)\/([\w\.]+)/i,
                        /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
                        /ekioh(flow)\/([\w\.]+)/i,
                        /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
                        /(icab)[\/ ]([23]\.[\d\.]+)/i,
                    ],
                    [h, y],
                    [/rv\:([\w\.]{1,9})\b.+(gecko)/i],
                    [y, h],
                ],
                os: [
                    [/microsoft (windows) (vista|xp)/i],
                    [h, y],
                    [
                        /(windows) nt 6\.2; (arm)/i,
                        /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,
                        /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,
                    ],
                    [h, [y, dn, kr]],
                    [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i],
                    [
                        [h, 'Windows'],
                        [y, dn, kr],
                    ],
                    [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /cfnetwork\/.+darwin/i],
                    [
                        [y, /_/g, '.'],
                        [h, 'iOS'],
                    ],
                    [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i],
                    [
                        [h, 'Mac OS'],
                        [y, /_/g, '.'],
                    ],
                    [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],
                    [y, h],
                    [
                        /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
                        /(blackberry)\w*\/([\w\.]*)/i,
                        /(tizen|kaios)[\/ ]([\w\.]+)/i,
                        /\((series40);/i,
                    ],
                    [h, y],
                    [/\(bb(10);/i],
                    [y, [h, b]],
                    [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],
                    [y, [h, 'Symbian']],
                    [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],
                    [y, [h, ct + ' OS']],
                    [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],
                    [y, [h, 'webOS']],
                    [/crkey\/([\d\.]+)/i],
                    [y, [h, S + 'cast']],
                    [/(cros) [\w]+ ([\w\.]+\w)/i],
                    [[h, 'Chromium OS'], y],
                    [
                        /(nintendo|playstation) ([wids345portablevuch]+)/i,
                        /(xbox); +xbox ([^\);]+)/i,
                        /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
                        /(mint)[\/\(\) ]?(\w*)/i,
                        /(mageia|vectorlinux)[; ]/i,
                        /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
                        /(hurd|linux) ?([\w\.]*)/i,
                        /(gnu) ?([\w\.]*)/i,
                        /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
                        /(haiku) (\w+)/i,
                    ],
                    [h, y],
                    [/(sunos) ?([\w\.\d]*)/i],
                    [[h, 'Solaris'], y],
                    [
                        /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
                        /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
                        /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux)/i,
                        /(unix) ?([\w\.]*)/i,
                    ],
                    [h, y],
                ],
            },
            le = function (j, x) {
                if ((typeof j === p && ((x = j), (j = r)), !(this instanceof le))) return new le(j, x).getResult();
                var C = j || (typeof n !== l && n.navigator && n.navigator.userAgent ? n.navigator.userAgent : s),
                    Y = x ? Ra(Dr, x) : Dr;
                return (
                    (this.getBrowser = function () {
                        var F = {};
                        return (F[h] = r), (F[y] = r), et.call(F, C, Y.browser), (F.major = Oa(F.version)), F;
                    }),
                    (this.getCPU = function () {
                        var F = {};
                        return (F[P] = r), et.call(F, C, Y.cpu), F;
                    }),
                    (this.getDevice = function () {
                        var F = {};
                        return (F[d] = r), (F[g] = r), (F[u] = r), et.call(F, C, Y.device), F;
                    }),
                    (this.getEngine = function () {
                        var F = {};
                        return (F[h] = r), (F[y] = r), et.call(F, C, Y.engine), F;
                    }),
                    (this.getOS = function () {
                        var F = {};
                        return (F[h] = r), (F[y] = r), et.call(F, C, Y.os), F;
                    }),
                    (this.getResult = function () {
                        return {
                            ua: this.getUA(),
                            browser: this.getBrowser(),
                            engine: this.getEngine(),
                            os: this.getOS(),
                            device: this.getDevice(),
                            cpu: this.getCPU(),
                        };
                    }),
                    (this.getUA = function () {
                        return C;
                    }),
                    (this.setUA = function (F) {
                        return (C = typeof F === f && F.length > G ? un(F, G) : F), this;
                    }),
                    this.setUA(C),
                    this
                );
            };
        (le.VERSION = i),
            (le.BROWSER = mt([h, y, c])),
            (le.CPU = mt([P])),
            (le.DEVICE = mt([g, d, u, q, D, m, L, O, E])),
            (le.ENGINE = le.OS = mt([h, y])),
            e.exports && (t = e.exports = le),
            (t.UAParser = le);
        var Me = typeof n !== l && (n.jQuery || n.Zepto);
        if (Me && !Me.ua) {
            var ht = new le();
            (Me.ua = ht.getResult()),
                (Me.ua.get = function () {
                    return ht.getUA();
                }),
                (Me.ua.set = function (j) {
                    ht.setUA(j);
                    var x = ht.getResult();
                    for (var C in x) Me.ua[C] = x[C];
                });
        }
    })(typeof window == 'object' ? window : Ve);
})(Nn, Nn.exports);
var Co = Nn.exports;
const Fo = $n(Co);
var Mo = (function () {
        function e() {}
        return (
            (e.prototype.getApplicationContext = function () {
                return {
                    versionName: this.versionName,
                    language: xo(),
                    platform: 'Web',
                    os: void 0,
                    deviceModel: void 0,
                };
            }),
            e
        );
    })(),
    xo = function () {
        return (
            (typeof navigator < 'u' && ((navigator.languages && navigator.languages[0]) || navigator.language)) || ''
        );
    },
    Bo = (function () {
        function e() {
            this.queue = [];
        }
        return (
            (e.prototype.logEvent = function (t) {
                this.receiver ? this.receiver(t) : this.queue.length < 512 && this.queue.push(t);
            }),
            (e.prototype.setEventReceiver = function (t) {
                (this.receiver = t),
                    this.queue.length > 0 &&
                        (this.queue.forEach(function (n) {
                            t(n);
                        }),
                        (this.queue = []));
            }),
            e
        );
    })(),
    Ne = function () {
        return (
            (Ne =
                Object.assign ||
                function (t) {
                    for (var n, r = 1, i = arguments.length; r < i; r++) {
                        n = arguments[r];
                        for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
                    }
                    return t;
                }),
            Ne.apply(this, arguments)
        );
    },
    Pt = function (e, t) {
        var n = ['string', 'number', 'boolean', 'undefined'],
            r = typeof e,
            i = typeof t;
        if (r !== i) return !1;
        for (var s = 0, a = n; s < a.length; s++) {
            var o = a[s];
            if (o === r) return e === t;
        }
        if (e == null && t == null) return !0;
        if (e == null || t == null || e.length !== t.length) return !1;
        var l = Array.isArray(e),
            p = Array.isArray(t);
        if (l !== p) return !1;
        if (l && p) {
            for (var f = 0; f < e.length; f++) if (!Pt(e[f], t[f])) return !1;
        } else {
            var c = Object.keys(e).sort(),
                g = Object.keys(t).sort();
            if (!Pt(c, g)) return !1;
            var h = !0;
            return (
                Object.keys(e).forEach(function (u) {
                    Pt(e[u], t[u]) || (h = !1);
                }),
                h
            );
        }
        return !0;
    },
    Vo = '$set',
    qo = '$unset',
    Ho = '$clearAll';
Object.entries ||
    (Object.entries = function (e) {
        for (var t = Object.keys(e), n = t.length, r = new Array(n); n--; ) r[n] = [t[n], e[t[n]]];
        return r;
    });
var Jo = (function () {
        function e() {
            (this.identity = { userProperties: {} }), (this.listeners = new Set());
        }
        return (
            (e.prototype.editIdentity = function () {
                var t = this,
                    n = Ne({}, this.identity.userProperties),
                    r = Ne(Ne({}, this.identity), { userProperties: n });
                return {
                    setUserId: function (i) {
                        return (r.userId = i), this;
                    },
                    setDeviceId: function (i) {
                        return (r.deviceId = i), this;
                    },
                    setUserProperties: function (i) {
                        return (r.userProperties = i), this;
                    },
                    setOptOut: function (i) {
                        return (r.optOut = i), this;
                    },
                    updateUserProperties: function (i) {
                        for (var s = r.userProperties || {}, a = 0, o = Object.entries(i); a < o.length; a++) {
                            var l = o[a],
                                p = l[0],
                                f = l[1];
                            switch (p) {
                                case Vo:
                                    for (var c = 0, g = Object.entries(f); c < g.length; c++) {
                                        var h = g[c],
                                            u = h[0],
                                            d = h[1];
                                        s[u] = d;
                                    }
                                    break;
                                case qo:
                                    for (var y = 0, P = Object.keys(f); y < P.length; y++) {
                                        var u = P[y];
                                        delete s[u];
                                    }
                                    break;
                                case Ho:
                                    s = {};
                                    break;
                            }
                        }
                        return (r.userProperties = s), this;
                    },
                    commit: function () {
                        return t.setIdentity(r), this;
                    },
                };
            }),
            (e.prototype.getIdentity = function () {
                return Ne({}, this.identity);
            }),
            (e.prototype.setIdentity = function (t) {
                var n = Ne({}, this.identity);
                (this.identity = Ne({}, t)),
                    Pt(n, this.identity) ||
                        this.listeners.forEach(function (r) {
                            r(t);
                        });
            }),
            (e.prototype.addIdentityListener = function (t) {
                this.listeners.add(t);
            }),
            (e.prototype.removeIdentityListener = function (t) {
                this.listeners.delete(t);
            }),
            e
        );
    })(),
    nt = typeof globalThis < 'u' ? globalThis : typeof global < 'u' ? global : self,
    $o = (function () {
        function e() {
            (this.identityStore = new Jo()),
                (this.eventBridge = new Bo()),
                (this.applicationContextProvider = new Mo());
        }
        return (
            (e.getInstance = function (t) {
                return (
                    nt.analyticsConnectorInstances || (nt.analyticsConnectorInstances = {}),
                    nt.analyticsConnectorInstances[t] || (nt.analyticsConnectorInstances[t] = new e()),
                    nt.analyticsConnectorInstances[t]
                );
            }),
            e
        );
    })();
function Vr(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
            (r = r.filter(function (i) {
                return Object.getOwnPropertyDescriptor(e, i).enumerable;
            })),
            n.push.apply(n, r);
    }
    return n;
}
function ne(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t] != null ? arguments[t] : {};
        t % 2
            ? Vr(Object(n), !0).forEach(function (r) {
                  qe(e, r, n[r]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : Vr(Object(n)).forEach(function (r) {
                    Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
                });
    }
    return e;
}
function Rn(e) {
    '@babel/helpers - typeof';
    return (
        (Rn =
            typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
                ? function (t) {
                      return typeof t;
                  }
                : function (t) {
                      return t && typeof Symbol == 'function' && t.constructor === Symbol && t !== Symbol.prototype
                          ? 'symbol'
                          : typeof t;
                  }),
        Rn(e)
    );
}
function tr(e, t) {
    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
}
function qr(e, t) {
    for (var n = 0; n < t.length; n++) {
        var r = t[n];
        (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            'value' in r && (r.writable = !0),
            Object.defineProperty(e, gs(r.key), r);
    }
}
function nr(e, t, n) {
    return t && qr(e.prototype, t), n && qr(e, n), Object.defineProperty(e, 'prototype', { writable: !1 }), e;
}
function qe(e, t, n) {
    return (
        (t = gs(t)),
        t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n),
        e
    );
}
function zo(e) {
    return Yo(e) || Wo(e) || ps(e) || Xo();
}
function Yo(e) {
    if (Array.isArray(e)) return On(e);
}
function Wo(e) {
    if ((typeof Symbol < 'u' && e[Symbol.iterator] != null) || e['@@iterator'] != null) return Array.from(e);
}
function ps(e, t) {
    if (e) {
        if (typeof e == 'string') return On(e, t);
        var n = Object.prototype.toString.call(e).slice(8, -1);
        if ((n === 'Object' && e.constructor && (n = e.constructor.name), n === 'Map' || n === 'Set'))
            return Array.from(e);
        if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return On(e, t);
    }
}
function On(e, t) {
    (t == null || t > e.length) && (t = e.length);
    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
    return r;
}
function Xo() {
    throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Zo(e, t) {
    var n = (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator'];
    if (!n) {
        if (Array.isArray(e) || (n = ps(e)) || (t && e && typeof e.length == 'number')) {
            n && (e = n);
            var r = 0,
                i = function () {};
            return {
                s: i,
                n: function () {
                    return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
                },
                e: function (l) {
                    throw l;
                },
                f: i,
            };
        }
        throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var s = !0,
        a = !1,
        o;
    return {
        s: function () {
            n = n.call(e);
        },
        n: function () {
            var l = n.next();
            return (s = l.done), l;
        },
        e: function (l) {
            (a = !0), (o = l);
        },
        f: function () {
            try {
                !s && n.return != null && n.return();
            } finally {
                if (a) throw o;
            }
        },
    };
}
function Qo(e, t) {
    if (typeof e != 'object' || e === null) return e;
    var n = e[Symbol.toPrimitive];
    if (n !== void 0) {
        var r = n.call(e, t || 'default');
        if (typeof r != 'object') return r;
        throw new TypeError('@@toPrimitive must return a primitive value.');
    }
    return (t === 'string' ? String : Number)(e);
}
function gs(e) {
    var t = Qo(e, 'string');
    return typeof t == 'symbol' ? t : String(t);
}
var A = {
        DEFAULT_INSTANCE: '$default_instance',
        API_VERSION: 2,
        MAX_STRING_LENGTH: 4096,
        MAX_PROPERTY_KEYS: 1e3,
        IDENTIFY_EVENT: '$identify',
        GROUP_IDENTIFY_EVENT: '$groupidentify',
        EVENT_LOG_URL: 'api.amplitude.com',
        EVENT_LOG_EU_URL: 'api.eu.amplitude.com',
        DYNAMIC_CONFIG_URL: 'regionconfig.amplitude.com',
        DYNAMIC_CONFIG_EU_URL: 'regionconfig.eu.amplitude.com',
        LAST_EVENT_ID: 'amplitude_lastEventId',
        LAST_EVENT_TIME: 'amplitude_lastEventTime',
        LAST_IDENTIFY_ID: 'amplitude_lastIdentifyId',
        LAST_SEQUENCE_NUMBER: 'amplitude_lastSequenceNumber',
        SESSION_ID: 'amplitude_sessionId',
        DEVICE_ID: 'amplitude_deviceId',
        OPT_OUT: 'amplitude_optOut',
        USER_ID: 'amplitude_userId',
        DEVICE_ID_INDEX: 0,
        USER_ID_INDEX: 1,
        OPT_OUT_INDEX: 2,
        SESSION_ID_INDEX: 3,
        LAST_EVENT_TIME_INDEX: 4,
        EVENT_ID_INDEX: 5,
        IDENTIFY_ID_INDEX: 6,
        SEQUENCE_NUMBER_INDEX: 7,
        COOKIE_TEST_PREFIX: 'amp_cookie_test',
        COOKIE_PREFIX: 'amp',
        STORAGE_DEFAULT: '',
        STORAGE_COOKIES: 'cookies',
        STORAGE_NONE: 'none',
        STORAGE_LOCAL: 'localStorage',
        STORAGE_SESSION: 'sessionStorage',
        REVENUE_EVENT: 'revenue_amount',
        REVENUE_PRODUCT_ID: '$productId',
        REVENUE_QUANTITY: '$quantity',
        REVENUE_PRICE: '$price',
        REVENUE_REVENUE_TYPE: '$revenueType',
        AMP_DEVICE_ID_PARAM: 'amp_device_id',
        AMP_REFERRER_PARAM: 'amp_referrer',
        REFERRER: 'referrer',
        REFERRING_DOMAIN: 'referring_domain',
        UTM_SOURCE: 'utm_source',
        UTM_MEDIUM: 'utm_medium',
        UTM_CAMPAIGN: 'utm_campaign',
        UTM_TERM: 'utm_term',
        UTM_CONTENT: 'utm_content',
        ATTRIBUTION_EVENT: '[Amplitude] Attribution Captured',
        TRANSPORT_HTTP: 'http',
        TRANSPORT_BEACON: 'beacon',
    },
    Hr = {
        encode: function (t) {
            for (var n = '', r = 0; r < t.length; r++) {
                var i = t.charCodeAt(r);
                i < 128
                    ? (n += String.fromCharCode(i))
                    : i > 127 && i < 2048
                      ? ((n += String.fromCharCode((i >> 6) | 192)), (n += String.fromCharCode((i & 63) | 128)))
                      : ((n += String.fromCharCode((i >> 12) | 224)),
                        (n += String.fromCharCode(((i >> 6) & 63) | 128)),
                        (n += String.fromCharCode((i & 63) | 128)));
            }
            return n;
        },
        decode: function (t) {
            for (var n = '', r = 0, i = 0, s = 0, a = 0; r < t.length; )
                (i = t.charCodeAt(r)),
                    i < 128
                        ? ((n += String.fromCharCode(i)), r++)
                        : i > 191 && i < 224
                          ? ((s = t.charCodeAt(r + 1)),
                            (n += String.fromCharCode(((i & 31) << 6) | (s & 63))),
                            (r += 2))
                          : ((s = t.charCodeAt(r + 1)),
                            (a = t.charCodeAt(r + 2)),
                            (n += String.fromCharCode(((i & 15) << 12) | ((s & 63) << 6) | (a & 63))),
                            (r += 3));
            return n;
        },
    },
    U = (function () {
        if (typeof globalThis < 'u') return globalThis;
        if (typeof window < 'u') return window;
        if (typeof self < 'u') return self;
        if (typeof global < 'u') return global;
    })(),
    ie = {
        _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
        encode: function (t) {
            try {
                if (U.btoa && U.atob) return U.btoa(unescape(encodeURIComponent(t)));
            } catch {}
            return ie._encode(t);
        },
        _encode: function (t) {
            var n = '',
                r,
                i,
                s,
                a,
                o,
                l,
                p,
                f = 0;
            for (t = Hr.encode(t); f < t.length; )
                (r = t.charCodeAt(f++)),
                    (i = t.charCodeAt(f++)),
                    (s = t.charCodeAt(f++)),
                    (a = r >> 2),
                    (o = ((r & 3) << 4) | (i >> 4)),
                    (l = ((i & 15) << 2) | (s >> 6)),
                    (p = s & 63),
                    isNaN(i) ? (l = p = 64) : isNaN(s) && (p = 64),
                    (n = n + ie._keyStr.charAt(a) + ie._keyStr.charAt(o) + ie._keyStr.charAt(l) + ie._keyStr.charAt(p));
            return n;
        },
        decode: function (t) {
            try {
                if (U.btoa && U.atob) return decodeURIComponent(escape(U.atob(t)));
            } catch {}
            return ie._decode(t);
        },
        _decode: function (t) {
            var n = '',
                r,
                i,
                s,
                a,
                o,
                l,
                p,
                f = 0;
            for (t = t.replace(/[^A-Za-z0-9+/=]/g, ''); f < t.length; )
                (a = ie._keyStr.indexOf(t.charAt(f++))),
                    (o = ie._keyStr.indexOf(t.charAt(f++))),
                    (l = ie._keyStr.indexOf(t.charAt(f++))),
                    (p = ie._keyStr.indexOf(t.charAt(f++))),
                    (r = (a << 2) | (o >> 4)),
                    (i = ((o & 15) << 4) | (l >> 2)),
                    (s = ((l & 3) << 6) | p),
                    (n = n + String.fromCharCode(r)),
                    l !== 64 && (n = n + String.fromCharCode(i)),
                    p !== 64 && (n = n + String.fromCharCode(s));
            return (n = Hr.decode(n)), n;
        },
    },
    el = Object.prototype.toString;
function w(e) {
    switch (el.call(e)) {
        case '[object Date]':
            return 'date';
        case '[object RegExp]':
            return 'regexp';
        case '[object Arguments]':
            return 'arguments';
        case '[object Array]':
            return 'array';
        case '[object Error]':
            return 'error';
    }
    return e === null
        ? 'null'
        : e === void 0
          ? 'undefined'
          : e !== e
            ? 'nan'
            : e && e.nodeType === 1
              ? 'element'
              : typeof Buffer < 'u' && typeof Buffer.isBuffer == 'function' && Buffer.isBuffer(e)
                ? 'buffer'
                : ((e = e.valueOf ? e.valueOf() : Object.prototype.valueOf.apply(e)), Rn(e));
}
var Ke = { DISABLE: 0, ERROR: 1, WARN: 2, INFO: 3 },
    it = Ke.WARN,
    tl = function (t) {
        Object.prototype.hasOwnProperty.call(Ke, t) && (it = Ke[t]);
    },
    nl = function () {
        return it;
    },
    te = {
        error: function (t) {
            it >= Ke.ERROR && fn(t);
        },
        warn: function (t) {
            it >= Ke.WARN && fn(t);
        },
        info: function (t) {
            it >= Ke.INFO && fn(t);
        },
    },
    fn = function (t) {
        try {
            console.log('[Amplitude] ' + t);
        } catch {}
    },
    rl = function (t) {
        return !t || t.length === 0;
    },
    il = function () {
        try {
            if (U.sessionStorage) return !0;
        } catch {}
        return !1;
    },
    sl = function e(t) {
        if (w(t) === 'array') for (var n = 0; n < t.length; n++) t[n] = e(t[n]);
        else if (w(t) === 'object') for (var r in t) r in t && (t[r] = e(t[r]));
        else t = al(t);
        return t;
    },
    al = function (t) {
        return w(t) === 'string' && t.length > A.MAX_STRING_LENGTH ? t.substring(0, A.MAX_STRING_LENGTH) : t;
    },
    qt = function (t, n, r) {
        return w(t) !== r
            ? (te.error('Invalid ' + n + ' input type. Expected ' + r + ' but received ' + w(t)), !1)
            : !0;
    },
    ol = function (t) {
        return qt(t, 'deviceId', 'string')
            ? t.indexOf('.') >= 0
                ? (te.error(`Device IDs may not contain '.' characters. Value will be ignored: "`.concat(t, '"')), !1)
                : !0
            : !1;
    },
    ll = function (t) {
        return qt(t, 'transport', 'string')
            ? t !== A.TRANSPORT_HTTP && t !== A.TRANSPORT_BEACON
                ? (te.error(
                      "transport value must be one of '"
                          .concat(A.TRANSPORT_BEACON, "' or '")
                          .concat(A.TRANSPORT_HTTP, "'"),
                  ),
                  !1)
                : t !== A.TRANSPORT_HTTP && typeof navigator < 'u' && !navigator.sendBeacon
                  ? (te.error('browser does not support sendBeacon, so transport must be HTTP'), !1)
                  : !0
            : !1;
    },
    kn = function (t) {
        var n = w(t);
        if (n !== 'object')
            return (
                te.error('Error: invalid properties format. Expecting Javascript object, received ' + n + ', ignoring'),
                {}
            );
        if (Object.keys(t).length > A.MAX_PROPERTY_KEYS)
            return te.error('Error: too many properties (more than 1000), ignoring'), {};
        var r = {};
        for (var i in t)
            if (Object.prototype.hasOwnProperty.call(t, i)) {
                var s = i,
                    a = w(s);
                a !== 'string' &&
                    ((s = String(s)),
                    te.warn(
                        'WARNING: Non-string property key, received type ' + a + ', coercing to string "' + s + '"',
                    ));
                var o = dl(s, t[i]);
                o !== null && (r[s] = o);
            }
        return r;
    },
    ul = ['nan', 'function', 'arguments', 'regexp', 'element'],
    dl = function e(t, n) {
        var r = w(n);
        if (ul.indexOf(r) !== -1)
            te.warn('WARNING: Property key "' + t + '" with invalid value type ' + r + ', ignoring'), (n = null);
        else if (r === 'undefined') n = null;
        else if (r === 'error')
            (n = String(n)), te.warn('WARNING: Property key "' + t + '" with value type error, coercing to ' + n);
        else if (r === 'array') {
            for (var i = [], s = 0; s < n.length; s++) {
                var a = n[s],
                    o = w(a);
                if (o === 'array') {
                    te.warn('WARNING: Cannot have ' + o + ' nested in an array property value, skipping');
                    continue;
                } else o === 'object' ? i.push(kn(a)) : i.push(e(t, a));
            }
            n = i;
        } else r === 'object' && (n = kn(n));
        return n;
    },
    cl = function (t) {
        var n = w(t);
        if (n !== 'object')
            return (
                te.error('Error: invalid groups format. Expecting Javascript object, received ' + n + ', ignoring'), {}
            );
        var r = {};
        for (var i in t)
            if (Object.prototype.hasOwnProperty.call(t, i)) {
                var s = i,
                    a = w(s);
                a !== 'string' &&
                    ((s = String(s)),
                    te.warn('WARNING: Non-string groupType, received type ' + a + ', coercing to string "' + s + '"'));
                var o = fl(s, t[i]);
                o !== null && (r[s] = o);
            }
        return r;
    },
    fl = function (t, n) {
        var r = w(n);
        if (r === 'string') return n;
        if (r === 'date' || r === 'number' || r === 'boolean')
            return (
                (n = String(n)),
                te.warn('WARNING: Non-string groupName, received type ' + r + ', coercing to string "' + n + '"'),
                n
            );
        if (r === 'array') {
            for (var i = [], s = 0; s < n.length; s++) {
                var a = n[s],
                    o = w(a);
                if (o === 'array' || o === 'object') {
                    te.warn('WARNING: Skipping nested ' + o + ' in array groupName');
                    continue;
                } else
                    o === 'string'
                        ? i.push(a)
                        : (o === 'date' || o === 'number' || o === 'boolean') &&
                          ((a = String(a)),
                          te.warn(
                              'WARNING: Non-string groupName, received type ' + o + ', coercing to string "' + a + '"',
                          ),
                          i.push(a));
            }
            return i;
        }
        te.warn(
            'WARNING: Non-string groupName, received type ' +
                r +
                '. Please use strings or array of strings for groupName',
        );
    },
    pl = function (t, n) {
        t = t.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
        var r = new RegExp('[\\?&]' + t + '=([^&#]*)'),
            i = r.exec(n);
        return i === null ? void 0 : decodeURIComponent(i[1].replace(/\+/g, ' '));
    },
    gl = function () {
        return typeof WorkerGlobalScope < 'u';
    },
    ml = function (t) {
        return qt(t, 'sessionId', 'number') && new Date(t).getTime() > 0
            ? !0
            : (te.error('sessionId value must in milliseconds since epoch (Unix Timestamp)'), !1);
    },
    hl = function () {
        return U.location;
    },
    vl = function (t) {
        var n = U.location ? U.location.hostname : '';
        if (t) {
            if (typeof document < 'u') {
                var r = document.createElement('a');
                return (r.href = t), r.hostname || n;
            }
            if (typeof URL == 'function') {
                var i = new URL(t);
                return i.hostname || n;
            }
        }
        return n;
    },
    v = {
        setLogLevel: tl,
        getLogLevel: nl,
        logLevels: Ke,
        log: te,
        isEmptyString: rl,
        isWebWorkerEnvironment: gl,
        getQueryParam: pl,
        sessionStorageEnabled: il,
        truncate: sl,
        validateGroups: cl,
        validateInput: qt,
        validateProperties: kn,
        validateDeviceId: ol,
        validateTransport: ll,
        validateSessionId: ml,
        getLocation: hl,
        getHost: vl,
    },
    ms = function (t) {
        try {
            for (var n = document.cookie.split(';'), r = null, i = 0; i < n.length; i++) {
                for (var s = n[i]; s.charAt(0) === ' '; ) s = s.substring(1, s.length);
                if (s.indexOf(t) === 0) {
                    r = s.substring(t.length, s.length);
                    break;
                }
            }
            return r;
        } catch {
            return null;
        }
    },
    _l = function (t) {
        try {
            var n = document.cookie.split(';').map(function (o) {
                    return o.trimStart();
                }),
                r = [],
                i = Zo(n),
                s;
            try {
                for (i.s(); !(s = i.n()).done; ) {
                    for (var a = s.value; a.charAt(0) === ' '; ) a = a.substring(1);
                    a.indexOf(t) === 0 && r.push(a.substring(t.length));
                }
            } catch (o) {
                i.e(o);
            } finally {
                i.f();
            }
            return r;
        } catch {
            return [];
        }
    },
    Dn = function (t, n, r) {
        var i = n !== null ? r.expirationDays : -1;
        if (i) {
            var s = new Date();
            s.setTime(s.getTime() + i * 24 * 60 * 60 * 1e3), (i = s);
        }
        var a = t + '=' + n;
        i && (a += '; expires=' + i.toUTCString()),
            (a += '; path=/'),
            r.domain && (a += '; domain=' + r.domain),
            r.secure && (a += '; Secure'),
            r.sameSite && (a += '; SameSite=' + r.sameSite),
            (document.cookie = a);
    },
    wn = function () {
        var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : '',
            n = t.split('.')[A.LAST_EVENT_TIME_INDEX],
            r;
        return n && (r = parseInt(n, 32)), r || (v.log.warn('unable to parse malformed cookie: '.concat(t)), 0);
    },
    El = function (t) {
        return zo(t).sort(function (n, r) {
            var i = wn(n),
                s = wn(r);
            return s - i;
        });
    },
    yl = function () {
        var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
            n = A.COOKIE_TEST_PREFIX;
        if (typeof document > 'u') return !1;
        var r = !1;
        try {
            var i = String(Date.now());
            Dn(n, i, t), v.log.info('Testing if cookies available'), (r = ms(n + '=') === i);
        } catch (s) {
            v.log.warn('Error thrown when checking for cookies. Reason: "'.concat(s, '"'));
        } finally {
            v.log.info('Cleaning up cookies availability test'), Dn(n, null, t);
        }
        return r;
    },
    Q = { set: Dn, get: ms, getAll: _l, getLastEventTime: wn, sortByEventTime: El, areCookiesEnabled: yl },
    Il = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',
    rr = function () {
        for (var t = '', n = 0; n < 22; ++n) t += Il.charAt(Math.floor(Math.random() * 64));
        return t;
    },
    hs = function (t) {
        var n = v.getHost(t),
            r = n.split('.'),
            i = [],
            s = '_tldtest_' + rr();
        if (v.isWebWorkerEnvironment()) return '';
        for (var a = r.length - 2; a >= 0; --a) i.push(r.slice(a).join('.'));
        for (var o = 0; o < i.length; ++o) {
            var l = i[o],
                p = { domain: '.' + l };
            if ((Q.set(s, 1, p), Q.get(s))) return Q.set(s, null, p), l;
        }
        return '';
    },
    re = { expirationDays: void 0, domain: void 0 },
    bl = function () {
        re = { expirationDays: void 0, domain: void 0 };
    },
    Sl = function (t) {
        if (arguments.length === 0) return re;
        (t = t || {}), (re.expirationDays = t.expirationDays), (re.secure = t.secure), (re.sameSite = t.sameSite);
        var n = v.isEmptyString(t.domain) ? '.' + hs(v.getLocation().href) : t.domain,
            r = Math.random();
        (re.domain = n), _s('amplitude_test', r);
        var i = vs('amplitude_test');
        return (!i || i !== r) && (n = null), Es('amplitude_test'), (re.domain = n), re;
    },
    lt = function (t) {
        var n = '';
        return re.domain && (n = re.domain.charAt(0) === '.' ? re.domain.substring(1) : re.domain), t + n;
    },
    vs = function (t) {
        var n = lt(t) + '=',
            r = Q.get(n);
        try {
            if (r) return JSON.parse(ie.decode(r));
        } catch {
            return null;
        }
        return null;
    },
    _s = function (t, n) {
        try {
            return Q.set(lt(t), ie.encode(JSON.stringify(n)), re), !0;
        } catch {
            return !1;
        }
    },
    Tl = function (t, n) {
        try {
            return Q.set(lt(t), n, re), !0;
        } catch {
            return !1;
        }
    },
    Al = function (t) {
        var n = lt(t) + '=';
        return Q.get(n);
    },
    Es = function (t) {
        try {
            return Q.set(lt(t), null, re), !0;
        } catch {
            return !1;
        }
    },
    Nl = { reset: bl, options: Sl, get: vs, set: _s, remove: Es, setRaw: Tl, getRaw: Al },
    Rl = (function () {
        function e() {
            tr(this, e), (this.map = new Map()), (this.length = 0);
        }
        return (
            nr(e, [
                {
                    key: 'key',
                    value: function (n) {
                        var r = Array.from(this.map.keys()),
                            i = r[n];
                        return this.map.get(i);
                    },
                },
                {
                    key: 'getItem',
                    value: function (n) {
                        return this.map.get(n);
                    },
                },
                {
                    key: 'setItem',
                    value: function (n, r) {
                        this.map.has(n) || (this.length += 1), this.map.set(n, r);
                    },
                },
                {
                    key: 'removeItem',
                    value: function (n) {
                        this.map.has(n) && ((this.length -= 1), this.map.delete(n));
                    },
                },
                {
                    key: 'clear',
                    value: function () {
                        this.map.clear(), (this.length = 0);
                    },
                },
            ]),
            e
        );
    })(),
    Ae;
{
    var Ol = function () {
        var t = new Date(),
            n;
        try {
            return (
                U.localStorage.setItem(t, t),
                (n = U.localStorage.getItem(t) === String(t)),
                U.localStorage.removeItem(t),
                n
            );
        } catch {}
        return !1;
    };
    if (Ol()) Ae = U.localStorage;
    else if (typeof U < 'u' && U.globalStorage)
        try {
            Ae = U.globalStorage[U.location.hostname];
        } catch {}
    else if (typeof document < 'u') {
        var $ = document.createElement('div'),
            Ee = 'localStorage';
        ($.style.display = 'none'),
            document.getElementsByTagName('head')[0].appendChild($),
            $.addBehavior &&
                ($.addBehavior('#default#userdata'),
                (Ae = {
                    length: 0,
                    setItem: function (t, n) {
                        $.load(Ee), $.getAttribute(t) || this.length++, $.setAttribute(t, n), $.save(Ee);
                    },
                    getItem: function (t) {
                        return $.load(Ee), $.getAttribute(t);
                    },
                    removeItem: function (t) {
                        $.load(Ee), $.getAttribute(t) && this.length--, $.removeAttribute(t), $.save(Ee);
                    },
                    clear: function () {
                        $.load(Ee);
                        for (var t = 0, n; (n = $.XMLDocument.documentElement.attributes[t++]); )
                            $.removeAttribute(n.name);
                        $.save(Ee), (this.length = 0);
                    },
                    key: function (t) {
                        return $.load(Ee), $.XMLDocument.documentElement.attributes[t];
                    },
                }),
                $.load(Ee),
                (Ae.length = $.XMLDocument.documentElement.attributes.length));
    } else v.isWebWorkerEnvironment() && (Ae = new Rl());
    Ae ||
        (Ae = {
            length: 0,
            setItem: function (t, n) {},
            getItem: function (t) {},
            removeItem: function (t) {},
            clear: function () {},
            key: function (t) {},
        });
}
var de = Ae,
    ys = function () {
        this.storage = null;
    };
ys.prototype.getStorage = function (e) {
    if (this.storage !== null) return this.storage;
    if (!e && Q.areCookiesEnabled()) this.storage = Nl;
    else {
        var t = 'amp_cookiestore_';
        this.storage = {
            _options: { expirationDays: void 0, domain: void 0, secure: !1 },
            reset: function () {
                this._options = { expirationDays: void 0, domain: void 0, secure: !1 };
            },
            options: function (r) {
                return arguments.length === 0
                    ? this._options
                    : ((r = r || {}),
                      (this._options.expirationDays = r.expirationDays || this._options.expirationDays),
                      (this._options.domain =
                          r.domain || this._options.domain || (U && U.location && U.location.hostname)),
                      (this._options.secure = r.secure || !1));
            },
            get: function (r) {
                try {
                    return JSON.parse(de.getItem(t + r));
                } catch {}
                return null;
            },
            set: function (r, i) {
                try {
                    return de.setItem(t + r, JSON.stringify(i)), !0;
                } catch {}
                return !1;
            },
            remove: function (r) {
                try {
                    de.removeItem(t + r);
                } catch {
                    return !1;
                }
            },
        };
    }
    return this.storage;
};
var xe,
    kl =
        ((xe = {}),
        qe(xe, A.STORAGE_COOKIES, !0),
        qe(xe, A.STORAGE_NONE, !0),
        qe(xe, A.STORAGE_LOCAL, !0),
        qe(xe, A.STORAGE_SESSION, !0),
        xe),
    Dl = (function () {
        function e(t) {
            var n = t.storageKey,
                r = t.disableCookies,
                i = t.domain,
                s = t.secure,
                a = t.sameSite,
                o = t.expirationDays,
                l = t.storage;
            tr(this, e),
                (this.storageKey = n),
                (this.domain = i),
                (this.secure = s),
                (this.sameSite = a),
                (this.expirationDays = o),
                (this.cookieDomain = '');
            var p = v.getLocation() ? v.getLocation().href : void 0,
                f = r ? '' : hs(p);
            if (((this.cookieDomain = i || (f ? '.' + f : null)), kl[l])) this.storage = l;
            else {
                var c =
                    r ||
                    !Q.areCookiesEnabled({
                        domain: this.cookieDomain,
                        secure: this.secure,
                        sameSite: this.sameSite,
                        expirationDays: this.expirationDays,
                    });
                c ? (this.storage = A.STORAGE_LOCAL) : (this.storage = A.STORAGE_COOKIES);
            }
        }
        return (
            nr(e, [
                {
                    key: 'getCookieStorageKey',
                    value: function () {
                        if (!this.domain) return this.storageKey;
                        var n = this.domain.charAt(0) === '.' ? this.domain.substring(1) : this.domain;
                        return ''.concat(this.storageKey).concat(n ? '_'.concat(n) : '');
                    },
                },
                {
                    key: 'save',
                    value: function (n) {
                        var r = n.deviceId,
                            i = n.userId,
                            s = n.optOut,
                            a = n.sessionId,
                            o = n.lastEventTime,
                            l = n.eventId,
                            p = n.identifyId,
                            f = n.sequenceNumber;
                        if (this.storage !== A.STORAGE_NONE) {
                            var c = [
                                r,
                                ie.encode(i || ''),
                                s ? '1' : '',
                                a ? a.toString(32) : '0',
                                o ? o.toString(32) : '0',
                                l ? l.toString(32) : '0',
                                p ? p.toString(32) : '0',
                                f ? f.toString(32) : '0',
                            ].join('.');
                            switch (this.storage) {
                                case A.STORAGE_SESSION:
                                    U.sessionStorage && U.sessionStorage.setItem(this.storageKey, c);
                                    break;
                                case A.STORAGE_LOCAL:
                                    de.setItem(this.storageKey, c);
                                    break;
                                case A.STORAGE_COOKIES:
                                    this.saveCookie(c);
                                    break;
                            }
                        }
                    },
                },
                {
                    key: 'saveCookie',
                    value: function (n) {
                        Q.set(this.getCookieStorageKey(), n, {
                            domain: this.cookieDomain,
                            secure: this.secure,
                            sameSite: this.sameSite,
                            expirationDays: this.expirationDays,
                        });
                    },
                },
                {
                    key: 'load',
                    value: function () {
                        var n = this,
                            r;
                        if (this.storage === A.STORAGE_COOKIES) {
                            var i = this.getCookieStorageKey() + '=',
                                s = Q.getAll(i);
                            if (s.length === 0 || s.length === 1) r = s[0];
                            else {
                                var a = Q.sortByEventTime(s)[0];
                                s.forEach(function () {
                                    return Q.set(n.getCookieStorageKey(), null, {});
                                }),
                                    this.saveCookie(a),
                                    (r = Q.get(i));
                            }
                        }
                        if ((r || (r = de.getItem(this.storageKey)), !r))
                            try {
                                r = U.sessionStorage && U.sessionStorage.getItem(this.storageKey);
                            } catch (p) {
                                v.log.info('window.sessionStorage unavailable. Reason: "'.concat(p, '"'));
                            }
                        if (!r) return null;
                        var o = r.split('.'),
                            l = null;
                        if (o[A.USER_ID_INDEX])
                            try {
                                l = ie.decode(o[A.USER_ID_INDEX]);
                            } catch {
                                l = null;
                            }
                        return {
                            deviceId: o[A.DEVICE_ID_INDEX],
                            userId: l,
                            optOut: o[A.OPT_OUT_INDEX] === '1',
                            sessionId: parseInt(o[A.SESSION_ID_INDEX], 32),
                            lastEventTime: parseInt(o[A.LAST_EVENT_TIME_INDEX], 32),
                            eventId: parseInt(o[A.EVENT_ID_INDEX], 32),
                            identifyId: parseInt(o[A.IDENTIFY_ID_INDEX], 32),
                            sequenceNumber: parseInt(o[A.SEQUENCE_NUMBER_INDEX], 32),
                        };
                    },
                },
                {
                    key: 'clear',
                    value: function () {
                        var n;
                        if (
                            (this.storage === A.STORAGE_COOKIES &&
                                ((n = Q.get(this.getCookieStorageKey() + '=')),
                                Q.set(this.getCookieStorageKey(), null, {
                                    domain: this.cookieDomain,
                                    secure: this.secure,
                                    sameSite: this.sameSite,
                                    expirationDays: 0,
                                })),
                            n || ((n = de.getItem(this.storageKey)), de.clear()),
                            !n)
                        )
                            try {
                                (n = U.sessionStorage && U.sessionStorage.getItem(this.storageKey)),
                                    U.sessionStorage.clear();
                            } catch (r) {
                                v.log.info('window.sessionStorage unavailable. Reason: "'.concat(r, '"'));
                            }
                        return !!n;
                    },
                },
            ]),
            e
        );
    })(),
    wl = function (t, n) {
        var r = t ? '?' + t.split('.').slice(-1)[0].replace(/\|/g, '&') : '',
            i = function (h, u, d, y) {
                return v.getQueryParam(h, u) || v.getQueryParam(d, y);
            },
            s = i(A.UTM_SOURCE, n, 'utmcsr', r),
            a = i(A.UTM_MEDIUM, n, 'utmcmd', r),
            o = i(A.UTM_CAMPAIGN, n, 'utmccn', r),
            l = i(A.UTM_TERM, n, 'utmctr', r),
            p = i(A.UTM_CONTENT, n, 'utmcct', r),
            f = {},
            c = function (h, u) {
                v.isEmptyString(u) || (f[h] = u);
            };
        return c(A.UTM_SOURCE, s), c(A.UTM_MEDIUM, a), c(A.UTM_CAMPAIGN, o), c(A.UTM_TERM, l), c(A.UTM_CONTENT, p), f;
    },
    Ll = '$add',
    Pl = '$append',
    Ln = '$clearAll',
    Ul = '$prepend',
    Kl = '$set',
    Gl = '$setOnce',
    jl = '$unset',
    Cl = '$preInsert',
    Fl = '$postInsert',
    Ml = '$remove',
    z = function () {
        (this.userPropertiesOperations = {}), (this.properties = []);
    };
z.prototype.add = function (e, t) {
    return (
        w(t) === 'number' || w(t) === 'string'
            ? this._addOperation(Ll, e, t)
            : v.log.error('Unsupported type for value: ' + w(t) + ', expecting number or string'),
        this
    );
};
z.prototype.append = function (e, t) {
    return this._addOperation(Pl, e, t), this;
};
z.prototype.clearAll = function () {
    return Object.keys(this.userPropertiesOperations).length > 0
        ? (Object.prototype.hasOwnProperty.call(this.userPropertiesOperations, Ln) ||
              v.log.error(
                  'Need to send $clearAll on its own Identify object without any other operations, skipping $clearAll',
              ),
          this)
        : ((this.userPropertiesOperations[Ln] = '-'), this);
};
z.prototype.prepend = function (e, t) {
    return this._addOperation(Ul, e, t), this;
};
z.prototype.set = function (e, t) {
    return this._addOperation(Kl, e, t), this;
};
z.prototype.setOnce = function (e, t) {
    return this._addOperation(Gl, e, t), this;
};
z.prototype.unset = function (e) {
    return this._addOperation(jl, e, '-'), this;
};
z.prototype.preInsert = function (e, t) {
    return this._addOperation(Cl, e, t), this;
};
z.prototype.postInsert = function (e, t) {
    return this._addOperation(Fl, e, t), this;
};
z.prototype.remove = function (e, t) {
    return this._addOperation(Ml, e, t), this;
};
z.prototype._addOperation = function (e, t, n) {
    if (Object.prototype.hasOwnProperty.call(this.userPropertiesOperations, Ln)) {
        v.log.error('This identify already contains a $clearAll operation, skipping operation ' + e);
        return;
    }
    if (this.properties.indexOf(t) !== -1) {
        v.log.error('User property "' + t + '" already used in this identify, skipping operation ' + e);
        return;
    }
    Object.prototype.hasOwnProperty.call(this.userPropertiesOperations, e) || (this.userPropertiesOperations[e] = {}),
        (this.userPropertiesOperations[e][t] = n),
        this.properties.push(t);
};
var Is = function (t, n, r) {
        (this.url = t), (this.data = n || {}), (this.headers = r);
    },
    xl = 'Cross-Origin-Resource-Policy';
function Bl(e, t) {
    for (var n in t) (n === xl && !t[n]) || e.setRequestHeader(n, t[n]);
}
Is.prototype.send = function (e) {
    var t = !!U.XDomainRequest;
    if (t) {
        var n = new U.XDomainRequest();
        n.open('POST', this.url, !0),
            (n.onload = function () {
                e(200, n.responseText);
            }),
            (n.onerror = function () {
                n.responseText === 'Request Entity Too Large' ? e(413, n.responseText) : e(500, n.responseText);
            }),
            (n.ontimeout = function () {}),
            (n.onprogress = function () {}),
            n.send(cn.stringify(this.data));
    } else if (typeof XMLHttpRequest < 'u') {
        var r = new XMLHttpRequest();
        r.open('POST', this.url, !0),
            (r.onreadystatechange = function () {
                r.readyState === 4 && e(r.status, r.responseText);
            }),
            Bl(r, this.headers),
            r.send(cn.stringify(this.data));
    } else {
        var i = void 0;
        fetch(this.url, { method: 'POST', headers: this.headers, body: cn.stringify(this.data) })
            .then(function (s) {
                return (i = s.status), s.text();
            })
            .then(function (s) {
                e(i, s);
            });
    }
};
var pe = function () {
    (this._price = null),
        (this._productId = null),
        (this._quantity = 1),
        (this._revenueType = null),
        (this._properties = null);
};
pe.prototype.setProductId = function (t) {
    return (
        w(t) !== 'string'
            ? v.log.error('Unsupported type for productId: ' + w(t) + ', expecting string')
            : v.isEmptyString(t)
              ? v.log.error('Invalid empty productId')
              : (this._productId = t),
        this
    );
};
pe.prototype.setQuantity = function (t) {
    return (
        w(t) !== 'number'
            ? v.log.error('Unsupported type for quantity: ' + w(t) + ', expecting number')
            : (this._quantity = parseInt(t)),
        this
    );
};
pe.prototype.setPrice = function (t) {
    return (
        w(t) !== 'number'
            ? v.log.error('Unsupported type for price: ' + w(t) + ', expecting number')
            : (this._price = t),
        this
    );
};
pe.prototype.setRevenueType = function (t) {
    return (
        w(t) !== 'string'
            ? v.log.error('Unsupported type for revenueType: ' + w(t) + ', expecting string')
            : (this._revenueType = t),
        this
    );
};
pe.prototype.setEventProperties = function (t) {
    return (
        w(t) !== 'object'
            ? v.log.error('Unsupported type for eventProperties: ' + w(t) + ', expecting object')
            : (this._properties = v.validateProperties(t)),
        this
    );
};
pe.prototype._isValidRevenue = function () {
    return w(this._price) !== 'number' ? (v.log.error('Invalid revenue, need to set price field'), !1) : !0;
};
pe.prototype._toJSONObject = function () {
    var t = w(this._properties) === 'object' ? this._properties : {};
    return (
        this._productId !== null && (t[A.REVENUE_PRODUCT_ID] = this._productId),
        this._quantity !== null && (t[A.REVENUE_QUANTITY] = this._quantity),
        this._price !== null && (t[A.REVENUE_PRICE] = this._price),
        this._revenueType !== null && (t[A.REVENUE_REVENUE_TYPE] = this._revenueType),
        t
    );
};
var Vl = function e(t) {
        return t
            ? (t ^ ((Math.random() * 16) >> (t / 4))).toString(16)
            : ('10000000-1000-4000-8000' + -1e11).replace(/[018]/g, e);
    },
    ql = function () {
        return (
            (typeof navigator < 'u' &&
                ((navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage)) ||
            ''
        );
    },
    Hl = { getLanguage: ql },
    Ge = { US: 'US', EU: 'EU' },
    bs = function (t) {
        var n = A.EVENT_LOG_URL;
        switch (t) {
            case Ge.EU:
                n = A.EVENT_LOG_EU_URL;
                break;
            case Ge.US:
                n = A.EVENT_LOG_URL;
                break;
        }
        return n;
    },
    Jl = function (t) {
        var n = A.DYNAMIC_CONFIG_URL;
        switch (t) {
            case Ge.EU:
                n = A.DYNAMIC_CONFIG_EU_URL;
                break;
            case Ge.US:
                n = A.DYNAMIC_CONFIG_URL;
                break;
        }
        return n;
    },
    Ss = '8.21.9',
    Re = {
        apiEndpoint: A.EVENT_LOG_URL,
        batchEvents: !1,
        cookieExpiration: 365,
        cookieName: 'amplitude_id',
        sameSiteCookie: 'Lax',
        cookieForceUpgrade: !1,
        deferInitialization: !1,
        disableCookies: !1,
        deviceIdFromUrlParam: !1,
        domain: '',
        eventUploadPeriodMillis: 30 * 1e3,
        eventUploadThreshold: 30,
        forceHttps: !0,
        includeFbclid: !1,
        includeGclid: !1,
        includeReferrer: !1,
        includeUtm: !1,
        ingestionMetadata: { sourceName: '', sourceVersion: '' },
        language: Hl.getLanguage(),
        library: { name: 'amplitude-js', version: Ss },
        logLevel: 'WARN',
        logAttributionCapturedEvent: !1,
        optOut: !1,
        onError: function () {},
        onExitPage: function () {},
        onNewSessionStart: function () {},
        plan: { branch: '', source: '', version: '', versionId: '' },
        platform: 'Web',
        savedMaxCount: 1e3,
        saveEvents: !0,
        saveParamsReferrerOncePerSession: !0,
        secureCookie: !1,
        sessionTimeout: 30 * 60 * 1e3,
        storage: A.STORAGE_DEFAULT,
        trackingOptions: {
            city: !0,
            country: !0,
            carrier: !0,
            device_manufacturer: !0,
            device_model: !0,
            dma: !0,
            ip_address: !0,
            language: !0,
            os_name: !0,
            os_version: !0,
            platform: !0,
            region: !0,
            version_name: !0,
        },
        transport: A.TRANSPORT_HTTP,
        unsetParamsReferrerOnNewSession: !1,
        unsentKey: 'amplitude_unsent',
        unsentIdentifyKey: 'amplitude_unsent_identify',
        uploadBatchSize: 100,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Cross-Origin-Resource-Policy': 'cross-origin',
        },
        serverZone: Ge.US,
        useDynamicConfig: !1,
        serverZoneBasedApi: !1,
        sessionId: null,
        partnerId: '',
    },
    $l = (function () {
        function e() {
            return (
                tr(this, e), e.instance || ((this.ingestionEndpoint = A.EVENT_LOG_URL), (e.instance = this)), e.instance
            );
        }
        return (
            nr(e, [
                {
                    key: 'refresh',
                    value: function (n, r, i) {
                        var s = 'https';
                        !r && U.location.protocol !== 'https:' && (s = 'http');
                        var a = s + '://' + Jl(n),
                            o = this,
                            l = !!U.XDomainRequest;
                        if (l) {
                            var p = new U.XDomainRequest();
                            p.open('GET', a, !0),
                                (p.onload = function () {
                                    var c = JSON.parse(p.responseText);
                                    (o.ingestionEndpoint = c.ingestionEndpoint), i && i();
                                }),
                                (p.onerror = function () {}),
                                (p.ontimeout = function () {}),
                                (p.onprogress = function () {}),
                                p.send();
                        } else {
                            var f = new XMLHttpRequest();
                            f.open('GET', a, !0),
                                (f.onreadystatechange = function () {
                                    if (f.readyState === 4 && f.status === 200) {
                                        var c = JSON.parse(f.responseText);
                                        (o.ingestionEndpoint = c.ingestionEndpoint), i && i();
                                    }
                                }),
                                f.send();
                        }
                    },
                },
            ]),
            e
        );
    })(),
    Jr = new $l(),
    R = function (t) {
        !Zn() &&
            !v.isWebWorkerEnvironment() &&
            v.log.warn(
                'amplitude-js will not work in a non-browser environment. If you are planning to add Amplitude to a node environment, please use @amplitude/node',
            ),
            (this._instanceName = v.isEmptyString(t) ? A.DEFAULT_INSTANCE : t.toLowerCase()),
            (this._unsentEvents = []),
            (this._unsentIdentifys = []),
            (this.options = ne(
                ne({}, Re),
                {},
                {
                    headers: ne({}, Re.headers),
                    ingestionMetadata: ne({}, Re.ingestionMetadata),
                    library: ne({}, Re.library),
                    plan: ne({}, Re.plan),
                    trackingOptions: ne({}, Re.trackingOptions),
                },
            )),
            (this._q = []),
            (this._sending = !1),
            (this._updateScheduled = !1),
            (this._onInitCallbacks = []),
            (this._onNewSessionStartCallbacks = []),
            (this._eventId = 0),
            (this._identifyId = 0),
            (this._lastEventTime = null),
            (this._newSession = !1),
            (this._sequenceNumber = 0),
            (this._sessionId = null),
            (this._isInitialized = !1),
            (this._connector = null),
            (this._userAgent = (typeof navigator < 'u' && navigator && navigator.userAgent) || null),
            (this._ua = new Fo(this._userAgent).getResult());
    };
R.prototype.Identify = z;
R.prototype.Revenue = pe;
R.prototype.init = function (t, n, r, i) {
    var s = this;
    if (w(t) !== 'string' || v.isEmptyString(t)) {
        v.log.error('Invalid apiKey. Please re-initialize with a valid apiKey');
        return;
    }
    try {
        (this._connector = $o.getInstance(this._instanceName)),
            zl(this.options, r),
            (Zn() || v.isWebWorkerEnvironment()) &&
                U.Prototype !== void 0 &&
                Array.prototype.toJSON &&
                (Ao(),
                v.log.warn(
                    'Prototype.js injected Array.prototype.toJSON. Deleting Array.prototype.toJSON to prevent double-stringify',
                )),
            this.options.cookieName !== Re.cookieName &&
                v.log.warn('The cookieName option is deprecated. We will be ignoring it for newer cookies'),
            this.options.serverZoneBasedApi && (this.options.apiEndpoint = bs(this.options.serverZone)),
            this._refreshDynamicConfig(),
            (this.options.apiKey = t),
            (this._storageSuffix =
                '_' + t + (this._instanceName === A.DEFAULT_INSTANCE ? '' : '_' + this._instanceName)),
            (this._storageSuffixV5 = t.slice(0, 6)),
            (this._oldCookiename = this.options.cookieName + this._storageSuffix),
            (this._unsentKey = this.options.unsentKey + this._storageSuffix),
            (this._unsentIdentifyKey = this.options.unsentIdentifyKey + this._storageSuffix),
            (this._cookieName = A.COOKIE_PREFIX + '_' + this._storageSuffixV5),
            (this.cookieStorage = new ys().getStorage(this.options.disableCookies)),
            this.cookieStorage.options({
                expirationDays: this.options.cookieExpiration,
                domain: this.options.domain,
                secure: this.options.secureCookie,
                sameSite: this.options.sameSiteCookie,
            }),
            (this._metadataStorage = new Dl({
                storageKey: this._cookieName,
                disableCookies: this.options.disableCookies,
                expirationDays: this.options.cookieExpiration,
                domain: this.options.domain,
                secure: this.options.secureCookie,
                sameSite: this.options.sameSiteCookie,
                storage: this.options.storage,
            }));
        var a = !!this.cookieStorage.get(this._oldCookiename),
            o = !!this._metadataStorage.load();
        this._useOldCookie = !o && a && !this.options.cookieForceUpgrade;
        var l = o || a;
        if (this.options.deferInitialization && !l) {
            this._deferInitialization(t, n, r, i);
            return;
        }
        (this.options.domain = this.cookieStorage.options().domain),
            w(this.options.logLevel) === 'string' && v.setLogLevel(this.options.logLevel);
        var p = Zl(this);
        (this._apiPropertiesTrackingOptions = Object.keys(p).length > 0 ? { tracking_options: p } : {}),
            this.options.cookieForceUpgrade && a && (o || Yl(this), this.cookieStorage.remove(this._oldCookiename)),
            ir(this),
            (this._pendingReadStorage = !0);
        var f = function (d) {
            r &&
                r.deviceId &&
                !v.validateDeviceId(r.deviceId) &&
                (v.log.error(
                    'Invalid device ID rejected. Randomly generated UUID will be used instead of "'.concat(
                        r.deviceId,
                        '"',
                    ),
                ),
                delete r.deviceId),
                (s.options.deviceId = s._getInitialDeviceId(r && r.deviceId, d)),
                (s.options.userId =
                    (w(n) === 'string' && !v.isEmptyString(n) && n) ||
                    (w(n) === 'number' && n.toString()) ||
                    s.options.userId ||
                    null);
            var y = new Date().getTime(),
                P =
                    !s._sessionId ||
                    !s._lastEventTime ||
                    y - s._lastEventTime > s.options.sessionTimeout ||
                    s.options.sessionId;
            P &&
                (s.options.unsetParamsReferrerOnNewSession && s._unsetUTMParams(),
                (s._newSession = !0),
                (s._sessionId = s.options.sessionId || y),
                (s.options.sessionId = void 0),
                s.options.saveParamsReferrerOncePerSession && s._trackParamsAndReferrer()),
                s.options.saveParamsReferrerOncePerSession || s._trackParamsAndReferrer(),
                s.options.saveEvents && ($r(s._unsentEvents), $r(s._unsentIdentifys)),
                (s._lastEventTime = y),
                Se(s),
                (s._pendingReadStorage = !1),
                s._sendEventsIfReady();
            for (var q = 0; q < s._onInitCallbacks.length; q++) s._onInitCallbacks[q](s);
            (s._onInitCallbacks = []), (s._isInitialized = !0), P && s._runNewSessionStartCallbacks();
        };
        this.options.saveEvents &&
            ((this._unsentEvents = this._loadSavedUnsentEvents(this.options.unsentKey)
                .map(function (u) {
                    return { event: u };
                })
                .concat(this._unsentEvents)),
            (this._unsentIdentifys = this._loadSavedUnsentEvents(this.options.unsentIdentifyKey)
                .map(function (u) {
                    return { event: u };
                })
                .concat(this._unsentIdentifys))),
            r && r.onNewSessionStart && this.onNewSessionStart(this.options.onNewSessionStart),
            f(),
            this.runQueuedFunctions(),
            w(i) === 'function' && i(this);
        var c = this.options.onExitPage;
        if (w(c) === 'function' && U.addEventListener && !this.pageHandlersAdded) {
            this.pageHandlersAdded = !0;
            var g = function () {
                var d = s.options.transport;
                s.setTransport(A.TRANSPORT_BEACON), c(), s.setTransport(d);
            };
            U.addEventListener(
                'pagehide',
                function () {
                    g();
                },
                !1,
            );
        }
        this._connector.eventBridge.setEventReceiver(function (u) {
            s._logEvent(u.eventType, u.eventProperties, u.userProperties);
        });
        var h = this._connector.identityStore.editIdentity();
        this.options.deviceId && h.setDeviceId(this.options.deviceId),
            this.options.userId && h.setUserId(this.options.userId),
            h.commit();
    } catch (u) {
        v.log.error(u), r && w(r.onError) === 'function' && r.onError(u);
    }
};
R.prototype._runNewSessionStartCallbacks = function () {
    for (var e = 0; e < this._onNewSessionStartCallbacks.length; e++) this._onNewSessionStartCallbacks[e](this);
};
R.prototype.deleteLowerLevelDomainCookies = function () {
    var e = v.getHost(),
        t = this.options.domain && this.options.domain[0] === '.' ? this.options.domain.slice(1) : this.options.domain;
    if (!(!t || !v.isWebWorkerEnvironment()) && e !== t && new RegExp(t + '$').test(e)) {
        for (var n = e.split('.'), r = t.split('.'), i = n.length; i > r.length; --i) {
            var s = n.slice(n.length - i).join('.');
            Q.set(this._cookieName, null, { domain: '.' + s });
        }
        Q.set(this._cookieName, null, {});
    }
};
R.prototype._getInitialDeviceId = function (e, t) {
    if (e) return e;
    if (this.options.deviceIdFromUrlParam) {
        var n = this._getDeviceIdFromUrlParam(this._getUrlParams());
        if (n) return n;
    }
    return this.options.deviceId ? this.options.deviceId : t || rr();
};
var $r = function (t) {
    for (var n = 0; n < t.length; n++) {
        var r = t[n].event.user_properties,
            i = t[n].event.event_properties,
            s = t[n].event.groups;
        (t[n].event.user_properties = v.validateProperties(r)),
            (t[n].event.event_properties = v.validateProperties(i)),
            (t[n].event.groups = v.validateGroups(s));
    }
};
R.prototype._trackParamsAndReferrer = function () {
    var t, n, r, i;
    if (
        (this.options.includeUtm && (t = this._initUtmData()),
        this.options.includeReferrer && (n = this._saveReferrer(this._getReferrer())),
        this.options.includeGclid && (r = this._saveGclid(this._getUrlParams())),
        this.options.includeFbclid && (i = this._saveFbclid(this._getUrlParams())),
        this.options.logAttributionCapturedEvent)
    ) {
        var s = ne(ne(ne(ne({}, t), n), r), i);
        Object.keys(s).length > 0 && this.logEvent(A.ATTRIBUTION_EVENT, s);
    }
};
var zl = function e(t, n) {
    if (w(n) === 'object') {
        var r = new Set(['headers']),
            i = new Set(['eventUploadPeriodMillis']),
            s = function (l) {
                if (Object.prototype.hasOwnProperty.call(t, l)) {
                    var p = n[l],
                        f = w(t[l]);
                    if (!(l === 'transport' && !v.validateTransport(p))) {
                        if (l === 'sessionId' && p !== null) {
                            t[l] = v.validateSessionId(p) ? p : null;
                            return;
                        } else if (!v.validateInput(p, l + ' option', f)) return;
                        f === 'boolean'
                            ? (t[l] = !!p)
                            : (f === 'string' && !v.isEmptyString(p)) ||
                                (f === 'number' && (p > 0 || (p === 0 && i.has(l)))) ||
                                f === 'function'
                              ? (t[l] = p)
                              : f === 'object' && e(t[l], p);
                    }
                }
            };
        for (var a in n)
            r.has(a) ? (t[a] = ne(ne({}, t[a]), n[a])) : Object.prototype.hasOwnProperty.call(n, a) && s(a);
    }
};
R.prototype.runQueuedFunctions = function () {
    var e = this._q;
    this._q = [];
    for (var t = 0; t < e.length; t++) {
        var n = this[e[t][0]];
        w(n) === 'function' && n.apply(this, e[t].slice(1));
    }
};
R.prototype._apiKeySet = function (t) {
    return v.isEmptyString(this.options.apiKey)
        ? (v.log.error('Invalid apiKey. Please set a valid apiKey with init() before calling ' + t), !1)
        : !0;
};
R.prototype._loadSavedUnsentEvents = function (t) {
    var n = this._getFromStorage(de, t),
        r = this._parseSavedUnsentEventsString(n, t);
    return this._setInStorage(de, t, JSON.stringify(r)), r;
};
R.prototype._parseSavedUnsentEventsString = function (t, n) {
    if (v.isEmptyString(t)) return [];
    if (w(t) === 'string')
        try {
            var r = JSON.parse(t);
            if (w(r) === 'array') return r;
        } catch {}
    return v.log.error('Unable to load ' + n + ' events. Restart with a new empty queue.'), [];
};
R.prototype.isNewSession = function () {
    return this._newSession;
};
R.prototype.onInit = function (t) {
    this._isInitialized ? t(this) : this._onInitCallbacks.push(t);
};
R.prototype.onNewSessionStart = function (t) {
    this._onNewSessionStartCallbacks.push(t);
};
R.prototype.getSessionId = function () {
    return this._sessionId;
};
R.prototype.nextEventId = function () {
    return this._eventId++, this._eventId;
};
R.prototype.nextIdentifyId = function () {
    return this._identifyId++, this._identifyId;
};
R.prototype.nextSequenceNumber = function () {
    return this._sequenceNumber++, this._sequenceNumber;
};
R.prototype._unsentCount = function () {
    return this._unsentEvents.length + this._unsentIdentifys.length;
};
R.prototype._sendEventsIfReady = function () {
    return this._unsentCount() === 0
        ? !1
        : this.options.batchEvents
          ? this._unsentCount() >= this.options.eventUploadThreshold
              ? (this.sendEvents(), !0)
              : this.options.transport === A.TRANSPORT_BEACON
                ? (this.sendEvents(), !0)
                : (this._updateScheduled ||
                      ((this._updateScheduled = !0),
                      setTimeout(
                          function () {
                              (this._updateScheduled = !1), this.sendEvents();
                          }.bind(this),
                          this.options.eventUploadPeriodMillis,
                      )),
                  !1)
          : (this.sendEvents(), !0);
};
R.prototype.clearStorage = function () {
    return this._metadataStorage.clear();
};
R.prototype._getFromStorage = function (t, n) {
    return t.getItem(n + this._storageSuffix);
};
R.prototype._setInStorage = function (t, n, r) {
    t.setItem(n + this._storageSuffix, r);
};
var ir = function (t) {
        if (!t._useOldCookie) {
            var n = t._metadataStorage.load();
            w(n) === 'object' && Pn(t, n);
            return;
        }
        var r = t.cookieStorage.get(t._oldCookiename);
        if (w(r) === 'object') {
            Pn(t, r);
            return;
        }
    },
    Yl = function (t) {
        var n = t.cookieStorage.get(t._oldCookiename);
        w(n) === 'object' && (Pn(t, n), Se(t));
    },
    Pn = function (t, n) {
        n.deviceId && (t.options.deviceId = n.deviceId),
            n.userId && (t.options.userId = n.userId),
            n.optOut !== null && n.optOut !== void 0 && n.optOut !== !1 && (t.options.optOut = n.optOut),
            n.sessionId && (t._sessionId = parseInt(n.sessionId, 10)),
            n.lastEventTime && (t._lastEventTime = parseInt(n.lastEventTime, 10)),
            n.eventId && (t._eventId = parseInt(n.eventId, 10)),
            n.identifyId && (t._identifyId = parseInt(n.identifyId, 10)),
            n.sequenceNumber && (t._sequenceNumber = parseInt(n.sequenceNumber, 10));
    },
    Se = function (t) {
        var n = {
            deviceId: t.options.deviceId,
            userId: t.options.userId,
            optOut: t.options.optOut,
            sessionId: t._sessionId,
            lastEventTime: t._lastEventTime,
            eventId: t._eventId,
            identifyId: t._identifyId,
            sequenceNumber: t._sequenceNumber,
        };
        t._useOldCookie ? t.cookieStorage.set(t.options.cookieName + t._storageSuffix, n) : t._metadataStorage.save(n);
    };
R.prototype._initUtmData = function (t, n) {
    (t = t || this._getUrlParams()), (n = n || this.cookieStorage.get('__utmz'));
    var r = wl(n, t);
    return Ht(this, r), r;
};
R.prototype._unsetUTMParams = function () {
    var t = new z();
    t.unset(A.REFERRER),
        t.unset(A.REFERRING_DOMAIN),
        t.unset(A.UTM_SOURCE),
        t.unset(A.UTM_MEDIUM),
        t.unset(A.UTM_CAMPAIGN),
        t.unset(A.UTM_TERM),
        t.unset(A.UTM_CONTENT),
        this.identify(t);
};
var Ht = function (t, n) {
    if (!(w(n) !== 'object' || Object.keys(n).length === 0)) {
        var r = new z();
        for (var i in n)
            Object.prototype.hasOwnProperty.call(n, i) && (r.setOnce('initial_' + i, n[i]), r.set(i, n[i]));
        t.identify(r);
    }
};
R.prototype._getReferrer = function () {
    var t = this._getReferrerFromUrlParam(this._getUrlParams());
    return t || (typeof document < 'u' ? document.referrer : '');
};
R.prototype._getUrlParams = function () {
    return U.location.search;
};
R.prototype._saveGclid = function (t) {
    var n = v.getQueryParam('gclid', t);
    if (!v.isEmptyString(n)) {
        var r = { gclid: n };
        return Ht(this, r), r;
    }
};
R.prototype._saveFbclid = function (t) {
    var n = v.getQueryParam('fbclid', t);
    if (!v.isEmptyString(n)) {
        var r = { fbclid: n };
        return Ht(this, r), r;
    }
};
R.prototype._getDeviceIdFromUrlParam = function (t) {
    return v.getQueryParam(A.AMP_DEVICE_ID_PARAM, t);
};
R.prototype._getReferrerFromUrlParam = function (t) {
    return v.getQueryParam(A.AMP_REFERRER_PARAM, t);
};
R.prototype._getReferringDomain = function (t) {
    if (v.isEmptyString(t)) return null;
    var n = t.split('/');
    return n.length >= 3 ? n[2] : null;
};
R.prototype._saveReferrer = function (t) {
    if (!v.isEmptyString(t)) {
        var n = { referrer: t, referring_domain: this._getReferringDomain(t) };
        return Ht(this, n), n;
    }
};
R.prototype.saveEvents = function () {
    try {
        var t = JSON.stringify(
            this._unsentEvents.map(function (r) {
                var i = r.event;
                return i;
            }),
        );
        this._setInStorage(de, this.options.unsentKey, t);
    } catch {}
    try {
        var n = JSON.stringify(
            this._unsentIdentifys.map(function (r) {
                return r.event;
            }),
        );
        this._setInStorage(de, this.options.unsentIdentifyKey, n);
    } catch {}
};
R.prototype.setDomain = function (t) {
    if (this._shouldDeferCall()) return this._q.push(['setDomain'].concat(Array.prototype.slice.call(arguments, 0)));
    if (v.validateInput(t, 'domain', 'string'))
        try {
            this.cookieStorage.options({
                expirationDays: this.options.cookieExpiration,
                secure: this.options.secureCookie,
                domain: t,
                sameSite: this.options.sameSiteCookie,
            }),
                (this.options.domain = this.cookieStorage.options().domain),
                ir(this),
                Se(this);
        } catch (n) {
            v.log.error(n);
        }
};
R.prototype.setUserId = function (t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (v.validateInput(n, 'startNewSession', 'boolean')) {
        if (this._shouldDeferCall())
            return this._q.push(['setUserId'].concat(Array.prototype.slice.call(arguments, 0)));
        try {
            (this.options.userId = (t != null && '' + t) || null),
                n &&
                    (this.options.unsetParamsReferrerOnNewSession && this._unsetUTMParams(),
                    (this._newSession = !0),
                    (this._sessionId = new Date().getTime()),
                    this._runNewSessionStartCallbacks(),
                    this.options.saveParamsReferrerOncePerSession && this._trackParamsAndReferrer()),
                Se(this),
                this._connector && this._connector.identityStore.editIdentity().setUserId(this.options.userId).commit();
        } catch (r) {
            v.log.error(r);
        }
    }
};
R.prototype.setGroup = function (e, t) {
    if (this._shouldDeferCall()) return this._q.push(['setGroup'].concat(Array.prototype.slice.call(arguments, 0)));
    if (!(!this._apiKeySet('setGroup()') || !v.validateInput(e, 'groupType', 'string') || v.isEmptyString(e))) {
        var n = {};
        n[e] = t;
        var r = new z().set(e, t);
        this._logEvent(A.IDENTIFY_EVENT, null, null, r.userPropertiesOperations, n, null, null, null);
    }
};
R.prototype.setOptOut = function (t) {
    if (this._shouldDeferCall()) return this._q.push(['setOptOut'].concat(Array.prototype.slice.call(arguments, 0)));
    if (v.validateInput(t, 'enable', 'boolean'))
        try {
            (this.options.optOut = t), Se(this);
        } catch (n) {
            v.log.error(n);
        }
};
R.prototype.setSessionId = function (t) {
    if (v.validateInput(t, 'sessionId', 'number'))
        try {
            (this._sessionId = t), Se(this);
        } catch (n) {
            v.log.error(n);
        }
};
R.prototype.resetSessionId = function () {
    this.setSessionId(new Date().getTime());
};
R.prototype.regenerateDeviceId = function () {
    if (this._shouldDeferCall())
        return this._q.push(['regenerateDeviceId'].concat(Array.prototype.slice.call(arguments, 0)));
    this.setDeviceId(rr());
};
R.prototype.setDeviceId = function (t) {
    if (this._shouldDeferCall()) return this._q.push(['setDeviceId'].concat(Array.prototype.slice.call(arguments, 0)));
    if (v.validateDeviceId(t))
        try {
            v.isEmptyString(t) ||
                ((this.options.deviceId = '' + t),
                Se(this),
                this._connector &&
                    this._connector.identityStore.editIdentity().setDeviceId(this.options.deviceId).commit());
        } catch (n) {
            v.log.error(n);
        }
};
R.prototype.setTransport = function (t) {
    if (this._shouldDeferCall()) return this._q.push(['setTransport'].concat(Array.prototype.slice.call(arguments, 0)));
    v.validateTransport(t) && (this.options.transport = t);
};
R.prototype.setUserProperties = function (t) {
    if (this._shouldDeferCall())
        return this._q.push(['setUserProperties'].concat(Array.prototype.slice.call(arguments, 0)));
    if (!(!this._apiKeySet('setUserProperties()') || !v.validateInput(t, 'userProperties', 'object'))) {
        var n = v.truncate(v.validateProperties(t));
        if (Object.keys(n).length !== 0) {
            var r = new z();
            for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && r.set(i, n[i]);
            this.identify(r);
        }
    }
};
R.prototype.clearUserProperties = function () {
    if (this._shouldDeferCall())
        return this._q.push(['clearUserProperties'].concat(Array.prototype.slice.call(arguments, 0)));
    if (this._apiKeySet('clearUserProperties()')) {
        var t = new z();
        t.clearAll(), this.identify(t);
    }
};
var sr = function (t, n) {
    for (var r = 0; r < n._q.length; r++) {
        var i = t[n._q[r][0]];
        w(i) === 'function' && i.apply(t, n._q[r].slice(1));
    }
    return t;
};
R.prototype.identify = function (e, t, n, r) {
    if (this._shouldDeferCall()) return this._q.push(['identify'].concat(Array.prototype.slice.call(arguments, 0)));
    if (!this._apiKeySet('identify()')) {
        ee(t, n, 0, 'No request sent', { reason: 'API key is not set' });
        return;
    }
    if ((w(e) === 'object' && Object.prototype.hasOwnProperty.call(e, '_q') && (e = sr(new z(), e)), e instanceof z)) {
        if (Object.keys(e.userPropertiesOperations).length > 0)
            return this._logEvent(A.IDENTIFY_EVENT, null, null, e.userPropertiesOperations, null, null, null, t, n, r);
        ee(t, n, 0, 'No request sent', { reason: 'No user property operations' });
    } else
        v.log.error('Invalid identify input type. Expected Identify object but saw ' + w(e)),
            ee(t, n, 0, 'No request sent', { reason: 'Invalid identify input type' });
};
R.prototype.groupIdentify = function (e, t, n, r, i, s) {
    if (this._shouldDeferCall())
        return this._q.push(['groupIdentify'].concat(Array.prototype.slice.call(arguments, 0)));
    if (!this._apiKeySet('groupIdentify()')) {
        ee(r, i, 0, 'No request sent', { reason: 'API key is not set' });
        return;
    }
    if (!v.validateInput(e, 'group_type', 'string') || v.isEmptyString(e)) {
        ee(r, i, 0, 'No request sent', { reason: 'Invalid group type' });
        return;
    }
    if (t == null) {
        ee(r, i, 0, 'No request sent', { reason: 'Invalid group name' });
        return;
    }
    if ((w(n) === 'object' && Object.prototype.hasOwnProperty.call(n, '_q') && (n = sr(new z(), n)), n instanceof z)) {
        if (Object.keys(n.userPropertiesOperations).length > 0)
            return this._logEvent(
                A.GROUP_IDENTIFY_EVENT,
                null,
                null,
                null,
                qe({}, e, t),
                n.userPropertiesOperations,
                null,
                r,
                i,
                s,
            );
        ee(r, i, 0, 'No request sent', { reason: 'No group property operations' });
    } else
        v.log.error('Invalid identify input type. Expected Identify object but saw ' + w(n)),
            ee(r, i, 0, 'No request sent', { reason: 'Invalid identify input type' });
};
R.prototype.setVersionName = function (t) {
    if (this._shouldDeferCall())
        return this._q.push(['setVersionName'].concat(Array.prototype.slice.call(arguments, 0)));
    v.validateInput(t, 'versionName', 'string') && (this.options.versionName = t);
};
R.prototype._logEvent = function (t, n, r, i, s, a, o, l, p, f) {
    if ((ir(this), !t)) {
        ee(l, p, 0, 'No request sent', { reason: 'Missing eventType' });
        return;
    }
    if (this.options.optOut) {
        ee(l, p, 0, 'No request sent', { reason: 'optOut is set to true' });
        return;
    }
    try {
        var c;
        t === A.IDENTIFY_EVENT || t === A.GROUP_IDENTIFY_EVENT ? (c = this.nextIdentifyId()) : (c = this.nextEventId());
        var g = this.nextSequenceNumber(),
            h = w(o) === 'number' ? o : new Date().getTime();
        f
            ? (this._sessionId = -1)
            : (!this._sessionId || !this._lastEventTime || h - this._lastEventTime > this.options.sessionTimeout) &&
              ((this._sessionId = h), this._runNewSessionStartCallbacks()),
            (this._lastEventTime = h),
            Se(this);
        var u = this._ua.browser.name,
            d = this._ua.browser.major,
            y = this._ua.device.model || this._ua.os.name,
            P = this._ua.device.vendor;
        i = i || {};
        var q = ne({}, this._apiPropertiesTrackingOptions);
        (r = ne(ne({}, r || {}), q)), (n = n || {}), (s = s || {}), (a = a || {});
        var D = {
            device_id: this.options.deviceId,
            user_id: this.options.userId,
            timestamp: h,
            event_id: c,
            session_id: this._sessionId || -1,
            event_type: t,
            version_name: this.options.versionName || null,
            platform: Le(this, 'platform') ? this.options.platform : null,
            os_name: (Le(this, 'os_name') && u) || null,
            os_version: (Le(this, 'os_version') && d) || null,
            device_model: (Le(this, 'device_model') && y) || null,
            device_manufacturer: (Le(this, 'device_manufacturer') && P) || null,
            language: Le(this, 'language') ? this.options.language : null,
            api_properties: r,
            event_properties: v.truncate(v.validateProperties(n)),
            user_properties: v.truncate(v.validateProperties(i)),
            uuid: Vl(),
            library: this.options.library,
            sequence_number: g,
            groups: v.truncate(v.validateGroups(s)),
            group_properties: v.truncate(v.validateProperties(a)),
            user_agent: this._userAgent,
            partner_id: this.options.partnerId || null,
        };
        return (
            Wl(this) &&
                (D.plan = {
                    branch: this.options.plan.branch || void 0,
                    source: this.options.plan.source || void 0,
                    version: this.options.plan.version || void 0,
                    versionId: this.options.plan.versionId || void 0,
                }),
            Xl(this) &&
                (D.ingestion_metadata = {
                    source_name: this.options.ingestionMetadata.sourceName || void 0,
                    source_version: this.options.ingestionMetadata.sourceVersion || void 0,
                }),
            t === A.IDENTIFY_EVENT || t === A.GROUP_IDENTIFY_EVENT
                ? (this._unsentIdentifys.push({ event: D, callback: l, errorCallback: p }),
                  this._limitEventsQueued(this._unsentIdentifys))
                : (this._unsentEvents.push({ event: D, callback: l, errorCallback: p }),
                  this._limitEventsQueued(this._unsentEvents)),
            this.options.saveEvents && this.saveEvents(),
            this._sendEventsIfReady(),
            t === A.IDENTIFY_EVENT &&
                this._connector &&
                this._connector.identityStore
                    .editIdentity()
                    .updateUserProperties(v.truncate(v.validateProperties(i)))
                    .commit(),
            c
        );
    } catch (L) {
        v.log.error(L);
    }
};
var Wl = function (t) {
        return (
            t.options.plan &&
            (t.options.plan.source || t.options.plan.branch || t.options.plan.version || t.options.plan.versionId)
        );
    },
    Xl = function (t) {
        return (
            t.options.ingestionMetadata &&
            (t.options.ingestionMetadata.sourceName || t.options.ingestionMetadata.sourceVersion)
        );
    },
    Le = function (t, n) {
        return !!t.options.trackingOptions[n];
    },
    Zl = function (t) {
        for (var n = ['city', 'country', 'dma', 'ip_address', 'region'], r = {}, i = 0; i < n.length; i++) {
            var s = n[i];
            Le(t, s) || (r[s] = !1);
        }
        return r;
    };
R.prototype._limitEventsQueued = function (t) {
    if (t.length > this.options.savedMaxCount) {
        var n = t.splice(0, t.length - this.options.savedMaxCount);
        n.forEach(function (r) {
            ee(r.callback, r.errorCallback, 0, 'No request sent', {
                reason: 'Event dropped because options.savedMaxCount exceeded. User may be offline or have a content blocker',
            });
        });
    }
};
R.prototype.logEvent = function (t, n, r, i) {
    var s = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
    return this._shouldDeferCall()
        ? this._q.push(['logEvent'].concat(Array.prototype.slice.call(arguments, 0)))
        : this.logEventWithTimestamp(t, n, null, r, i, s);
};
R.prototype.logEventWithTimestamp = function (t, n, r, i, s) {
    var a = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : !1;
    return this._shouldDeferCall()
        ? this._q.push(['logEventWithTimestamp'].concat(Array.prototype.slice.call(arguments, 0)))
        : this._apiKeySet('logEvent()')
          ? v.validateInput(t, 'eventType', 'string')
              ? v.isEmptyString(t)
                  ? (ee(i, s, 0, 'No request sent', { reason: 'Missing eventType' }), -1)
                  : (v.validateInput(a, 'outOfSession', 'boolean') ||
                        ee(i, s, 0, 'No request sent', { reason: 'Invalid outOfSession value' }),
                    this._logEvent(t, n, null, null, null, null, r, i, s, a))
              : (ee(i, s, 0, 'No request sent', { reason: 'Invalid type for eventType' }), -1)
          : (ee(i, s, 0, 'No request sent', { reason: 'API key not set' }), -1);
};
R.prototype.logEventWithGroups = function (e, t, n, r, i) {
    var s = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : !1;
    return this._shouldDeferCall()
        ? this._q.push(['logEventWithGroups'].concat(Array.prototype.slice.call(arguments, 0)))
        : this._apiKeySet('logEventWithGroups()')
          ? v.validateInput(e, 'eventType', 'string')
              ? (v.validateInput(s, 'outOfSession', 'boolean') ||
                    ee(event.callback, event.errorCallback, 0, 'No request sent', {
                        reason: 'Invalid outOfSession value',
                    }),
                this._logEvent(e, t, null, null, n, null, null, r, i, s))
              : (ee(event.callback, event.errorCallback, 0, 'No request sent', {
                    reason: 'Invalid type for eventType',
                }),
                -1)
          : (ee(event.callback, event.errorCallback, 0, 'No request sent', { reason: 'API key not set' }), -1);
};
var zr = function (t) {
        return !isNaN(parseFloat(t)) && isFinite(t);
    },
    ee = function (t, n, r, i, s) {
        w(t) === 'function' && t(r, i, s), w(n) === 'function' && n(r, i, s);
    };
R.prototype.logRevenueV2 = function (t) {
    if (this._shouldDeferCall()) return this._q.push(['logRevenueV2'].concat(Array.prototype.slice.call(arguments, 0)));
    if (this._apiKeySet('logRevenueV2()'))
        if (
            (w(t) === 'object' && Object.prototype.hasOwnProperty.call(t, '_q') && (t = sr(new pe(), t)),
            t instanceof pe)
        ) {
            if (t && t._isValidRevenue()) return this.logEvent(A.REVENUE_EVENT, t._toJSONObject());
        } else v.log.error('Invalid revenue input type. Expected Revenue object but saw ' + w(t));
};
R.prototype.logRevenue = function (t, n, r) {
    return this._shouldDeferCall()
        ? this._q.push(['logRevenue'].concat(Array.prototype.slice.call(arguments, 0)))
        : !this._apiKeySet('logRevenue()') || !zr(t) || (n !== void 0 && !zr(n))
          ? -1
          : this._logEvent(
                A.REVENUE_EVENT,
                {},
                { productId: r, special: 'revenue_amount', quantity: n || 1, price: t },
                null,
                null,
                null,
                null,
                null,
            );
};
R.prototype._logErrorsOnEvents = function (t, n, r, i) {
    for (var s = ['_unsentEvents', '_unsentIdentifys'], a = 0; a < s.length; a++)
        for (var o = s[a], l = o === '_unsentEvents' ? t : n, p = 0; p < this[o].length; p++) {
            var f = this[o][p];
            f.event.event_id <= l && f.errorCallback && f.errorCallback(r, i);
        }
};
R.prototype.removeEvents = function (t, n, r, i) {
    Yr(this, '_unsentEvents', t, r, i), Yr(this, '_unsentIdentifys', n, r, i);
};
var Yr = function (t, n, r, i, s) {
    if (!(r < 0)) {
        for (var a = [], o = 0; o < t[n].length; o++) {
            var l = t[n][o];
            l.event.event_id > r ? a.push(l) : l.callback && l.callback(i, s);
        }
        t[n] = a;
    }
};
R.prototype.sendEvents = function () {
    if (!this._apiKeySet('sendEvents()')) {
        this.removeEvents(1 / 0, 1 / 0, 0, 'No request sent', { reason: 'API key not set' });
        return;
    }
    if (this.options.optOut) {
        this.removeEvents(1 / 0, 1 / 0, 0, 'No request sent', { reason: 'Opt out is set to true' });
        return;
    }
    if (this._unsentCount() !== 0) {
        if (this.options.transport !== A.TRANSPORT_BEACON) {
            if (this._sending) return;
            this._sending = !0;
        }
        var t = this.options.forceHttps || U.location.protocol === 'https:' ? 'https' : 'http',
            n = t + '://' + this.options.apiEndpoint,
            r = Math.min(this._unsentCount(), this.options.uploadBatchSize),
            i = this._mergeEventsAndIdentifys(r),
            s = i.maxEventId,
            a = i.maxIdentifyId,
            o = JSON.stringify(
                i.eventsToSend.map(function (u) {
                    var d = u.event;
                    return d;
                }),
            ),
            l = new Date().getTime(),
            p = {
                client: this.options.apiKey,
                e: o,
                v: A.API_VERSION,
                upload_time: l,
                checksum: Ro(A.API_VERSION + this.options.apiKey + o + l),
            };
        if (this.options.transport === A.TRANSPORT_BEACON && typeof navigator < 'u') {
            var f = navigator.sendBeacon(n, new URLSearchParams(p));
            f
                ? (this.removeEvents(s, a, 200, 'success'), this.options.saveEvents && this.saveEvents())
                : this._logErrorsOnEvents(s, a, 0, '');
            return;
        }
        var c = this;
        try {
            new Is(n, p, this.options.headers).send(function (u, d) {
                c._sending = !1;
                try {
                    u === 200
                        ? (c.removeEvents(s, a, u, d), c.options.saveEvents && c.saveEvents(), c._sendEventsIfReady())
                        : (c._logErrorsOnEvents(s, a, u, d),
                          u === 413 &&
                              (c.options.uploadBatchSize === 1 && c.removeEvents(s, a, u, d),
                              (c.options.uploadBatchSize = Math.ceil(r / 2)),
                              c.sendEvents()));
                } catch {}
            });
        } catch (u) {
            var g = 0,
                h = 'Request failed to send';
            v.log.error(h), c._logErrorsOnEvents(s, a, g, h), c.removeEvents(s, a, g, h, { reason: u.message });
        }
    }
};
R.prototype._mergeEventsAndIdentifys = function (t) {
    for (var n = [], r = 0, i = -1, s = 0, a = -1; n.length < t; ) {
        var o = void 0,
            l = s >= this._unsentIdentifys.length,
            p = r >= this._unsentEvents.length;
        if (p && l) {
            v.log.error('Merging Events and Identifys, less events and identifys than expected');
            break;
        } else
            l
                ? ((o = this._unsentEvents[r++]), (i = o.event.event_id))
                : p
                  ? ((o = this._unsentIdentifys[s++]), (a = o.event.event_id))
                  : !('sequence_number' in this._unsentEvents[r].event) ||
                      this._unsentEvents[r].event.sequence_number < this._unsentIdentifys[s].event.sequence_number
                    ? ((o = this._unsentEvents[r++]), (i = o.event.event_id))
                    : ((o = this._unsentIdentifys[s++]), (a = o.event.event_id));
        n.push(o);
    }
    return { eventsToSend: n, maxEventId: i, maxIdentifyId: a };
};
R.prototype.setGlobalUserProperties = function (t) {
    this.setUserProperties(t);
};
R.prototype.__VERSION__ = function () {
    return this.options.library.version;
};
R.prototype.setLibrary = function (t, n) {
    t !== null && typeof t < 'u' && (this.options.library.name = t),
        n !== null && typeof n < 'u' && (this.options.library.version = n);
};
R.prototype._shouldDeferCall = function () {
    return this._pendingReadStorage || this._initializationDeferred;
};
R.prototype._deferInitialization = function () {
    (this._initializationDeferred = !0), this._q.push(['init'].concat(Array.prototype.slice.call(arguments, 0)));
};
R.prototype.enableTracking = function () {
    (this._initializationDeferred = !1), Se(this), this.runQueuedFunctions();
};
R.prototype._refreshDynamicConfig = function () {
    this.options.useDynamicConfig &&
        Jr.refresh(
            this.options.serverZone,
            this.options.forceHttps,
            function () {
                this.options.apiEndpoint = Jr.ingestionEndpoint;
            }.bind(this),
        );
};
R.prototype.getDeviceId = function () {
    return this.options.deviceId;
};
R.prototype.getUserId = function () {
    return this.options.userId;
};
R.prototype.setMinTimeBetweenSessionsMillis = function (t) {
    if (v.validateInput(t, 'timeInMillis', 'number')) {
        if (this._shouldDeferCall())
            return this._q.push(['setMinTimeBetweenSessionsMillis'].concat(Array.prototype.slice.call(arguments, 0)));
        try {
            this.options.sessionTimeout = t;
        } catch (n) {
            v.log.error(n);
        }
    }
};
R.prototype.setEventUploadThreshold = function (t) {
    if (v.validateInput(t, 'eventUploadThreshold', 'number')) {
        if (this._shouldDeferCall())
            return this._q.push(['setEventUploadThreshold'].concat(Array.prototype.slice.call(arguments, 0)));
        try {
            this.options.eventUploadThreshold = t;
        } catch (n) {
            v.log.error(n);
        }
    }
};
R.prototype.setUseDynamicConfig = function (t) {
    if (v.validateInput(t, 'useDynamicConfig', 'boolean')) {
        if (this._shouldDeferCall())
            return this._q.push(['setUseDynamicConfig'].concat(Array.prototype.slice.call(arguments, 0)));
        try {
            (this.options.useDynamicConfig = t), this._refreshDynamicConfig();
        } catch (n) {
            v.log.error(n);
        }
    }
};
R.prototype.setServerZone = function (t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    if (!((t !== Ge.EU && t !== Ge.US) || !v.validateInput(n, 'serverZoneBasedApi', 'boolean'))) {
        if (this._shouldDeferCall())
            return this._q.push(['setServerZone'].concat(Array.prototype.slice.call(arguments, 0)));
        try {
            (this.options.serverZone = t),
                (this.options.serverZoneBasedApi = n),
                n && (this.options.apiEndpoint = bs(this.options.serverZone));
        } catch (r) {
            v.log.error(r);
        }
    }
};
R.prototype.setServerUrl = function (t) {
    if (v.validateInput(t, 'serverUrl', 'string')) {
        if (this._shouldDeferCall())
            return this._q.push(['setServerUrl'].concat(Array.prototype.slice.call(arguments, 0)));
        try {
            this.options.apiEndpoint = t;
        } catch (n) {
            v.log.error(n);
        }
    }
};
var B = function () {
    (this.options = ne({}, Re)), (this._q = []), (this._instances = {});
};
B.prototype.Identify = z;
B.prototype.Revenue = pe;
B.prototype.getInstance = function (t) {
    t = v.isEmptyString(t) ? A.DEFAULT_INSTANCE : t.toLowerCase();
    var n = this._instances[t];
    return n === void 0 && ((n = new R(t)), (this._instances[t] = n)), n;
};
(B.prototype.init = function (t, n, r, i) {
    this.getInstance().init(
        t,
        n,
        r,
        function (s) {
            (this.options = s.options), w(i) === 'function' && i(s);
        }.bind(this),
    );
}),
    (B.prototype.isNewSession = function () {
        return this.getInstance().isNewSession();
    }),
    (B.prototype.getSessionId = function () {
        return this.getInstance().getSessionId();
    }),
    (B.prototype.nextEventId = function () {
        return this.getInstance().nextEventId();
    }),
    (B.prototype.nextIdentifyId = function () {
        return this.getInstance().nextIdentifyId();
    }),
    (B.prototype.nextSequenceNumber = function () {
        return this.getInstance().nextSequenceNumber();
    }),
    (B.prototype.saveEvents = function () {
        this.getInstance().saveEvents();
    }),
    (B.prototype.setDomain = function (t) {
        this.getInstance().setDomain(t);
    }),
    (B.prototype.setUserId = function (t) {
        this.getInstance().setUserId(t);
    }),
    (B.prototype.setGroup = function (e, t) {
        this.getInstance().setGroup(e, t);
    }),
    (B.prototype.setOptOut = function (t) {
        this.getInstance().setOptOut(t);
    }),
    (B.prototype.regenerateDeviceId = function () {
        this.getInstance().regenerateDeviceId();
    }),
    (B.prototype.setDeviceId = function (t) {
        this.getInstance().setDeviceId(t);
    }),
    (B.prototype.setUserProperties = function (t) {
        this.getInstance().setUserProperties(t);
    }),
    (B.prototype.clearUserProperties = function () {
        this.getInstance().clearUserProperties();
    }),
    (B.prototype.identify = function (e, t) {
        this.getInstance().identify(e, t);
    }),
    (B.prototype.setVersionName = function (t) {
        this.getInstance().setVersionName(t);
    }),
    (B.prototype.logEvent = function (t, n, r) {
        return this.getInstance().logEvent(t, n, r);
    }),
    (B.prototype.logEventWithGroups = function (e, t, n, r) {
        return this.getInstance().logEventWithGroups(e, t, n, r);
    }),
    (B.prototype.logRevenueV2 = function (t) {
        return this.getInstance().logRevenueV2(t);
    }),
    (B.prototype.logRevenue = function (t, n, r) {
        return this.getInstance().logRevenue(t, n, r);
    }),
    (B.prototype.removeEvents = function (t, n) {
        this.getInstance().removeEvents(t, n);
    }),
    (B.prototype.sendEvents = function (t) {
        this.getInstance().sendEvents(t);
    }),
    (B.prototype.setGlobalUserProperties = function (t) {
        this.getInstance().setUserProperties(t);
    });
B.prototype.__VERSION__ = Ss;
var Ut = (typeof U < 'u' && U.amplitude) || {},
    ar = new B();
ar._q = Ut._q || [];
for (var pn in Ut._iq)
    Object.prototype.hasOwnProperty.call(Ut._iq, pn) && (ar.getInstance(pn)._q = Ut._iq[pn]._q || []);
const Ql =
        window.location.hostname === 'arbeidsgiver.nav.no' || window.location.hostname === 'arbeidsgiver.nais.adeo.no',
    eu = Ql ? 'a8243d37808422b4c768d31c88a22ef4' : '6ed1f00aabc6ced4fd6fcb7fcdc01b30',
    tu = ar.getInstance();
window.location.hostname !== 'localhost' &&
    tu.init(eu, '', {
        apiEndpoint: 'amplitude.nav.no/collect',
        saveEvents: !1,
        includeUtm: !0,
        batchEvents: !1,
        includeReferrer: !0,
    });
const nu = {
        ALT_MA_VAERE_FYLT_UT: 'Alt må være fylt ut før du kan godkjenne',
        SAMTIDIGE_ENDRINGER:
            'Du må oppdatere siden før du kan lagre, godkjenne eller gjøre andre endringer. Det er gjort endringer i avtalen som du ikke har sett.',
        IKKE_VALGT_PART: 'Ikke valgt part',
        VEILEDER_SKAL_GODKJENNE_SIST: 'Veileder må godkjenne avtalen etter deltaker og arbeidsgiver.',
        DELTAKER_HAR_GODKJENT: 'Deltaker har allerede godkjent avtalen',
        ARBEIDSGIVER_SKAL_GODKJENNE_FOER_VEILEDER: 'Arbeidsgiver må godkjenne avtalen før veileder kan godkjenne',
        GODKJENT_PAA_VEGNE_GRUNN_MAA_VELGES: 'Arbeidsgiver må godkjenne avtalen før veileder kan godkjenne',
        GRUNN_TIL_AVBRYTELSE: 'Grunn til avbrytelse av avtale må oppgis',
        UGYLDIG_TLF: 'Telefonnummeret er ikke et gyldig mobilnummer',
        KAN_IKKE_OPPHEVE:
            'Kan ikke oppheve godkjenninger i avtalen. Det er gjort endringer i avtalen som du ikke har sett. Oppfrisk siden og prøv igjen.',
        KAN_IKKE_ENDRE: 'Kan ikke endre avtale.',
        KAN_IKKE_LAASES_OPP: 'Avtalen kan ikke låses opp',
        ER_ALLEREDE_VEILEDER: 'Innlogget bruker er allerede veileder på denne avtalen',
        START_ETTER_SLUTT: 'Startdato er etter sluttdato',
        VARIGHET_DATO_TILBAKE_I_TID: 'Dato på varighet er tilbake i tid',
        VARIGHET_FOR_LANG_MIDLERTIDIG_LONNSTILSKUDD_12_MND: 'Avtalens varighet er maksimalt 12 måneder',
        VARIGHET_FOR_LANG_MIDLERTIDIG_LONNSTILSKUDD_24_MND: 'Avtalens varighet er maksimalt 24 måneder',
        VARIGHET_FOR_LANG_MENTOR_6_MND: 'Avtalens varighet er maksimalt 6 måneder',
        VARIGHET_FOR_LANG_MENTOR_36_MND: 'Avtalens varighet er maksimalt 36 måneder',
        VARIGHET_FOR_LANG_ARBEIDSTRENING: 'Avtalens varighet er maksimalt 18 måneder',
        VARIGHET_FOR_LANG_INKLUDERINGSTILSKUDD: 'Avtalens varighet er maksimalt 12 måneder',
        ENHET_ER_JURIDISK: 'Avtale må registreres på virksomhetens virksomhetsnummer, ikke den juridiske enheten.',
        ENHET_ER_ORGLEDD: 'Avtale må registreres på virksomhetens virksomhetsnummer, ikke organisasjonsleddet.',
        ENHET_FINNES_IKKE: 'Finnes ikke i Enhetsregisteret.',
        IKKE_TILGANG_TIL_DELTAKER: 'Du har ikke tilgang til deltaker',
        ALTINN_FEIL: 'Feil ved oppslag mot altinn',
        GOSYS_FEIL: '',
        IKKE_FORDELT: 'Avtalen er ikke fordelt til en veileder',
        KAN_IKKE_GODKJENNE_AVTALE_KODE6: 'Avtalen kan ikke godkjennes',
        KAN_IKKE_OPPRETTE_AVTALE_KODE6: 'Avtalen kan ikke opprettes',
        TILSKUDDSPERIODE_ER_ALLEREDE_BEHANDLET: 'Tilskuddsperioden er allerede behandlet',
        TILSKUDDSPERIODE_ER_IKKE_SATT: 'Avtalen mangler tilskudsperiode',
        TILSKUDDSPERIODE_BEHANDLE_FOR_TIDLIG: 'Tilskuddsperioden kan ikke behandles tidligere enn 2 uker før startdato',
        TILSKUDDSPERIODE_KAN_KUN_BEHANDLES_VED_INNGAATT_AVTALE:
            'Tilskuddsperioden kan kun behandles ved inngått avtale',
        TILSKUDDSPERIODE_AVSLAGSFORKLARING_PAAKREVD: 'Avslagsforklaring må fylles ut',
        TILSKUDDSPERIODE_INGEN_AVSLAGSAARSAKER: 'Minst én avslagsårsak må velges',
        TILSKUDDSPERIODE_IKKE_GODKJENNE_EGNE: 'Du kan ikke godkjenne tilskuddsperioder for egne avtaler',
        LONNSTILSKUDD_PROSENT_ER_UGYLDIG: 'Ugyldig lønnstilskudd prosent',
        KONTOREGISTER_FEIL: 'Feil ved oppslag til kontoregister',
        KONTOREGISTER_FEIL_BEDRIFT_IKKE_FUNNET: 'Finner ikke bedrift hos kontonummerregister',
        IKKE_ADMIN_TILGANG: 'Du har ikke tilgang til denne administrator-funksjonaliteten',
        SOMMERJOBB_FOR_TIDLIG: 'Sommerjobb kan ikke starte før 01.06',
        SOMMERJOBB_FOR_SENT: 'Sommerjobb kan ikke starte etter 31.08',
        SOMMERJOBB_FOR_LANG_VARIGHET: 'Sommerjobb kan ikke vare lenger enn 4 uker',
        SOMMERJOBB_IKKE_GAMMEL_NOK: 'Deltaker må være fylt 16 år',
        SOMMERJOBB_FOR_GAMMEL: 'Deltaker må være under 30 år for dette tiltaket',
        SOMMERJOBB_FOR_GAMMEL_FRA_OPPSTARTDATO: 'Deltaker kan ikke ha fylt 30 år før startdatoen til dette tiltaket',
        DELTAKER_67_AAR: 'Deltaker må være under 67 år ved sluttdatoen av tiltaket',
        DELTAKER_72_AAR: 'Deltaker må være under 72 år ved sluttdatoen av tiltaket',
        FEIL_OTP_SATS: 'Sats for obligatorisk tjenestepensjon må være mellom 0 og 30 %.',
        KAN_IKKE_FORKORTE_ETTER_SLUTTDATO: 'Avtalen kan ikke forkortes til etter sluttdato',
        KAN_IKKE_FORKORTE_FOR_STARTDATO: 'Avtalen kan ikke forkortes til før startdato',
        KAN_IKKE_FORLENGE_FEIL_SLUTTDATO: 'Avtalen kan ikke forlenges til før sluttdato',
        KAN_IKKE_FORKORTE_IKKE_GODKJENT_AVTALE: 'Kan ikke forkorte avtalen før den er godkjent',
        KAN_IKKE_FORKORTE_GRUNN_MANGLER: 'Grunn for forkortelse må velges',
        KAN_IKKE_ANNULLERES_ALLEREDE_ANNULLERT: 'Avtalen kan ikke annulleres siden den allerede er annullert',
        KAN_IKKE_ENDRE_STILLINGSBESKRIVELSE_GRUNN_MANGLER: 'Alle felt må være utfylt',
        KAN_IKKE_ENDRE_KONTAKTINFO_GRUNN_MANGLER: 'Alle felt må være utfylt',
        KAN_IKKE_ENDRE_OPPFØLGING_OG_TILRETTELEGGING_GRUNN_MANGLER: 'Alle felt må være utfylt',
        KAN_IKKE_ENDRE_MAAL_TOM_LISTE: 'Du må ha minst ett mål',
        KOSTNADSSTED_LIK_OPPFOLGINGSENHET:
            'Kostnadssted blir satt lik oppfølgingsenhet ved avtaleinngåelse, trengs derfor ikke settes.',
        MANGLER_AD_GRUPPE_BESLUTTER:
            'Kan ikke logge inn som beslutter fordi du mangler gruppe 0000-GA-TILTAK-tilskudd-beslutter',
        MANGLER_VEILEDER_PÅ_AVTALE: 'Avtalen trenger en veileder før du kan godkjenne',
        KVALIFISERINGSGRUPPE_MIDLERTIDIG_LONNTILSKUDD_OG_SOMMERJOBB_FEIL:
            'Deltaker kvalifiserer ikke til dette tiltaket',
        KVALIFISERINGSGRUPPE_VARIG_LONNTILSKUDD_FEIL: 'Deltaker kvalifiserer ikke til dette tiltaket',
        KVALIFISERINGSGRUPPE_IKKE_RETTIGHET:
            'Deltakeren er registrert med en kvalifiseringsgruppe som ikke kvalifiserer til dette tiltaket. Sjekk at innsatsbehovet stemmer. Hvis det stemmer så gi beskjed til arbeidsgiver og annuller avtale.',
        FORMIDLINGSGRUPPE_IKKE_RETTIGHET:
            'Deltakeren er registrert med en formidlingsgruppe som ikke kvalifiserer til dette tiltaket.',
        HENTING_AV_INNSATS_BEHOV_FEILET: 'Feil ved henting av innsatsbehov',
        FORTIDLIG_STARTDATO: 'Startdatoen for avtalen er mer enn 7 dager tilbake i tid og må derfor åpnes av NAV',
        KAN_IKKE_MERKES_FOR_ETTERREGISTRERING_AVTALE_GODKJENT:
            'Kan ikke endre etterregistrering etter at avtalen er godkjent.',
        AVTALE_INNEHOLDER_UTBETALT_TILSKUDDSPERIODE:
            'Avtalen inneholder utbetalte tilskuddsperiode(er). Avtalen kan derfor ikke annulleres.',
        UGYLDIG_VIRKSOMHETSNUMMER: 'Du må oppgi gyldig virksomhetsnummer',
        UGYLDIG_FØDSELSNUMMER: 'Du må oppgi gyldig fødselsnummer for deltaker',
        UGYLDIG_AVTALETYPE: 'Du må oppgi avtaletype',
        KAN_IKKE_OPPHEVE_GODKJENNINGER_VED_INNGAATT_AVTALE:
            'Avtalen er inngått. Godkjenninger kan derfor ikke oppheves. Forsøk å oppfrisk siden.',
        INKLUDERINGSTILSKUDD_SUM_FOR_HØY: 'Totalbeløpet for tilskudd overstiger det maksimale beløpet',
        KAN_IKKE_ENDRE_INKLUDERINGSTILSKUDD_TOM_LISTE: 'Du må ha minst ett tilskudd',
        MENTOR_MÅ_SIGNERE_TAUSHETSERKLÆRING: 'Veileder må godkjenne avtalen etter deltaker, mentor og arbeidsgiver.',
        DELTAGER_OG_MENTOR_KAN_IKKE_HA_SAMME_FØDSELSNUMMER: 'Deltager og mentor kan ikke ha det samme fødselsnummeret',
        AVTALE_INNEHOLDER_TILSKUDDSPERIODE_MED_GODKJENT_REFUSJON:
            'Avtalen inneholder tilskuddsperiode(er) med godkjente refusjon(er). Avtalen kan derfor ikke annulleres.',
        MANGLER_BEREGNING: 'Beregning av tilskudd må være utfylt',
        SLUTTDATO_GRENSE_NÅDD: 'Maksimal sluttdato er overskredet. Makismal sluttdato er 31.12.2089',
        VARIG_LONNSTILSKUDD_TILSKUDDSPERIODE_MIDLERTIDIG_AVSKURDD:
            'Godkjenning av tilskuddsperioder for varig lønnstilskudd er midlertideig avskrudd. Det jobbes med å rette en feil ifbm. med reduksjon av tilskuddsprosent. Dette vil bli fikset i løpet av kort tid.',
        KAN_IKKE_ENDRE_ARENA_MIGRERINGSDATO_INNGAATT_AVTALE:
            'Avtalen er inngått. Arena-migreringsdato kan derfor ikke endres. Annuller og opprett avtalen på nytt.',
        KAN_IKKE_FORKORTE_FOR_UTBETALT_TILSKUDDSPERIODE:
            'Avtalen kan ikke forkortes til før en tilskuddsperiode som er godkjent av arbeidsgiver.',
    },
    ru = Object.prototype.toString;
function iu(e, t) {
    return ru.call(e) === `[object ${t}]`;
}
function Ts(e) {
    return iu(e, 'Object');
}
function or(e) {
    return !!(e && e.then && typeof e.then == 'function');
}
function yt(e) {
    return e && e.Math == Math ? e : void 0;
}
const fe =
    (typeof globalThis == 'object' && yt(globalThis)) ||
    (typeof window == 'object' && yt(window)) ||
    (typeof self == 'object' && yt(self)) ||
    (typeof global == 'object' && yt(global)) ||
    (function () {
        return this;
    })() ||
    {};
function As(e, t, n) {
    const r = n || fe,
        i = (r.__SENTRY__ = r.__SENTRY__ || {});
    return i[e] || (i[e] = t());
}
const su = typeof __SENTRY_DEBUG__ > 'u' || __SENTRY_DEBUG__,
    au = 'Sentry Logger ',
    Wr = ['debug', 'info', 'warn', 'error', 'log', 'assert', 'trace'],
    Xr = {};
function Ns(e) {
    if (!('console' in fe)) return e();
    const t = fe.console,
        n = {},
        r = Object.keys(Xr);
    r.forEach((i) => {
        const s = Xr[i];
        (n[i] = t[i]), (t[i] = s);
    });
    try {
        return e();
    } finally {
        r.forEach((i) => {
            t[i] = n[i];
        });
    }
}
function ou() {
    let e = !1;
    const t = {
        enable: () => {
            e = !0;
        },
        disable: () => {
            e = !1;
        },
        isEnabled: () => e,
    };
    return (
        su
            ? Wr.forEach((n) => {
                  t[n] = (...r) => {
                      e &&
                          Ns(() => {
                              fe.console[n](`${au}[${n}]:`, ...r);
                          });
                  };
              })
            : Wr.forEach((n) => {
                  t[n] = () => {};
              }),
        t
    );
}
const De = ou();
function Ue(e) {
    return Un(e, new Map());
}
function Un(e, t) {
    if (lu(e)) {
        const n = t.get(e);
        if (n !== void 0) return n;
        const r = {};
        t.set(e, r);
        for (const i of Object.keys(e)) typeof e[i] < 'u' && (r[i] = Un(e[i], t));
        return r;
    }
    if (Array.isArray(e)) {
        const n = t.get(e);
        if (n !== void 0) return n;
        const r = [];
        return (
            t.set(e, r),
            e.forEach((i) => {
                r.push(Un(i, t));
            }),
            r
        );
    }
    return e;
}
function lu(e) {
    if (!Ts(e)) return !1;
    try {
        const t = Object.getPrototypeOf(e).constructor.name;
        return !t || t === 'Object';
    } catch {
        return !0;
    }
}
function he() {
    const e = fe,
        t = e.crypto || e.msCrypto;
    let n = () => Math.random() * 16;
    try {
        if (t && t.randomUUID) return t.randomUUID().replace(/-/g, '');
        t &&
            t.getRandomValues &&
            (n = () => {
                const r = new Uint8Array(1);
                return t.getRandomValues(r), r[0];
            });
    } catch {}
    return ('10000000100040008000' + 1e11).replace(/[018]/g, (r) => (r ^ ((n() & 15) >> (r / 4))).toString(16));
}
function uu(e) {
    return Array.isArray(e) ? e : [e];
}
var ye;
(function (e) {
    e[(e.PENDING = 0)] = 'PENDING';
    const n = 1;
    e[(e.RESOLVED = n)] = 'RESOLVED';
    const r = 2;
    e[(e.REJECTED = r)] = 'REJECTED';
})(ye || (ye = {}));
class Oe {
    constructor(t) {
        Oe.prototype.__init.call(this),
            Oe.prototype.__init2.call(this),
            Oe.prototype.__init3.call(this),
            Oe.prototype.__init4.call(this),
            (this._state = ye.PENDING),
            (this._handlers = []);
        try {
            t(this._resolve, this._reject);
        } catch (n) {
            this._reject(n);
        }
    }
    then(t, n) {
        return new Oe((r, i) => {
            this._handlers.push([
                !1,
                (s) => {
                    if (!t) r(s);
                    else
                        try {
                            r(t(s));
                        } catch (a) {
                            i(a);
                        }
                },
                (s) => {
                    if (!n) i(s);
                    else
                        try {
                            r(n(s));
                        } catch (a) {
                            i(a);
                        }
                },
            ]),
                this._executeHandlers();
        });
    }
    catch(t) {
        return this.then((n) => n, t);
    }
    finally(t) {
        return new Oe((n, r) => {
            let i, s;
            return this.then(
                (a) => {
                    (s = !1), (i = a), t && t();
                },
                (a) => {
                    (s = !0), (i = a), t && t();
                },
            ).then(() => {
                if (s) {
                    r(i);
                    return;
                }
                n(i);
            });
        });
    }
    __init() {
        this._resolve = (t) => {
            this._setResult(ye.RESOLVED, t);
        };
    }
    __init2() {
        this._reject = (t) => {
            this._setResult(ye.REJECTED, t);
        };
    }
    __init3() {
        this._setResult = (t, n) => {
            if (this._state === ye.PENDING) {
                if (or(n)) {
                    n.then(this._resolve, this._reject);
                    return;
                }
                (this._state = t), (this._value = n), this._executeHandlers();
            }
        };
    }
    __init4() {
        this._executeHandlers = () => {
            if (this._state === ye.PENDING) return;
            const t = this._handlers.slice();
            (this._handlers = []),
                t.forEach((n) => {
                    n[0] ||
                        (this._state === ye.RESOLVED && n[1](this._value),
                        this._state === ye.REJECTED && n[2](this._value),
                        (n[0] = !0));
                });
        };
    }
}
const Rs = 1e3;
function lr() {
    return Date.now() / Rs;
}
function du() {
    const { performance: e } = fe;
    if (!e || !e.now) return lr;
    const t = Date.now() - e.now(),
        n = e.timeOrigin == null ? t : e.timeOrigin;
    return () => (n + e.now()) / Rs;
}
const Os = du();
(() => {
    const { performance: e } = fe;
    if (!e || !e.now) return;
    const t = 3600 * 1e3,
        n = e.now(),
        r = Date.now(),
        i = e.timeOrigin ? Math.abs(e.timeOrigin + n - r) : t,
        s = i < t,
        a = e.timing && e.timing.navigationStart,
        l = typeof a == 'number' ? Math.abs(a + n - r) : t,
        p = l < t;
    return s || p ? (i <= l ? e.timeOrigin : a) : r;
})();
const Kt = typeof __SENTRY_DEBUG__ > 'u' || __SENTRY_DEBUG__,
    ks = 'production';
function cu() {
    return As('globalEventProcessors', () => []);
}
function Kn(e, t, n, r = 0) {
    return new Oe((i, s) => {
        const a = e[r];
        if (t === null || typeof a != 'function') i(t);
        else {
            const o = a({ ...t }, n);
            Kt && a.id && o === null && De.log(`Event processor "${a.id}" dropped event`),
                or(o)
                    ? o.then((l) => Kn(e, l, n, r + 1).then(i)).then(null, s)
                    : Kn(e, o, n, r + 1)
                          .then(i)
                          .then(null, s);
        }
    });
}
function fu(e) {
    const t = Os(),
        n = {
            sid: he(),
            init: !0,
            timestamp: t,
            started: t,
            duration: 0,
            status: 'ok',
            errors: 0,
            ignoreDuration: !1,
            toJSON: () => gu(n),
        };
    return e && Jt(n, e), n;
}
function Jt(e, t = {}) {
    if (
        (t.user &&
            (!e.ipAddress && t.user.ip_address && (e.ipAddress = t.user.ip_address),
            !e.did && !t.did && (e.did = t.user.id || t.user.email || t.user.username)),
        (e.timestamp = t.timestamp || Os()),
        t.abnormal_mechanism && (e.abnormal_mechanism = t.abnormal_mechanism),
        t.ignoreDuration && (e.ignoreDuration = t.ignoreDuration),
        t.sid && (e.sid = t.sid.length === 32 ? t.sid : he()),
        t.init !== void 0 && (e.init = t.init),
        !e.did && t.did && (e.did = `${t.did}`),
        typeof t.started == 'number' && (e.started = t.started),
        e.ignoreDuration)
    )
        e.duration = void 0;
    else if (typeof t.duration == 'number') e.duration = t.duration;
    else {
        const n = e.timestamp - e.started;
        e.duration = n >= 0 ? n : 0;
    }
    t.release && (e.release = t.release),
        t.environment && (e.environment = t.environment),
        !e.ipAddress && t.ipAddress && (e.ipAddress = t.ipAddress),
        !e.userAgent && t.userAgent && (e.userAgent = t.userAgent),
        typeof t.errors == 'number' && (e.errors = t.errors),
        t.status && (e.status = t.status);
}
function pu(e, t) {
    let n = {};
    t ? (n = { status: t }) : e.status === 'ok' && (n = { status: 'exited' }), Jt(e, n);
}
function gu(e) {
    return Ue({
        sid: `${e.sid}`,
        init: e.init,
        started: new Date(e.started * 1e3).toISOString(),
        timestamp: new Date(e.timestamp * 1e3).toISOString(),
        status: e.status,
        errors: e.errors,
        did: typeof e.did == 'number' || typeof e.did == 'string' ? `${e.did}` : void 0,
        duration: e.duration,
        abnormal_mechanism: e.abnormal_mechanism,
        attrs: { release: e.release, environment: e.environment, ip_address: e.ipAddress, user_agent: e.userAgent },
    });
}
const mu = 1;
function hu(e) {
    const { spanId: t, traceId: n } = e.spanContext(),
        { data: r, op: i, parent_span_id: s, status: a, tags: o, origin: l } = Ft(e);
    return Ue({ data: r, op: i, parent_span_id: s, span_id: t, status: a, tags: o, trace_id: n, origin: l });
}
function Ft(e) {
    return vu(e) ? e.getSpanJSON() : typeof e.toJSON == 'function' ? e.toJSON() : {};
}
function vu(e) {
    return typeof e.getSpanJSON == 'function';
}
function _u(e) {
    const { traceFlags: t } = e.spanContext();
    return !!(t & mu);
}
function Eu(e, t) {
    return ur().captureEvent(e, t);
}
function yu() {
    return ur().getClient();
}
function Iu() {
    return ur().getScope();
}
function Ds(e) {
    return e.transaction;
}
function bu(e, t, n) {
    const r = t.getOptions(),
        { publicKey: i } = t.getDsn() || {},
        { segment: s } = (n && n.getUser()) || {},
        a = Ue({ environment: r.environment || ks, release: r.release, user_segment: s, public_key: i, trace_id: e });
    return t.emit && t.emit('createDsc', a), a;
}
function Su(e) {
    const t = yu();
    if (!t) return {};
    const n = bu(Ft(e).trace_id || '', t, Iu()),
        r = Ds(e);
    if (!r) return n;
    const i = r && r._frozenDynamicSamplingContext;
    if (i) return i;
    const { sampleRate: s, source: a } = r.metadata;
    s != null && (n.sample_rate = `${s}`);
    const o = Ft(r);
    return (
        a && a !== 'url' && (n.transaction = o.description),
        (n.sampled = String(_u(r))),
        t.emit && t.emit('createDsc', n),
        n
    );
}
function Tu(e, t) {
    const { fingerprint: n, span: r, breadcrumbs: i, sdkProcessingMetadata: s } = t;
    Au(e, t), r && Ou(e, r), ku(e, n), Nu(e, i), Ru(e, s);
}
function Au(e, t) {
    const { extra: n, tags: r, user: i, contexts: s, level: a, transactionName: o } = t,
        l = Ue(n);
    l && Object.keys(l).length && (e.extra = { ...l, ...e.extra });
    const p = Ue(r);
    p && Object.keys(p).length && (e.tags = { ...p, ...e.tags });
    const f = Ue(i);
    f && Object.keys(f).length && (e.user = { ...f, ...e.user });
    const c = Ue(s);
    c && Object.keys(c).length && (e.contexts = { ...c, ...e.contexts }), a && (e.level = a), o && (e.transaction = o);
}
function Nu(e, t) {
    const n = [...(e.breadcrumbs || []), ...t];
    e.breadcrumbs = n.length ? n : void 0;
}
function Ru(e, t) {
    e.sdkProcessingMetadata = { ...e.sdkProcessingMetadata, ...t };
}
function Ou(e, t) {
    e.contexts = { trace: hu(t), ...e.contexts };
    const n = Ds(t);
    if (n) {
        e.sdkProcessingMetadata = { dynamicSamplingContext: Su(t), ...e.sdkProcessingMetadata };
        const r = Ft(n).description;
        r && (e.tags = { transaction: r, ...e.tags });
    }
}
function ku(e, t) {
    (e.fingerprint = e.fingerprint ? uu(e.fingerprint) : []),
        t && (e.fingerprint = e.fingerprint.concat(t)),
        e.fingerprint && !e.fingerprint.length && delete e.fingerprint;
}
const Du = 100;
class He {
    constructor() {
        (this._notifyingListeners = !1),
            (this._scopeListeners = []),
            (this._eventProcessors = []),
            (this._breadcrumbs = []),
            (this._attachments = []),
            (this._user = {}),
            (this._tags = {}),
            (this._extra = {}),
            (this._contexts = {}),
            (this._sdkProcessingMetadata = {}),
            (this._propagationContext = Zr());
    }
    static clone(t) {
        return t ? t.clone() : new He();
    }
    clone() {
        const t = new He();
        return (
            (t._breadcrumbs = [...this._breadcrumbs]),
            (t._tags = { ...this._tags }),
            (t._extra = { ...this._extra }),
            (t._contexts = { ...this._contexts }),
            (t._user = this._user),
            (t._level = this._level),
            (t._span = this._span),
            (t._session = this._session),
            (t._transactionName = this._transactionName),
            (t._fingerprint = this._fingerprint),
            (t._eventProcessors = [...this._eventProcessors]),
            (t._requestSession = this._requestSession),
            (t._attachments = [...this._attachments]),
            (t._sdkProcessingMetadata = { ...this._sdkProcessingMetadata }),
            (t._propagationContext = { ...this._propagationContext }),
            (t._client = this._client),
            t
        );
    }
    setClient(t) {
        this._client = t;
    }
    getClient() {
        return this._client;
    }
    addScopeListener(t) {
        this._scopeListeners.push(t);
    }
    addEventProcessor(t) {
        return this._eventProcessors.push(t), this;
    }
    setUser(t) {
        return (
            (this._user = t || { email: void 0, id: void 0, ip_address: void 0, segment: void 0, username: void 0 }),
            this._session && Jt(this._session, { user: t }),
            this._notifyScopeListeners(),
            this
        );
    }
    getUser() {
        return this._user;
    }
    getRequestSession() {
        return this._requestSession;
    }
    setRequestSession(t) {
        return (this._requestSession = t), this;
    }
    setTags(t) {
        return (this._tags = { ...this._tags, ...t }), this._notifyScopeListeners(), this;
    }
    setTag(t, n) {
        return (this._tags = { ...this._tags, [t]: n }), this._notifyScopeListeners(), this;
    }
    setExtras(t) {
        return (this._extra = { ...this._extra, ...t }), this._notifyScopeListeners(), this;
    }
    setExtra(t, n) {
        return (this._extra = { ...this._extra, [t]: n }), this._notifyScopeListeners(), this;
    }
    setFingerprint(t) {
        return (this._fingerprint = t), this._notifyScopeListeners(), this;
    }
    setLevel(t) {
        return (this._level = t), this._notifyScopeListeners(), this;
    }
    setTransactionName(t) {
        return (this._transactionName = t), this._notifyScopeListeners(), this;
    }
    setContext(t, n) {
        return n === null ? delete this._contexts[t] : (this._contexts[t] = n), this._notifyScopeListeners(), this;
    }
    setSpan(t) {
        return (this._span = t), this._notifyScopeListeners(), this;
    }
    getSpan() {
        return this._span;
    }
    getTransaction() {
        const t = this._span;
        return t && t.transaction;
    }
    setSession(t) {
        return t ? (this._session = t) : delete this._session, this._notifyScopeListeners(), this;
    }
    getSession() {
        return this._session;
    }
    update(t) {
        if (!t) return this;
        const n = typeof t == 'function' ? t(this) : t;
        if (n instanceof He) {
            const r = n.getScopeData();
            (this._tags = { ...this._tags, ...r.tags }),
                (this._extra = { ...this._extra, ...r.extra }),
                (this._contexts = { ...this._contexts, ...r.contexts }),
                r.user && Object.keys(r.user).length && (this._user = r.user),
                r.level && (this._level = r.level),
                r.fingerprint.length && (this._fingerprint = r.fingerprint),
                n.getRequestSession() && (this._requestSession = n.getRequestSession()),
                r.propagationContext && (this._propagationContext = r.propagationContext);
        } else if (Ts(n)) {
            const r = t;
            (this._tags = { ...this._tags, ...r.tags }),
                (this._extra = { ...this._extra, ...r.extra }),
                (this._contexts = { ...this._contexts, ...r.contexts }),
                r.user && (this._user = r.user),
                r.level && (this._level = r.level),
                r.fingerprint && (this._fingerprint = r.fingerprint),
                r.requestSession && (this._requestSession = r.requestSession),
                r.propagationContext && (this._propagationContext = r.propagationContext);
        }
        return this;
    }
    clear() {
        return (
            (this._breadcrumbs = []),
            (this._tags = {}),
            (this._extra = {}),
            (this._user = {}),
            (this._contexts = {}),
            (this._level = void 0),
            (this._transactionName = void 0),
            (this._fingerprint = void 0),
            (this._requestSession = void 0),
            (this._span = void 0),
            (this._session = void 0),
            this._notifyScopeListeners(),
            (this._attachments = []),
            (this._propagationContext = Zr()),
            this
        );
    }
    addBreadcrumb(t, n) {
        const r = typeof n == 'number' ? n : Du;
        if (r <= 0) return this;
        const i = { timestamp: lr(), ...t },
            s = this._breadcrumbs;
        return s.push(i), (this._breadcrumbs = s.length > r ? s.slice(-r) : s), this._notifyScopeListeners(), this;
    }
    getLastBreadcrumb() {
        return this._breadcrumbs[this._breadcrumbs.length - 1];
    }
    clearBreadcrumbs() {
        return (this._breadcrumbs = []), this._notifyScopeListeners(), this;
    }
    addAttachment(t) {
        return this._attachments.push(t), this;
    }
    getAttachments() {
        return this.getScopeData().attachments;
    }
    clearAttachments() {
        return (this._attachments = []), this;
    }
    getScopeData() {
        const {
            _breadcrumbs: t,
            _attachments: n,
            _contexts: r,
            _tags: i,
            _extra: s,
            _user: a,
            _level: o,
            _fingerprint: l,
            _eventProcessors: p,
            _propagationContext: f,
            _sdkProcessingMetadata: c,
            _transactionName: g,
            _span: h,
        } = this;
        return {
            breadcrumbs: t,
            attachments: n,
            contexts: r,
            tags: i,
            extra: s,
            user: a,
            level: o,
            fingerprint: l || [],
            eventProcessors: p,
            propagationContext: f,
            sdkProcessingMetadata: c,
            transactionName: g,
            span: h,
        };
    }
    applyToEvent(t, n = {}, r = []) {
        Tu(t, this.getScopeData());
        const i = [...r, ...cu(), ...this._eventProcessors];
        return Kn(i, t, n);
    }
    setSDKProcessingMetadata(t) {
        return (this._sdkProcessingMetadata = { ...this._sdkProcessingMetadata, ...t }), this;
    }
    setPropagationContext(t) {
        return (this._propagationContext = t), this;
    }
    getPropagationContext() {
        return this._propagationContext;
    }
    captureException(t, n) {
        const r = n && n.event_id ? n.event_id : he();
        if (!this._client) return De.warn('No client configured on scope - will not capture exception!'), r;
        const i = new Error('Sentry syntheticException');
        return (
            this._client.captureException(t, { originalException: t, syntheticException: i, ...n, event_id: r }, this),
            r
        );
    }
    captureMessage(t, n, r) {
        const i = r && r.event_id ? r.event_id : he();
        if (!this._client) return De.warn('No client configured on scope - will not capture message!'), i;
        const s = new Error(t);
        return (
            this._client.captureMessage(t, n, { originalException: t, syntheticException: s, ...r, event_id: i }, this),
            i
        );
    }
    captureEvent(t, n) {
        const r = n && n.event_id ? n.event_id : he();
        return this._client
            ? (this._client.captureEvent(t, { ...n, event_id: r }, this), r)
            : (De.warn('No client configured on scope - will not capture event!'), r);
    }
    _notifyScopeListeners() {
        this._notifyingListeners ||
            ((this._notifyingListeners = !0),
            this._scopeListeners.forEach((t) => {
                t(this);
            }),
            (this._notifyingListeners = !1));
    }
}
function Zr() {
    return { traceId: he(), spanId: he().substring(16) };
}
const wu = '7.109.0',
    ws = parseFloat(wu),
    Lu = 100;
class Ls {
    constructor(t, n, r, i = ws) {
        this._version = i;
        let s;
        n ? (s = n) : ((s = new He()), s.setClient(t));
        let a;
        r ? (a = r) : ((a = new He()), a.setClient(t)),
            (this._stack = [{ scope: s }]),
            t && this.bindClient(t),
            (this._isolationScope = a);
    }
    isOlderThan(t) {
        return this._version < t;
    }
    bindClient(t) {
        const n = this.getStackTop();
        (n.client = t), n.scope.setClient(t), t && t.setupIntegrations && t.setupIntegrations();
    }
    pushScope() {
        const t = this.getScope().clone();
        return this.getStack().push({ client: this.getClient(), scope: t }), t;
    }
    popScope() {
        return this.getStack().length <= 1 ? !1 : !!this.getStack().pop();
    }
    withScope(t) {
        const n = this.pushScope();
        let r;
        try {
            r = t(n);
        } catch (i) {
            throw (this.popScope(), i);
        }
        return or(r)
            ? r.then(
                  (i) => (this.popScope(), i),
                  (i) => {
                      throw (this.popScope(), i);
                  },
              )
            : (this.popScope(), r);
    }
    getClient() {
        return this.getStackTop().client;
    }
    getScope() {
        return this.getStackTop().scope;
    }
    getIsolationScope() {
        return this._isolationScope;
    }
    getStack() {
        return this._stack;
    }
    getStackTop() {
        return this._stack[this._stack.length - 1];
    }
    captureException(t, n) {
        const r = (this._lastEventId = n && n.event_id ? n.event_id : he()),
            i = new Error('Sentry syntheticException');
        return (
            this.getScope().captureException(t, { originalException: t, syntheticException: i, ...n, event_id: r }), r
        );
    }
    captureMessage(t, n, r) {
        const i = (this._lastEventId = r && r.event_id ? r.event_id : he()),
            s = new Error(t);
        return (
            this.getScope().captureMessage(t, n, { originalException: t, syntheticException: s, ...r, event_id: i }), i
        );
    }
    captureEvent(t, n) {
        const r = n && n.event_id ? n.event_id : he();
        return t.type || (this._lastEventId = r), this.getScope().captureEvent(t, { ...n, event_id: r }), r;
    }
    lastEventId() {
        return this._lastEventId;
    }
    addBreadcrumb(t, n) {
        const { scope: r, client: i } = this.getStackTop();
        if (!i) return;
        const { beforeBreadcrumb: s = null, maxBreadcrumbs: a = Lu } = (i.getOptions && i.getOptions()) || {};
        if (a <= 0) return;
        const l = { timestamp: lr(), ...t },
            p = s ? Ns(() => s(l, n)) : l;
        p !== null && (i.emit && i.emit('beforeAddBreadcrumb', p, n), r.addBreadcrumb(p, a));
    }
    setUser(t) {
        this.getScope().setUser(t), this.getIsolationScope().setUser(t);
    }
    setTags(t) {
        this.getScope().setTags(t), this.getIsolationScope().setTags(t);
    }
    setExtras(t) {
        this.getScope().setExtras(t), this.getIsolationScope().setExtras(t);
    }
    setTag(t, n) {
        this.getScope().setTag(t, n), this.getIsolationScope().setTag(t, n);
    }
    setExtra(t, n) {
        this.getScope().setExtra(t, n), this.getIsolationScope().setExtra(t, n);
    }
    setContext(t, n) {
        this.getScope().setContext(t, n), this.getIsolationScope().setContext(t, n);
    }
    configureScope(t) {
        const { scope: n, client: r } = this.getStackTop();
        r && t(n);
    }
    run(t) {
        const n = Qr(this);
        try {
            t(this);
        } finally {
            Qr(n);
        }
    }
    getIntegration(t) {
        const n = this.getClient();
        if (!n) return null;
        try {
            return n.getIntegration(t);
        } catch {
            return Kt && De.warn(`Cannot retrieve integration ${t.id} from the current Hub`), null;
        }
    }
    startTransaction(t, n) {
        const r = this._callExtensionMethod('startTransaction', t, n);
        return (
            Kt &&
                !r &&
                (this.getClient()
                    ? De.warn(`Tracing extension 'startTransaction' has not been added. Call 'addTracingExtensions' before calling 'init':
Sentry.addTracingExtensions();
Sentry.init({...});
`)
                    : De.warn(
                          "Tracing extension 'startTransaction' is missing. You should 'init' the SDK before calling 'startTransaction'",
                      )),
            r
        );
    }
    traceHeaders() {
        return this._callExtensionMethod('traceHeaders');
    }
    captureSession(t = !1) {
        if (t) return this.endSession();
        this._sendSessionUpdate();
    }
    endSession() {
        const n = this.getStackTop().scope,
            r = n.getSession();
        r && pu(r), this._sendSessionUpdate(), n.setSession();
    }
    startSession(t) {
        const { scope: n, client: r } = this.getStackTop(),
            { release: i, environment: s = ks } = (r && r.getOptions()) || {},
            { userAgent: a } = fe.navigator || {},
            o = fu({ release: i, environment: s, user: n.getUser(), ...(a && { userAgent: a }), ...t }),
            l = n.getSession && n.getSession();
        return l && l.status === 'ok' && Jt(l, { status: 'exited' }), this.endSession(), n.setSession(o), o;
    }
    shouldSendDefaultPii() {
        const t = this.getClient(),
            n = t && t.getOptions();
        return !!(n && n.sendDefaultPii);
    }
    _sendSessionUpdate() {
        const { scope: t, client: n } = this.getStackTop(),
            r = t.getSession();
        r && n && n.captureSession && n.captureSession(r);
    }
    _callExtensionMethod(t, ...n) {
        const i = $t().__SENTRY__;
        if (i && i.extensions && typeof i.extensions[t] == 'function') return i.extensions[t].apply(this, n);
        Kt && De.warn(`Extension method ${t} couldn't be found, doing nothing.`);
    }
}
function $t() {
    return (fe.__SENTRY__ = fe.__SENTRY__ || { extensions: {}, hub: void 0 }), fe;
}
function Qr(e) {
    const t = $t(),
        n = Gn(t);
    return Ps(t, e), n;
}
function ur() {
    const e = $t();
    if (e.__SENTRY__ && e.__SENTRY__.acs) {
        const t = e.__SENTRY__.acs.getCurrentHub();
        if (t) return t;
    }
    return Pu(e);
}
function Pu(e = $t()) {
    return (!Uu(e) || Gn(e).isOlderThan(ws)) && Ps(e, new Ls()), Gn(e);
}
function Uu(e) {
    return !!(e && e.__SENTRY__ && e.__SENTRY__.hub);
}
function Gn(e) {
    return As('hub', () => new Ls(), e);
}
function Ps(e, t) {
    if (!e) return !1;
    const n = (e.__SENTRY__ = e.__SENTRY__ || {});
    return (n.hub = t), !0;
}
const Ku = (e, t, n = 'Det har skjedd en uventet feil') => {
    switch (e == null ? void 0 : e.constructor) {
        case ns:
            const r = nu[(e == null ? void 0 : e.message) ?? 'UKJENT_FEIL'];
            if (!r) {
                t('Det har skjedd en feil: ' + e.message), Eu({ message: 'Feilmelding er ikke mappet: ' + e.message });
                break;
            }
            t(r);
            break;
        case So:
            break;
        case Vt:
        case To:
            t(e.message || n);
            break;
        case ts:
            t('Innloggingen din har utløpt. Ta vare på endringene dine og oppfrisk siden.');
            break;
        default:
            throw e;
    }
};
var Gu = 200,
    dr = '__lodash_hash_undefined__',
    ju = 1 / 0,
    Us = 9007199254740991,
    Cu = '[object Arguments]',
    Fu = '[object Function]',
    Mu = '[object GeneratorFunction]',
    xu = '[object Symbol]',
    Bu = /[\\^$.*+?()[\]{}|]/g,
    Vu = /^\[object .+?Constructor\]$/,
    qu = /^(?:0|[1-9]\d*)$/,
    Hu = typeof Ve == 'object' && Ve && Ve.Object === Object && Ve,
    Ju = typeof self == 'object' && self && self.Object === Object && self,
    cr = Hu || Ju || Function('return this')();
function $u(e, t, n) {
    switch (n.length) {
        case 0:
            return e.call(t);
        case 1:
            return e.call(t, n[0]);
        case 2:
            return e.call(t, n[0], n[1]);
        case 3:
            return e.call(t, n[0], n[1], n[2]);
    }
    return e.apply(t, n);
}
function zu(e, t) {
    var n = e ? e.length : 0;
    return !!n && Xu(e, t, 0) > -1;
}
function Yu(e, t, n) {
    for (var r = -1, i = e ? e.length : 0; ++r < i; ) if (n(t, e[r])) return !0;
    return !1;
}
function Ks(e, t) {
    for (var n = -1, r = e ? e.length : 0, i = Array(r); ++n < r; ) i[n] = t(e[n], n, e);
    return i;
}
function fr(e, t) {
    for (var n = -1, r = t.length, i = e.length; ++n < r; ) e[i + n] = t[n];
    return e;
}
function Wu(e, t, n, r) {
    for (var i = e.length, s = n + (r ? 1 : -1); r ? s-- : ++s < i; ) if (t(e[s], s, e)) return s;
    return -1;
}
function Xu(e, t, n) {
    if (t !== t) return Wu(e, Zu, n);
    for (var r = n - 1, i = e.length; ++r < i; ) if (e[r] === t) return r;
    return -1;
}
function Zu(e) {
    return e !== e;
}
function Qu(e, t) {
    for (var n = -1, r = Array(e); ++n < e; ) r[n] = t(n);
    return r;
}
function ed(e) {
    return function (t) {
        return e(t);
    };
}
function td(e, t) {
    return e.has(t);
}
function nd(e, t) {
    return e == null ? void 0 : e[t];
}
function rd(e) {
    var t = !1;
    if (e != null && typeof e.toString != 'function')
        try {
            t = !!(e + '');
        } catch {}
    return t;
}
function Gs(e, t) {
    return function (n) {
        return e(t(n));
    };
}
var id = Array.prototype,
    sd = Function.prototype,
    zt = Object.prototype,
    gn = cr['__core-js_shared__'],
    ei = (function () {
        var e = /[^.]+$/.exec((gn && gn.keys && gn.keys.IE_PROTO) || '');
        return e ? 'Symbol(src)_1.' + e : '';
    })(),
    js = sd.toString,
    Ye = zt.hasOwnProperty,
    pr = zt.toString,
    ad = RegExp(
        '^' +
            js
                .call(Ye)
                .replace(Bu, '\\$&')
                .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') +
            '$',
    ),
    ti = cr.Symbol,
    od = Gs(Object.getPrototypeOf, Object),
    ld = zt.propertyIsEnumerable,
    ud = id.splice,
    ni = ti ? ti.isConcatSpreadable : void 0,
    jn = Object.getOwnPropertySymbols,
    ri = Math.max,
    dd = Fs(cr, 'Map'),
    st = Fs(Object, 'create');
function je(e) {
    var t = -1,
        n = e ? e.length : 0;
    for (this.clear(); ++t < n; ) {
        var r = e[t];
        this.set(r[0], r[1]);
    }
}
function cd() {
    this.__data__ = st ? st(null) : {};
}
function fd(e) {
    return this.has(e) && delete this.__data__[e];
}
function pd(e) {
    var t = this.__data__;
    if (st) {
        var n = t[e];
        return n === dr ? void 0 : n;
    }
    return Ye.call(t, e) ? t[e] : void 0;
}
function gd(e) {
    var t = this.__data__;
    return st ? t[e] !== void 0 : Ye.call(t, e);
}
function md(e, t) {
    var n = this.__data__;
    return (n[e] = st && t === void 0 ? dr : t), this;
}
je.prototype.clear = cd;
je.prototype.delete = fd;
je.prototype.get = pd;
je.prototype.has = gd;
je.prototype.set = md;
function We(e) {
    var t = -1,
        n = e ? e.length : 0;
    for (this.clear(); ++t < n; ) {
        var r = e[t];
        this.set(r[0], r[1]);
    }
}
function hd() {
    this.__data__ = [];
}
function vd(e) {
    var t = this.__data__,
        n = Yt(t, e);
    if (n < 0) return !1;
    var r = t.length - 1;
    return n == r ? t.pop() : ud.call(t, n, 1), !0;
}
function _d(e) {
    var t = this.__data__,
        n = Yt(t, e);
    return n < 0 ? void 0 : t[n][1];
}
function Ed(e) {
    return Yt(this.__data__, e) > -1;
}
function yd(e, t) {
    var n = this.__data__,
        r = Yt(n, e);
    return r < 0 ? n.push([e, t]) : (n[r][1] = t), this;
}
We.prototype.clear = hd;
We.prototype.delete = vd;
We.prototype.get = _d;
We.prototype.has = Ed;
We.prototype.set = yd;
function Xe(e) {
    var t = -1,
        n = e ? e.length : 0;
    for (this.clear(); ++t < n; ) {
        var r = e[t];
        this.set(r[0], r[1]);
    }
}
function Id() {
    this.__data__ = { hash: new je(), map: new (dd || We)(), string: new je() };
}
function bd(e) {
    return Wt(this, e).delete(e);
}
function Sd(e) {
    return Wt(this, e).get(e);
}
function Td(e) {
    return Wt(this, e).has(e);
}
function Ad(e, t) {
    return Wt(this, e).set(e, t), this;
}
Xe.prototype.clear = Id;
Xe.prototype.delete = bd;
Xe.prototype.get = Sd;
Xe.prototype.has = Td;
Xe.prototype.set = Ad;
function Mt(e) {
    var t = -1,
        n = e ? e.length : 0;
    for (this.__data__ = new Xe(); ++t < n; ) this.add(e[t]);
}
function Nd(e) {
    return this.__data__.set(e, dr), this;
}
function Rd(e) {
    return this.__data__.has(e);
}
Mt.prototype.add = Mt.prototype.push = Nd;
Mt.prototype.has = Rd;
function Od(e, t) {
    var n = gr(e) || Ms(e) ? Qu(e.length, String) : [],
        r = n.length,
        i = !!r;
    for (var s in e) (t || Ye.call(e, s)) && !(i && (s == 'length' || Md(s, r))) && n.push(s);
    return n;
}
function Yt(e, t) {
    for (var n = e.length; n--; ) if ($d(e[n][0], t)) return n;
    return -1;
}
function kd(e, t, n, r) {
    var i = -1,
        s = zu,
        a = !0,
        o = e.length,
        l = [],
        p = t.length;
    if (!o) return l;
    n && (t = Ks(t, ed(n))), r ? ((s = Yu), (a = !1)) : t.length >= Gu && ((s = td), (a = !1), (t = new Mt(t)));
    e: for (; ++i < o; ) {
        var f = e[i],
            c = n ? n(f) : f;
        if (((f = r || f !== 0 ? f : 0), a && c === c)) {
            for (var g = p; g--; ) if (t[g] === c) continue e;
            l.push(f);
        } else s(t, c, r) || l.push(f);
    }
    return l;
}
function Cs(e, t, n, r, i) {
    var s = -1,
        a = e.length;
    for (n || (n = Fd), i || (i = []); ++s < a; ) {
        var o = e[s];
        t > 0 && n(o) ? (t > 1 ? Cs(o, t - 1, n, r, i) : fr(i, o)) : r || (i[i.length] = o);
    }
    return i;
}
function Dd(e, t, n) {
    var r = t(e);
    return gr(e) ? r : fr(r, n(e));
}
function wd(e) {
    if (!mr(e) || Bd(e)) return !1;
    var t = Bs(e) || rd(e) ? ad : Vu;
    return t.test(Jd(e));
}
function Ld(e) {
    if (!mr(e)) return qd(e);
    var t = Vd(e),
        n = [];
    for (var r in e) (r == 'constructor' && (t || !Ye.call(e, r))) || n.push(r);
    return n;
}
function Pd(e, t) {
    return (
        (e = Object(e)),
        Ud(e, t, function (n, r) {
            return r in e;
        })
    );
}
function Ud(e, t, n) {
    for (var r = -1, i = t.length, s = {}; ++r < i; ) {
        var a = t[r],
            o = e[a];
        n(o, a) && (s[a] = o);
    }
    return s;
}
function Kd(e, t) {
    return (
        (t = ri(t === void 0 ? e.length - 1 : t, 0)),
        function () {
            for (var n = arguments, r = -1, i = ri(n.length - t, 0), s = Array(i); ++r < i; ) s[r] = n[t + r];
            r = -1;
            for (var a = Array(t + 1); ++r < t; ) a[r] = n[r];
            return (a[t] = s), $u(e, this, a);
        }
    );
}
function Gd(e) {
    return Dd(e, Xd, Cd);
}
function Wt(e, t) {
    var n = e.__data__;
    return xd(t) ? n[typeof t == 'string' ? 'string' : 'hash'] : n.map;
}
function Fs(e, t) {
    var n = nd(e, t);
    return wd(n) ? n : void 0;
}
var jd = jn ? Gs(jn, Object) : qs,
    Cd = jn
        ? function (e) {
              for (var t = []; e; ) fr(t, jd(e)), (e = od(e));
              return t;
          }
        : qs;
function Fd(e) {
    return gr(e) || Ms(e) || !!(ni && e && e[ni]);
}
function Md(e, t) {
    return (t = t ?? Us), !!t && (typeof e == 'number' || qu.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function xd(e) {
    var t = typeof e;
    return t == 'string' || t == 'number' || t == 'symbol' || t == 'boolean' ? e !== '__proto__' : e === null;
}
function Bd(e) {
    return !!ei && ei in e;
}
function Vd(e) {
    var t = e && e.constructor,
        n = (typeof t == 'function' && t.prototype) || zt;
    return e === n;
}
function qd(e) {
    var t = [];
    if (e != null) for (var n in Object(e)) t.push(n);
    return t;
}
function Hd(e) {
    if (typeof e == 'string' || Wd(e)) return e;
    var t = e + '';
    return t == '0' && 1 / e == -ju ? '-0' : t;
}
function Jd(e) {
    if (e != null) {
        try {
            return js.call(e);
        } catch {}
        try {
            return e + '';
        } catch {}
    }
    return '';
}
function $d(e, t) {
    return e === t || (e !== e && t !== t);
}
function Ms(e) {
    return zd(e) && Ye.call(e, 'callee') && (!ld.call(e, 'callee') || pr.call(e) == Cu);
}
var gr = Array.isArray;
function xs(e) {
    return e != null && Yd(e.length) && !Bs(e);
}
function zd(e) {
    return Vs(e) && xs(e);
}
function Bs(e) {
    var t = mr(e) ? pr.call(e) : '';
    return t == Fu || t == Mu;
}
function Yd(e) {
    return typeof e == 'number' && e > -1 && e % 1 == 0 && e <= Us;
}
function mr(e) {
    var t = typeof e;
    return !!e && (t == 'object' || t == 'function');
}
function Vs(e) {
    return !!e && typeof e == 'object';
}
function Wd(e) {
    return typeof e == 'symbol' || (Vs(e) && pr.call(e) == xu);
}
function Xd(e) {
    return xs(e) ? Od(e, !0) : Ld(e);
}
Kd(function (e, t) {
    return e == null ? {} : ((t = Ks(Cs(t, 1), Hd)), Pd(e, kd(Gd(e), t)));
});
function qs() {
    return [];
}
const Zd = '/tiltaksgjennomforing',
    Qd = 'side-foer-innlogging';
function Hs(e, t) {
    return function () {
        return e.apply(t, arguments);
    };
}
const { toString: ec } = Object.prototype,
    { getPrototypeOf: hr } = Object,
    Xt = ((e) => (t) => {
        const n = ec.call(t);
        return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
    })(Object.create(null)),
    ve = (e) => ((e = e.toLowerCase()), (t) => Xt(t) === e),
    Zt = (e) => (t) => typeof t === e,
    { isArray: Ze } = Array,
    at = Zt('undefined');
function tc(e) {
    return (
        e !== null &&
        !at(e) &&
        e.constructor !== null &&
        !at(e.constructor) &&
        oe(e.constructor.isBuffer) &&
        e.constructor.isBuffer(e)
    );
}
const Js = ve('ArrayBuffer');
function nc(e) {
    let t;
    return (
        typeof ArrayBuffer < 'u' && ArrayBuffer.isView
            ? (t = ArrayBuffer.isView(e))
            : (t = e && e.buffer && Js(e.buffer)),
        t
    );
}
const rc = Zt('string'),
    oe = Zt('function'),
    $s = Zt('number'),
    Qt = (e) => e !== null && typeof e == 'object',
    ic = (e) => e === !0 || e === !1,
    Gt = (e) => {
        if (Xt(e) !== 'object') return !1;
        const t = hr(e);
        return (
            (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) &&
            !(Symbol.toStringTag in e) &&
            !(Symbol.iterator in e)
        );
    },
    sc = ve('Date'),
    ac = ve('File'),
    oc = ve('Blob'),
    lc = ve('FileList'),
    uc = (e) => Qt(e) && oe(e.pipe),
    dc = (e) => {
        let t;
        return (
            e &&
            ((typeof FormData == 'function' && e instanceof FormData) ||
                (oe(e.append) &&
                    ((t = Xt(e)) === 'formdata' ||
                        (t === 'object' && oe(e.toString) && e.toString() === '[object FormData]'))))
        );
    },
    cc = ve('URLSearchParams'),
    fc = (e) => (e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''));
function ut(e, t, { allOwnKeys: n = !1 } = {}) {
    if (e === null || typeof e > 'u') return;
    let r, i;
    if ((typeof e != 'object' && (e = [e]), Ze(e))) for (r = 0, i = e.length; r < i; r++) t.call(null, e[r], r, e);
    else {
        const s = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
            a = s.length;
        let o;
        for (r = 0; r < a; r++) (o = s[r]), t.call(null, e[o], o, e);
    }
}
function zs(e, t) {
    t = t.toLowerCase();
    const n = Object.keys(e);
    let r = n.length,
        i;
    for (; r-- > 0; ) if (((i = n[r]), t === i.toLowerCase())) return i;
    return null;
}
const Ys = typeof globalThis < 'u' ? globalThis : typeof self < 'u' ? self : typeof window < 'u' ? window : global,
    Ws = (e) => !at(e) && e !== Ys;
function Cn() {
    const { caseless: e } = (Ws(this) && this) || {},
        t = {},
        n = (r, i) => {
            const s = (e && zs(t, i)) || i;
            Gt(t[s]) && Gt(r)
                ? (t[s] = Cn(t[s], r))
                : Gt(r)
                  ? (t[s] = Cn({}, r))
                  : Ze(r)
                    ? (t[s] = r.slice())
                    : (t[s] = r);
        };
    for (let r = 0, i = arguments.length; r < i; r++) arguments[r] && ut(arguments[r], n);
    return t;
}
const pc = (e, t, n, { allOwnKeys: r } = {}) => (
        ut(
            t,
            (i, s) => {
                n && oe(i) ? (e[s] = Hs(i, n)) : (e[s] = i);
            },
            { allOwnKeys: r },
        ),
        e
    ),
    gc = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
    mc = (e, t, n, r) => {
        (e.prototype = Object.create(t.prototype, r)),
            (e.prototype.constructor = e),
            Object.defineProperty(e, 'super', { value: t.prototype }),
            n && Object.assign(e.prototype, n);
    },
    hc = (e, t, n, r) => {
        let i, s, a;
        const o = {};
        if (((t = t || {}), e == null)) return t;
        do {
            for (i = Object.getOwnPropertyNames(e), s = i.length; s-- > 0; )
                (a = i[s]), (!r || r(a, e, t)) && !o[a] && ((t[a] = e[a]), (o[a] = !0));
            e = n !== !1 && hr(e);
        } while (e && (!n || n(e, t)) && e !== Object.prototype);
        return t;
    },
    vc = (e, t, n) => {
        (e = String(e)), (n === void 0 || n > e.length) && (n = e.length), (n -= t.length);
        const r = e.indexOf(t, n);
        return r !== -1 && r === n;
    },
    _c = (e) => {
        if (!e) return null;
        if (Ze(e)) return e;
        let t = e.length;
        if (!$s(t)) return null;
        const n = new Array(t);
        for (; t-- > 0; ) n[t] = e[t];
        return n;
    },
    Ec = (
        (e) => (t) =>
            e && t instanceof e
    )(typeof Uint8Array < 'u' && hr(Uint8Array)),
    yc = (e, t) => {
        const r = (e && e[Symbol.iterator]).call(e);
        let i;
        for (; (i = r.next()) && !i.done; ) {
            const s = i.value;
            t.call(e, s[0], s[1]);
        }
    },
    Ic = (e, t) => {
        let n;
        const r = [];
        for (; (n = e.exec(t)) !== null; ) r.push(n);
        return r;
    },
    bc = ve('HTMLFormElement'),
    Sc = (e) =>
        e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, r, i) {
            return r.toUpperCase() + i;
        }),
    ii = (
        ({ hasOwnProperty: e }) =>
        (t, n) =>
            e.call(t, n)
    )(Object.prototype),
    Tc = ve('RegExp'),
    Xs = (e, t) => {
        const n = Object.getOwnPropertyDescriptors(e),
            r = {};
        ut(n, (i, s) => {
            let a;
            (a = t(i, s, e)) !== !1 && (r[s] = a || i);
        }),
            Object.defineProperties(e, r);
    },
    Ac = (e) => {
        Xs(e, (t, n) => {
            if (oe(e) && ['arguments', 'caller', 'callee'].indexOf(n) !== -1) return !1;
            const r = e[n];
            if (oe(r)) {
                if (((t.enumerable = !1), 'writable' in t)) {
                    t.writable = !1;
                    return;
                }
                t.set ||
                    (t.set = () => {
                        throw Error("Can not rewrite read-only method '" + n + "'");
                    });
            }
        });
    },
    Nc = (e, t) => {
        const n = {},
            r = (i) => {
                i.forEach((s) => {
                    n[s] = !0;
                });
            };
        return Ze(e) ? r(e) : r(String(e).split(t)), n;
    },
    Rc = () => {},
    Oc = (e, t) => ((e = +e), Number.isFinite(e) ? e : t),
    mn = 'abcdefghijklmnopqrstuvwxyz',
    si = '0123456789',
    Zs = { DIGIT: si, ALPHA: mn, ALPHA_DIGIT: mn + mn.toUpperCase() + si },
    kc = (e = 16, t = Zs.ALPHA_DIGIT) => {
        let n = '';
        const { length: r } = t;
        for (; e--; ) n += t[(Math.random() * r) | 0];
        return n;
    };
function Dc(e) {
    return !!(e && oe(e.append) && e[Symbol.toStringTag] === 'FormData' && e[Symbol.iterator]);
}
const wc = (e) => {
        const t = new Array(10),
            n = (r, i) => {
                if (Qt(r)) {
                    if (t.indexOf(r) >= 0) return;
                    if (!('toJSON' in r)) {
                        t[i] = r;
                        const s = Ze(r) ? [] : {};
                        return (
                            ut(r, (a, o) => {
                                const l = n(a, i + 1);
                                !at(l) && (s[o] = l);
                            }),
                            (t[i] = void 0),
                            s
                        );
                    }
                }
                return r;
            };
        return n(e, 0);
    },
    Lc = ve('AsyncFunction'),
    Pc = (e) => e && (Qt(e) || oe(e)) && oe(e.then) && oe(e.catch),
    _ = {
        isArray: Ze,
        isArrayBuffer: Js,
        isBuffer: tc,
        isFormData: dc,
        isArrayBufferView: nc,
        isString: rc,
        isNumber: $s,
        isBoolean: ic,
        isObject: Qt,
        isPlainObject: Gt,
        isUndefined: at,
        isDate: sc,
        isFile: ac,
        isBlob: oc,
        isRegExp: Tc,
        isFunction: oe,
        isStream: uc,
        isURLSearchParams: cc,
        isTypedArray: Ec,
        isFileList: lc,
        forEach: ut,
        merge: Cn,
        extend: pc,
        trim: fc,
        stripBOM: gc,
        inherits: mc,
        toFlatObject: hc,
        kindOf: Xt,
        kindOfTest: ve,
        endsWith: vc,
        toArray: _c,
        forEachEntry: yc,
        matchAll: Ic,
        isHTMLForm: bc,
        hasOwnProperty: ii,
        hasOwnProp: ii,
        reduceDescriptors: Xs,
        freezeMethods: Ac,
        toObjectSet: Nc,
        toCamelCase: Sc,
        noop: Rc,
        toFiniteNumber: Oc,
        findKey: zs,
        global: Ys,
        isContextDefined: Ws,
        ALPHABET: Zs,
        generateString: kc,
        isSpecCompliantForm: Dc,
        toJSONObject: wc,
        isAsyncFn: Lc,
        isThenable: Pc,
    };
function M(e, t, n, r, i) {
    Error.call(this),
        Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : (this.stack = new Error().stack),
        (this.message = e),
        (this.name = 'AxiosError'),
        t && (this.code = t),
        n && (this.config = n),
        r && (this.request = r),
        i && (this.response = i);
}
_.inherits(M, Error, {
    toJSON: function () {
        return {
            message: this.message,
            name: this.name,
            description: this.description,
            number: this.number,
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            config: _.toJSONObject(this.config),
            code: this.code,
            status: this.response && this.response.status ? this.response.status : null,
        };
    },
});
const Qs = M.prototype,
    ea = {};
[
    'ERR_BAD_OPTION_VALUE',
    'ERR_BAD_OPTION',
    'ECONNABORTED',
    'ETIMEDOUT',
    'ERR_NETWORK',
    'ERR_FR_TOO_MANY_REDIRECTS',
    'ERR_DEPRECATED',
    'ERR_BAD_RESPONSE',
    'ERR_BAD_REQUEST',
    'ERR_CANCELED',
    'ERR_NOT_SUPPORT',
    'ERR_INVALID_URL',
].forEach((e) => {
    ea[e] = { value: e };
});
Object.defineProperties(M, ea);
Object.defineProperty(Qs, 'isAxiosError', { value: !0 });
M.from = (e, t, n, r, i, s) => {
    const a = Object.create(Qs);
    return (
        _.toFlatObject(
            e,
            a,
            function (l) {
                return l !== Error.prototype;
            },
            (o) => o !== 'isAxiosError',
        ),
        M.call(a, e.message, t, n, r, i),
        (a.cause = e),
        (a.name = e.name),
        s && Object.assign(a, s),
        a
    );
};
const Uc = null;
function Fn(e) {
    return _.isPlainObject(e) || _.isArray(e);
}
function ta(e) {
    return _.endsWith(e, '[]') ? e.slice(0, -2) : e;
}
function ai(e, t, n) {
    return e
        ? e
              .concat(t)
              .map(function (i, s) {
                  return (i = ta(i)), !n && s ? '[' + i + ']' : i;
              })
              .join(n ? '.' : '')
        : t;
}
function Kc(e) {
    return _.isArray(e) && !e.some(Fn);
}
const Gc = _.toFlatObject(_, {}, null, function (t) {
    return /^is[A-Z]/.test(t);
});
function en(e, t, n) {
    if (!_.isObject(e)) throw new TypeError('target must be an object');
    (t = t || new FormData()),
        (n = _.toFlatObject(n, { metaTokens: !0, dots: !1, indexes: !1 }, !1, function (d, y) {
            return !_.isUndefined(y[d]);
        }));
    const r = n.metaTokens,
        i = n.visitor || f,
        s = n.dots,
        a = n.indexes,
        l = (n.Blob || (typeof Blob < 'u' && Blob)) && _.isSpecCompliantForm(t);
    if (!_.isFunction(i)) throw new TypeError('visitor must be a function');
    function p(u) {
        if (u === null) return '';
        if (_.isDate(u)) return u.toISOString();
        if (!l && _.isBlob(u)) throw new M('Blob is not supported. Use a Buffer instead.');
        return _.isArrayBuffer(u) || _.isTypedArray(u)
            ? l && typeof Blob == 'function'
                ? new Blob([u])
                : Buffer.from(u)
            : u;
    }
    function f(u, d, y) {
        let P = u;
        if (u && !y && typeof u == 'object') {
            if (_.endsWith(d, '{}')) (d = r ? d : d.slice(0, -2)), (u = JSON.stringify(u));
            else if ((_.isArray(u) && Kc(u)) || ((_.isFileList(u) || _.endsWith(d, '[]')) && (P = _.toArray(u))))
                return (
                    (d = ta(d)),
                    P.forEach(function (D, L) {
                        !(_.isUndefined(D) || D === null) &&
                            t.append(a === !0 ? ai([d], L, s) : a === null ? d : d + '[]', p(D));
                    }),
                    !1
                );
        }
        return Fn(u) ? !0 : (t.append(ai(y, d, s), p(u)), !1);
    }
    const c = [],
        g = Object.assign(Gc, { defaultVisitor: f, convertValue: p, isVisitable: Fn });
    function h(u, d) {
        if (!_.isUndefined(u)) {
            if (c.indexOf(u) !== -1) throw Error('Circular reference detected in ' + d.join('.'));
            c.push(u),
                _.forEach(u, function (P, q) {
                    (!(_.isUndefined(P) || P === null) && i.call(t, P, _.isString(q) ? q.trim() : q, d, g)) === !0 &&
                        h(P, d ? d.concat(q) : [q]);
                }),
                c.pop();
        }
    }
    if (!_.isObject(e)) throw new TypeError('data must be an object');
    return h(e), t;
}
function oi(e) {
    const t = { '!': '%21', "'": '%27', '(': '%28', ')': '%29', '~': '%7E', '%20': '+', '%00': '\0' };
    return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (r) {
        return t[r];
    });
}
function vr(e, t) {
    (this._pairs = []), e && en(e, this, t);
}
const na = vr.prototype;
na.append = function (t, n) {
    this._pairs.push([t, n]);
};
na.toString = function (t) {
    const n = t
        ? function (r) {
              return t.call(this, r, oi);
          }
        : oi;
    return this._pairs
        .map(function (i) {
            return n(i[0]) + '=' + n(i[1]);
        }, '')
        .join('&');
};
function jc(e) {
    return encodeURIComponent(e)
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/gi, '[')
        .replace(/%5D/gi, ']');
}
function ra(e, t, n) {
    if (!t) return e;
    const r = (n && n.encode) || jc,
        i = n && n.serialize;
    let s;
    if ((i ? (s = i(t, n)) : (s = _.isURLSearchParams(t) ? t.toString() : new vr(t, n).toString(r)), s)) {
        const a = e.indexOf('#');
        a !== -1 && (e = e.slice(0, a)), (e += (e.indexOf('?') === -1 ? '?' : '&') + s);
    }
    return e;
}
class li {
    constructor() {
        this.handlers = [];
    }
    use(t, n, r) {
        return (
            this.handlers.push({
                fulfilled: t,
                rejected: n,
                synchronous: r ? r.synchronous : !1,
                runWhen: r ? r.runWhen : null,
            }),
            this.handlers.length - 1
        );
    }
    eject(t) {
        this.handlers[t] && (this.handlers[t] = null);
    }
    clear() {
        this.handlers && (this.handlers = []);
    }
    forEach(t) {
        _.forEach(this.handlers, function (r) {
            r !== null && t(r);
        });
    }
}
const ia = { silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1 },
    Cc = typeof URLSearchParams < 'u' ? URLSearchParams : vr,
    Fc = typeof FormData < 'u' ? FormData : null,
    Mc = typeof Blob < 'u' ? Blob : null,
    xc = {
        isBrowser: !0,
        classes: { URLSearchParams: Cc, FormData: Fc, Blob: Mc },
        protocols: ['http', 'https', 'file', 'blob', 'url', 'data'],
    },
    sa = typeof window < 'u' && typeof document < 'u',
    Bc = ((e) => sa && ['ReactNative', 'NativeScript', 'NS'].indexOf(e) < 0)(
        typeof navigator < 'u' && navigator.product,
    ),
    Vc = typeof WorkerGlobalScope < 'u' && self instanceof WorkerGlobalScope && typeof self.importScripts == 'function',
    qc = Object.freeze(
        Object.defineProperty(
            { __proto__: null, hasBrowserEnv: sa, hasStandardBrowserEnv: Bc, hasStandardBrowserWebWorkerEnv: Vc },
            Symbol.toStringTag,
            { value: 'Module' },
        ),
    ),
    me = { ...qc, ...xc };
function Hc(e, t) {
    return en(
        e,
        new me.classes.URLSearchParams(),
        Object.assign(
            {
                visitor: function (n, r, i, s) {
                    return me.isNode && _.isBuffer(n)
                        ? (this.append(r, n.toString('base64')), !1)
                        : s.defaultVisitor.apply(this, arguments);
                },
            },
            t,
        ),
    );
}
function Jc(e) {
    return _.matchAll(/\w+|\[(\w*)]/g, e).map((t) => (t[0] === '[]' ? '' : t[1] || t[0]));
}
function $c(e) {
    const t = {},
        n = Object.keys(e);
    let r;
    const i = n.length;
    let s;
    for (r = 0; r < i; r++) (s = n[r]), (t[s] = e[s]);
    return t;
}
function aa(e) {
    function t(n, r, i, s) {
        let a = n[s++];
        if (a === '__proto__') return !0;
        const o = Number.isFinite(+a),
            l = s >= n.length;
        return (
            (a = !a && _.isArray(i) ? i.length : a),
            l
                ? (_.hasOwnProp(i, a) ? (i[a] = [i[a], r]) : (i[a] = r), !o)
                : ((!i[a] || !_.isObject(i[a])) && (i[a] = []),
                  t(n, r, i[a], s) && _.isArray(i[a]) && (i[a] = $c(i[a])),
                  !o)
        );
    }
    if (_.isFormData(e) && _.isFunction(e.entries)) {
        const n = {};
        return (
            _.forEachEntry(e, (r, i) => {
                t(Jc(r), i, n, 0);
            }),
            n
        );
    }
    return null;
}
function zc(e, t, n) {
    if (_.isString(e))
        try {
            return (t || JSON.parse)(e), _.trim(e);
        } catch (r) {
            if (r.name !== 'SyntaxError') throw r;
        }
    return (n || JSON.stringify)(e);
}
const _r = {
    transitional: ia,
    adapter: ['xhr', 'http'],
    transformRequest: [
        function (t, n) {
            const r = n.getContentType() || '',
                i = r.indexOf('application/json') > -1,
                s = _.isObject(t);
            if ((s && _.isHTMLForm(t) && (t = new FormData(t)), _.isFormData(t))) return i ? JSON.stringify(aa(t)) : t;
            if (_.isArrayBuffer(t) || _.isBuffer(t) || _.isStream(t) || _.isFile(t) || _.isBlob(t)) return t;
            if (_.isArrayBufferView(t)) return t.buffer;
            if (_.isURLSearchParams(t))
                return n.setContentType('application/x-www-form-urlencoded;charset=utf-8', !1), t.toString();
            let o;
            if (s) {
                if (r.indexOf('application/x-www-form-urlencoded') > -1) return Hc(t, this.formSerializer).toString();
                if ((o = _.isFileList(t)) || r.indexOf('multipart/form-data') > -1) {
                    const l = this.env && this.env.FormData;
                    return en(o ? { 'files[]': t } : t, l && new l(), this.formSerializer);
                }
            }
            return s || i ? (n.setContentType('application/json', !1), zc(t)) : t;
        },
    ],
    transformResponse: [
        function (t) {
            const n = this.transitional || _r.transitional,
                r = n && n.forcedJSONParsing,
                i = this.responseType === 'json';
            if (t && _.isString(t) && ((r && !this.responseType) || i)) {
                const a = !(n && n.silentJSONParsing) && i;
                try {
                    return JSON.parse(t);
                } catch (o) {
                    if (a)
                        throw o.name === 'SyntaxError' ? M.from(o, M.ERR_BAD_RESPONSE, this, null, this.response) : o;
                }
            }
            return t;
        },
    ],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: { FormData: me.classes.FormData, Blob: me.classes.Blob },
    validateStatus: function (t) {
        return t >= 200 && t < 300;
    },
    headers: { common: { Accept: 'application/json, text/plain, */*', 'Content-Type': void 0 } },
};
_.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (e) => {
    _r.headers[e] = {};
});
const Er = _r,
    Yc = _.toObjectSet([
        'age',
        'authorization',
        'content-length',
        'content-type',
        'etag',
        'expires',
        'from',
        'host',
        'if-modified-since',
        'if-unmodified-since',
        'last-modified',
        'location',
        'max-forwards',
        'proxy-authorization',
        'referer',
        'retry-after',
        'user-agent',
    ]),
    Wc = (e) => {
        const t = {};
        let n, r, i;
        return (
            e &&
                e
                    .split(
                        `
`,
                    )
                    .forEach(function (a) {
                        (i = a.indexOf(':')),
                            (n = a.substring(0, i).trim().toLowerCase()),
                            (r = a.substring(i + 1).trim()),
                            !(!n || (t[n] && Yc[n])) &&
                                (n === 'set-cookie'
                                    ? t[n]
                                        ? t[n].push(r)
                                        : (t[n] = [r])
                                    : (t[n] = t[n] ? t[n] + ', ' + r : r));
                    }),
            t
        );
    },
    ui = Symbol('internals');
function rt(e) {
    return e && String(e).trim().toLowerCase();
}
function jt(e) {
    return e === !1 || e == null ? e : _.isArray(e) ? e.map(jt) : String(e);
}
function Xc(e) {
    const t = Object.create(null),
        n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let r;
    for (; (r = n.exec(e)); ) t[r[1]] = r[2];
    return t;
}
const Zc = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function hn(e, t, n, r, i) {
    if (_.isFunction(r)) return r.call(this, t, n);
    if ((i && (t = n), !!_.isString(t))) {
        if (_.isString(r)) return t.indexOf(r) !== -1;
        if (_.isRegExp(r)) return r.test(t);
    }
}
function Qc(e) {
    return e
        .trim()
        .toLowerCase()
        .replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function ef(e, t) {
    const n = _.toCamelCase(' ' + t);
    ['get', 'set', 'has'].forEach((r) => {
        Object.defineProperty(e, r + n, {
            value: function (i, s, a) {
                return this[r].call(this, t, i, s, a);
            },
            configurable: !0,
        });
    });
}
class tn {
    constructor(t) {
        t && this.set(t);
    }
    set(t, n, r) {
        const i = this;
        function s(o, l, p) {
            const f = rt(l);
            if (!f) throw new Error('header name must be a non-empty string');
            const c = _.findKey(i, f);
            (!c || i[c] === void 0 || p === !0 || (p === void 0 && i[c] !== !1)) && (i[c || l] = jt(o));
        }
        const a = (o, l) => _.forEach(o, (p, f) => s(p, f, l));
        return (
            _.isPlainObject(t) || t instanceof this.constructor
                ? a(t, n)
                : _.isString(t) && (t = t.trim()) && !Zc(t)
                  ? a(Wc(t), n)
                  : t != null && s(n, t, r),
            this
        );
    }
    get(t, n) {
        if (((t = rt(t)), t)) {
            const r = _.findKey(this, t);
            if (r) {
                const i = this[r];
                if (!n) return i;
                if (n === !0) return Xc(i);
                if (_.isFunction(n)) return n.call(this, i, r);
                if (_.isRegExp(n)) return n.exec(i);
                throw new TypeError('parser must be boolean|regexp|function');
            }
        }
    }
    has(t, n) {
        if (((t = rt(t)), t)) {
            const r = _.findKey(this, t);
            return !!(r && this[r] !== void 0 && (!n || hn(this, this[r], r, n)));
        }
        return !1;
    }
    delete(t, n) {
        const r = this;
        let i = !1;
        function s(a) {
            if (((a = rt(a)), a)) {
                const o = _.findKey(r, a);
                o && (!n || hn(r, r[o], o, n)) && (delete r[o], (i = !0));
            }
        }
        return _.isArray(t) ? t.forEach(s) : s(t), i;
    }
    clear(t) {
        const n = Object.keys(this);
        let r = n.length,
            i = !1;
        for (; r--; ) {
            const s = n[r];
            (!t || hn(this, this[s], s, t, !0)) && (delete this[s], (i = !0));
        }
        return i;
    }
    normalize(t) {
        const n = this,
            r = {};
        return (
            _.forEach(this, (i, s) => {
                const a = _.findKey(r, s);
                if (a) {
                    (n[a] = jt(i)), delete n[s];
                    return;
                }
                const o = t ? Qc(s) : String(s).trim();
                o !== s && delete n[s], (n[o] = jt(i)), (r[o] = !0);
            }),
            this
        );
    }
    concat(...t) {
        return this.constructor.concat(this, ...t);
    }
    toJSON(t) {
        const n = Object.create(null);
        return (
            _.forEach(this, (r, i) => {
                r != null && r !== !1 && (n[i] = t && _.isArray(r) ? r.join(', ') : r);
            }),
            n
        );
    }
    [Symbol.iterator]() {
        return Object.entries(this.toJSON())[Symbol.iterator]();
    }
    toString() {
        return Object.entries(this.toJSON()).map(([t, n]) => t + ': ' + n).join(`
`);
    }
    get [Symbol.toStringTag]() {
        return 'AxiosHeaders';
    }
    static from(t) {
        return t instanceof this ? t : new this(t);
    }
    static concat(t, ...n) {
        const r = new this(t);
        return n.forEach((i) => r.set(i)), r;
    }
    static accessor(t) {
        const r = (this[ui] = this[ui] = { accessors: {} }).accessors,
            i = this.prototype;
        function s(a) {
            const o = rt(a);
            r[o] || (ef(i, a), (r[o] = !0));
        }
        return _.isArray(t) ? t.forEach(s) : s(t), this;
    }
}
tn.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);
_.reduceDescriptors(tn.prototype, ({ value: e }, t) => {
    let n = t[0].toUpperCase() + t.slice(1);
    return {
        get: () => e,
        set(r) {
            this[n] = r;
        },
    };
});
_.freezeMethods(tn);
const be = tn;
function vn(e, t) {
    const n = this || Er,
        r = t || n,
        i = be.from(r.headers);
    let s = r.data;
    return (
        _.forEach(e, function (o) {
            s = o.call(n, s, i.normalize(), t ? t.status : void 0);
        }),
        i.normalize(),
        s
    );
}
function oa(e) {
    return !!(e && e.__CANCEL__);
}
function dt(e, t, n) {
    M.call(this, e ?? 'canceled', M.ERR_CANCELED, t, n), (this.name = 'CanceledError');
}
_.inherits(dt, M, { __CANCEL__: !0 });
function tf(e, t, n) {
    const r = n.config.validateStatus;
    !n.status || !r || r(n.status)
        ? e(n)
        : t(
              new M(
                  'Request failed with status code ' + n.status,
                  [M.ERR_BAD_REQUEST, M.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
                  n.config,
                  n.request,
                  n,
              ),
          );
}
const nf = me.hasStandardBrowserEnv
    ? {
          write(e, t, n, r, i, s) {
              const a = [e + '=' + encodeURIComponent(t)];
              _.isNumber(n) && a.push('expires=' + new Date(n).toGMTString()),
                  _.isString(r) && a.push('path=' + r),
                  _.isString(i) && a.push('domain=' + i),
                  s === !0 && a.push('secure'),
                  (document.cookie = a.join('; '));
          },
          read(e) {
              const t = document.cookie.match(new RegExp('(^|;\\s*)(' + e + ')=([^;]*)'));
              return t ? decodeURIComponent(t[3]) : null;
          },
          remove(e) {
              this.write(e, '', Date.now() - 864e5);
          },
      }
    : {
          write() {},
          read() {
              return null;
          },
          remove() {},
      };
function rf(e) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function sf(e, t) {
    return t ? e.replace(/\/?\/$/, '') + '/' + t.replace(/^\/+/, '') : e;
}
function la(e, t) {
    return e && !rf(t) ? sf(e, t) : t;
}
const af = me.hasStandardBrowserEnv
    ? (function () {
          const t = /(msie|trident)/i.test(navigator.userAgent),
              n = document.createElement('a');
          let r;
          function i(s) {
              let a = s;
              return (
                  t && (n.setAttribute('href', a), (a = n.href)),
                  n.setAttribute('href', a),
                  {
                      href: n.href,
                      protocol: n.protocol ? n.protocol.replace(/:$/, '') : '',
                      host: n.host,
                      search: n.search ? n.search.replace(/^\?/, '') : '',
                      hash: n.hash ? n.hash.replace(/^#/, '') : '',
                      hostname: n.hostname,
                      port: n.port,
                      pathname: n.pathname.charAt(0) === '/' ? n.pathname : '/' + n.pathname,
                  }
              );
          }
          return (
              (r = i(window.location.href)),
              function (a) {
                  const o = _.isString(a) ? i(a) : a;
                  return o.protocol === r.protocol && o.host === r.host;
              }
          );
      })()
    : (function () {
          return function () {
              return !0;
          };
      })();
function of(e) {
    const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
    return (t && t[1]) || '';
}
function lf(e, t) {
    e = e || 10;
    const n = new Array(e),
        r = new Array(e);
    let i = 0,
        s = 0,
        a;
    return (
        (t = t !== void 0 ? t : 1e3),
        function (l) {
            const p = Date.now(),
                f = r[s];
            a || (a = p), (n[i] = l), (r[i] = p);
            let c = s,
                g = 0;
            for (; c !== i; ) (g += n[c++]), (c = c % e);
            if (((i = (i + 1) % e), i === s && (s = (s + 1) % e), p - a < t)) return;
            const h = f && p - f;
            return h ? Math.round((g * 1e3) / h) : void 0;
        }
    );
}
function di(e, t) {
    let n = 0;
    const r = lf(50, 250);
    return (i) => {
        const s = i.loaded,
            a = i.lengthComputable ? i.total : void 0,
            o = s - n,
            l = r(o),
            p = s <= a;
        n = s;
        const f = {
            loaded: s,
            total: a,
            progress: a ? s / a : void 0,
            bytes: o,
            rate: l || void 0,
            estimated: l && a && p ? (a - s) / l : void 0,
            event: i,
        };
        (f[t ? 'download' : 'upload'] = !0), e(f);
    };
}
const uf = typeof XMLHttpRequest < 'u',
    df =
        uf &&
        function (e) {
            return new Promise(function (n, r) {
                let i = e.data;
                const s = be.from(e.headers).normalize();
                let { responseType: a, withXSRFToken: o } = e,
                    l;
                function p() {
                    e.cancelToken && e.cancelToken.unsubscribe(l), e.signal && e.signal.removeEventListener('abort', l);
                }
                let f;
                if (_.isFormData(i)) {
                    if (me.hasStandardBrowserEnv || me.hasStandardBrowserWebWorkerEnv) s.setContentType(!1);
                    else if ((f = s.getContentType()) !== !1) {
                        const [d, ...y] = f
                            ? f
                                  .split(';')
                                  .map((P) => P.trim())
                                  .filter(Boolean)
                            : [];
                        s.setContentType([d || 'multipart/form-data', ...y].join('; '));
                    }
                }
                let c = new XMLHttpRequest();
                if (e.auth) {
                    const d = e.auth.username || '',
                        y = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : '';
                    s.set('Authorization', 'Basic ' + btoa(d + ':' + y));
                }
                const g = la(e.baseURL, e.url);
                c.open(e.method.toUpperCase(), ra(g, e.params, e.paramsSerializer), !0), (c.timeout = e.timeout);
                function h() {
                    if (!c) return;
                    const d = be.from('getAllResponseHeaders' in c && c.getAllResponseHeaders()),
                        P = {
                            data: !a || a === 'text' || a === 'json' ? c.responseText : c.response,
                            status: c.status,
                            statusText: c.statusText,
                            headers: d,
                            config: e,
                            request: c,
                        };
                    tf(
                        function (D) {
                            n(D), p();
                        },
                        function (D) {
                            r(D), p();
                        },
                        P,
                    ),
                        (c = null);
                }
                if (
                    ('onloadend' in c
                        ? (c.onloadend = h)
                        : (c.onreadystatechange = function () {
                              !c ||
                                  c.readyState !== 4 ||
                                  (c.status === 0 && !(c.responseURL && c.responseURL.indexOf('file:') === 0)) ||
                                  setTimeout(h);
                          }),
                    (c.onabort = function () {
                        c && (r(new M('Request aborted', M.ECONNABORTED, e, c)), (c = null));
                    }),
                    (c.onerror = function () {
                        r(new M('Network Error', M.ERR_NETWORK, e, c)), (c = null);
                    }),
                    (c.ontimeout = function () {
                        let y = e.timeout ? 'timeout of ' + e.timeout + 'ms exceeded' : 'timeout exceeded';
                        const P = e.transitional || ia;
                        e.timeoutErrorMessage && (y = e.timeoutErrorMessage),
                            r(new M(y, P.clarifyTimeoutError ? M.ETIMEDOUT : M.ECONNABORTED, e, c)),
                            (c = null);
                    }),
                    me.hasStandardBrowserEnv && (o && _.isFunction(o) && (o = o(e)), o || (o !== !1 && af(g))))
                ) {
                    const d = e.xsrfHeaderName && e.xsrfCookieName && nf.read(e.xsrfCookieName);
                    d && s.set(e.xsrfHeaderName, d);
                }
                i === void 0 && s.setContentType(null),
                    'setRequestHeader' in c &&
                        _.forEach(s.toJSON(), function (y, P) {
                            c.setRequestHeader(P, y);
                        }),
                    _.isUndefined(e.withCredentials) || (c.withCredentials = !!e.withCredentials),
                    a && a !== 'json' && (c.responseType = e.responseType),
                    typeof e.onDownloadProgress == 'function' &&
                        c.addEventListener('progress', di(e.onDownloadProgress, !0)),
                    typeof e.onUploadProgress == 'function' &&
                        c.upload &&
                        c.upload.addEventListener('progress', di(e.onUploadProgress)),
                    (e.cancelToken || e.signal) &&
                        ((l = (d) => {
                            c && (r(!d || d.type ? new dt(null, e, c) : d), c.abort(), (c = null));
                        }),
                        e.cancelToken && e.cancelToken.subscribe(l),
                        e.signal && (e.signal.aborted ? l() : e.signal.addEventListener('abort', l)));
                const u = of(g);
                if (u && me.protocols.indexOf(u) === -1) {
                    r(new M('Unsupported protocol ' + u + ':', M.ERR_BAD_REQUEST, e));
                    return;
                }
                c.send(i || null);
            });
        },
    Mn = { http: Uc, xhr: df };
_.forEach(Mn, (e, t) => {
    if (e) {
        try {
            Object.defineProperty(e, 'name', { value: t });
        } catch {}
        Object.defineProperty(e, 'adapterName', { value: t });
    }
});
const ci = (e) => `- ${e}`,
    cf = (e) => _.isFunction(e) || e === null || e === !1,
    ua = {
        getAdapter: (e) => {
            e = _.isArray(e) ? e : [e];
            const { length: t } = e;
            let n, r;
            const i = {};
            for (let s = 0; s < t; s++) {
                n = e[s];
                let a;
                if (((r = n), !cf(n) && ((r = Mn[(a = String(n)).toLowerCase()]), r === void 0)))
                    throw new M(`Unknown adapter '${a}'`);
                if (r) break;
                i[a || '#' + s] = r;
            }
            if (!r) {
                const s = Object.entries(i).map(
                    ([o, l]) =>
                        `adapter ${o} ` +
                        (l === !1 ? 'is not supported by the environment' : 'is not available in the build'),
                );
                let a = t
                    ? s.length > 1
                        ? `since :
` +
                          s.map(ci).join(`
`)
                        : ' ' + ci(s[0])
                    : 'as no adapter specified';
                throw new M('There is no suitable adapter to dispatch the request ' + a, 'ERR_NOT_SUPPORT');
            }
            return r;
        },
        adapters: Mn,
    };
function _n(e) {
    if ((e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)) throw new dt(null, e);
}
function fi(e) {
    return (
        _n(e),
        (e.headers = be.from(e.headers)),
        (e.data = vn.call(e, e.transformRequest)),
        ['post', 'put', 'patch'].indexOf(e.method) !== -1 &&
            e.headers.setContentType('application/x-www-form-urlencoded', !1),
        ua
            .getAdapter(e.adapter || Er.adapter)(e)
            .then(
                function (r) {
                    return _n(e), (r.data = vn.call(e, e.transformResponse, r)), (r.headers = be.from(r.headers)), r;
                },
                function (r) {
                    return (
                        oa(r) ||
                            (_n(e),
                            r &&
                                r.response &&
                                ((r.response.data = vn.call(e, e.transformResponse, r.response)),
                                (r.response.headers = be.from(r.response.headers)))),
                        Promise.reject(r)
                    );
                },
            )
    );
}
const pi = (e) => (e instanceof be ? { ...e } : e);
function Je(e, t) {
    t = t || {};
    const n = {};
    function r(p, f, c) {
        return _.isPlainObject(p) && _.isPlainObject(f)
            ? _.merge.call({ caseless: c }, p, f)
            : _.isPlainObject(f)
              ? _.merge({}, f)
              : _.isArray(f)
                ? f.slice()
                : f;
    }
    function i(p, f, c) {
        if (_.isUndefined(f)) {
            if (!_.isUndefined(p)) return r(void 0, p, c);
        } else return r(p, f, c);
    }
    function s(p, f) {
        if (!_.isUndefined(f)) return r(void 0, f);
    }
    function a(p, f) {
        if (_.isUndefined(f)) {
            if (!_.isUndefined(p)) return r(void 0, p);
        } else return r(void 0, f);
    }
    function o(p, f, c) {
        if (c in t) return r(p, f);
        if (c in e) return r(void 0, p);
    }
    const l = {
        url: s,
        method: s,
        data: s,
        baseURL: a,
        transformRequest: a,
        transformResponse: a,
        paramsSerializer: a,
        timeout: a,
        timeoutMessage: a,
        withCredentials: a,
        withXSRFToken: a,
        adapter: a,
        responseType: a,
        xsrfCookieName: a,
        xsrfHeaderName: a,
        onUploadProgress: a,
        onDownloadProgress: a,
        decompress: a,
        maxContentLength: a,
        maxBodyLength: a,
        beforeRedirect: a,
        transport: a,
        httpAgent: a,
        httpsAgent: a,
        cancelToken: a,
        socketPath: a,
        responseEncoding: a,
        validateStatus: o,
        headers: (p, f) => i(pi(p), pi(f), !0),
    };
    return (
        _.forEach(Object.keys(Object.assign({}, e, t)), function (f) {
            const c = l[f] || i,
                g = c(e[f], t[f], f);
            (_.isUndefined(g) && c !== o) || (n[f] = g);
        }),
        n
    );
}
const da = '1.6.8',
    yr = {};
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((e, t) => {
    yr[e] = function (r) {
        return typeof r === e || 'a' + (t < 1 ? 'n ' : ' ') + e;
    };
});
const gi = {};
yr.transitional = function (t, n, r) {
    function i(s, a) {
        return '[Axios v' + da + "] Transitional option '" + s + "'" + a + (r ? '. ' + r : '');
    }
    return (s, a, o) => {
        if (t === !1) throw new M(i(a, ' has been removed' + (n ? ' in ' + n : '')), M.ERR_DEPRECATED);
        return (
            n &&
                !gi[a] &&
                ((gi[a] = !0),
                console.warn(i(a, ' has been deprecated since v' + n + ' and will be removed in the near future'))),
            t ? t(s, a, o) : !0
        );
    };
};
function ff(e, t, n) {
    if (typeof e != 'object') throw new M('options must be an object', M.ERR_BAD_OPTION_VALUE);
    const r = Object.keys(e);
    let i = r.length;
    for (; i-- > 0; ) {
        const s = r[i],
            a = t[s];
        if (a) {
            const o = e[s],
                l = o === void 0 || a(o, s, e);
            if (l !== !0) throw new M('option ' + s + ' must be ' + l, M.ERR_BAD_OPTION_VALUE);
            continue;
        }
        if (n !== !0) throw new M('Unknown option ' + s, M.ERR_BAD_OPTION);
    }
}
const xn = { assertOptions: ff, validators: yr },
    Te = xn.validators;
class xt {
    constructor(t) {
        (this.defaults = t), (this.interceptors = { request: new li(), response: new li() });
    }
    async request(t, n) {
        try {
            return await this._request(t, n);
        } catch (r) {
            if (r instanceof Error) {
                let i;
                Error.captureStackTrace ? Error.captureStackTrace((i = {})) : (i = new Error());
                const s = i.stack ? i.stack.replace(/^.+\n/, '') : '';
                r.stack
                    ? s &&
                      !String(r.stack).endsWith(s.replace(/^.+\n.+\n/, '')) &&
                      (r.stack +=
                          `
` + s)
                    : (r.stack = s);
            }
            throw r;
        }
    }
    _request(t, n) {
        typeof t == 'string' ? ((n = n || {}), (n.url = t)) : (n = t || {}), (n = Je(this.defaults, n));
        const { transitional: r, paramsSerializer: i, headers: s } = n;
        r !== void 0 &&
            xn.assertOptions(
                r,
                {
                    silentJSONParsing: Te.transitional(Te.boolean),
                    forcedJSONParsing: Te.transitional(Te.boolean),
                    clarifyTimeoutError: Te.transitional(Te.boolean),
                },
                !1,
            ),
            i != null &&
                (_.isFunction(i)
                    ? (n.paramsSerializer = { serialize: i })
                    : xn.assertOptions(i, { encode: Te.function, serialize: Te.function }, !0)),
            (n.method = (n.method || this.defaults.method || 'get').toLowerCase());
        let a = s && _.merge(s.common, s[n.method]);
        s &&
            _.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], (u) => {
                delete s[u];
            }),
            (n.headers = be.concat(a, s));
        const o = [];
        let l = !0;
        this.interceptors.request.forEach(function (d) {
            (typeof d.runWhen == 'function' && d.runWhen(n) === !1) ||
                ((l = l && d.synchronous), o.unshift(d.fulfilled, d.rejected));
        });
        const p = [];
        this.interceptors.response.forEach(function (d) {
            p.push(d.fulfilled, d.rejected);
        });
        let f,
            c = 0,
            g;
        if (!l) {
            const u = [fi.bind(this), void 0];
            for (u.unshift.apply(u, o), u.push.apply(u, p), g = u.length, f = Promise.resolve(n); c < g; )
                f = f.then(u[c++], u[c++]);
            return f;
        }
        g = o.length;
        let h = n;
        for (c = 0; c < g; ) {
            const u = o[c++],
                d = o[c++];
            try {
                h = u(h);
            } catch (y) {
                d.call(this, y);
                break;
            }
        }
        try {
            f = fi.call(this, h);
        } catch (u) {
            return Promise.reject(u);
        }
        for (c = 0, g = p.length; c < g; ) f = f.then(p[c++], p[c++]);
        return f;
    }
    getUri(t) {
        t = Je(this.defaults, t);
        const n = la(t.baseURL, t.url);
        return ra(n, t.params, t.paramsSerializer);
    }
}
_.forEach(['delete', 'get', 'head', 'options'], function (t) {
    xt.prototype[t] = function (n, r) {
        return this.request(Je(r || {}, { method: t, url: n, data: (r || {}).data }));
    };
});
_.forEach(['post', 'put', 'patch'], function (t) {
    function n(r) {
        return function (s, a, o) {
            return this.request(
                Je(o || {}, {
                    method: t,
                    headers: r ? { 'Content-Type': 'multipart/form-data' } : {},
                    url: s,
                    data: a,
                }),
            );
        };
    }
    (xt.prototype[t] = n()), (xt.prototype[t + 'Form'] = n(!0));
});
const Ct = xt;
class Ir {
    constructor(t) {
        if (typeof t != 'function') throw new TypeError('executor must be a function.');
        let n;
        this.promise = new Promise(function (s) {
            n = s;
        });
        const r = this;
        this.promise.then((i) => {
            if (!r._listeners) return;
            let s = r._listeners.length;
            for (; s-- > 0; ) r._listeners[s](i);
            r._listeners = null;
        }),
            (this.promise.then = (i) => {
                let s;
                const a = new Promise((o) => {
                    r.subscribe(o), (s = o);
                }).then(i);
                return (
                    (a.cancel = function () {
                        r.unsubscribe(s);
                    }),
                    a
                );
            }),
            t(function (s, a, o) {
                r.reason || ((r.reason = new dt(s, a, o)), n(r.reason));
            });
    }
    throwIfRequested() {
        if (this.reason) throw this.reason;
    }
    subscribe(t) {
        if (this.reason) {
            t(this.reason);
            return;
        }
        this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
    }
    unsubscribe(t) {
        if (!this._listeners) return;
        const n = this._listeners.indexOf(t);
        n !== -1 && this._listeners.splice(n, 1);
    }
    static source() {
        let t;
        return {
            token: new Ir(function (i) {
                t = i;
            }),
            cancel: t,
        };
    }
}
const pf = Ir;
function gf(e) {
    return function (n) {
        return e.apply(null, n);
    };
}
function mf(e) {
    return _.isObject(e) && e.isAxiosError === !0;
}
const Bn = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511,
};
Object.entries(Bn).forEach(([e, t]) => {
    Bn[t] = e;
});
const hf = Bn;
function ca(e) {
    const t = new Ct(e),
        n = Hs(Ct.prototype.request, t);
    return (
        _.extend(n, Ct.prototype, t, { allOwnKeys: !0 }),
        _.extend(n, t, null, { allOwnKeys: !0 }),
        (n.create = function (i) {
            return ca(Je(e, i));
        }),
        n
    );
}
const X = ca(Er);
X.Axios = Ct;
X.CanceledError = dt;
X.CancelToken = pf;
X.isCancel = oa;
X.VERSION = da;
X.toFormData = en;
X.AxiosError = M;
X.Cancel = X.CanceledError;
X.all = function (t) {
    return Promise.all(t);
};
X.spread = gf;
X.isAxiosError = mf;
X.mergeConfig = Je;
X.AxiosHeaders = be;
X.formToJSON = (e) => aa(_.isHTMLForm(e) ? new FormData(e) : e);
X.getAdapter = ua.getAdapter;
X.HttpStatusCode = hf;
X.default = X;
const vf = new Set([
    'ENOTFOUND',
    'ENETUNREACH',
    'UNABLE_TO_GET_ISSUER_CERT',
    'UNABLE_TO_GET_CRL',
    'UNABLE_TO_DECRYPT_CERT_SIGNATURE',
    'UNABLE_TO_DECRYPT_CRL_SIGNATURE',
    'UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY',
    'CERT_SIGNATURE_FAILURE',
    'CRL_SIGNATURE_FAILURE',
    'CERT_NOT_YET_VALID',
    'CERT_HAS_EXPIRED',
    'CRL_NOT_YET_VALID',
    'CRL_HAS_EXPIRED',
    'ERROR_IN_CERT_NOT_BEFORE_FIELD',
    'ERROR_IN_CERT_NOT_AFTER_FIELD',
    'ERROR_IN_CRL_LAST_UPDATE_FIELD',
    'ERROR_IN_CRL_NEXT_UPDATE_FIELD',
    'OUT_OF_MEM',
    'DEPTH_ZERO_SELF_SIGNED_CERT',
    'SELF_SIGNED_CERT_IN_CHAIN',
    'UNABLE_TO_GET_ISSUER_CERT_LOCALLY',
    'UNABLE_TO_VERIFY_LEAF_SIGNATURE',
    'CERT_CHAIN_TOO_LONG',
    'CERT_REVOKED',
    'INVALID_CA',
    'PATH_LENGTH_EXCEEDED',
    'INVALID_PURPOSE',
    'CERT_UNTRUSTED',
    'CERT_REJECTED',
    'HOSTNAME_MISMATCH',
]);
var _f = (e) => !vf.has(e && e.code);
const Ef = $n(_f),
    fa = 'axios-retry';
function pa(e) {
    const t = ['ERR_CANCELED', 'ECONNABORTED'];
    return e.response || !e.code || t.includes(e.code) ? !1 : Ef(e);
}
const ga = ['get', 'head', 'options'],
    yf = ga.concat(['put', 'delete']);
function br(e) {
    return e.code !== 'ECONNABORTED' && (!e.response || (e.response.status >= 500 && e.response.status <= 599));
}
function If(e) {
    var t;
    return (t = e.config) != null && t.method ? br(e) && ga.indexOf(e.config.method) !== -1 : !1;
}
function ma(e) {
    var t;
    return (t = e.config) != null && t.method ? br(e) && yf.indexOf(e.config.method) !== -1 : !1;
}
function ha(e) {
    return pa(e) || ma(e);
}
function bf() {
    return 0;
}
function Sf(e = 0, t = void 0, n = 100) {
    const r = 2 ** e * n,
        i = r * 0.2 * Math.random();
    return r + i;
}
const Tf = {
    retries: 3,
    retryCondition: ha,
    retryDelay: bf,
    shouldResetTimeout: !1,
    onRetry: () => {},
    onMaxRetryTimesExceeded: () => {},
};
function Af(e, t) {
    return { ...Tf, ...t, ...e[fa] };
}
function mi(e, t) {
    const n = Af(e, t || {});
    return (n.retryCount = n.retryCount || 0), (n.lastRequestTime = n.lastRequestTime || Date.now()), (e[fa] = n), n;
}
function Nf(e, t) {
    e.defaults.agent === t.agent && delete t.agent,
        e.defaults.httpAgent === t.httpAgent && delete t.httpAgent,
        e.defaults.httpsAgent === t.httpsAgent && delete t.httpsAgent;
}
async function Rf(e, t) {
    const { retries: n, retryCondition: r } = e,
        i = (e.retryCount || 0) < n && r(t);
    if (typeof i == 'object')
        try {
            return (await i) !== !1;
        } catch {
            return !1;
        }
    return i;
}
async function Of(e, t) {
    e.retryCount >= e.retries && (await e.onMaxRetryTimesExceeded(t, e.retryCount));
}
const Fe = (e, t) => {
    const n = e.interceptors.request.use((i) => (mi(i, t), i)),
        r = e.interceptors.response.use(null, async (i) => {
            const { config: s } = i;
            if (!s) return Promise.reject(i);
            const a = mi(s, t);
            if (await Rf(a, i)) {
                a.retryCount += 1;
                const { retryDelay: o, shouldResetTimeout: l, onRetry: p } = a,
                    f = o(a.retryCount, i);
                if ((Nf(e, s), !l && s.timeout && a.lastRequestTime)) {
                    const c = Date.now() - a.lastRequestTime,
                        g = s.timeout - c - f;
                    if (g <= 0) return Promise.reject(i);
                    s.timeout = g;
                }
                return (
                    (s.transformRequest = [(c) => c]),
                    await p(a.retryCount, i, s),
                    new Promise((c) => {
                        setTimeout(() => c(e(s)), f);
                    })
                );
            }
            return await Of(a, i), Promise.reject(i);
        });
    return { requestInterceptorId: n, responseInterceptorId: r };
};
Fe.isNetworkError = pa;
Fe.isSafeRequestError = If;
Fe.isIdempotentRequestError = ma;
Fe.isNetworkOrIdempotentRequestError = ha;
Fe.exponentialDelay = Sf;
Fe.isRetryableError = br;
var kf = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var $e = k;
function Df(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var wf = typeof Object.is == 'function' ? Object.is : Df,
    Lf = $e.useState,
    Pf = $e.useEffect,
    Uf = $e.useLayoutEffect,
    Kf = $e.useDebugValue;
function Gf(e, t) {
    var n = t(),
        r = Lf({ inst: { value: n, getSnapshot: t } }),
        i = r[0].inst,
        s = r[1];
    return (
        Uf(
            function () {
                (i.value = n), (i.getSnapshot = t), En(i) && s({ inst: i });
            },
            [e, n, t],
        ),
        Pf(
            function () {
                return (
                    En(i) && s({ inst: i }),
                    e(function () {
                        En(i) && s({ inst: i });
                    })
                );
            },
            [e],
        ),
        Kf(n),
        n
    );
}
function En(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
        var n = t();
        return !wf(e, n);
    } catch {
        return !0;
    }
}
function jf(e, t) {
    return t();
}
var Cf = typeof window > 'u' || typeof window.document > 'u' || typeof window.document.createElement > 'u' ? jf : Gf;
kf.useSyncExternalStore = $e.useSyncExternalStore !== void 0 ? $e.useSyncExternalStore : Cf;
const we = () => {},
    ae = we(),
    yn = Object,
    ce = (e) => e === ae,
    Pe = (e) => typeof e == 'function',
    nn = (e, t) => ({ ...e, ...t }),
    Ff = (e) => Pe(e.then),
    It = new WeakMap();
let Mf = 0;
const ot = (e) => {
        const t = typeof e,
            n = e && e.constructor,
            r = n == Date;
        let i, s;
        if (yn(e) === e && !r && n != RegExp) {
            if (((i = It.get(e)), i)) return i;
            if (((i = ++Mf + '~'), It.set(e, i), n == Array)) {
                for (i = '@', s = 0; s < e.length; s++) i += ot(e[s]) + ',';
                It.set(e, i);
            }
            if (n == yn) {
                i = '#';
                const a = yn.keys(e).sort();
                for (; !ce((s = a.pop())); ) ce(e[s]) || (i += s + ':' + ot(e[s]) + ',');
                It.set(e, i);
            }
        } else i = r ? e.toJSON() : t == 'symbol' ? e.toString() : t == 'string' ? JSON.stringify(e) : '' + e;
        return i;
    },
    ke = new WeakMap(),
    In = {},
    bt = {},
    va = 'undefined',
    Sr = typeof window != va,
    Vn = typeof document != va,
    xf = (e, t) => {
        const n = ke.get(e);
        return [
            () => (!ce(t) && e.get(t)) || In,
            (r) => {
                if (!ce(t)) {
                    const i = e.get(t);
                    t in bt || (bt[t] = i), n[5](t, nn(i, r), i || In);
                }
            },
            n[6],
            () => (!ce(t) && t in bt ? bt[t] : (!ce(t) && e.get(t)) || In),
        ];
    };
let qn = !0;
const Bf = () => qn,
    [Hn, Jn] =
        Sr && window.addEventListener
            ? [window.addEventListener.bind(window), window.removeEventListener.bind(window)]
            : [we, we],
    Vf = () => {
        const e = Vn && document.visibilityState;
        return ce(e) || e !== 'hidden';
    },
    qf = (e) => (
        Vn && document.addEventListener('visibilitychange', e),
        Hn('focus', e),
        () => {
            Vn && document.removeEventListener('visibilitychange', e), Jn('focus', e);
        }
    ),
    Hf = (e) => {
        const t = () => {
                (qn = !0), e();
            },
            n = () => {
                qn = !1;
            };
        return (
            Hn('online', t),
            Hn('offline', n),
            () => {
                Jn('online', t), Jn('offline', n);
            }
        );
    },
    Jf = { isOnline: Bf, isVisible: Vf },
    $f = { initFocus: qf, initReconnect: Hf };
K.useId;
const _a = !Sr || 'Deno' in window,
    bn = typeof navigator < 'u' && navigator.connection,
    hi = !_a && bn && (['slow-2g', '2g'].includes(bn.effectiveType) || bn.saveData),
    Ea = (e) => {
        if (Pe(e))
            try {
                e = e();
            } catch {
                e = '';
            }
        const t = e;
        return (e = typeof e == 'string' ? e : (Array.isArray(e) ? e.length : e) ? ot(e) : ''), [e, t];
    };
let zf = 0;
const vi = () => ++zf,
    Yf = 0,
    Wf = 1,
    Xf = 2;
async function Zf(...e) {
    const [t, n, r, i] = e,
        s = nn({ populateCache: !0, throwOnError: !0 }, typeof i == 'boolean' ? { revalidate: i } : i || {});
    let a = s.populateCache;
    const o = s.rollbackOnError;
    let l = s.optimisticData;
    const p = (g) => (typeof o == 'function' ? o(g) : o !== !1),
        f = s.throwOnError;
    if (Pe(n)) {
        const g = n,
            h = [],
            u = t.keys();
        for (const d of u) !/^\$(inf|sub)\$/.test(d) && g(t.get(d)._k) && h.push(d);
        return Promise.all(h.map(c));
    }
    return c(n);
    async function c(g) {
        const [h] = Ea(g);
        if (!h) return;
        const [u, d] = xf(t, h),
            [y, P, q, D] = ke.get(t),
            L = () => {
                const I = y[h];
                return (Pe(s.revalidate) ? s.revalidate(u().data, g) : s.revalidate !== !1) &&
                    (delete q[h], delete D[h], I && I[0])
                    ? I[0](Xf).then(() => u().data)
                    : u().data;
            };
        if (e.length < 3) return L();
        let m = r,
            O;
        const E = vi();
        P[h] = [E, 0];
        const G = !ce(l),
            V = u(),
            H = V.data,
            Z = V._c,
            b = ce(Z) ? H : Z;
        if ((G && ((l = Pe(l) ? l(b, H) : l), d({ data: l, _c: b })), Pe(m)))
            try {
                m = m(b);
            } catch (I) {
                O = I;
            }
        if (m && Ff(m))
            if (
                ((m = await m.catch((I) => {
                    O = I;
                })),
                E !== P[h][0])
            ) {
                if (O) throw O;
                return m;
            } else O && G && p(O) && ((a = !0), d({ data: b, _c: ae }));
        if (a && !O)
            if (Pe(a)) {
                const I = a(m, b);
                d({ data: I, error: ae, _c: ae });
            } else d({ data: m, error: ae, _c: ae });
        if (
            ((P[h][1] = vi()),
            Promise.resolve(L()).then(() => {
                d({ _c: ae });
            }),
            O)
        ) {
            if (f) throw O;
            return;
        }
        return m;
    }
}
const _i = (e, t) => {
        for (const n in e) e[n][0] && e[n][0](t);
    },
    Qf = (e, t) => {
        if (!ke.has(e)) {
            const n = nn($f, t),
                r = {},
                i = Zf.bind(ae, e);
            let s = we;
            const a = {},
                o = (f, c) => {
                    const g = a[f] || [];
                    return (a[f] = g), g.push(c), () => g.splice(g.indexOf(c), 1);
                },
                l = (f, c, g) => {
                    e.set(f, c);
                    const h = a[f];
                    if (h) for (const u of h) u(c, g);
                },
                p = () => {
                    if (!ke.has(e) && (ke.set(e, [r, {}, {}, {}, i, l, o]), !_a)) {
                        const f = n.initFocus(setTimeout.bind(ae, _i.bind(ae, r, Yf))),
                            c = n.initReconnect(setTimeout.bind(ae, _i.bind(ae, r, Wf)));
                        s = () => {
                            f && f(), c && c(), ke.delete(e);
                        };
                    }
                };
            return p(), [e, i, p, s];
        }
        return [e, ke.get(e)[4]];
    },
    ep = (e, t, n, r, i) => {
        const s = n.errorRetryCount,
            a = i.retryCount,
            o = ~~((Math.random() + 0.5) * (1 << (a < 8 ? a : 8))) * n.errorRetryInterval;
        (!ce(s) && a > s) || setTimeout(r, o, i);
    },
    tp = (e, t) => ot(e) == ot(t),
    [ya, np] = Qf(new Map());
nn(
    {
        onLoadingSlow: we,
        onSuccess: we,
        onError: we,
        onErrorRetry: ep,
        onDiscarded: we,
        revalidateOnFocus: !0,
        revalidateOnReconnect: !0,
        revalidateIfStale: !0,
        shouldRetryOnError: !0,
        errorRetryInterval: hi ? 1e4 : 5e3,
        focusThrottleInterval: 5 * 1e3,
        dedupingInterval: 2 * 1e3,
        loadingTimeout: hi ? 5e3 : 3e3,
        compare: tp,
        isPaused: () => !1,
        cache: ya,
        mutate: np,
        fallback: {},
    },
    Jf,
);
k.createContext({});
const rp = '$inf$',
    Ia = Sr && window.__SWR_DEVTOOLS_USE__,
    ip = Ia ? window.__SWR_DEVTOOLS_USE__ : [],
    sp = () => {
        Ia && (window.__SWR_DEVTOOLS_REACT__ = K);
    },
    ap = (e) => (t, n, r) =>
        e(
            t,
            n &&
                ((...s) => {
                    const [a] = Ea(t),
                        [, , , o] = ke.get(ya);
                    if (a.startsWith(rp)) return n(...s);
                    const l = o[a];
                    return ce(l) ? n(...s) : (delete o[a], l);
                }),
            r,
        );
ip.concat(ap);
sp();
K.use;
const ba = X.create({
    baseURL: '/tiltaksgjennomforing/api',
    withCredentials: !0,
    headers: { Pragma: 'no-cache', 'Cache-Control': 'no-cache', 'Content-Type': 'application/json' },
});
Fe(ba, { retries: 3 });
ba.interceptors.response.use(
    (e) => e,
    (e) => {
        var t, n, r, i, s;
        throw ((t = e.response) == null ? void 0 : t.status) === 401 ||
            ((n = e.response) == null ? void 0 : n.status) === 403
            ? (sessionStorage.setItem(Qd, window.location.pathname.replace(Zd, '') + window.location.search),
              new ts('Er ikke logget inn.'))
            : ((r = e.response) == null ? void 0 : r.status) === 400 && (i = e.response) != null && i.headers.feilkode
              ? new ns((s = e.response) == null ? void 0 : s.headers.feilkode)
              : new Vt('Feil ved kontakt mot baksystem.');
    },
);
const Sa = K.createContext({}),
    op = (e) =>
        k.createElement(
            'svg',
            {
                role: 'presentation',
                focusable: 'false',
                viewBox: '0 0 24 24',
                width: 24,
                height: 24,
                xmlns: 'http://www.w3.org/2000/svg',
                ...e,
            },
            k.createElement(
                'g',
                { fill: 'none', fillRule: 'evenodd' },
                k.createElement('path', {
                    d: 'M12.205-.004l-.214.002a12.225 12.225 0 00-8.517 3.659C1.179 5.977-.053 9.013.002 12.208c.115 6.613 5.296 11.793 11.795 11.793l.212-.002c6.726-.116 12.105-5.595 11.99-12.21C23.883 5.178 18.702-.003 12.204-.003z',
                    fill: '#FFA733',
                    fillRule: 'nonzero',
                }),
                k.createElement(
                    'g',
                    { fill: '#3E3832' },
                    k.createElement('path', { d: 'M12.027 19H12a1.499 1.499 0 01-.027-3H12a1.501 1.501 0 01.027 3z' }),
                    k.createElement('path', {
                        d: 'M12 5a1 1 0 011 1v7a1 1 0 11-2 0V6a1 1 0 011-1z',
                        fillRule: 'nonzero',
                    }),
                ),
            ),
        ),
    lp = {
        FEIL_I_FAKTA: 'Feil i fakta',
        FEIL_I_REGELFORSTÅELSE: 'Feil i regelforståelse',
        FEIL_I_PROSENTSATS: 'Feil i prosentsats',
        ANNET: 'Annet',
    };
function up(...e) {
    let t = [];
    for (let n = 0; n < Math.min(...e.map((r) => r.length)); n++) t = t.concat(e.flatMap((r) => r[n]));
    return t;
}
const Ei = (e) => {
        const t = Array.from(e.avslagsårsaker);
        return N.jsxs(
            'div',
            {
                children: [
                    N.jsxs('b', { children: [Be(e.avslåttTidspunkt, Pa), ':'] }),
                    ' Avslått av',
                    ' ',
                    e.avslåttAvNavIdent,
                    ' med følgende årsak',
                    t.length > 1 ? 'er' : '',
                    ':',
                    N.jsx('ul', { children: t.map((n, r) => N.jsx('li', { children: lp[n] }, r)) }),
                    'med forklaringen: ',
                    e.avslagsforklaring,
                ],
            },
            e.id,
        );
    },
    Ta = (e) => {
        var i;
        const { avtale: t } = k.useContext(Sa),
            n =
                ((i = t.gjeldendeTilskuddsperiode) == null ? void 0 : i.status) === 'AVSLÅTT'
                    ? t.gjeldendeTilskuddsperiode
                    : void 0,
            r = t.tilskuddPeriode
                .filter((s) => s.status === 'AVSLÅTT' && s.id !== (n == null ? void 0 : n.id))
                .sort((s, a) => {
                    if (s.avslåttTidspunkt && a.avslåttTidspunkt) {
                        const o = new Date(s.avslåttTidspunkt).getMilliseconds();
                        return new Date(a.avslåttTidspunkt).getMilliseconds() - o;
                    }
                    return 0;
                });
        return !n && r.length === 0
            ? null
            : N.jsxs(La, {
                  children: [
                      N.jsxs('div', {
                          style: {
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                          },
                          children: [
                              N.jsx('div', { children: N.jsx(op, { style: { width: '40px', height: '40px' } }) }),
                              N.jsx(ue, { rem: 1 }),
                              N.jsx('div', {
                                  children: N.jsx(Xi, {
                                      size: 'large',
                                      children: n
                                          ? 'Tilskuddsperiode avslått av beslutter'
                                          : 'Venter på godkjenning fra beslutter',
                                  }),
                              }),
                          ],
                      }),
                      N.jsx(ue, { rem: 2 }),
                      n
                          ? N.jsxs(N.Fragment, {
                                children: [
                                    N.jsx(se, {
                                        size: 'small',
                                        children:
                                            'Gjør du endringer på avtalen vil beslutter kunne godkjenne tilskuddsperioden på nytt. Hvis avtalen allikevel er riktig utfylt kan den sendes tilbake til beslutter uendret.',
                                    }),
                                    N.jsx(ue, { rem: 1 }),
                                    N.jsx(es, { variant: 'info', children: Ei(n) }),
                                ],
                            })
                          : N.jsx(se, {
                                size: 'small',
                                children:
                                    'Beslutter har nå muligheten til å godkjenne tilskuddsperioden. Du kan gjøre flere endringer om det er nødvendig før beslutter godkjenner.',
                            }),
                      r.length > 0
                          ? N.jsxs(N.Fragment, {
                                children: [
                                    N.jsx(ue, { rem: 1 }),
                                    N.jsx(Et, {
                                        children: N.jsxs(Et.Item, {
                                            children: [
                                                N.jsx(Et.Header, {
                                                    children: 'Vis tidligere avslåtte tilskuddsperioder',
                                                }),
                                                N.jsx(Et.Content, {
                                                    children: up(
                                                        r.map(Ei),
                                                        r.map((s, a) => N.jsx(ue, { rem: 1 }, a)),
                                                    ).slice(0, -1),
                                                }),
                                            ],
                                        }),
                                    }),
                                ],
                            })
                          : void 0,
                  ],
              });
    };
Ta.__docgenInfo = { description: '', methods: [], displayName: 'TilskuddsperioderAvslått' };
class Aa extends k.Component {
    constructor(t) {
        super(t),
            (this.setFocus = () => {
                this.varselRef && this.varselRef.current.focus();
            }),
            (this.lagreKnappOnClick = async () => {
                this.enableSpinner(!0);
                try {
                    await this.props.lagre(), this.visSuksessmelding(), this.fjernFeilmelding();
                } catch (n) {
                    try {
                        this.props.setFeilmelding && this.props.setFeilmelding(n.message), Ku(n, this.visFeilmelding);
                    } catch {
                        this.visFeilmelding('Det skjedde en uventet feil');
                    }
                } finally {
                    this.state.isMounted && this.enableSpinner(!1);
                }
            }),
            (this.visFeilmelding = (n) => {
                this.setState({ feilmelding: n }, () => {
                    this.setFocus();
                });
            }),
            (this.visSuksessmelding = () => {
                this.props.suksessmelding &&
                    this.setState({ suksessmelding: this.props.suksessmelding }, () => {
                        this.setFocus();
                    });
            }),
            (this.setFocusElement = (n) => {
                const r = document.getElementById(n);
                r && r.focus();
            }),
            (this.fjernSuksessmelding = () => {
                this.setState({ suksessmelding: '' }, () => {
                    this.setFocusElement('lagre-knapp');
                });
            }),
            (this.fjernFeilmelding = () => {
                this.setState({ feilmelding: '' }, () => {
                    this.setFocusElement('lagre-knapp');
                });
            }),
            (this.enableSpinner = (n) => {
                this.setState({ spinner: n });
            }),
            (this.varselRef = K.createRef()),
            (this.state = { suksessmelding: '', feilmelding: '', spinner: !1, isMounted: !1 });
    }
    componentDidMount() {
        this.setState({ isMounted: !0 });
    }
    render() {
        return N.jsxs(N.Fragment, {
            children: [
                this.state.suksessmelding &&
                    N.jsx(Sn, {
                        kanLukkes: !1,
                        timeout: 5e3,
                        type: 'success',
                        onLukkVarsel: this.fjernSuksessmelding,
                        className: 'lagreknapp__varsel',
                        varselRef: this.varselRef,
                        children: this.state.suksessmelding,
                    }),
                this.state.feilmelding &&
                    N.jsx(Sn, {
                        kanLukkes: !0,
                        type: 'warning',
                        onLukkVarsel: this.fjernFeilmelding,
                        className: 'lagreknapp__varsel',
                        varselRef: this.varselRef,
                        children: this.state.feilmelding,
                    }),
                N.jsx(Xn, {
                    loading: this.state.spinner,
                    variant: this.props.variant,
                    hidden: this.props.hidden,
                    onClick: this.lagreKnappOnClick,
                    className: this.props.className,
                    disabled: this.state.spinner || this.props.disabled,
                    id: 'lagre-knapp',
                    children: this.props.label,
                }),
            ],
        });
    }
}
Aa.__docgenInfo = {
    description: '',
    methods: [
        { name: 'setFocus', docblock: null, modifiers: [], params: [], returns: null },
        { name: 'lagreKnappOnClick', docblock: null, modifiers: ['async'], params: [], returns: null },
        {
            name: 'visFeilmelding',
            docblock: null,
            modifiers: [],
            params: [{ name: 'feilmelding', optional: !1, type: { name: 'string' } }],
            returns: null,
        },
        { name: 'visSuksessmelding', docblock: null, modifiers: [], params: [], returns: null },
        {
            name: 'setFocusElement',
            docblock: null,
            modifiers: [],
            params: [{ name: 'id', optional: !1, type: { name: 'string' } }],
            returns: { type: { name: 'void' } },
        },
        { name: 'fjernSuksessmelding', docblock: null, modifiers: [], params: [], returns: null },
        { name: 'fjernFeilmelding', docblock: null, modifiers: [], params: [], returns: null },
        {
            name: 'enableSpinner',
            docblock: null,
            modifiers: [],
            params: [{ name: 'state', optional: !1, type: { name: 'boolean' } }],
            returns: null,
        },
    ],
    displayName: 'LagreKnapp',
    props: {
        lagre: {
            required: !0,
            tsType: {
                name: 'signature',
                type: 'function',
                raw: '() => Promise<any> | void',
                signature: {
                    arguments: [],
                    return: {
                        name: 'union',
                        raw: 'Promise<any> | void',
                        elements: [
                            { name: 'Promise', elements: [{ name: 'any' }], raw: 'Promise<any>' },
                            { name: 'void' },
                        ],
                    },
                },
            },
            description: '',
        },
        className: { required: !1, tsType: { name: 'string' }, description: '' },
        suksessmelding: { required: !1, tsType: { name: 'string' }, description: '' },
        label: { required: !0, tsType: { name: 'ReactReactNode', raw: 'React.ReactNode' }, description: '' },
        disabled: { required: !1, tsType: { name: 'boolean' }, description: '' },
        hidden: { required: !1, tsType: { name: 'boolean' }, description: '' },
        setFeilmelding: {
            required: !1,
            tsType: {
                name: 'signature',
                type: 'function',
                raw: '(value: Feilkode) => void',
                signature: {
                    arguments: [
                        {
                            type: {
                                name: 'union',
                                raw: `| 'ALT_MA_VAERE_FYLT_UT'
| 'ARBEIDSGIVER_SKAL_GODKJENNE_FOER_VEILEDER'
| 'DELTAKER_HAR_GODKJENT'
| 'ER_ALLEREDE_VEILEDER'
| 'GODKJENT_PAA_VEGNE_GRUNN_MAA_VELGES'
| 'GRUNN_TIL_AVBRYTELSE'
| 'IKKE_VALGT_PART'
| 'KAN_IKKE_ENDRE'
| 'KAN_IKKE_LAASES_OPP'
| 'KAN_IKKE_OPPHEVE'
| 'SAMTIDIGE_ENDRINGER'
| 'START_ETTER_SLUTT'
| 'UGYLDIG_TLF'
| 'IKKE_FORDELT'
| 'VARIGHET_FOR_LANG_MIDLERTIDIG_LONNSTILSKUDD_12_MND'
| 'VARIGHET_FOR_LANG_MIDLERTIDIG_LONNSTILSKUDD_24_MND'
| 'VARIGHET_FOR_LANG_ARBEIDSTRENING'
| 'VARIGHET_FOR_LANG_MENTOR_6_MND'
| 'VARIGHET_FOR_LANG_MENTOR_36_MND'
| 'VARIGHET_FOR_LANG_INKLUDERINGSTILSKUDD'
| 'VARIGHET_DATO_TILBAKE_I_TID'
| 'VEILEDER_SKAL_GODKJENNE_SIST'
| 'ALTINN_FEIL'
| 'GOSYS_FEIL'
| 'ENHET_ER_JURIDISK'
| 'ENHET_ER_ORGLEDD'
| 'ENHET_FINNES_IKKE'
| 'IKKE_TILGANG_TIL_DELTAKER'
| 'KAN_IKKE_GODKJENNE_AVTALE_KODE6'
| 'KAN_IKKE_OPPRETTE_AVTALE_KODE6'
| 'TILSKUDDSPERIODE_ER_ALLEREDE_BEHANDLET'
| 'TILSKUDDSPERIODE_ER_IKKE_SATT'
| 'TILSKUDDSPERIODE_KAN_KUN_BEHANDLES_VED_INNGAATT_AVTALE'
| 'TILSKUDDSPERIODE_BEHANDLE_FOR_TIDLIG'
| 'TILSKUDDSPERIODE_AVSLAGSFORKLARING_PAAKREVD'
| 'TILSKUDDSPERIODE_INGEN_AVSLAGSAARSAKER'
| 'TILSKUDDSPERIODE_IKKE_GODKJENNE_EGNE'
| 'LONNSTILSKUDD_PROSENT_ER_UGYLDIG'
| 'KONTOREGISTER_FEIL'
| 'KONTOREGISTER_FEIL_BEDRIFT_IKKE_FUNNET'
| 'IKKE_ADMIN_TILGANG'
| 'SOMMERJOBB_FOR_TIDLIG'
| 'SOMMERJOBB_FOR_SENT'
| 'SOMMERJOBB_FOR_LANG_VARIGHET'
| 'SOMMERJOBB_IKKE_GAMMEL_NOK'
| 'SOMMERJOBB_FOR_GAMMEL'
| 'SOMMERJOBB_FOR_GAMMEL_FRA_OPPSTARTDATO'
| 'DELTAKER_67_AAR'
| 'DELTAKER_72_AAR'
| 'FEIL_OTP_SATS'
| 'KAN_IKKE_FORKORTE_ETTER_SLUTTDATO'
| 'KAN_IKKE_FORKORTE_FOR_STARTDATO'
| 'KAN_IKKE_FORKORTE_IKKE_GODKJENT_AVTALE'
| 'KAN_IKKE_FORKORTE_GRUNN_MANGLER'
| 'KAN_IKKE_FORLENGE_FEIL_SLUTTDATO'
| 'KAN_IKKE_ANNULLERES_ALLEREDE_ANNULLERT'
| 'KAN_IKKE_ENDRE_STILLINGSBESKRIVELSE_GRUNN_MANGLER'
| 'KAN_IKKE_ENDRE_KONTAKTINFO_GRUNN_MANGLER'
| 'KAN_IKKE_ENDRE_OPPFØLGING_OG_TILRETTELEGGING_GRUNN_MANGLER'
| 'MANGLER_AD_GRUPPE_BESLUTTER'
| 'MANGLER_VEILEDER_PÅ_AVTALE'
| 'KAN_IKKE_ENDRE_MAAL_TOM_LISTE'
| 'KOSTNADSSTED_LIK_OPPFOLGINGSENHET'
| 'KVALIFISERINGSGRUPPE_MIDLERTIDIG_LONNTILSKUDD_OG_SOMMERJOBB_FEIL'
| 'KVALIFISERINGSGRUPPE_VARIG_LONNTILSKUDD_FEIL'
| 'KVALIFISERINGSGRUPPE_IKKE_RETTIGHET'
| 'FORMIDLINGSGRUPPE_IKKE_RETTIGHET'
| 'HENTING_AV_INNSATS_BEHOV_FEILET'
| 'FORTIDLIG_STARTDATO'
| 'KAN_IKKE_MERKES_FOR_ETTERREGISTRERING_AVTALE_GODKJENT'
| 'AVTALE_INNEHOLDER_UTBETALT_TILSKUDDSPERIODE'
| 'UGYLDIG_VIRKSOMHETSNUMMER'
| 'UGYLDIG_FØDSELSNUMMER'
| 'UGYLDIG_AVTALETYPE'
| 'KAN_IKKE_OPPHEVE_GODKJENNINGER_VED_INNGAATT_AVTALE'
| 'INKLUDERINGSTILSKUDD_SUM_FOR_HØY'
| 'KAN_IKKE_ENDRE_INKLUDERINGSTILSKUDD_TOM_LISTE'
| 'MENTOR_MÅ_SIGNERE_TAUSHETSERKLÆRING'
| 'DELTAGER_OG_MENTOR_KAN_IKKE_HA_SAMME_FØDSELSNUMMER'
| 'AVTALE_INNEHOLDER_TILSKUDDSPERIODE_MED_GODKJENT_REFUSJON'
| 'MANGLER_BEREGNING'
| 'SLUTTDATO_GRENSE_NÅDD'
| 'VARIG_LONNSTILSKUDD_TILSKUDDSPERIODE_MIDLERTIDIG_AVSKURDD'
| 'KAN_IKKE_ENDRE_ARENA_MIGRERINGSDATO_INNGAATT_AVTALE'
| 'KAN_IKKE_FORKORTE_FOR_UTBETALT_TILSKUDDSPERIODE'`,
                                elements: [
                                    { name: 'literal', value: "'ALT_MA_VAERE_FYLT_UT'" },
                                    { name: 'literal', value: "'ARBEIDSGIVER_SKAL_GODKJENNE_FOER_VEILEDER'" },
                                    { name: 'literal', value: "'DELTAKER_HAR_GODKJENT'" },
                                    { name: 'literal', value: "'ER_ALLEREDE_VEILEDER'" },
                                    { name: 'literal', value: "'GODKJENT_PAA_VEGNE_GRUNN_MAA_VELGES'" },
                                    { name: 'literal', value: "'GRUNN_TIL_AVBRYTELSE'" },
                                    { name: 'literal', value: "'IKKE_VALGT_PART'" },
                                    { name: 'literal', value: "'KAN_IKKE_ENDRE'" },
                                    { name: 'literal', value: "'KAN_IKKE_LAASES_OPP'" },
                                    { name: 'literal', value: "'KAN_IKKE_OPPHEVE'" },
                                    { name: 'literal', value: "'SAMTIDIGE_ENDRINGER'" },
                                    { name: 'literal', value: "'START_ETTER_SLUTT'" },
                                    { name: 'literal', value: "'UGYLDIG_TLF'" },
                                    { name: 'literal', value: "'IKKE_FORDELT'" },
                                    { name: 'literal', value: "'VARIGHET_FOR_LANG_MIDLERTIDIG_LONNSTILSKUDD_12_MND'" },
                                    { name: 'literal', value: "'VARIGHET_FOR_LANG_MIDLERTIDIG_LONNSTILSKUDD_24_MND'" },
                                    { name: 'literal', value: "'VARIGHET_FOR_LANG_ARBEIDSTRENING'" },
                                    { name: 'literal', value: "'VARIGHET_FOR_LANG_MENTOR_6_MND'" },
                                    { name: 'literal', value: "'VARIGHET_FOR_LANG_MENTOR_36_MND'" },
                                    { name: 'literal', value: "'VARIGHET_FOR_LANG_INKLUDERINGSTILSKUDD'" },
                                    { name: 'literal', value: "'VARIGHET_DATO_TILBAKE_I_TID'" },
                                    { name: 'literal', value: "'VEILEDER_SKAL_GODKJENNE_SIST'" },
                                    { name: 'literal', value: "'ALTINN_FEIL'" },
                                    { name: 'literal', value: "'GOSYS_FEIL'" },
                                    { name: 'literal', value: "'ENHET_ER_JURIDISK'" },
                                    { name: 'literal', value: "'ENHET_ER_ORGLEDD'" },
                                    { name: 'literal', value: "'ENHET_FINNES_IKKE'" },
                                    { name: 'literal', value: "'IKKE_TILGANG_TIL_DELTAKER'" },
                                    { name: 'literal', value: "'KAN_IKKE_GODKJENNE_AVTALE_KODE6'" },
                                    { name: 'literal', value: "'KAN_IKKE_OPPRETTE_AVTALE_KODE6'" },
                                    { name: 'literal', value: "'TILSKUDDSPERIODE_ER_ALLEREDE_BEHANDLET'" },
                                    { name: 'literal', value: "'TILSKUDDSPERIODE_ER_IKKE_SATT'" },
                                    {
                                        name: 'literal',
                                        value: "'TILSKUDDSPERIODE_KAN_KUN_BEHANDLES_VED_INNGAATT_AVTALE'",
                                    },
                                    { name: 'literal', value: "'TILSKUDDSPERIODE_BEHANDLE_FOR_TIDLIG'" },
                                    { name: 'literal', value: "'TILSKUDDSPERIODE_AVSLAGSFORKLARING_PAAKREVD'" },
                                    { name: 'literal', value: "'TILSKUDDSPERIODE_INGEN_AVSLAGSAARSAKER'" },
                                    { name: 'literal', value: "'TILSKUDDSPERIODE_IKKE_GODKJENNE_EGNE'" },
                                    { name: 'literal', value: "'LONNSTILSKUDD_PROSENT_ER_UGYLDIG'" },
                                    { name: 'literal', value: "'KONTOREGISTER_FEIL'" },
                                    { name: 'literal', value: "'KONTOREGISTER_FEIL_BEDRIFT_IKKE_FUNNET'" },
                                    { name: 'literal', value: "'IKKE_ADMIN_TILGANG'" },
                                    { name: 'literal', value: "'SOMMERJOBB_FOR_TIDLIG'" },
                                    { name: 'literal', value: "'SOMMERJOBB_FOR_SENT'" },
                                    { name: 'literal', value: "'SOMMERJOBB_FOR_LANG_VARIGHET'" },
                                    { name: 'literal', value: "'SOMMERJOBB_IKKE_GAMMEL_NOK'" },
                                    { name: 'literal', value: "'SOMMERJOBB_FOR_GAMMEL'" },
                                    { name: 'literal', value: "'SOMMERJOBB_FOR_GAMMEL_FRA_OPPSTARTDATO'" },
                                    { name: 'literal', value: "'DELTAKER_67_AAR'" },
                                    { name: 'literal', value: "'DELTAKER_72_AAR'" },
                                    { name: 'literal', value: "'FEIL_OTP_SATS'" },
                                    { name: 'literal', value: "'KAN_IKKE_FORKORTE_ETTER_SLUTTDATO'" },
                                    { name: 'literal', value: "'KAN_IKKE_FORKORTE_FOR_STARTDATO'" },
                                    { name: 'literal', value: "'KAN_IKKE_FORKORTE_IKKE_GODKJENT_AVTALE'" },
                                    { name: 'literal', value: "'KAN_IKKE_FORKORTE_GRUNN_MANGLER'" },
                                    { name: 'literal', value: "'KAN_IKKE_FORLENGE_FEIL_SLUTTDATO'" },
                                    { name: 'literal', value: "'KAN_IKKE_ANNULLERES_ALLEREDE_ANNULLERT'" },
                                    { name: 'literal', value: "'KAN_IKKE_ENDRE_STILLINGSBESKRIVELSE_GRUNN_MANGLER'" },
                                    { name: 'literal', value: "'KAN_IKKE_ENDRE_KONTAKTINFO_GRUNN_MANGLER'" },
                                    {
                                        name: 'literal',
                                        value: "'KAN_IKKE_ENDRE_OPPFØLGING_OG_TILRETTELEGGING_GRUNN_MANGLER'",
                                    },
                                    { name: 'literal', value: "'MANGLER_AD_GRUPPE_BESLUTTER'" },
                                    { name: 'literal', value: "'MANGLER_VEILEDER_PÅ_AVTALE'" },
                                    { name: 'literal', value: "'KAN_IKKE_ENDRE_MAAL_TOM_LISTE'" },
                                    { name: 'literal', value: "'KOSTNADSSTED_LIK_OPPFOLGINGSENHET'" },
                                    {
                                        name: 'literal',
                                        value: "'KVALIFISERINGSGRUPPE_MIDLERTIDIG_LONNTILSKUDD_OG_SOMMERJOBB_FEIL'",
                                    },
                                    { name: 'literal', value: "'KVALIFISERINGSGRUPPE_VARIG_LONNTILSKUDD_FEIL'" },
                                    { name: 'literal', value: "'KVALIFISERINGSGRUPPE_IKKE_RETTIGHET'" },
                                    { name: 'literal', value: "'FORMIDLINGSGRUPPE_IKKE_RETTIGHET'" },
                                    { name: 'literal', value: "'HENTING_AV_INNSATS_BEHOV_FEILET'" },
                                    { name: 'literal', value: "'FORTIDLIG_STARTDATO'" },
                                    {
                                        name: 'literal',
                                        value: "'KAN_IKKE_MERKES_FOR_ETTERREGISTRERING_AVTALE_GODKJENT'",
                                    },
                                    { name: 'literal', value: "'AVTALE_INNEHOLDER_UTBETALT_TILSKUDDSPERIODE'" },
                                    { name: 'literal', value: "'UGYLDIG_VIRKSOMHETSNUMMER'" },
                                    { name: 'literal', value: "'UGYLDIG_FØDSELSNUMMER'" },
                                    { name: 'literal', value: "'UGYLDIG_AVTALETYPE'" },
                                    { name: 'literal', value: "'KAN_IKKE_OPPHEVE_GODKJENNINGER_VED_INNGAATT_AVTALE'" },
                                    { name: 'literal', value: "'INKLUDERINGSTILSKUDD_SUM_FOR_HØY'" },
                                    { name: 'literal', value: "'KAN_IKKE_ENDRE_INKLUDERINGSTILSKUDD_TOM_LISTE'" },
                                    { name: 'literal', value: "'MENTOR_MÅ_SIGNERE_TAUSHETSERKLÆRING'" },
                                    { name: 'literal', value: "'DELTAGER_OG_MENTOR_KAN_IKKE_HA_SAMME_FØDSELSNUMMER'" },
                                    {
                                        name: 'literal',
                                        value: "'AVTALE_INNEHOLDER_TILSKUDDSPERIODE_MED_GODKJENT_REFUSJON'",
                                    },
                                    { name: 'literal', value: "'MANGLER_BEREGNING'" },
                                    { name: 'literal', value: "'SLUTTDATO_GRENSE_NÅDD'" },
                                    {
                                        name: 'literal',
                                        value: "'VARIG_LONNSTILSKUDD_TILSKUDDSPERIODE_MIDLERTIDIG_AVSKURDD'",
                                    },
                                    { name: 'literal', value: "'KAN_IKKE_ENDRE_ARENA_MIGRERINGSDATO_INNGAATT_AVTALE'" },
                                    { name: 'literal', value: "'KAN_IKKE_FORKORTE_FOR_UTBETALT_TILSKUDDSPERIODE'" },
                                ],
                            },
                            name: 'value',
                        },
                    ],
                    return: { name: 'void' },
                },
            },
            description: '',
        },
    },
    composes: ['ButtonProps'],
};
const Na = ({ avtale: e }) => {
    var r;
    const { overtaAvtale: t } = k.useContext(Sa);
    if (
        e.godkjentAvVeileder &&
        !e.erAnnullertEllerAvbrutt &&
        e.tilskuddPeriode.find((i) => {
            var s;
            return (
                i.status === 'AVSLÅTT' &&
                i.løpenummer === ((s = e.gjeldendeTilskuddsperiode) == null ? void 0 : s.løpenummer)
            );
        }) &&
        ((r = e.gjeldendeTilskuddsperiode) == null ? void 0 : r.status) !== 'GODKJENT'
    )
        return N.jsx(Ta, {});
    if (e.erUfordelt)
        return N.jsx(_e, {
            header: 'Avtalen er ufordelt',
            body: N.jsxs('div', {
                style: { textAlign: 'center' },
                children: [
                    N.jsx(se, {
                        size: 'small',
                        children: 'Avtalen er opprettet av arbeidsgiver. Den er ikke tildelt en veileder ennå.',
                    }),
                    N.jsx(ue, { rem: 1.5 }),
                    N.jsx(Aa, { lagre: () => t(), label: 'Overta avtale', suksessmelding: 'Avtale tildelt' }),
                ],
            }),
        });
    switch (e.statusSomEnum) {
        case 'ANNULLERT':
            return N.jsx(_e, {
                header: 'Tiltaket er annullert',
                body: N.jsxs(se, {
                    size: 'small',
                    children: [
                        'Du eller en annen veileder har annullert tiltaket',
                        ' ',
                        Be(e.annullertTidspunkt),
                        '. Årsak: ',
                        e.annullertGrunn,
                        '.',
                    ],
                }),
            });
        case 'AVBRUTT':
            return N.jsx(_e, {
                header: 'Tiltaket er avbrutt',
                body: N.jsxs(se, {
                    size: 'small',
                    children: ['Du eller en annen veileder har avbrutt tiltaket. Årsak: ', e.avbruttGrunn, '.'],
                }),
            });
        case 'PÅBEGYNT':
            return N.jsx(_e, { header: 'Du må fylle ut avtalen' });
        case 'MANGLER_GODKJENNING':
            return e.godkjentAvVeileder
                ? N.jsx(_e, {
                      header: 'Venter på godkjenning fra beslutter',
                      body: N.jsxs(N.Fragment, {
                          children: [
                              N.jsx(se, { size: 'small', children: 'Venter på godkjenning fra beslutter.' }),
                              N.jsx(ue, { rem: 2 }),
                          ],
                      }),
                  })
                : e.godkjentAvDeltaker && e.godkjentAvArbeidsgiver
                  ? N.jsx(_e, {
                        header: 'Du kan godkjenne',
                        body: N.jsxs(N.Fragment, {
                            children: [
                                N.jsx(se, {
                                    size: 'small',
                                    children:
                                        'Før du godkjenner avtalen må du sjekke at alt er i orden og innholdet er riktig.',
                                }),
                                N.jsx(ue, { rem: 2 }),
                            ],
                        }),
                    })
                  : N.jsx(_e, {
                        header: 'Venter på godkjenning',
                        body: N.jsxs(N.Fragment, {
                            children: [
                                N.jsx(se, {
                                    size: 'small',
                                    children: 'Deltaker og arbeidsgiver må ha godkjent avtalen før du kan godkjenne.',
                                }),
                                N.jsx(ue, { rem: 2 }),
                            ],
                        }),
                    });
        case 'KLAR_FOR_OPPSTART':
            return e.tiltakstype === 'SOMMERJOBB' ||
                e.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' ||
                e.tiltakstype === 'VARIG_LONNSTILSKUDD'
                ? N.jsx(_e, {
                      header: 'Avtalen er ferdig utfylt og godkjent',
                      body: N.jsxs(N.Fragment, {
                          children: [
                              N.jsxs(se, {
                                  size: 'small',
                                  children: [
                                      'Avtale ble inngått ',
                                      Be(e.avtaleInngått, _t),
                                      '. Tiltaket starter ',
                                      Be(e.gjeldendeInnhold.startDato, _t),
                                      '.',
                                  ],
                              }),
                              N.jsx(ue, { rem: 1 }),
                              N.jsx(se, {
                                  size: 'small',
                                  children:
                                      'Du skal ikke registrere tiltaksgjennomføringen i Arena. Avtalen journalføres automatisk i Gosys.',
                              }),
                          ],
                      }),
                  })
                : N.jsx(_e, {
                      header: 'Avtalen er ferdig utfylt og godkjent',
                      body: N.jsxs(N.Fragment, {
                          children: [
                              N.jsxs(se, {
                                  size: 'small',
                                  children: [
                                      'Avtale ble inngått ',
                                      Be(e.avtaleInngått, _t),
                                      '. Tiltaket starter ',
                                      Be(e.gjeldendeInnhold.startDato, _t),
                                      '.',
                                  ],
                              }),
                              N.jsx(ue, { rem: 1 }),
                              N.jsx(se, {
                                  size: 'small',
                                  children:
                                      'Du må fullføre registreringen i Arena. Avtalen journalføres automatisk i Gosys.',
                              }),
                          ],
                      }),
                  });
        case 'GJENNOMFØRES':
            return N.jsx(Ka, { avtaleInngått: e.avtaleInngått, startDato: e.gjeldendeInnhold.startDato });
        case 'AVSLUTTET':
            return N.jsx(Ua, { startDato: e.gjeldendeInnhold.startDato, sluttDato: e.gjeldendeInnhold.sluttDato });
    }
    return null;
};
Na.__docgenInfo = {
    description: '',
    methods: [],
    displayName: 'VeilederAvtaleStatus',
    props: {
        avtale: {
            required: !0,
            tsType: {
                name: 'intersection',
                raw: `Pick<Avtale, 'erUfordelt' | 'statusSomEnum' | 'annullertTidspunkt' | 'tiltakstype' | 'tilskuddPeriode'
| 'godkjentAvDeltaker' | 'godkjentAvArbeidsgiver' | 'godkjentAvVeileder' | 'gjeldendeTilskuddsperiode'
| 'avtaleInngått' | 'erAnnullertEllerAvbrutt' | 'annullertGrunn' | 'avbruttGrunn'>
& { gjeldendeInnhold: Pick<Avtaleinnhold , 'startDato' | 'sluttDato'>}`,
                elements: [
                    {
                        name: 'Pick',
                        elements: [
                            {
                                name: 'intersection',
                                raw: `Annullering &
Avbrytelse &
Readonly<AvtaleMetadata> &
Avtaleparter &
Godkjenninger &
TilskuddsPerioder & { gjeldendeInnhold: Avtaleinnhold }`,
                                elements: [
                                    { name: 'Annullering' },
                                    { name: 'Avbrytelse' },
                                    {
                                        name: 'Readonly',
                                        elements: [{ name: 'AvtaleMetadata' }],
                                        raw: 'Readonly<AvtaleMetadata>',
                                    },
                                    { name: 'Avtaleparter' },
                                    { name: 'Godkjenninger' },
                                    { name: 'TilskuddsPerioder' },
                                    {
                                        name: 'signature',
                                        type: 'object',
                                        raw: '{ gjeldendeInnhold: Avtaleinnhold }',
                                        signature: {
                                            properties: [
                                                {
                                                    key: 'gjeldendeInnhold',
                                                    value: {
                                                        name: 'intersection',
                                                        raw: `{
    arbeidsgiverFornavn?: string;
    arbeidsgiverEtternavn?: string;
    arbeidsgiverTlf?: string;
    bedriftNavn: string;
    deltakerFornavn?: string;
    deltakerEtternavn?: string;
    deltakerTlf?: string;
    oppfolging?: string;
    stillingstittel?: string;
    arbeidsoppgaver?: string;
    stillingstype?: Stillingstype;
    stillingKonseptId?: number;
    stillingStyrk08?: number;
    tilrettelegging?: string;
    startDato?: string;
    sluttDato?: string;
    antallDagerPerUke?: number;
    veilederFornavn?: string;
    veilederEtternavn?: string;
    veilederTlf?: string;
    maal: Maal[];

    manedslonn?: number;
    feriepengesats?: number;
    arbeidsgiveravgift?: number;
    lonnstilskuddProsent?: number;
    stillingprosent?: number;
    feriepengerBelop?: number;
    otpSats?: number;
    otpBelop?: number;
    arbeidsgiveravgiftBelop?: number;
    sumLonnsutgifter?: number;
    sumLonnstilskudd?: number;
    manedslonn100pst?: number;
    datoForRedusertProsent?: string;
    sumLønnstilskuddRedusert?: number;
    refusjonKontaktperson?: RefusjonKontaktperson;

    enhetKostnadssted?: string;
    enhetsnavnKostnadssted?: string;

    arbeidsgiverKontonummer?: string;
    harFamilietilknytning?: boolean;
    familietilknytningForklaring?: string;

    mentorFornavn?: string;
    mentorTlf?: string;
    mentorEtternavn?: string;
    mentorOppgaver?: string;
    mentorAntallTimer?: number;
    mentorTimelonn?: number;
} & InkluderingsInnhold`,
                                                        elements: [
                                                            {
                                                                name: 'signature',
                                                                type: 'object',
                                                                raw: `{
    arbeidsgiverFornavn?: string;
    arbeidsgiverEtternavn?: string;
    arbeidsgiverTlf?: string;
    bedriftNavn: string;
    deltakerFornavn?: string;
    deltakerEtternavn?: string;
    deltakerTlf?: string;
    oppfolging?: string;
    stillingstittel?: string;
    arbeidsoppgaver?: string;
    stillingstype?: Stillingstype;
    stillingKonseptId?: number;
    stillingStyrk08?: number;
    tilrettelegging?: string;
    startDato?: string;
    sluttDato?: string;
    antallDagerPerUke?: number;
    veilederFornavn?: string;
    veilederEtternavn?: string;
    veilederTlf?: string;
    maal: Maal[];

    manedslonn?: number;
    feriepengesats?: number;
    arbeidsgiveravgift?: number;
    lonnstilskuddProsent?: number;
    stillingprosent?: number;
    feriepengerBelop?: number;
    otpSats?: number;
    otpBelop?: number;
    arbeidsgiveravgiftBelop?: number;
    sumLonnsutgifter?: number;
    sumLonnstilskudd?: number;
    manedslonn100pst?: number;
    datoForRedusertProsent?: string;
    sumLønnstilskuddRedusert?: number;
    refusjonKontaktperson?: RefusjonKontaktperson;

    enhetKostnadssted?: string;
    enhetsnavnKostnadssted?: string;

    arbeidsgiverKontonummer?: string;
    harFamilietilknytning?: boolean;
    familietilknytningForklaring?: string;

    mentorFornavn?: string;
    mentorTlf?: string;
    mentorEtternavn?: string;
    mentorOppgaver?: string;
    mentorAntallTimer?: number;
    mentorTimelonn?: number;
}`,
                                                                signature: {
                                                                    properties: [
                                                                        {
                                                                            key: 'arbeidsgiverFornavn',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'arbeidsgiverEtternavn',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'arbeidsgiverTlf',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'bedriftNavn',
                                                                            value: { name: 'string', required: !0 },
                                                                        },
                                                                        {
                                                                            key: 'deltakerFornavn',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'deltakerEtternavn',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'deltakerTlf',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'oppfolging',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'stillingstittel',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'arbeidsoppgaver',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'stillingstype',
                                                                            value: {
                                                                                name: 'union',
                                                                                raw: "'FAST' | 'MIDLERTIDIG'",
                                                                                elements: [
                                                                                    {
                                                                                        name: 'literal',
                                                                                        value: "'FAST'",
                                                                                    },
                                                                                    {
                                                                                        name: 'literal',
                                                                                        value: "'MIDLERTIDIG'",
                                                                                    },
                                                                                ],
                                                                                required: !1,
                                                                            },
                                                                        },
                                                                        {
                                                                            key: 'stillingKonseptId',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'stillingStyrk08',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'tilrettelegging',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'startDato',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'sluttDato',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'antallDagerPerUke',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'veilederFornavn',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'veilederEtternavn',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'veilederTlf',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'maal',
                                                                            value: {
                                                                                name: 'Array',
                                                                                elements: [{ name: 'Maal' }],
                                                                                raw: 'Maal[]',
                                                                                required: !0,
                                                                            },
                                                                        },
                                                                        {
                                                                            key: 'manedslonn',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'feriepengesats',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'arbeidsgiveravgift',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'lonnstilskuddProsent',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'stillingprosent',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'feriepengerBelop',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'otpSats',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'otpBelop',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'arbeidsgiveravgiftBelop',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'sumLonnsutgifter',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'sumLonnstilskudd',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'manedslonn100pst',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'datoForRedusertProsent',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'sumLønnstilskuddRedusert',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'refusjonKontaktperson',
                                                                            value: {
                                                                                name: 'RefusjonKontaktperson',
                                                                                required: !1,
                                                                            },
                                                                        },
                                                                        {
                                                                            key: 'enhetKostnadssted',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'enhetsnavnKostnadssted',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'arbeidsgiverKontonummer',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'harFamilietilknytning',
                                                                            value: { name: 'boolean', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'familietilknytningForklaring',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'mentorFornavn',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'mentorTlf',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'mentorEtternavn',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'mentorOppgaver',
                                                                            value: { name: 'string', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'mentorAntallTimer',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                        {
                                                                            key: 'mentorTimelonn',
                                                                            value: { name: 'number', required: !1 },
                                                                        },
                                                                    ],
                                                                },
                                                            },
                                                            { name: 'InkluderingsInnhold' },
                                                        ],
                                                        required: !0,
                                                    },
                                                },
                                            ],
                                        },
                                    },
                                ],
                            },
                            {
                                name: 'union',
                                raw: `'erUfordelt' | 'statusSomEnum' | 'annullertTidspunkt' | 'tiltakstype' | 'tilskuddPeriode'
| 'godkjentAvDeltaker' | 'godkjentAvArbeidsgiver' | 'godkjentAvVeileder' | 'gjeldendeTilskuddsperiode'
| 'avtaleInngått' | 'erAnnullertEllerAvbrutt' | 'annullertGrunn' | 'avbruttGrunn'`,
                                elements: [
                                    { name: 'literal', value: "'erUfordelt'" },
                                    { name: 'literal', value: "'statusSomEnum'" },
                                    { name: 'literal', value: "'annullertTidspunkt'" },
                                    { name: 'literal', value: "'tiltakstype'" },
                                    { name: 'literal', value: "'tilskuddPeriode'" },
                                    { name: 'literal', value: "'godkjentAvDeltaker'" },
                                    { name: 'literal', value: "'godkjentAvArbeidsgiver'" },
                                    { name: 'literal', value: "'godkjentAvVeileder'" },
                                    { name: 'literal', value: "'gjeldendeTilskuddsperiode'" },
                                    { name: 'literal', value: "'avtaleInngått'" },
                                    { name: 'literal', value: "'erAnnullertEllerAvbrutt'" },
                                    { name: 'literal', value: "'annullertGrunn'" },
                                    { name: 'literal', value: "'avbruttGrunn'" },
                                ],
                            },
                        ],
                        raw: `Pick<Avtale, 'erUfordelt' | 'statusSomEnum' | 'annullertTidspunkt' | 'tiltakstype' | 'tilskuddPeriode'
| 'godkjentAvDeltaker' | 'godkjentAvArbeidsgiver' | 'godkjentAvVeileder' | 'gjeldendeTilskuddsperiode'
| 'avtaleInngått' | 'erAnnullertEllerAvbrutt' | 'annullertGrunn' | 'avbruttGrunn'>`,
                    },
                    {
                        name: 'signature',
                        type: 'object',
                        raw: "{ gjeldendeInnhold: Pick<Avtaleinnhold , 'startDato' | 'sluttDato'>}",
                        signature: {
                            properties: [
                                {
                                    key: 'gjeldendeInnhold',
                                    value: {
                                        name: 'Pick',
                                        elements: [
                                            {
                                                name: 'intersection',
                                                raw: `{
    arbeidsgiverFornavn?: string;
    arbeidsgiverEtternavn?: string;
    arbeidsgiverTlf?: string;
    bedriftNavn: string;
    deltakerFornavn?: string;
    deltakerEtternavn?: string;
    deltakerTlf?: string;
    oppfolging?: string;
    stillingstittel?: string;
    arbeidsoppgaver?: string;
    stillingstype?: Stillingstype;
    stillingKonseptId?: number;
    stillingStyrk08?: number;
    tilrettelegging?: string;
    startDato?: string;
    sluttDato?: string;
    antallDagerPerUke?: number;
    veilederFornavn?: string;
    veilederEtternavn?: string;
    veilederTlf?: string;
    maal: Maal[];

    manedslonn?: number;
    feriepengesats?: number;
    arbeidsgiveravgift?: number;
    lonnstilskuddProsent?: number;
    stillingprosent?: number;
    feriepengerBelop?: number;
    otpSats?: number;
    otpBelop?: number;
    arbeidsgiveravgiftBelop?: number;
    sumLonnsutgifter?: number;
    sumLonnstilskudd?: number;
    manedslonn100pst?: number;
    datoForRedusertProsent?: string;
    sumLønnstilskuddRedusert?: number;
    refusjonKontaktperson?: RefusjonKontaktperson;

    enhetKostnadssted?: string;
    enhetsnavnKostnadssted?: string;

    arbeidsgiverKontonummer?: string;
    harFamilietilknytning?: boolean;
    familietilknytningForklaring?: string;

    mentorFornavn?: string;
    mentorTlf?: string;
    mentorEtternavn?: string;
    mentorOppgaver?: string;
    mentorAntallTimer?: number;
    mentorTimelonn?: number;
} & InkluderingsInnhold`,
                                                elements: [
                                                    {
                                                        name: 'signature',
                                                        type: 'object',
                                                        raw: `{
    arbeidsgiverFornavn?: string;
    arbeidsgiverEtternavn?: string;
    arbeidsgiverTlf?: string;
    bedriftNavn: string;
    deltakerFornavn?: string;
    deltakerEtternavn?: string;
    deltakerTlf?: string;
    oppfolging?: string;
    stillingstittel?: string;
    arbeidsoppgaver?: string;
    stillingstype?: Stillingstype;
    stillingKonseptId?: number;
    stillingStyrk08?: number;
    tilrettelegging?: string;
    startDato?: string;
    sluttDato?: string;
    antallDagerPerUke?: number;
    veilederFornavn?: string;
    veilederEtternavn?: string;
    veilederTlf?: string;
    maal: Maal[];

    manedslonn?: number;
    feriepengesats?: number;
    arbeidsgiveravgift?: number;
    lonnstilskuddProsent?: number;
    stillingprosent?: number;
    feriepengerBelop?: number;
    otpSats?: number;
    otpBelop?: number;
    arbeidsgiveravgiftBelop?: number;
    sumLonnsutgifter?: number;
    sumLonnstilskudd?: number;
    manedslonn100pst?: number;
    datoForRedusertProsent?: string;
    sumLønnstilskuddRedusert?: number;
    refusjonKontaktperson?: RefusjonKontaktperson;

    enhetKostnadssted?: string;
    enhetsnavnKostnadssted?: string;

    arbeidsgiverKontonummer?: string;
    harFamilietilknytning?: boolean;
    familietilknytningForklaring?: string;

    mentorFornavn?: string;
    mentorTlf?: string;
    mentorEtternavn?: string;
    mentorOppgaver?: string;
    mentorAntallTimer?: number;
    mentorTimelonn?: number;
}`,
                                                        signature: {
                                                            properties: [
                                                                {
                                                                    key: 'arbeidsgiverFornavn',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'arbeidsgiverEtternavn',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'arbeidsgiverTlf',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'bedriftNavn',
                                                                    value: { name: 'string', required: !0 },
                                                                },
                                                                {
                                                                    key: 'deltakerFornavn',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'deltakerEtternavn',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'deltakerTlf',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'oppfolging',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'stillingstittel',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'arbeidsoppgaver',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'stillingstype',
                                                                    value: {
                                                                        name: 'union',
                                                                        raw: "'FAST' | 'MIDLERTIDIG'",
                                                                        elements: [
                                                                            { name: 'literal', value: "'FAST'" },
                                                                            { name: 'literal', value: "'MIDLERTIDIG'" },
                                                                        ],
                                                                        required: !1,
                                                                    },
                                                                },
                                                                {
                                                                    key: 'stillingKonseptId',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                                {
                                                                    key: 'stillingStyrk08',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                                {
                                                                    key: 'tilrettelegging',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'startDato',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'sluttDato',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'antallDagerPerUke',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                                {
                                                                    key: 'veilederFornavn',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'veilederEtternavn',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'veilederTlf',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'maal',
                                                                    value: {
                                                                        name: 'Array',
                                                                        elements: [{ name: 'Maal' }],
                                                                        raw: 'Maal[]',
                                                                        required: !0,
                                                                    },
                                                                },
                                                                {
                                                                    key: 'manedslonn',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                                {
                                                                    key: 'feriepengesats',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                                {
                                                                    key: 'arbeidsgiveravgift',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                                {
                                                                    key: 'lonnstilskuddProsent',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                                {
                                                                    key: 'stillingprosent',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                                {
                                                                    key: 'feriepengerBelop',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                                {
                                                                    key: 'otpSats',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                                {
                                                                    key: 'otpBelop',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                                {
                                                                    key: 'arbeidsgiveravgiftBelop',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                                {
                                                                    key: 'sumLonnsutgifter',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                                {
                                                                    key: 'sumLonnstilskudd',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                                {
                                                                    key: 'manedslonn100pst',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                                {
                                                                    key: 'datoForRedusertProsent',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'sumLønnstilskuddRedusert',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                                {
                                                                    key: 'refusjonKontaktperson',
                                                                    value: {
                                                                        name: 'RefusjonKontaktperson',
                                                                        required: !1,
                                                                    },
                                                                },
                                                                {
                                                                    key: 'enhetKostnadssted',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'enhetsnavnKostnadssted',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'arbeidsgiverKontonummer',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'harFamilietilknytning',
                                                                    value: { name: 'boolean', required: !1 },
                                                                },
                                                                {
                                                                    key: 'familietilknytningForklaring',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'mentorFornavn',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'mentorTlf',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'mentorEtternavn',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'mentorOppgaver',
                                                                    value: { name: 'string', required: !1 },
                                                                },
                                                                {
                                                                    key: 'mentorAntallTimer',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                                {
                                                                    key: 'mentorTimelonn',
                                                                    value: { name: 'number', required: !1 },
                                                                },
                                                            ],
                                                        },
                                                    },
                                                    { name: 'InkluderingsInnhold' },
                                                ],
                                                required: !0,
                                            },
                                            {
                                                name: 'union',
                                                raw: "'startDato' | 'sluttDato'",
                                                elements: [
                                                    { name: 'literal', value: "'startDato'" },
                                                    { name: 'literal', value: "'sluttDato'" },
                                                ],
                                            },
                                        ],
                                        raw: "Pick<Avtaleinnhold , 'startDato' | 'sluttDato'>",
                                        required: !0,
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
            description: '',
        },
    },
};
const bp = { title: 'Tiltaksgjennomforing/Statuser/Veileder', component: Na, parameters: { layout: 'fullscreen' } },
    dp = {
        erUfordelt: !0,
        statusSomEnum: 'ANNULLERT',
        annullertTidspunkt: '2021-08-01',
        tiltakstype: 'MIDLERTIDIG_LONNSTILSKUDD',
        tilskuddPeriode: [
            {
                beløp: 23324,
                startDato: '2023-05-03',
                sluttDato: '2023-05-31',
                lonnstilskuddProsent: 60,
                id: '370b1f98-9431-4286-98ce-1cc61c824cb2',
                godkjentAvNavIdent: void 0,
                godkjentTidspunkt: void 0,
                enhet: void 0,
                enhetsnavn: void 0,
                avslagsårsaker: new Set([]),
                avslagsforklaring: void 0,
                avslåttAvNavIdent: void 0,
                avslåttTidspunkt: void 0,
                løpenummer: 1,
                status: 'UBEHANDLET',
                refusjonStatus: void 0,
                aktiv: !0,
                kanBesluttesFom: '-999999999-01-01',
            },
        ],
        godkjentAvDeltaker: '2021-08-01',
        godkjentAvArbeidsgiver: '20-08-01',
        godkjentAvVeileder: '2021-08-01',
        gjeldendeTilskuddsperiode: {
            beløp: 23324,
            startDato: '2023-05-03',
            sluttDato: '2023-05-31',
            lonnstilskuddProsent: 60,
            id: '370b1f98-9431-4286-98ce-1cc61c824cb2',
            godkjentAvNavIdent: void 0,
            godkjentTidspunkt: void 0,
            enhet: void 0,
            enhetsnavn: void 0,
            avslagsårsaker: new Set([]),
            avslagsforklaring: void 0,
            avslåttAvNavIdent: void 0,
            avslåttTidspunkt: void 0,
            løpenummer: 1,
            status: 'UBEHANDLET',
            refusjonStatus: void 0,
            aktiv: !0,
            kanBesluttesFom: '-999999999-01-01',
        },
        avtaleInngått: '2021-08-01',
        erAnnullertEllerAvbrutt: !0,
        annullertGrunn: 'annulert grunn',
        avbruttGrunn: 'Begynt i arbeid',
        gjeldendeInnhold: { startDato: '2021-08-01', sluttDato: '2021-08-01' },
    },
    St = { name: 'Annullert', args: { avtale: dp } },
    cp = {
        erUfordelt: !1,
        statusSomEnum: 'ANNULLERT',
        annullertTidspunkt: '2021-08-01',
        tiltakstype: 'MIDLERTIDIG_LONNSTILSKUDD',
        tilskuddPeriode: [
            {
                beløp: 23324,
                startDato: '2023-05-03',
                sluttDato: '2023-05-31',
                lonnstilskuddProsent: 60,
                id: '370b1f98-9431-4286-98ce-1cc61c824cb2',
                godkjentAvNavIdent: void 0,
                godkjentTidspunkt: void 0,
                enhet: void 0,
                enhetsnavn: void 0,
                avslagsårsaker: new Set([]),
                avslagsforklaring: void 0,
                avslåttAvNavIdent: void 0,
                avslåttTidspunkt: void 0,
                løpenummer: 1,
                status: 'UBEHANDLET',
                refusjonStatus: void 0,
                aktiv: !0,
                kanBesluttesFom: '-999999999-01-01',
            },
        ],
        godkjentAvDeltaker: '2021-08-01',
        godkjentAvArbeidsgiver: '20-08-01',
        godkjentAvVeileder: '2021-08-01',
        gjeldendeTilskuddsperiode: {
            beløp: 23324,
            startDato: '2023-05-03',
            sluttDato: '2023-05-31',
            lonnstilskuddProsent: 60,
            id: '370b1f98-9431-4286-98ce-1cc61c824cb2',
            godkjentAvNavIdent: void 0,
            godkjentTidspunkt: void 0,
            enhet: void 0,
            enhetsnavn: void 0,
            avslagsårsaker: new Set([]),
            avslagsforklaring: void 0,
            avslåttAvNavIdent: void 0,
            avslåttTidspunkt: void 0,
            løpenummer: 1,
            status: 'UBEHANDLET',
            refusjonStatus: void 0,
            aktiv: !0,
            kanBesluttesFom: '-999999999-01-01',
        },
        avtaleInngått: '2021-08-01',
        erAnnullertEllerAvbrutt: !0,
        annullertGrunn: 'annulert grunn',
        avbruttGrunn: 'Begynt i arbeid',
        gjeldendeInnhold: { startDato: '2021-08-01', sluttDato: '2021-08-01' },
    },
    Tt = { name: 'Annullert', args: { avtale: cp } },
    fp = {
        erUfordelt: !1,
        statusSomEnum: 'AVBRUTT',
        annullertTidspunkt: '2021-08-01',
        tiltakstype: 'MIDLERTIDIG_LONNSTILSKUDD',
        tilskuddPeriode: [
            {
                beløp: 23324,
                startDato: '2023-05-03',
                sluttDato: '2023-05-31',
                lonnstilskuddProsent: 60,
                id: '370b1f98-9431-4286-98ce-1cc61c824cb2',
                godkjentAvNavIdent: void 0,
                godkjentTidspunkt: void 0,
                enhet: void 0,
                enhetsnavn: void 0,
                avslagsårsaker: new Set([]),
                avslagsforklaring: void 0,
                avslåttAvNavIdent: void 0,
                avslåttTidspunkt: void 0,
                løpenummer: 1,
                status: 'UBEHANDLET',
                refusjonStatus: void 0,
                aktiv: !0,
                kanBesluttesFom: '-999999999-01-01',
            },
        ],
        godkjentAvDeltaker: '2021-08-01',
        godkjentAvArbeidsgiver: '20-08-01',
        godkjentAvVeileder: '2021-08-01',
        gjeldendeTilskuddsperiode: {
            beløp: 23324,
            startDato: '2023-05-03',
            sluttDato: '2023-05-31',
            lonnstilskuddProsent: 60,
            id: '370b1f98-9431-4286-98ce-1cc61c824cb2',
            godkjentAvNavIdent: void 0,
            godkjentTidspunkt: void 0,
            enhet: void 0,
            enhetsnavn: void 0,
            avslagsårsaker: new Set([]),
            avslagsforklaring: void 0,
            avslåttAvNavIdent: void 0,
            avslåttTidspunkt: void 0,
            løpenummer: 1,
            status: 'UBEHANDLET',
            refusjonStatus: void 0,
            aktiv: !0,
            kanBesluttesFom: '-999999999-01-01',
        },
        avtaleInngått: '2021-08-01',
        erAnnullertEllerAvbrutt: !0,
        annullertGrunn: 'annulert grunn',
        avbruttGrunn: 'Begynt i arbeid',
        gjeldendeInnhold: { startDato: '2021-08-01', sluttDato: '2021-08-01' },
    },
    At = { name: 'Avbrutt', args: { avtale: fp } },
    pp = {
        erUfordelt: !1,
        statusSomEnum: 'PÅBEGYNT',
        annullertTidspunkt: '2021-08-01',
        tiltakstype: 'MIDLERTIDIG_LONNSTILSKUDD',
        tilskuddPeriode: [
            {
                beløp: 23324,
                startDato: '2023-05-03',
                sluttDato: '2023-05-31',
                lonnstilskuddProsent: 60,
                id: '370b1f98-9431-4286-98ce-1cc61c824cb2',
                godkjentAvNavIdent: void 0,
                godkjentTidspunkt: void 0,
                enhet: void 0,
                enhetsnavn: void 0,
                avslagsårsaker: new Set([]),
                avslagsforklaring: void 0,
                avslåttAvNavIdent: void 0,
                avslåttTidspunkt: void 0,
                løpenummer: 1,
                status: 'UBEHANDLET',
                refusjonStatus: void 0,
                aktiv: !0,
                kanBesluttesFom: '-999999999-01-01',
            },
        ],
        godkjentAvDeltaker: '2021-08-01',
        godkjentAvArbeidsgiver: '20-08-01',
        godkjentAvVeileder: '2021-08-01',
        gjeldendeTilskuddsperiode: {
            beløp: 23324,
            startDato: '2023-05-03',
            sluttDato: '2023-05-31',
            lonnstilskuddProsent: 60,
            id: '370b1f98-9431-4286-98ce-1cc61c824cb2',
            godkjentAvNavIdent: void 0,
            godkjentTidspunkt: void 0,
            enhet: void 0,
            enhetsnavn: void 0,
            avslagsårsaker: new Set([]),
            avslagsforklaring: void 0,
            avslåttAvNavIdent: void 0,
            avslåttTidspunkt: void 0,
            løpenummer: 1,
            status: 'UBEHANDLET',
            refusjonStatus: void 0,
            aktiv: !0,
            kanBesluttesFom: '-999999999-01-01',
        },
        avtaleInngått: '2021-08-01',
        erAnnullertEllerAvbrutt: !0,
        annullertGrunn: 'annulert grunn',
        avbruttGrunn: 'Begynt i arbeid',
        gjeldendeInnhold: { startDato: '2021-08-01', sluttDato: '2021-08-01' },
    },
    Nt = { name: 'Påbegynt', args: { avtale: pp } },
    gp = {
        erUfordelt: !1,
        statusSomEnum: 'MANGLER_GODKJENNING',
        annullertTidspunkt: '2021-08-01',
        tiltakstype: 'MIDLERTIDIG_LONNSTILSKUDD',
        tilskuddPeriode: [
            {
                beløp: 23324,
                startDato: '2023-05-03',
                sluttDato: '2023-05-31',
                lonnstilskuddProsent: 60,
                id: '370b1f98-9431-4286-98ce-1cc61c824cb2',
                godkjentAvNavIdent: void 0,
                godkjentTidspunkt: void 0,
                enhet: void 0,
                enhetsnavn: void 0,
                avslagsårsaker: new Set([]),
                avslagsforklaring: void 0,
                avslåttAvNavIdent: void 0,
                avslåttTidspunkt: void 0,
                løpenummer: 1,
                status: 'UBEHANDLET',
                refusjonStatus: void 0,
                aktiv: !0,
                kanBesluttesFom: '-999999999-01-01',
            },
        ],
        godkjentAvDeltaker: '2021-08-01',
        godkjentAvArbeidsgiver: '20-08-01',
        godkjentAvVeileder: '2021-08-01',
        gjeldendeTilskuddsperiode: {
            beløp: 23324,
            startDato: '2023-05-03',
            sluttDato: '2023-05-31',
            lonnstilskuddProsent: 60,
            id: '370b1f98-9431-4286-98ce-1cc61c824cb2',
            godkjentAvNavIdent: void 0,
            godkjentTidspunkt: void 0,
            enhet: void 0,
            enhetsnavn: void 0,
            avslagsårsaker: new Set([]),
            avslagsforklaring: void 0,
            avslåttAvNavIdent: void 0,
            avslåttTidspunkt: void 0,
            løpenummer: 1,
            status: 'UBEHANDLET',
            refusjonStatus: void 0,
            aktiv: !0,
            kanBesluttesFom: '-999999999-01-01',
        },
        avtaleInngått: '2021-08-01',
        erAnnullertEllerAvbrutt: !0,
        annullertGrunn: 'annulert grunn',
        avbruttGrunn: 'Begynt i arbeid',
        gjeldendeInnhold: { startDato: '2021-08-01', sluttDato: '2021-08-01' },
    },
    Rt = {
        name: 'Mangler Godkjenning Veileder har godkjent men manger godkjenning av Beslutter',
        args: { avtale: gp },
    },
    mp = {
        erUfordelt: !1,
        statusSomEnum: 'MANGLER_GODKJENNING',
        annullertTidspunkt: '2021-08-01',
        tiltakstype: 'MIDLERTIDIG_LONNSTILSKUDD',
        tilskuddPeriode: [
            {
                beløp: 23324,
                startDato: '2023-05-03',
                sluttDato: '2023-05-31',
                lonnstilskuddProsent: 60,
                id: '370b1f98-9431-4286-98ce-1cc61c824cb2',
                godkjentAvNavIdent: void 0,
                godkjentTidspunkt: void 0,
                enhet: void 0,
                enhetsnavn: void 0,
                avslagsårsaker: new Set([]),
                avslagsforklaring: void 0,
                avslåttAvNavIdent: void 0,
                avslåttTidspunkt: void 0,
                løpenummer: 1,
                status: 'UBEHANDLET',
                refusjonStatus: void 0,
                aktiv: !0,
                kanBesluttesFom: '-999999999-01-01',
            },
        ],
        godkjentAvDeltaker: '2021-08-01',
        godkjentAvArbeidsgiver: '20-08-01',
        godkjentAvVeileder: '',
        gjeldendeTilskuddsperiode: {
            beløp: 23324,
            startDato: '2023-05-03',
            sluttDato: '2023-05-31',
            lonnstilskuddProsent: 60,
            id: '370b1f98-9431-4286-98ce-1cc61c824cb2',
            godkjentAvNavIdent: void 0,
            godkjentTidspunkt: void 0,
            enhet: void 0,
            enhetsnavn: void 0,
            avslagsårsaker: new Set([]),
            avslagsforklaring: void 0,
            avslåttAvNavIdent: void 0,
            avslåttTidspunkt: void 0,
            løpenummer: 1,
            status: 'UBEHANDLET',
            refusjonStatus: void 0,
            aktiv: !0,
            kanBesluttesFom: '-999999999-01-01',
        },
        avtaleInngått: '2021-08-01',
        erAnnullertEllerAvbrutt: !0,
        annullertGrunn: 'annulert grunn',
        avbruttGrunn: 'Begynt i arbeid',
        gjeldendeInnhold: { startDato: '2021-08-01', sluttDato: '2021-08-01' },
    },
    Ot = { name: ' Mangler Godkjenning Arbeidsgiver har ikke godkjent avtalen enda', args: { avtale: mp } },
    hp = {
        erUfordelt: !1,
        statusSomEnum: 'MANGLER_GODKJENNING',
        annullertTidspunkt: '2021-08-01',
        tiltakstype: 'MIDLERTIDIG_LONNSTILSKUDD',
        tilskuddPeriode: [
            {
                beløp: 23324,
                startDato: '2023-05-03',
                sluttDato: '2023-05-31',
                lonnstilskuddProsent: 60,
                id: '370b1f98-9431-4286-98ce-1cc61c824cb2',
                godkjentAvNavIdent: void 0,
                godkjentTidspunkt: void 0,
                enhet: void 0,
                enhetsnavn: void 0,
                avslagsårsaker: new Set([]),
                avslagsforklaring: void 0,
                avslåttAvNavIdent: void 0,
                avslåttTidspunkt: void 0,
                løpenummer: 1,
                status: 'UBEHANDLET',
                refusjonStatus: void 0,
                aktiv: !0,
                kanBesluttesFom: '-999999999-01-01',
            },
        ],
        godkjentAvDeltaker: '',
        godkjentAvArbeidsgiver: '',
        godkjentAvVeileder: '',
        gjeldendeTilskuddsperiode: {
            beløp: 23324,
            startDato: '2023-05-03',
            sluttDato: '2023-05-31',
            lonnstilskuddProsent: 60,
            id: '370b1f98-9431-4286-98ce-1cc61c824cb2',
            godkjentAvNavIdent: void 0,
            godkjentTidspunkt: void 0,
            enhet: void 0,
            enhetsnavn: void 0,
            avslagsårsaker: new Set([]),
            avslagsforklaring: void 0,
            avslåttAvNavIdent: void 0,
            avslåttTidspunkt: void 0,
            løpenummer: 1,
            status: 'UBEHANDLET',
            refusjonStatus: void 0,
            aktiv: !0,
            kanBesluttesFom: '-999999999-01-01',
        },
        avtaleInngått: '2021-08-01',
        erAnnullertEllerAvbrutt: !0,
        annullertGrunn: 'annulert grunn',
        avbruttGrunn: 'Begynt i arbeid',
        gjeldendeInnhold: { startDato: '2021-08-01', sluttDato: '2021-08-01' },
    },
    kt = {
        name: 'Mangler Godkjenning Arbeidisgiver har godkjent men manger godkjenning av Deltakeren og Veileder',
        args: { avtale: hp },
    },
    vp = {
        erUfordelt: !1,
        statusSomEnum: 'ANNULLERT',
        annullertTidspunkt: '2021-08-01',
        tiltakstype: 'MIDLERTIDIG_LONNSTILSKUDD',
        tilskuddPeriode: [
            {
                beløp: 23324,
                startDato: '2023-05-03',
                sluttDato: '2023-05-31',
                lonnstilskuddProsent: 60,
                id: '370b1f98-9431-4286-98ce-1cc61c824cb2',
                godkjentAvNavIdent: void 0,
                godkjentTidspunkt: void 0,
                enhet: void 0,
                enhetsnavn: void 0,
                avslagsårsaker: new Set([]),
                avslagsforklaring: void 0,
                avslåttAvNavIdent: void 0,
                avslåttTidspunkt: void 0,
                løpenummer: 1,
                status: 'UBEHANDLET',
                refusjonStatus: void 0,
                aktiv: !0,
                kanBesluttesFom: '-999999999-01-01',
            },
        ],
        godkjentAvDeltaker: '2021-08-01',
        godkjentAvArbeidsgiver: '20-08-01',
        godkjentAvVeileder: '2021-08-01',
        gjeldendeTilskuddsperiode: {
            beløp: 23324,
            startDato: '2023-05-03',
            sluttDato: '2023-05-31',
            lonnstilskuddProsent: 60,
            id: '370b1f98-9431-4286-98ce-1cc61c824cb2',
            godkjentAvNavIdent: void 0,
            godkjentTidspunkt: void 0,
            enhet: void 0,
            enhetsnavn: void 0,
            avslagsårsaker: new Set([]),
            avslagsforklaring: void 0,
            avslåttAvNavIdent: void 0,
            avslåttTidspunkt: void 0,
            løpenummer: 1,
            status: 'UBEHANDLET',
            refusjonStatus: void 0,
            aktiv: !0,
            kanBesluttesFom: '-999999999-01-01',
        },
        avtaleInngått: '2021-08-01',
        erAnnullertEllerAvbrutt: !0,
        annullertGrunn: 'annulert grunn',
        avbruttGrunn: 'Begynt i arbeid',
        gjeldendeInnhold: { startDato: '2021-08-01', sluttDato: '2021-08-01' },
    },
    Dt = { name: 'Klar For Oppstart', args: { avtale: vp } },
    _p = {
        erUfordelt: !1,
        statusSomEnum: 'ANNULLERT',
        annullertTidspunkt: '2021-08-01',
        tiltakstype: 'MIDLERTIDIG_LONNSTILSKUDD',
        tilskuddPeriode: [
            {
                beløp: 23324,
                startDato: '2023-05-03',
                sluttDato: '2023-05-31',
                lonnstilskuddProsent: 60,
                id: '370b1f98-9431-4286-98ce-1cc61c824cb2',
                godkjentAvNavIdent: void 0,
                godkjentTidspunkt: void 0,
                enhet: void 0,
                enhetsnavn: void 0,
                avslagsårsaker: new Set([]),
                avslagsforklaring: void 0,
                avslåttAvNavIdent: void 0,
                avslåttTidspunkt: void 0,
                løpenummer: 1,
                status: 'UBEHANDLET',
                refusjonStatus: void 0,
                aktiv: !0,
                kanBesluttesFom: '-999999999-01-01',
            },
        ],
        godkjentAvDeltaker: '2021-08-01',
        godkjentAvArbeidsgiver: '20-08-01',
        godkjentAvVeileder: '2021-08-01',
        gjeldendeTilskuddsperiode: {
            beløp: 23324,
            startDato: '2023-05-03',
            sluttDato: '2023-05-31',
            lonnstilskuddProsent: 60,
            id: '370b1f98-9431-4286-98ce-1cc61c824cb2',
            godkjentAvNavIdent: void 0,
            godkjentTidspunkt: void 0,
            enhet: void 0,
            enhetsnavn: void 0,
            avslagsårsaker: new Set([]),
            avslagsforklaring: void 0,
            avslåttAvNavIdent: void 0,
            avslåttTidspunkt: void 0,
            løpenummer: 1,
            status: 'UBEHANDLET',
            refusjonStatus: void 0,
            aktiv: !0,
            kanBesluttesFom: '-999999999-01-01',
        },
        avtaleInngått: '2021-08-01',
        erAnnullertEllerAvbrutt: !0,
        annullertGrunn: 'annulert grunn',
        avbruttGrunn: 'Begynt i arbeid',
        gjeldendeInnhold: { startDato: '2021-08-01', sluttDato: '2021-08-01' },
    },
    wt = { name: 'Gjennomføres', args: { avtale: _p } },
    Ep = {
        erUfordelt: !1,
        statusSomEnum: 'ANNULLERT',
        annullertTidspunkt: '2021-08-01',
        tiltakstype: 'MIDLERTIDIG_LONNSTILSKUDD',
        tilskuddPeriode: [
            {
                beløp: 23324,
                startDato: '2023-05-03',
                sluttDato: '2023-05-31',
                lonnstilskuddProsent: 60,
                id: '370b1f98-9431-4286-98ce-1cc61c824cb2',
                godkjentAvNavIdent: void 0,
                godkjentTidspunkt: void 0,
                enhet: void 0,
                enhetsnavn: void 0,
                avslagsårsaker: new Set([]),
                avslagsforklaring: void 0,
                avslåttAvNavIdent: void 0,
                avslåttTidspunkt: void 0,
                løpenummer: 1,
                status: 'UBEHANDLET',
                refusjonStatus: void 0,
                aktiv: !0,
                kanBesluttesFom: '-999999999-01-01',
            },
        ],
        godkjentAvDeltaker: '2021-08-01',
        godkjentAvArbeidsgiver: '20-08-01',
        godkjentAvVeileder: '2021-08-01',
        gjeldendeTilskuddsperiode: {
            beløp: 23324,
            startDato: '2023-05-03',
            sluttDato: '2023-05-31',
            lonnstilskuddProsent: 60,
            id: '370b1f98-9431-4286-98ce-1cc61c824cb2',
            godkjentAvNavIdent: void 0,
            godkjentTidspunkt: void 0,
            enhet: void 0,
            enhetsnavn: void 0,
            avslagsårsaker: new Set([]),
            avslagsforklaring: void 0,
            avslåttAvNavIdent: void 0,
            avslåttTidspunkt: void 0,
            løpenummer: 1,
            status: 'UBEHANDLET',
            refusjonStatus: void 0,
            aktiv: !0,
            kanBesluttesFom: '-999999999-01-01',
        },
        avtaleInngått: '2021-08-01',
        erAnnullertEllerAvbrutt: !0,
        annullertGrunn: 'annulert grunn',
        avbruttGrunn: 'Begynt i arbeid',
        gjeldendeInnhold: { startDato: '2021-08-01', sluttDato: '2021-08-01' },
    },
    Lt = { name: 'Avsluttet', args: { avtale: Ep } };
var yi, Ii, bi;
St.parameters = {
    ...St.parameters,
    docs: {
        ...((yi = St.parameters) == null ? void 0 : yi.docs),
        source: {
            originalSource: `{
  name: 'Annullert',
  args: {
    avtale: erUfordelt
  }
}`,
            ...((bi = (Ii = St.parameters) == null ? void 0 : Ii.docs) == null ? void 0 : bi.source),
        },
    },
};
var Si, Ti, Ai;
Tt.parameters = {
    ...Tt.parameters,
    docs: {
        ...((Si = Tt.parameters) == null ? void 0 : Si.docs),
        source: {
            originalSource: `{
  name: 'Annullert',
  args: {
    avtale: annullert
  }
}`,
            ...((Ai = (Ti = Tt.parameters) == null ? void 0 : Ti.docs) == null ? void 0 : Ai.source),
        },
    },
};
var Ni, Ri, Oi;
At.parameters = {
    ...At.parameters,
    docs: {
        ...((Ni = At.parameters) == null ? void 0 : Ni.docs),
        source: {
            originalSource: `{
  name: 'Avbrutt',
  args: {
    avtale: avbrutt
  }
}`,
            ...((Oi = (Ri = At.parameters) == null ? void 0 : Ri.docs) == null ? void 0 : Oi.source),
        },
    },
};
var ki, Di, wi;
Nt.parameters = {
    ...Nt.parameters,
    docs: {
        ...((ki = Nt.parameters) == null ? void 0 : ki.docs),
        source: {
            originalSource: `{
  name: 'Påbegynt',
  args: {
    avtale: påbegynt
  }
}`,
            ...((wi = (Di = Nt.parameters) == null ? void 0 : Di.docs) == null ? void 0 : wi.source),
        },
    },
};
var Li, Pi, Ui;
Rt.parameters = {
    ...Rt.parameters,
    docs: {
        ...((Li = Rt.parameters) == null ? void 0 : Li.docs),
        source: {
            originalSource: `{
  name: 'Mangler Godkjenning Veileder har godkjent men manger godkjenning av Beslutter',
  args: {
    avtale: manglerGodkjenningVeilederHarGodkjent
  }
}`,
            ...((Ui = (Pi = Rt.parameters) == null ? void 0 : Pi.docs) == null ? void 0 : Ui.source),
        },
    },
};
var Ki, Gi, ji;
Ot.parameters = {
    ...Ot.parameters,
    docs: {
        ...((Ki = Ot.parameters) == null ? void 0 : Ki.docs),
        source: {
            originalSource: `{
  name: ' Mangler Godkjenning Arbeidsgiver har ikke godkjent avtalen enda',
  args: {
    avtale: manglerGodkjenningDeltakerOgArbeidsgiverharGodkjent
  }
}`,
            ...((ji = (Gi = Ot.parameters) == null ? void 0 : Gi.docs) == null ? void 0 : ji.source),
        },
    },
};
var Ci, Fi, Mi;
kt.parameters = {
    ...kt.parameters,
    docs: {
        ...((Ci = kt.parameters) == null ? void 0 : Ci.docs),
        source: {
            originalSource: `{
  name: 'Mangler Godkjenning Arbeidisgiver har godkjent men manger godkjenning av Deltakeren og Veileder',
  args: {
    avtale: manglerGodkjenningArbeidsgiverOgDeltakerHarIkkeGodkjent
  }
}`,
            ...((Mi = (Fi = kt.parameters) == null ? void 0 : Fi.docs) == null ? void 0 : Mi.source),
        },
    },
};
var xi, Bi, Vi;
Dt.parameters = {
    ...Dt.parameters,
    docs: {
        ...((xi = Dt.parameters) == null ? void 0 : xi.docs),
        source: {
            originalSource: `{
  name: 'Klar For Oppstart',
  args: {
    avtale: klarForOppstart
  }
}`,
            ...((Vi = (Bi = Dt.parameters) == null ? void 0 : Bi.docs) == null ? void 0 : Vi.source),
        },
    },
};
var qi, Hi, Ji;
wt.parameters = {
    ...wt.parameters,
    docs: {
        ...((qi = wt.parameters) == null ? void 0 : qi.docs),
        source: {
            originalSource: `{
  name: 'Gjennomføres',
  args: {
    avtale: gjennomføres
  }
}`,
            ...((Ji = (Hi = wt.parameters) == null ? void 0 : Hi.docs) == null ? void 0 : Ji.source),
        },
    },
};
var $i, zi, Yi;
Lt.parameters = {
    ...Lt.parameters,
    docs: {
        ...(($i = Lt.parameters) == null ? void 0 : $i.docs),
        source: {
            originalSource: `{
  name: 'Avsluttet',
  args: {
    avtale: avsluttet
  }
}`,
            ...((Yi = (zi = Lt.parameters) == null ? void 0 : zi.docs) == null ? void 0 : Yi.source),
        },
    },
};
const Sp = [
    'ErUfordelt',
    'Annullert',
    'Avbrutt',
    'Påbegynt',
    'ManglerGodkjenningVeilederHarGodkjent',
    'ManglerGodkjenningDeltakerOgArbeidsgiverharGodkjent',
    'ManglerGodkjenningArbeidsgiverOgDeltakerHarIkkeGodkjent',
    'KlarForOppstart',
    'Gjennomføres',
    'Avsluttet',
];
export {
    Tt as Annullert,
    At as Avbrutt,
    Lt as Avsluttet,
    St as ErUfordelt,
    wt as Gjennomføres,
    Dt as KlarForOppstart,
    kt as ManglerGodkjenningArbeidsgiverOgDeltakerHarIkkeGodkjent,
    Ot as ManglerGodkjenningDeltakerOgArbeidsgiverharGodkjent,
    Rt as ManglerGodkjenningVeilederHarGodkjent,
    Nt as Påbegynt,
    Sp as __namedExportsOrder,
    bp as default,
};
