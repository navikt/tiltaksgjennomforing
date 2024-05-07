import { r as T, g as Ur, R as ie } from './index-CsdIBAqE.js';
var Vt = { exports: {} },
    Ae = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ar = T,
    Vr = Symbol.for('react.element'),
    Gr = Symbol.for('react.fragment'),
    zr = Object.prototype.hasOwnProperty,
    $r = Ar.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    Zr = { key: !0, ref: !0, __self: !0, __source: !0 };
function Gt(e, t, r) {
    var s,
        a = {},
        n = null,
        i = null;
    r !== void 0 && (n = '' + r), t.key !== void 0 && (n = '' + t.key), t.ref !== void 0 && (i = t.ref);
    for (s in t) zr.call(t, s) && !Zr.hasOwnProperty(s) && (a[s] = t[s]);
    if (e && e.defaultProps) for (s in ((t = e.defaultProps), t)) a[s] === void 0 && (a[s] = t[s]);
    return { $$typeof: Vr, type: e, key: n, ref: i, props: a, _owner: $r.current };
}
Ae.Fragment = Gr;
Ae.jsx = Gt;
Ae.jsxs = Gt;
Vt.exports = Ae;
var Y = Vt.exports,
    zt = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/ (function (e) {
    (function () {
        var t = {}.hasOwnProperty;
        function r() {
            for (var n = '', i = 0; i < arguments.length; i++) {
                var o = arguments[i];
                o && (n = a(n, s(o)));
            }
            return n;
        }
        function s(n) {
            if (typeof n == 'string' || typeof n == 'number') return n;
            if (typeof n != 'object') return '';
            if (Array.isArray(n)) return r.apply(null, n);
            if (n.toString !== Object.prototype.toString && !n.toString.toString().includes('[native code]'))
                return n.toString();
            var i = '';
            for (var o in n) t.call(n, o) && n[o] && (i = a(i, o));
            return i;
        }
        function a(n, i) {
            return i ? (n ? n + ' ' + i : n + i) : n;
        }
        e.exports ? ((r.default = r), (e.exports = r)) : (window.classNames = r);
    })();
})(zt);
var qr = zt.exports;
const $t = Ur(qr),
    Br = (e) => ({
        className: e,
        element: (t, r) => `${e}__${t}${r ? ` ${e}__${t}--${r}` : ''}`,
        modifier: (t) => `${e}--${t}`,
    });
function Zt(e) {
    var t,
        r,
        s = '';
    if (typeof e == 'string' || typeof e == 'number') s += e;
    else if (typeof e == 'object')
        if (Array.isArray(e)) {
            var a = e.length;
            for (t = 0; t < a; t++) e[t] && (r = Zt(e[t])) && (s && (s += ' '), (s += r));
        } else for (r in e) e[r] && (s && (s += ' '), (s += r));
    return s;
}
function re() {
    for (var e, t, r = 0, s = '', a = arguments.length; r < a; r++)
        (e = arguments[r]) && (t = Zt(e)) && (s && (s += ' '), (s += t));
    return s;
}
const me = (e) =>
    re({
        'navds-typo--spacing': e.spacing,
        'navds-typo--truncate': e.truncate,
        'navds-typo--semibold': e.weight === 'semibold',
        [`navds-typo--align-${e.align}`]: e.align,
        [`navds-typo--color-${e.textColor}`]: e.textColor,
        'navds-typo--visually-hidden': e.visuallyHidden,
        'navds-typo--uppercase': e.uppercase,
    });
var Jr = function (e, t) {
    var r = {};
    for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && t.indexOf(s) < 0 && (r[s] = e[s]);
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
        for (var a = 0, s = Object.getOwnPropertySymbols(e); a < s.length; a++)
            t.indexOf(s[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, s[a]) && (r[s[a]] = e[s[a]]);
    return r;
};
const dl = T.forwardRef((e, t) => {
    var {
            className: r,
            size: s = 'medium',
            as: a = 'p',
            spacing: n,
            truncate: i,
            weight: o = 'regular',
            align: f,
            visuallyHidden: c,
            textColor: M,
        } = e,
        b = Jr(e, ['className', 'size', 'as', 'spacing', 'truncate', 'weight', 'align', 'visuallyHidden', 'textColor']);
    return ie.createElement(
        a,
        Object.assign({}, b, {
            ref: t,
            className: re(
                r,
                'navds-body-long',
                `navds-body-long--${s}`,
                me({ spacing: n, truncate: i, weight: o, align: f, visuallyHidden: c, textColor: M }),
            ),
        }),
    );
});
var Qr = function (e, t) {
    var r = {};
    for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && t.indexOf(s) < 0 && (r[s] = e[s]);
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
        for (var a = 0, s = Object.getOwnPropertySymbols(e); a < s.length; a++)
            t.indexOf(s[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, s[a]) && (r[s[a]] = e[s[a]]);
    return r;
};
const Kr = T.forwardRef((e, t) => {
        var {
                className: r,
                size: s = 'medium',
                as: a = 'p',
                spacing: n,
                truncate: i,
                weight: o = 'regular',
                align: f,
                visuallyHidden: c,
                textColor: M,
            } = e,
            b = Qr(e, [
                'className',
                'size',
                'as',
                'spacing',
                'truncate',
                'weight',
                'align',
                'visuallyHidden',
                'textColor',
            ]);
        return ie.createElement(
            a,
            Object.assign({}, b, {
                ref: t,
                className: re(
                    r,
                    'navds-body-short',
                    `navds-body-short--${s}`,
                    me({ spacing: n, truncate: i, weight: o, align: f, visuallyHidden: c, textColor: M }),
                ),
            }),
        );
    }),
    ht = Kr;
var Xr = function (e, t) {
    var r = {};
    for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && t.indexOf(s) < 0 && (r[s] = e[s]);
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
        for (var a = 0, s = Object.getOwnPropertySymbols(e); a < s.length; a++)
            t.indexOf(s[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, s[a]) && (r[s[a]] = e[s[a]]);
    return r;
};
T.forwardRef((e, t) => {
    var {
            className: r,
            size: s = 'medium',
            spacing: a,
            uppercase: n,
            as: i = 'p',
            truncate: o,
            weight: f = 'regular',
            align: c,
            visuallyHidden: M,
            textColor: b,
        } = e,
        j = Xr(e, [
            'className',
            'size',
            'spacing',
            'uppercase',
            'as',
            'truncate',
            'weight',
            'align',
            'visuallyHidden',
            'textColor',
        ]);
    return ie.createElement(
        i,
        Object.assign({}, j, {
            ref: t,
            className: re(
                r,
                'navds-detail',
                me({ spacing: a, truncate: o, weight: f, align: c, visuallyHidden: M, textColor: b, uppercase: n }),
                { 'navds-detail--small': s === 'small' },
            ),
        }),
    );
});
var es = function (e, t) {
    var r = {};
    for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && t.indexOf(s) < 0 && (r[s] = e[s]);
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
        for (var a = 0, s = Object.getOwnPropertySymbols(e); a < s.length; a++)
            t.indexOf(s[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, s[a]) && (r[s[a]] = e[s[a]]);
    return r;
};
T.forwardRef((e, t) => {
    var { className: r, size: s, spacing: a, as: n = 'p' } = e,
        i = es(e, ['className', 'size', 'spacing', 'as']);
    return ie.createElement(
        n,
        Object.assign({}, i, {
            ref: t,
            className: re('navds-error-message', 'navds-label', r, me({ spacing: a }), {
                'navds-label--small': s === 'small',
            }),
        }),
    );
});
var ts = function (e, t) {
    var r = {};
    for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && t.indexOf(s) < 0 && (r[s] = e[s]);
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
        for (var a = 0, s = Object.getOwnPropertySymbols(e); a < s.length; a++)
            t.indexOf(s[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, s[a]) && (r[s[a]] = e[s[a]]);
    return r;
};
const Ct = T.forwardRef((e, t) => {
    var { level: r = '1', size: s, className: a, as: n, spacing: i, align: o, visuallyHidden: f, textColor: c } = e,
        M = ts(e, ['level', 'size', 'className', 'as', 'spacing', 'align', 'visuallyHidden', 'textColor']);
    const b = n ?? `h${r}`;
    return ie.createElement(
        b,
        Object.assign({}, M, {
            ref: t,
            className: re(
                a,
                'navds-heading',
                `navds-heading--${s}`,
                me({ spacing: i, align: o, visuallyHidden: f, textColor: c }),
            ),
        }),
    );
});
var rs = function (e, t) {
    var r = {};
    for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && t.indexOf(s) < 0 && (r[s] = e[s]);
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
        for (var a = 0, s = Object.getOwnPropertySymbols(e); a < s.length; a++)
            t.indexOf(s[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, s[a]) && (r[s[a]] = e[s[a]]);
    return r;
};
T.forwardRef((e, t) => {
    var { className: r, spacing: s, as: a = 'p' } = e,
        n = rs(e, ['className', 'spacing', 'as']);
    return ie.createElement(
        a,
        Object.assign({}, n, { ref: t, className: re(r, 'navds-ingress', { 'navds-typo--spacing': !!s }) }),
    );
});
var ss = function (e, t) {
    var r = {};
    for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && t.indexOf(s) < 0 && (r[s] = e[s]);
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
        for (var a = 0, s = Object.getOwnPropertySymbols(e); a < s.length; a++)
            t.indexOf(s[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, s[a]) && (r[s[a]] = e[s[a]]);
    return r;
};
const fl = T.forwardRef((e, t) => {
        var { className: r, size: s = 'medium', as: a = 'label', spacing: n, visuallyHidden: i, textColor: o } = e,
            f = ss(e, ['className', 'size', 'as', 'spacing', 'visuallyHidden', 'textColor']);
        return ie.createElement(
            a,
            Object.assign({}, f, {
                ref: t,
                className: re(r, 'navds-label', me({ spacing: n, visuallyHidden: i, textColor: o }), {
                    'navds-label--small': s === 'small',
                }),
            }),
        );
    }),
    as = (e) =>
        T.createElement(
            'svg',
            {
                role: 'presentation',
                focusable: 'false',
                width: 24,
                height: 24,
                xmlns: 'http://www.w3.org/2000/svg',
                ...e,
            },
            T.createElement(
                'g',
                { fill: 'none', fillRule: 'evenodd' },
                T.createElement('path', {
                    d: 'M.9 13H23c.5 0 .9.4.9 1v9c0 .6-.4 1-.9 1H1c-.5 0-.9-.4-.9-1v-9c0-.6.4-1 .9-1z',
                    fill: '#FFF',
                }),
                T.createElement('path', { fill: '#C86151', d: 'M8 12L20 0l4 4-12 12z' }),
                T.createElement('path', { fill: '#FFD7A3', d: 'M6 18l2-6 4 4z' }),
                T.createElement('path', { fill: '#59514B', d: 'M6 18l.7-2L8 17.3z' }),
                T.createElement('path', { fill: '#D6897D', d: 'M20 0l4 4-2 2-4-4z' }),
            ),
        ),
    Te = Br('utfyllerBanner'),
    qt = (e) => {
        let t, r;
        if (e.utfyller === 'veileder') (t = Te.element('veileder')), (r = 'Fylles ut av NAV');
        else if (e.utfyller === 'arbeidsgiver') (t = Te.element('arbeidsgiver')), (r = 'Fylles ut av arbeidsgiveren');
        else if (e.utfyller === 'veileder_og_arbeidsgiver')
            (t = Te.element('begge')), (r = 'Fylles ut av NAV og arbeidsgiveren');
        else return null;
        return Y.jsx('div', {
            className: $t(Te.className, t),
            children: Y.jsxs('div', {
                className: 'utfyllerBanner',
                children: [
                    Y.jsx(as, { className: 'utfyllerBanner__utfyllingsIkon' }),
                    Y.jsx(ht, { size: 'small', className: 'utfyllerBanner__fyllesUtAvTekst', children: r }),
                ],
            }),
        });
    };
qt.__docgenInfo = {
    description: '',
    methods: [],
    displayName: 'UfyllerBanner',
    props: {
        utfyller: {
            required: !0,
            tsType: {
                name: 'union',
                raw: "'arbeidsgiver' | 'veileder' | 'veileder_og_arbeidsgiver' | undefined",
                elements: [
                    { name: 'literal', value: "'arbeidsgiver'" },
                    { name: 'literal', value: "'veileder'" },
                    { name: 'literal', value: "'veileder_og_arbeidsgiver'" },
                    { name: 'undefined' },
                ],
            },
            description: '',
        },
    },
};
const Bt = (e) =>
    Y.jsxs('div', {
        className: $t('innholdsboks', e.className),
        children: [
            e.utfyller && Y.jsx(qt, { utfyller: e.utfyller }),
            Y.jsx('div', { className: 'innholdsboks__innhold', children: e.children }),
        ],
    });
Bt.__docgenInfo = {
    description: '',
    methods: [],
    displayName: 'Innholdsboks',
    props: {
        className: { required: !1, tsType: { name: 'string' }, description: '' },
        utfyller: {
            required: !1,
            tsType: {
                name: 'union',
                raw: "'arbeidsgiver' | 'veileder' | 'veileder_og_arbeidsgiver' | undefined",
                elements: [
                    { name: 'literal', value: "'arbeidsgiver'" },
                    { name: 'literal', value: "'veileder'" },
                    { name: 'literal', value: "'veileder_og_arbeidsgiver'" },
                    { name: 'undefined' },
                ],
            },
            description: '',
        },
        ariaLabel: { required: !1, tsType: { name: 'string' }, description: '' },
    },
};
const at = (e) => Y.jsx('div', { style: { marginTop: `${e.rem}rem` } });
at.__docgenInfo = {
    description: '',
    methods: [],
    displayName: 'VerticalSpacer',
    props: { rem: { required: !0, tsType: { name: 'number' }, description: '' } },
};
const ct = ({ header: e, body: t }) =>
    Y.jsxs(Bt, {
        ariaLabel: e,
        children: [
            Y.jsxs('div', {
                style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
                children: [
                    Y.jsx(at, { rem: 1 }),
                    e.length > 36
                        ? Y.jsx(Ct, { level: '2', size: 'medium', children: e })
                        : Y.jsx(Ct, { level: '2', size: 'large', children: e }),
                ],
            }),
            Y.jsx(at, { rem: 1 }),
            t,
        ],
    });
ct.__docgenInfo = {
    description: '',
    methods: [],
    displayName: 'StatusPanel',
    props: {
        header: { required: !0, tsType: { name: 'string' }, description: '' },
        body: { required: !1, tsType: { name: 'JSX.Element' }, description: '' },
    },
}; //! moment.js
//! version : 2.30.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var Jt;
function u() {
    return Jt.apply(null, arguments);
}
function ns(e) {
    Jt = e;
}
function C(e) {
    return e instanceof Array || Object.prototype.toString.call(e) === '[object Array]';
}
function ne(e) {
    return e != null && Object.prototype.toString.call(e) === '[object Object]';
}
function g(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
}
function mt(e) {
    if (Object.getOwnPropertyNames) return Object.getOwnPropertyNames(e).length === 0;
    var t;
    for (t in e) if (g(e, t)) return !1;
    return !0;
}
function N(e) {
    return e === void 0;
}
function J(e) {
    return typeof e == 'number' || Object.prototype.toString.call(e) === '[object Number]';
}
function De(e) {
    return e instanceof Date || Object.prototype.toString.call(e) === '[object Date]';
}
function Qt(e, t) {
    var r = [],
        s,
        a = e.length;
    for (s = 0; s < a; ++s) r.push(t(e[s], s));
    return r;
}
function X(e, t) {
    for (var r in t) g(t, r) && (e[r] = t[r]);
    return g(t, 'toString') && (e.toString = t.toString), g(t, 'valueOf') && (e.valueOf = t.valueOf), e;
}
function A(e, t, r, s) {
    return wr(e, t, r, s, !0).utc();
}
function is() {
    return {
        empty: !1,
        unusedTokens: [],
        unusedInput: [],
        overflow: -2,
        charsLeftOver: 0,
        nullInput: !1,
        invalidEra: null,
        invalidMonth: null,
        invalidFormat: !1,
        userInvalidated: !1,
        iso: !1,
        parsedDateParts: [],
        era: null,
        meridiem: null,
        rfc2822: !1,
        weekdayMismatch: !1,
    };
}
function m(e) {
    return e._pf == null && (e._pf = is()), e._pf;
}
var nt;
Array.prototype.some
    ? (nt = Array.prototype.some)
    : (nt = function (e) {
          var t = Object(this),
              r = t.length >>> 0,
              s;
          for (s = 0; s < r; s++) if (s in t && e.call(this, t[s], s, t)) return !0;
          return !1;
      });
function _t(e) {
    var t = null,
        r = !1,
        s = e._d && !isNaN(e._d.getTime());
    if (
        (s &&
            ((t = m(e)),
            (r = nt.call(t.parsedDateParts, function (a) {
                return a != null;
            })),
            (s =
                t.overflow < 0 &&
                !t.empty &&
                !t.invalidEra &&
                !t.invalidMonth &&
                !t.invalidWeekday &&
                !t.weekdayMismatch &&
                !t.nullInput &&
                !t.invalidFormat &&
                !t.userInvalidated &&
                (!t.meridiem || (t.meridiem && r))),
            e._strict && (s = s && t.charsLeftOver === 0 && t.unusedTokens.length === 0 && t.bigHour === void 0)),
        Object.isFrozen == null || !Object.isFrozen(e))
    )
        e._isValid = s;
    else return s;
    return e._isValid;
}
function Ve(e) {
    var t = A(NaN);
    return e != null ? X(m(t), e) : (m(t).userInvalidated = !0), t;
}
var Et = (u.momentProperties = []),
    et = !1;
function yt(e, t) {
    var r,
        s,
        a,
        n = Et.length;
    if (
        (N(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject),
        N(t._i) || (e._i = t._i),
        N(t._f) || (e._f = t._f),
        N(t._l) || (e._l = t._l),
        N(t._strict) || (e._strict = t._strict),
        N(t._tzm) || (e._tzm = t._tzm),
        N(t._isUTC) || (e._isUTC = t._isUTC),
        N(t._offset) || (e._offset = t._offset),
        N(t._pf) || (e._pf = m(t)),
        N(t._locale) || (e._locale = t._locale),
        n > 0)
    )
        for (r = 0; r < n; r++) (s = Et[r]), (a = t[s]), N(a) || (e[s] = a);
    return e;
}
function Ye(e) {
    yt(this, e),
        (this._d = new Date(e._d != null ? e._d.getTime() : NaN)),
        this.isValid() || (this._d = new Date(NaN)),
        et === !1 && ((et = !0), u.updateOffset(this), (et = !1));
}
function E(e) {
    return e instanceof Ye || (e != null && e._isAMomentObject != null);
}
function Kt(e) {
    u.suppressDeprecationWarnings === !1 &&
        typeof console < 'u' &&
        console.warn &&
        console.warn('Deprecation warning: ' + e);
}
function W(e, t) {
    var r = !0;
    return X(function () {
        if ((u.deprecationHandler != null && u.deprecationHandler(null, e), r)) {
            var s = [],
                a,
                n,
                i,
                o = arguments.length;
            for (n = 0; n < o; n++) {
                if (((a = ''), typeof arguments[n] == 'object')) {
                    a +=
                        `
[` +
                        n +
                        '] ';
                    for (i in arguments[0]) g(arguments[0], i) && (a += i + ': ' + arguments[0][i] + ', ');
                    a = a.slice(0, -2);
                } else a = arguments[n];
                s.push(a);
            }
            Kt(
                e +
                    `
Arguments: ` +
                    Array.prototype.slice.call(s).join('') +
                    `
` +
                    new Error().stack,
            ),
                (r = !1);
        }
        return t.apply(this, arguments);
    }, t);
}
var It = {};
function Xt(e, t) {
    u.deprecationHandler != null && u.deprecationHandler(e, t), It[e] || (Kt(t), (It[e] = !0));
}
u.suppressDeprecationWarnings = !1;
u.deprecationHandler = null;
function V(e) {
    return (
        (typeof Function < 'u' && e instanceof Function) || Object.prototype.toString.call(e) === '[object Function]'
    );
}
function ls(e) {
    var t, r;
    for (r in e) g(e, r) && ((t = e[r]), V(t) ? (this[r] = t) : (this['_' + r] = t));
    (this._config = e),
        (this._dayOfMonthOrdinalParseLenient = new RegExp(
            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + '|' + /\d{1,2}/.source,
        ));
}
function it(e, t) {
    var r = X({}, e),
        s;
    for (s in t)
        g(t, s) &&
            (ne(e[s]) && ne(t[s])
                ? ((r[s] = {}), X(r[s], e[s]), X(r[s], t[s]))
                : t[s] != null
                  ? (r[s] = t[s])
                  : delete r[s]);
    for (s in e) g(e, s) && !g(t, s) && ne(e[s]) && (r[s] = X({}, r[s]));
    return r;
}
function gt(e) {
    e != null && this.set(e);
}
var lt;
Object.keys
    ? (lt = Object.keys)
    : (lt = function (e) {
          var t,
              r = [];
          for (t in e) g(e, t) && r.push(t);
          return r;
      });
var os = {
    sameDay: '[Today at] LT',
    nextDay: '[Tomorrow at] LT',
    nextWeek: 'dddd [at] LT',
    lastDay: '[Yesterday at] LT',
    lastWeek: '[Last] dddd [at] LT',
    sameElse: 'L',
};
function us(e, t, r) {
    var s = this._calendar[e] || this._calendar.sameElse;
    return V(s) ? s.call(t, r) : s;
}
function U(e, t, r) {
    var s = '' + Math.abs(e),
        a = t - s.length,
        n = e >= 0;
    return (n ? (r ? '+' : '') : '-') + Math.pow(10, Math.max(0, a)).toString().substr(1) + s;
}
var pt =
        /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
    Ne = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
    tt = {},
    fe = {};
function h(e, t, r, s) {
    var a = s;
    typeof s == 'string' &&
        (a = function () {
            return this[s]();
        }),
        e && (fe[e] = a),
        t &&
            (fe[t[0]] = function () {
                return U(a.apply(this, arguments), t[1], t[2]);
            }),
        r &&
            (fe[r] = function () {
                return this.localeData().ordinal(a.apply(this, arguments), e);
            });
}
function ds(e) {
    return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, '') : e.replace(/\\/g, '');
}
function fs(e) {
    var t = e.match(pt),
        r,
        s;
    for (r = 0, s = t.length; r < s; r++) fe[t[r]] ? (t[r] = fe[t[r]]) : (t[r] = ds(t[r]));
    return function (a) {
        var n = '',
            i;
        for (i = 0; i < s; i++) n += V(t[i]) ? t[i].call(a, e) : t[i];
        return n;
    };
}
function Re(e, t) {
    return e.isValid()
        ? ((t = er(t, e.localeData())), (tt[t] = tt[t] || fs(t)), tt[t](e))
        : e.localeData().invalidDate();
}
function er(e, t) {
    var r = 5;
    function s(a) {
        return t.longDateFormat(a) || a;
    }
    for (Ne.lastIndex = 0; r >= 0 && Ne.test(e); ) (e = e.replace(Ne, s)), (Ne.lastIndex = 0), (r -= 1);
    return e;
}
var hs = {
    LTS: 'h:mm:ss A',
    LT: 'h:mm A',
    L: 'MM/DD/YYYY',
    LL: 'MMMM D, YYYY',
    LLL: 'MMMM D, YYYY h:mm A',
    LLLL: 'dddd, MMMM D, YYYY h:mm A',
};
function cs(e) {
    var t = this._longDateFormat[e],
        r = this._longDateFormat[e.toUpperCase()];
    return t || !r
        ? t
        : ((this._longDateFormat[e] = r
              .match(pt)
              .map(function (s) {
                  return s === 'MMMM' || s === 'MM' || s === 'DD' || s === 'dddd' ? s.slice(1) : s;
              })
              .join('')),
          this._longDateFormat[e]);
}
var ms = 'Invalid date';
function _s() {
    return this._invalidDate;
}
var ys = '%d',
    gs = /\d{1,2}/;
function ps(e) {
    return this._ordinal.replace('%d', e);
}
var vs = {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    ss: '%d seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    w: 'a week',
    ww: '%d weeks',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years',
};
function ws(e, t, r, s) {
    var a = this._relativeTime[r];
    return V(a) ? a(e, t, r, s) : a.replace(/%d/i, e);
}
function ks(e, t) {
    var r = this._relativeTime[e > 0 ? 'future' : 'past'];
    return V(r) ? r(t) : r.replace(/%s/i, t);
}
var jt = {
    D: 'date',
    dates: 'date',
    date: 'date',
    d: 'day',
    days: 'day',
    day: 'day',
    e: 'weekday',
    weekdays: 'weekday',
    weekday: 'weekday',
    E: 'isoWeekday',
    isoweekdays: 'isoWeekday',
    isoweekday: 'isoWeekday',
    DDD: 'dayOfYear',
    dayofyears: 'dayOfYear',
    dayofyear: 'dayOfYear',
    h: 'hour',
    hours: 'hour',
    hour: 'hour',
    ms: 'millisecond',
    milliseconds: 'millisecond',
    millisecond: 'millisecond',
    m: 'minute',
    minutes: 'minute',
    minute: 'minute',
    M: 'month',
    months: 'month',
    month: 'month',
    Q: 'quarter',
    quarters: 'quarter',
    quarter: 'quarter',
    s: 'second',
    seconds: 'second',
    second: 'second',
    gg: 'weekYear',
    weekyears: 'weekYear',
    weekyear: 'weekYear',
    GG: 'isoWeekYear',
    isoweekyears: 'isoWeekYear',
    isoweekyear: 'isoWeekYear',
    w: 'week',
    weeks: 'week',
    week: 'week',
    W: 'isoWeek',
    isoweeks: 'isoWeek',
    isoweek: 'isoWeek',
    y: 'year',
    years: 'year',
    year: 'year',
};
function F(e) {
    return typeof e == 'string' ? jt[e] || jt[e.toLowerCase()] : void 0;
}
function vt(e) {
    var t = {},
        r,
        s;
    for (s in e) g(e, s) && ((r = F(s)), r && (t[r] = e[s]));
    return t;
}
var Ss = {
    date: 9,
    day: 11,
    weekday: 11,
    isoWeekday: 11,
    dayOfYear: 4,
    hour: 13,
    millisecond: 16,
    minute: 14,
    month: 8,
    quarter: 7,
    second: 15,
    weekYear: 1,
    isoWeekYear: 1,
    week: 5,
    isoWeek: 5,
    year: 1,
};
function Ms(e) {
    var t = [],
        r;
    for (r in e) g(e, r) && t.push({ unit: r, priority: Ss[r] });
    return (
        t.sort(function (s, a) {
            return s.priority - a.priority;
        }),
        t
    );
}
var tr = /\d/,
    P = /\d\d/,
    rr = /\d{3}/,
    wt = /\d{4}/,
    Ge = /[+-]?\d{6}/,
    k = /\d\d?/,
    sr = /\d\d\d\d?/,
    ar = /\d\d\d\d\d\d?/,
    ze = /\d{1,3}/,
    kt = /\d{1,4}/,
    $e = /[+-]?\d{1,6}/,
    _e = /\d+/,
    Ze = /[+-]?\d+/,
    Os = /Z|[+-]\d\d:?\d\d/gi,
    qe = /Z|[+-]\d\d(?::?\d\d)?/gi,
    Ds = /[+-]?\d+(\.\d{1,3})?/,
    be =
        /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
    ye = /^[1-9]\d?/,
    St = /^([1-9]\d|\d)/,
    Le;
Le = {};
function d(e, t, r) {
    Le[e] = V(t)
        ? t
        : function (s, a) {
              return s && r ? r : t;
          };
}
function Ys(e, t) {
    return g(Le, e) ? Le[e](t._strict, t._locale) : new RegExp(bs(e));
}
function bs(e) {
    return q(
        e.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (t, r, s, a, n) {
            return r || s || a || n;
        }),
    );
}
function q(e) {
    return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
function R(e) {
    return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
}
function _(e) {
    var t = +e,
        r = 0;
    return t !== 0 && isFinite(t) && (r = R(t)), r;
}
var ot = {};
function v(e, t) {
    var r,
        s = t,
        a;
    for (
        typeof e == 'string' && (e = [e]),
            J(t) &&
                (s = function (n, i) {
                    i[t] = _(n);
                }),
            a = e.length,
            r = 0;
        r < a;
        r++
    )
        ot[e[r]] = s;
}
function xe(e, t) {
    v(e, function (r, s, a, n) {
        (a._w = a._w || {}), t(r, a._w, a, n);
    });
}
function xs(e, t, r) {
    t != null && g(ot, e) && ot[e](t, r._a, r, e);
}
function Be(e) {
    return (e % 4 === 0 && e % 100 !== 0) || e % 400 === 0;
}
var x = 0,
    $ = 1,
    H = 2,
    D = 3,
    L = 4,
    Z = 5,
    ae = 6,
    Ts = 7,
    Ns = 8;
h('Y', 0, 0, function () {
    var e = this.year();
    return e <= 9999 ? U(e, 4) : '+' + e;
});
h(0, ['YY', 2], 0, function () {
    return this.year() % 100;
});
h(0, ['YYYY', 4], 0, 'year');
h(0, ['YYYYY', 5], 0, 'year');
h(0, ['YYYYYY', 6, !0], 0, 'year');
d('Y', Ze);
d('YY', k, P);
d('YYYY', kt, wt);
d('YYYYY', $e, Ge);
d('YYYYYY', $e, Ge);
v(['YYYYY', 'YYYYYY'], x);
v('YYYY', function (e, t) {
    t[x] = e.length === 2 ? u.parseTwoDigitYear(e) : _(e);
});
v('YY', function (e, t) {
    t[x] = u.parseTwoDigitYear(e);
});
v('Y', function (e, t) {
    t[x] = parseInt(e, 10);
});
function we(e) {
    return Be(e) ? 366 : 365;
}
u.parseTwoDigitYear = function (e) {
    return _(e) + (_(e) > 68 ? 1900 : 2e3);
};
var nr = ge('FullYear', !0);
function Ps() {
    return Be(this.year());
}
function ge(e, t) {
    return function (r) {
        return r != null ? (ir(this, e, r), u.updateOffset(this, t), this) : ke(this, e);
    };
}
function ke(e, t) {
    if (!e.isValid()) return NaN;
    var r = e._d,
        s = e._isUTC;
    switch (t) {
        case 'Milliseconds':
            return s ? r.getUTCMilliseconds() : r.getMilliseconds();
        case 'Seconds':
            return s ? r.getUTCSeconds() : r.getSeconds();
        case 'Minutes':
            return s ? r.getUTCMinutes() : r.getMinutes();
        case 'Hours':
            return s ? r.getUTCHours() : r.getHours();
        case 'Date':
            return s ? r.getUTCDate() : r.getDate();
        case 'Day':
            return s ? r.getUTCDay() : r.getDay();
        case 'Month':
            return s ? r.getUTCMonth() : r.getMonth();
        case 'FullYear':
            return s ? r.getUTCFullYear() : r.getFullYear();
        default:
            return NaN;
    }
}
function ir(e, t, r) {
    var s, a, n, i, o;
    if (!(!e.isValid() || isNaN(r))) {
        switch (((s = e._d), (a = e._isUTC), t)) {
            case 'Milliseconds':
                return void (a ? s.setUTCMilliseconds(r) : s.setMilliseconds(r));
            case 'Seconds':
                return void (a ? s.setUTCSeconds(r) : s.setSeconds(r));
            case 'Minutes':
                return void (a ? s.setUTCMinutes(r) : s.setMinutes(r));
            case 'Hours':
                return void (a ? s.setUTCHours(r) : s.setHours(r));
            case 'Date':
                return void (a ? s.setUTCDate(r) : s.setDate(r));
            case 'FullYear':
                break;
            default:
                return;
        }
        (n = r),
            (i = e.month()),
            (o = e.date()),
            (o = o === 29 && i === 1 && !Be(n) ? 28 : o),
            a ? s.setUTCFullYear(n, i, o) : s.setFullYear(n, i, o);
    }
}
function Rs(e) {
    return (e = F(e)), V(this[e]) ? this[e]() : this;
}
function Ws(e, t) {
    if (typeof e == 'object') {
        e = vt(e);
        var r = Ms(e),
            s,
            a = r.length;
        for (s = 0; s < a; s++) this[r[s].unit](e[r[s].unit]);
    } else if (((e = F(e)), V(this[e]))) return this[e](t);
    return this;
}
function Fs(e, t) {
    return ((e % t) + t) % t;
}
var O;
Array.prototype.indexOf
    ? (O = Array.prototype.indexOf)
    : (O = function (e) {
          var t;
          for (t = 0; t < this.length; ++t) if (this[t] === e) return t;
          return -1;
      });
function Mt(e, t) {
    if (isNaN(e) || isNaN(t)) return NaN;
    var r = Fs(t, 12);
    return (e += (t - r) / 12), r === 1 ? (Be(e) ? 29 : 28) : 31 - ((r % 7) % 2);
}
h('M', ['MM', 2], 'Mo', function () {
    return this.month() + 1;
});
h('MMM', 0, 0, function (e) {
    return this.localeData().monthsShort(this, e);
});
h('MMMM', 0, 0, function (e) {
    return this.localeData().months(this, e);
});
d('M', k, ye);
d('MM', k, P);
d('MMM', function (e, t) {
    return t.monthsShortRegex(e);
});
d('MMMM', function (e, t) {
    return t.monthsRegex(e);
});
v(['M', 'MM'], function (e, t) {
    t[$] = _(e) - 1;
});
v(['MMM', 'MMMM'], function (e, t, r, s) {
    var a = r._locale.monthsParse(e, s, r._strict);
    a != null ? (t[$] = a) : (m(r).invalidMonth = e);
});
var Ls = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
    lr = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
    or = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
    Cs = be,
    Es = be;
function Is(e, t) {
    return e
        ? C(this._months)
            ? this._months[e.month()]
            : this._months[(this._months.isFormat || or).test(t) ? 'format' : 'standalone'][e.month()]
        : C(this._months)
          ? this._months
          : this._months.standalone;
}
function js(e, t) {
    return e
        ? C(this._monthsShort)
            ? this._monthsShort[e.month()]
            : this._monthsShort[or.test(t) ? 'format' : 'standalone'][e.month()]
        : C(this._monthsShort)
          ? this._monthsShort
          : this._monthsShort.standalone;
}
function Hs(e, t, r) {
    var s,
        a,
        n,
        i = e.toLocaleLowerCase();
    if (!this._monthsParse)
        for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], s = 0; s < 12; ++s)
            (n = A([2e3, s])),
                (this._shortMonthsParse[s] = this.monthsShort(n, '').toLocaleLowerCase()),
                (this._longMonthsParse[s] = this.months(n, '').toLocaleLowerCase());
    return r
        ? t === 'MMM'
            ? ((a = O.call(this._shortMonthsParse, i)), a !== -1 ? a : null)
            : ((a = O.call(this._longMonthsParse, i)), a !== -1 ? a : null)
        : t === 'MMM'
          ? ((a = O.call(this._shortMonthsParse, i)),
            a !== -1 ? a : ((a = O.call(this._longMonthsParse, i)), a !== -1 ? a : null))
          : ((a = O.call(this._longMonthsParse, i)),
            a !== -1 ? a : ((a = O.call(this._shortMonthsParse, i)), a !== -1 ? a : null));
}
function Us(e, t, r) {
    var s, a, n;
    if (this._monthsParseExact) return Hs.call(this, e, t, r);
    for (
        this._monthsParse || ((this._monthsParse = []), (this._longMonthsParse = []), (this._shortMonthsParse = [])),
            s = 0;
        s < 12;
        s++
    ) {
        if (
            ((a = A([2e3, s])),
            r &&
                !this._longMonthsParse[s] &&
                ((this._longMonthsParse[s] = new RegExp('^' + this.months(a, '').replace('.', '') + '$', 'i')),
                (this._shortMonthsParse[s] = new RegExp('^' + this.monthsShort(a, '').replace('.', '') + '$', 'i'))),
            !r &&
                !this._monthsParse[s] &&
                ((n = '^' + this.months(a, '') + '|^' + this.monthsShort(a, '')),
                (this._monthsParse[s] = new RegExp(n.replace('.', ''), 'i'))),
            r && t === 'MMMM' && this._longMonthsParse[s].test(e))
        )
            return s;
        if (r && t === 'MMM' && this._shortMonthsParse[s].test(e)) return s;
        if (!r && this._monthsParse[s].test(e)) return s;
    }
}
function ur(e, t) {
    if (!e.isValid()) return e;
    if (typeof t == 'string') {
        if (/^\d+$/.test(t)) t = _(t);
        else if (((t = e.localeData().monthsParse(t)), !J(t))) return e;
    }
    var r = t,
        s = e.date();
    return (s = s < 29 ? s : Math.min(s, Mt(e.year(), r))), e._isUTC ? e._d.setUTCMonth(r, s) : e._d.setMonth(r, s), e;
}
function dr(e) {
    return e != null ? (ur(this, e), u.updateOffset(this, !0), this) : ke(this, 'Month');
}
function As() {
    return Mt(this.year(), this.month());
}
function Vs(e) {
    return this._monthsParseExact
        ? (g(this, '_monthsRegex') || fr.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex)
        : (g(this, '_monthsShortRegex') || (this._monthsShortRegex = Cs),
          this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex);
}
function Gs(e) {
    return this._monthsParseExact
        ? (g(this, '_monthsRegex') || fr.call(this), e ? this._monthsStrictRegex : this._monthsRegex)
        : (g(this, '_monthsRegex') || (this._monthsRegex = Es),
          this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex);
}
function fr() {
    function e(f, c) {
        return c.length - f.length;
    }
    var t = [],
        r = [],
        s = [],
        a,
        n,
        i,
        o;
    for (a = 0; a < 12; a++)
        (n = A([2e3, a])),
            (i = q(this.monthsShort(n, ''))),
            (o = q(this.months(n, ''))),
            t.push(i),
            r.push(o),
            s.push(o),
            s.push(i);
    t.sort(e),
        r.sort(e),
        s.sort(e),
        (this._monthsRegex = new RegExp('^(' + s.join('|') + ')', 'i')),
        (this._monthsShortRegex = this._monthsRegex),
        (this._monthsStrictRegex = new RegExp('^(' + r.join('|') + ')', 'i')),
        (this._monthsShortStrictRegex = new RegExp('^(' + t.join('|') + ')', 'i'));
}
function zs(e, t, r, s, a, n, i) {
    var o;
    return (
        e < 100 && e >= 0
            ? ((o = new Date(e + 400, t, r, s, a, n, i)), isFinite(o.getFullYear()) && o.setFullYear(e))
            : (o = new Date(e, t, r, s, a, n, i)),
        o
    );
}
function Se(e) {
    var t, r;
    return (
        e < 100 && e >= 0
            ? ((r = Array.prototype.slice.call(arguments)),
              (r[0] = e + 400),
              (t = new Date(Date.UTC.apply(null, r))),
              isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e))
            : (t = new Date(Date.UTC.apply(null, arguments))),
        t
    );
}
function Ce(e, t, r) {
    var s = 7 + t - r,
        a = (7 + Se(e, 0, s).getUTCDay() - t) % 7;
    return -a + s - 1;
}
function hr(e, t, r, s, a) {
    var n = (7 + r - s) % 7,
        i = Ce(e, s, a),
        o = 1 + 7 * (t - 1) + n + i,
        f,
        c;
    return (
        o <= 0 ? ((f = e - 1), (c = we(f) + o)) : o > we(e) ? ((f = e + 1), (c = o - we(e))) : ((f = e), (c = o)),
        { year: f, dayOfYear: c }
    );
}
function Me(e, t, r) {
    var s = Ce(e.year(), t, r),
        a = Math.floor((e.dayOfYear() - s - 1) / 7) + 1,
        n,
        i;
    return (
        a < 1
            ? ((i = e.year() - 1), (n = a + B(i, t, r)))
            : a > B(e.year(), t, r)
              ? ((n = a - B(e.year(), t, r)), (i = e.year() + 1))
              : ((i = e.year()), (n = a)),
        { week: n, year: i }
    );
}
function B(e, t, r) {
    var s = Ce(e, t, r),
        a = Ce(e + 1, t, r);
    return (we(e) - s + a) / 7;
}
h('w', ['ww', 2], 'wo', 'week');
h('W', ['WW', 2], 'Wo', 'isoWeek');
d('w', k, ye);
d('ww', k, P);
d('W', k, ye);
d('WW', k, P);
xe(['w', 'ww', 'W', 'WW'], function (e, t, r, s) {
    t[s.substr(0, 1)] = _(e);
});
function $s(e) {
    return Me(e, this._week.dow, this._week.doy).week;
}
var Zs = { dow: 0, doy: 6 };
function qs() {
    return this._week.dow;
}
function Bs() {
    return this._week.doy;
}
function Js(e) {
    var t = this.localeData().week(this);
    return e == null ? t : this.add((e - t) * 7, 'd');
}
function Qs(e) {
    var t = Me(this, 1, 4).week;
    return e == null ? t : this.add((e - t) * 7, 'd');
}
h('d', 0, 'do', 'day');
h('dd', 0, 0, function (e) {
    return this.localeData().weekdaysMin(this, e);
});
h('ddd', 0, 0, function (e) {
    return this.localeData().weekdaysShort(this, e);
});
h('dddd', 0, 0, function (e) {
    return this.localeData().weekdays(this, e);
});
h('e', 0, 0, 'weekday');
h('E', 0, 0, 'isoWeekday');
d('d', k);
d('e', k);
d('E', k);
d('dd', function (e, t) {
    return t.weekdaysMinRegex(e);
});
d('ddd', function (e, t) {
    return t.weekdaysShortRegex(e);
});
d('dddd', function (e, t) {
    return t.weekdaysRegex(e);
});
xe(['dd', 'ddd', 'dddd'], function (e, t, r, s) {
    var a = r._locale.weekdaysParse(e, s, r._strict);
    a != null ? (t.d = a) : (m(r).invalidWeekday = e);
});
xe(['d', 'e', 'E'], function (e, t, r, s) {
    t[s] = _(e);
});
function Ks(e, t) {
    return typeof e != 'string'
        ? e
        : isNaN(e)
          ? ((e = t.weekdaysParse(e)), typeof e == 'number' ? e : null)
          : parseInt(e, 10);
}
function Xs(e, t) {
    return typeof e == 'string' ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e;
}
function Ot(e, t) {
    return e.slice(t, 7).concat(e.slice(0, t));
}
var ea = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    cr = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    ta = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
    ra = be,
    sa = be,
    aa = be;
function na(e, t) {
    var r = C(this._weekdays)
        ? this._weekdays
        : this._weekdays[e && e !== !0 && this._weekdays.isFormat.test(t) ? 'format' : 'standalone'];
    return e === !0 ? Ot(r, this._week.dow) : e ? r[e.day()] : r;
}
function ia(e) {
    return e === !0 ? Ot(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort;
}
function la(e) {
    return e === !0 ? Ot(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin;
}
function oa(e, t, r) {
    var s,
        a,
        n,
        i = e.toLocaleLowerCase();
    if (!this._weekdaysParse)
        for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], s = 0; s < 7; ++s)
            (n = A([2e3, 1]).day(s)),
                (this._minWeekdaysParse[s] = this.weekdaysMin(n, '').toLocaleLowerCase()),
                (this._shortWeekdaysParse[s] = this.weekdaysShort(n, '').toLocaleLowerCase()),
                (this._weekdaysParse[s] = this.weekdays(n, '').toLocaleLowerCase());
    return r
        ? t === 'dddd'
            ? ((a = O.call(this._weekdaysParse, i)), a !== -1 ? a : null)
            : t === 'ddd'
              ? ((a = O.call(this._shortWeekdaysParse, i)), a !== -1 ? a : null)
              : ((a = O.call(this._minWeekdaysParse, i)), a !== -1 ? a : null)
        : t === 'dddd'
          ? ((a = O.call(this._weekdaysParse, i)),
            a !== -1 || ((a = O.call(this._shortWeekdaysParse, i)), a !== -1)
                ? a
                : ((a = O.call(this._minWeekdaysParse, i)), a !== -1 ? a : null))
          : t === 'ddd'
            ? ((a = O.call(this._shortWeekdaysParse, i)),
              a !== -1 || ((a = O.call(this._weekdaysParse, i)), a !== -1)
                  ? a
                  : ((a = O.call(this._minWeekdaysParse, i)), a !== -1 ? a : null))
            : ((a = O.call(this._minWeekdaysParse, i)),
              a !== -1 || ((a = O.call(this._weekdaysParse, i)), a !== -1)
                  ? a
                  : ((a = O.call(this._shortWeekdaysParse, i)), a !== -1 ? a : null));
}
function ua(e, t, r) {
    var s, a, n;
    if (this._weekdaysParseExact) return oa.call(this, e, t, r);
    for (
        this._weekdaysParse ||
            ((this._weekdaysParse = []),
            (this._minWeekdaysParse = []),
            (this._shortWeekdaysParse = []),
            (this._fullWeekdaysParse = [])),
            s = 0;
        s < 7;
        s++
    ) {
        if (
            ((a = A([2e3, 1]).day(s)),
            r &&
                !this._fullWeekdaysParse[s] &&
                ((this._fullWeekdaysParse[s] = new RegExp('^' + this.weekdays(a, '').replace('.', '\\.?') + '$', 'i')),
                (this._shortWeekdaysParse[s] = new RegExp(
                    '^' + this.weekdaysShort(a, '').replace('.', '\\.?') + '$',
                    'i',
                )),
                (this._minWeekdaysParse[s] = new RegExp(
                    '^' + this.weekdaysMin(a, '').replace('.', '\\.?') + '$',
                    'i',
                ))),
            this._weekdaysParse[s] ||
                ((n = '^' + this.weekdays(a, '') + '|^' + this.weekdaysShort(a, '') + '|^' + this.weekdaysMin(a, '')),
                (this._weekdaysParse[s] = new RegExp(n.replace('.', ''), 'i'))),
            r && t === 'dddd' && this._fullWeekdaysParse[s].test(e))
        )
            return s;
        if (r && t === 'ddd' && this._shortWeekdaysParse[s].test(e)) return s;
        if (r && t === 'dd' && this._minWeekdaysParse[s].test(e)) return s;
        if (!r && this._weekdaysParse[s].test(e)) return s;
    }
}
function da(e) {
    if (!this.isValid()) return e != null ? this : NaN;
    var t = ke(this, 'Day');
    return e != null ? ((e = Ks(e, this.localeData())), this.add(e - t, 'd')) : t;
}
function fa(e) {
    if (!this.isValid()) return e != null ? this : NaN;
    var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return e == null ? t : this.add(e - t, 'd');
}
function ha(e) {
    if (!this.isValid()) return e != null ? this : NaN;
    if (e != null) {
        var t = Xs(e, this.localeData());
        return this.day(this.day() % 7 ? t : t - 7);
    } else return this.day() || 7;
}
function ca(e) {
    return this._weekdaysParseExact
        ? (g(this, '_weekdaysRegex') || Dt.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex)
        : (g(this, '_weekdaysRegex') || (this._weekdaysRegex = ra),
          this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex);
}
function ma(e) {
    return this._weekdaysParseExact
        ? (g(this, '_weekdaysRegex') || Dt.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
        : (g(this, '_weekdaysShortRegex') || (this._weekdaysShortRegex = sa),
          this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
}
function _a(e) {
    return this._weekdaysParseExact
        ? (g(this, '_weekdaysRegex') || Dt.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
        : (g(this, '_weekdaysMinRegex') || (this._weekdaysMinRegex = aa),
          this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
}
function Dt() {
    function e(M, b) {
        return b.length - M.length;
    }
    var t = [],
        r = [],
        s = [],
        a = [],
        n,
        i,
        o,
        f,
        c;
    for (n = 0; n < 7; n++)
        (i = A([2e3, 1]).day(n)),
            (o = q(this.weekdaysMin(i, ''))),
            (f = q(this.weekdaysShort(i, ''))),
            (c = q(this.weekdays(i, ''))),
            t.push(o),
            r.push(f),
            s.push(c),
            a.push(o),
            a.push(f),
            a.push(c);
    t.sort(e),
        r.sort(e),
        s.sort(e),
        a.sort(e),
        (this._weekdaysRegex = new RegExp('^(' + a.join('|') + ')', 'i')),
        (this._weekdaysShortRegex = this._weekdaysRegex),
        (this._weekdaysMinRegex = this._weekdaysRegex),
        (this._weekdaysStrictRegex = new RegExp('^(' + s.join('|') + ')', 'i')),
        (this._weekdaysShortStrictRegex = new RegExp('^(' + r.join('|') + ')', 'i')),
        (this._weekdaysMinStrictRegex = new RegExp('^(' + t.join('|') + ')', 'i'));
}
function Yt() {
    return this.hours() % 12 || 12;
}
function ya() {
    return this.hours() || 24;
}
h('H', ['HH', 2], 0, 'hour');
h('h', ['hh', 2], 0, Yt);
h('k', ['kk', 2], 0, ya);
h('hmm', 0, 0, function () {
    return '' + Yt.apply(this) + U(this.minutes(), 2);
});
h('hmmss', 0, 0, function () {
    return '' + Yt.apply(this) + U(this.minutes(), 2) + U(this.seconds(), 2);
});
h('Hmm', 0, 0, function () {
    return '' + this.hours() + U(this.minutes(), 2);
});
h('Hmmss', 0, 0, function () {
    return '' + this.hours() + U(this.minutes(), 2) + U(this.seconds(), 2);
});
function mr(e, t) {
    h(e, 0, 0, function () {
        return this.localeData().meridiem(this.hours(), this.minutes(), t);
    });
}
mr('a', !0);
mr('A', !1);
function _r(e, t) {
    return t._meridiemParse;
}
d('a', _r);
d('A', _r);
d('H', k, St);
d('h', k, ye);
d('k', k, ye);
d('HH', k, P);
d('hh', k, P);
d('kk', k, P);
d('hmm', sr);
d('hmmss', ar);
d('Hmm', sr);
d('Hmmss', ar);
v(['H', 'HH'], D);
v(['k', 'kk'], function (e, t, r) {
    var s = _(e);
    t[D] = s === 24 ? 0 : s;
});
v(['a', 'A'], function (e, t, r) {
    (r._isPm = r._locale.isPM(e)), (r._meridiem = e);
});
v(['h', 'hh'], function (e, t, r) {
    (t[D] = _(e)), (m(r).bigHour = !0);
});
v('hmm', function (e, t, r) {
    var s = e.length - 2;
    (t[D] = _(e.substr(0, s))), (t[L] = _(e.substr(s))), (m(r).bigHour = !0);
});
v('hmmss', function (e, t, r) {
    var s = e.length - 4,
        a = e.length - 2;
    (t[D] = _(e.substr(0, s))), (t[L] = _(e.substr(s, 2))), (t[Z] = _(e.substr(a))), (m(r).bigHour = !0);
});
v('Hmm', function (e, t, r) {
    var s = e.length - 2;
    (t[D] = _(e.substr(0, s))), (t[L] = _(e.substr(s)));
});
v('Hmmss', function (e, t, r) {
    var s = e.length - 4,
        a = e.length - 2;
    (t[D] = _(e.substr(0, s))), (t[L] = _(e.substr(s, 2))), (t[Z] = _(e.substr(a)));
});
function ga(e) {
    return (e + '').toLowerCase().charAt(0) === 'p';
}
var pa = /[ap]\.?m?\.?/i,
    va = ge('Hours', !0);
function wa(e, t, r) {
    return e > 11 ? (r ? 'pm' : 'PM') : r ? 'am' : 'AM';
}
var yr = {
        calendar: os,
        longDateFormat: hs,
        invalidDate: ms,
        ordinal: ys,
        dayOfMonthOrdinalParse: gs,
        relativeTime: vs,
        months: Ls,
        monthsShort: lr,
        week: Zs,
        weekdays: ea,
        weekdaysMin: ta,
        weekdaysShort: cr,
        meridiemParse: pa,
    },
    S = {},
    pe = {},
    Oe;
function ka(e, t) {
    var r,
        s = Math.min(e.length, t.length);
    for (r = 0; r < s; r += 1) if (e[r] !== t[r]) return r;
    return s;
}
function Ht(e) {
    return e && e.toLowerCase().replace('_', '-');
}
function Sa(e) {
    for (var t = 0, r, s, a, n; t < e.length; ) {
        for (n = Ht(e[t]).split('-'), r = n.length, s = Ht(e[t + 1]), s = s ? s.split('-') : null; r > 0; ) {
            if (((a = Je(n.slice(0, r).join('-'))), a)) return a;
            if (s && s.length >= r && ka(n, s) >= r - 1) break;
            r--;
        }
        t++;
    }
    return Oe;
}
function Ma(e) {
    return !!(e && e.match('^[^/\\\\]*$'));
}
function Je(e) {
    var t = null,
        r;
    if (S[e] === void 0 && typeof module < 'u' && module && module.exports && Ma(e))
        try {
            (t = Oe._abbr), (r = require), r('./locale/' + e), te(t);
        } catch {
            S[e] = null;
        }
    return S[e];
}
function te(e, t) {
    var r;
    return (
        e &&
            (N(t) ? (r = Q(e)) : (r = bt(e, t)),
            r
                ? (Oe = r)
                : typeof console < 'u' &&
                  console.warn &&
                  console.warn('Locale ' + e + ' not found. Did you forget to load it?')),
        Oe._abbr
    );
}
function bt(e, t) {
    if (t !== null) {
        var r,
            s = yr;
        if (((t.abbr = e), S[e] != null))
            Xt(
                'defineLocaleOverride',
                'use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info.',
            ),
                (s = S[e]._config);
        else if (t.parentLocale != null)
            if (S[t.parentLocale] != null) s = S[t.parentLocale]._config;
            else if (((r = Je(t.parentLocale)), r != null)) s = r._config;
            else
                return (
                    pe[t.parentLocale] || (pe[t.parentLocale] = []),
                    pe[t.parentLocale].push({ name: e, config: t }),
                    null
                );
        return (
            (S[e] = new gt(it(s, t))),
            pe[e] &&
                pe[e].forEach(function (a) {
                    bt(a.name, a.config);
                }),
            te(e),
            S[e]
        );
    } else return delete S[e], null;
}
function Oa(e, t) {
    if (t != null) {
        var r,
            s,
            a = yr;
        S[e] != null && S[e].parentLocale != null
            ? S[e].set(it(S[e]._config, t))
            : ((s = Je(e)),
              s != null && (a = s._config),
              (t = it(a, t)),
              s == null && (t.abbr = e),
              (r = new gt(t)),
              (r.parentLocale = S[e]),
              (S[e] = r)),
            te(e);
    } else
        S[e] != null &&
            (S[e].parentLocale != null
                ? ((S[e] = S[e].parentLocale), e === te() && te(e))
                : S[e] != null && delete S[e]);
    return S[e];
}
function Q(e) {
    var t;
    if ((e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e)) return Oe;
    if (!C(e)) {
        if (((t = Je(e)), t)) return t;
        e = [e];
    }
    return Sa(e);
}
function Da() {
    return lt(S);
}
function xt(e) {
    var t,
        r = e._a;
    return (
        r &&
            m(e).overflow === -2 &&
            ((t =
                r[$] < 0 || r[$] > 11
                    ? $
                    : r[H] < 1 || r[H] > Mt(r[x], r[$])
                      ? H
                      : r[D] < 0 || r[D] > 24 || (r[D] === 24 && (r[L] !== 0 || r[Z] !== 0 || r[ae] !== 0))
                        ? D
                        : r[L] < 0 || r[L] > 59
                          ? L
                          : r[Z] < 0 || r[Z] > 59
                            ? Z
                            : r[ae] < 0 || r[ae] > 999
                              ? ae
                              : -1),
            m(e)._overflowDayOfYear && (t < x || t > H) && (t = H),
            m(e)._overflowWeeks && t === -1 && (t = Ts),
            m(e)._overflowWeekday && t === -1 && (t = Ns),
            (m(e).overflow = t)),
        e
    );
}
var Ya =
        /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
    ba =
        /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
    xa = /Z|[+-]\d\d(?::?\d\d)?/,
    Pe = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d\d/, !1],
        ['YYYY-DDD', /\d{4}-\d{3}/],
        ['YYYY-MM', /\d{4}-\d\d/, !1],
        ['YYYYYYMMDD', /[+-]\d{10}/],
        ['YYYYMMDD', /\d{8}/],
        ['GGGG[W]WWE', /\d{4}W\d{3}/],
        ['GGGG[W]WW', /\d{4}W\d{2}/, !1],
        ['YYYYDDD', /\d{7}/],
        ['YYYYMM', /\d{6}/, !1],
        ['YYYY', /\d{4}/, !1],
    ],
    rt = [
        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
        ['HH:mm', /\d\d:\d\d/],
        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
        ['HHmmss', /\d\d\d\d\d\d/],
        ['HHmm', /\d\d\d\d/],
        ['HH', /\d\d/],
    ],
    Ta = /^\/?Date\((-?\d+)/i,
    Na =
        /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
    Pa = {
        UT: 0,
        GMT: 0,
        EDT: -4 * 60,
        EST: -5 * 60,
        CDT: -5 * 60,
        CST: -6 * 60,
        MDT: -6 * 60,
        MST: -7 * 60,
        PDT: -7 * 60,
        PST: -8 * 60,
    };
function gr(e) {
    var t,
        r,
        s = e._i,
        a = Ya.exec(s) || ba.exec(s),
        n,
        i,
        o,
        f,
        c = Pe.length,
        M = rt.length;
    if (a) {
        for (m(e).iso = !0, t = 0, r = c; t < r; t++)
            if (Pe[t][1].exec(a[1])) {
                (i = Pe[t][0]), (n = Pe[t][2] !== !1);
                break;
            }
        if (i == null) {
            e._isValid = !1;
            return;
        }
        if (a[3]) {
            for (t = 0, r = M; t < r; t++)
                if (rt[t][1].exec(a[3])) {
                    o = (a[2] || ' ') + rt[t][0];
                    break;
                }
            if (o == null) {
                e._isValid = !1;
                return;
            }
        }
        if (!n && o != null) {
            e._isValid = !1;
            return;
        }
        if (a[4])
            if (xa.exec(a[4])) f = 'Z';
            else {
                e._isValid = !1;
                return;
            }
        (e._f = i + (o || '') + (f || '')), Nt(e);
    } else e._isValid = !1;
}
function Ra(e, t, r, s, a, n) {
    var i = [Wa(e), lr.indexOf(t), parseInt(r, 10), parseInt(s, 10), parseInt(a, 10)];
    return n && i.push(parseInt(n, 10)), i;
}
function Wa(e) {
    var t = parseInt(e, 10);
    return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t;
}
function Fa(e) {
    return e
        .replace(/\([^()]*\)|[\n\t]/g, ' ')
        .replace(/(\s\s+)/g, ' ')
        .replace(/^\s\s*/, '')
        .replace(/\s\s*$/, '');
}
function La(e, t, r) {
    if (e) {
        var s = cr.indexOf(e),
            a = new Date(t[0], t[1], t[2]).getDay();
        if (s !== a) return (m(r).weekdayMismatch = !0), (r._isValid = !1), !1;
    }
    return !0;
}
function Ca(e, t, r) {
    if (e) return Pa[e];
    if (t) return 0;
    var s = parseInt(r, 10),
        a = s % 100,
        n = (s - a) / 100;
    return n * 60 + a;
}
function pr(e) {
    var t = Na.exec(Fa(e._i)),
        r;
    if (t) {
        if (((r = Ra(t[4], t[3], t[2], t[5], t[6], t[7])), !La(t[1], r, e))) return;
        (e._a = r),
            (e._tzm = Ca(t[8], t[9], t[10])),
            (e._d = Se.apply(null, e._a)),
            e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm),
            (m(e).rfc2822 = !0);
    } else e._isValid = !1;
}
function Ea(e) {
    var t = Ta.exec(e._i);
    if (t !== null) {
        e._d = new Date(+t[1]);
        return;
    }
    if ((gr(e), e._isValid === !1)) delete e._isValid;
    else return;
    if ((pr(e), e._isValid === !1)) delete e._isValid;
    else return;
    e._strict ? (e._isValid = !1) : u.createFromInputFallback(e);
}
u.createFromInputFallback = W(
    'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.',
    function (e) {
        e._d = new Date(e._i + (e._useUTC ? ' UTC' : ''));
    },
);
function ue(e, t, r) {
    return e ?? t ?? r;
}
function Ia(e) {
    var t = new Date(u.now());
    return e._useUTC
        ? [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()]
        : [t.getFullYear(), t.getMonth(), t.getDate()];
}
function Tt(e) {
    var t,
        r,
        s = [],
        a,
        n,
        i;
    if (!e._d) {
        for (
            a = Ia(e),
                e._w && e._a[H] == null && e._a[$] == null && ja(e),
                e._dayOfYear != null &&
                    ((i = ue(e._a[x], a[x])),
                    (e._dayOfYear > we(i) || e._dayOfYear === 0) && (m(e)._overflowDayOfYear = !0),
                    (r = Se(i, 0, e._dayOfYear)),
                    (e._a[$] = r.getUTCMonth()),
                    (e._a[H] = r.getUTCDate())),
                t = 0;
            t < 3 && e._a[t] == null;
            ++t
        )
            e._a[t] = s[t] = a[t];
        for (; t < 7; t++) e._a[t] = s[t] = e._a[t] == null ? (t === 2 ? 1 : 0) : e._a[t];
        e._a[D] === 24 && e._a[L] === 0 && e._a[Z] === 0 && e._a[ae] === 0 && ((e._nextDay = !0), (e._a[D] = 0)),
            (e._d = (e._useUTC ? Se : zs).apply(null, s)),
            (n = e._useUTC ? e._d.getUTCDay() : e._d.getDay()),
            e._tzm != null && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm),
            e._nextDay && (e._a[D] = 24),
            e._w && typeof e._w.d < 'u' && e._w.d !== n && (m(e).weekdayMismatch = !0);
    }
}
function ja(e) {
    var t, r, s, a, n, i, o, f, c;
    (t = e._w),
        t.GG != null || t.W != null || t.E != null
            ? ((n = 1),
              (i = 4),
              (r = ue(t.GG, e._a[x], Me(w(), 1, 4).year)),
              (s = ue(t.W, 1)),
              (a = ue(t.E, 1)),
              (a < 1 || a > 7) && (f = !0))
            : ((n = e._locale._week.dow),
              (i = e._locale._week.doy),
              (c = Me(w(), n, i)),
              (r = ue(t.gg, e._a[x], c.year)),
              (s = ue(t.w, c.week)),
              t.d != null
                  ? ((a = t.d), (a < 0 || a > 6) && (f = !0))
                  : t.e != null
                    ? ((a = t.e + n), (t.e < 0 || t.e > 6) && (f = !0))
                    : (a = n)),
        s < 1 || s > B(r, n, i)
            ? (m(e)._overflowWeeks = !0)
            : f != null
              ? (m(e)._overflowWeekday = !0)
              : ((o = hr(r, s, a, n, i)), (e._a[x] = o.year), (e._dayOfYear = o.dayOfYear));
}
u.ISO_8601 = function () {};
u.RFC_2822 = function () {};
function Nt(e) {
    if (e._f === u.ISO_8601) {
        gr(e);
        return;
    }
    if (e._f === u.RFC_2822) {
        pr(e);
        return;
    }
    (e._a = []), (m(e).empty = !0);
    var t = '' + e._i,
        r,
        s,
        a,
        n,
        i,
        o = t.length,
        f = 0,
        c,
        M;
    for (a = er(e._f, e._locale).match(pt) || [], M = a.length, r = 0; r < M; r++)
        (n = a[r]),
            (s = (t.match(Ys(n, e)) || [])[0]),
            s &&
                ((i = t.substr(0, t.indexOf(s))),
                i.length > 0 && m(e).unusedInput.push(i),
                (t = t.slice(t.indexOf(s) + s.length)),
                (f += s.length)),
            fe[n]
                ? (s ? (m(e).empty = !1) : m(e).unusedTokens.push(n), xs(n, s, e))
                : e._strict && !s && m(e).unusedTokens.push(n);
    (m(e).charsLeftOver = o - f),
        t.length > 0 && m(e).unusedInput.push(t),
        e._a[D] <= 12 && m(e).bigHour === !0 && e._a[D] > 0 && (m(e).bigHour = void 0),
        (m(e).parsedDateParts = e._a.slice(0)),
        (m(e).meridiem = e._meridiem),
        (e._a[D] = Ha(e._locale, e._a[D], e._meridiem)),
        (c = m(e).era),
        c !== null && (e._a[x] = e._locale.erasConvertYear(c, e._a[x])),
        Tt(e),
        xt(e);
}
function Ha(e, t, r) {
    var s;
    return r == null
        ? t
        : e.meridiemHour != null
          ? e.meridiemHour(t, r)
          : (e.isPM != null && ((s = e.isPM(r)), s && t < 12 && (t += 12), !s && t === 12 && (t = 0)), t);
}
function Ua(e) {
    var t,
        r,
        s,
        a,
        n,
        i,
        o = !1,
        f = e._f.length;
    if (f === 0) {
        (m(e).invalidFormat = !0), (e._d = new Date(NaN));
        return;
    }
    for (a = 0; a < f; a++)
        (n = 0),
            (i = !1),
            (t = yt({}, e)),
            e._useUTC != null && (t._useUTC = e._useUTC),
            (t._f = e._f[a]),
            Nt(t),
            _t(t) && (i = !0),
            (n += m(t).charsLeftOver),
            (n += m(t).unusedTokens.length * 10),
            (m(t).score = n),
            o ? n < s && ((s = n), (r = t)) : (s == null || n < s || i) && ((s = n), (r = t), i && (o = !0));
    X(e, r || t);
}
function Aa(e) {
    if (!e._d) {
        var t = vt(e._i),
            r = t.day === void 0 ? t.date : t.day;
        (e._a = Qt([t.year, t.month, r, t.hour, t.minute, t.second, t.millisecond], function (s) {
            return s && parseInt(s, 10);
        })),
            Tt(e);
    }
}
function Va(e) {
    var t = new Ye(xt(vr(e)));
    return t._nextDay && (t.add(1, 'd'), (t._nextDay = void 0)), t;
}
function vr(e) {
    var t = e._i,
        r = e._f;
    return (
        (e._locale = e._locale || Q(e._l)),
        t === null || (r === void 0 && t === '')
            ? Ve({ nullInput: !0 })
            : (typeof t == 'string' && (e._i = t = e._locale.preparse(t)),
              E(t) ? new Ye(xt(t)) : (De(t) ? (e._d = t) : C(r) ? Ua(e) : r ? Nt(e) : Ga(e), _t(e) || (e._d = null), e))
    );
}
function Ga(e) {
    var t = e._i;
    N(t)
        ? (e._d = new Date(u.now()))
        : De(t)
          ? (e._d = new Date(t.valueOf()))
          : typeof t == 'string'
            ? Ea(e)
            : C(t)
              ? ((e._a = Qt(t.slice(0), function (r) {
                    return parseInt(r, 10);
                })),
                Tt(e))
              : ne(t)
                ? Aa(e)
                : J(t)
                  ? (e._d = new Date(t))
                  : u.createFromInputFallback(e);
}
function wr(e, t, r, s, a) {
    var n = {};
    return (
        (t === !0 || t === !1) && ((s = t), (t = void 0)),
        (r === !0 || r === !1) && ((s = r), (r = void 0)),
        ((ne(e) && mt(e)) || (C(e) && e.length === 0)) && (e = void 0),
        (n._isAMomentObject = !0),
        (n._useUTC = n._isUTC = a),
        (n._l = r),
        (n._i = e),
        (n._f = t),
        (n._strict = s),
        Va(n)
    );
}
function w(e, t, r, s) {
    return wr(e, t, r, s, !1);
}
var za = W(
        'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var e = w.apply(null, arguments);
            return this.isValid() && e.isValid() ? (e < this ? this : e) : Ve();
        },
    ),
    $a = W(
        'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var e = w.apply(null, arguments);
            return this.isValid() && e.isValid() ? (e > this ? this : e) : Ve();
        },
    );
function kr(e, t) {
    var r, s;
    if ((t.length === 1 && C(t[0]) && (t = t[0]), !t.length)) return w();
    for (r = t[0], s = 1; s < t.length; ++s) (!t[s].isValid() || t[s][e](r)) && (r = t[s]);
    return r;
}
function Za() {
    var e = [].slice.call(arguments, 0);
    return kr('isBefore', e);
}
function qa() {
    var e = [].slice.call(arguments, 0);
    return kr('isAfter', e);
}
var Ba = function () {
        return Date.now ? Date.now() : +new Date();
    },
    ve = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];
function Ja(e) {
    var t,
        r = !1,
        s,
        a = ve.length;
    for (t in e) if (g(e, t) && !(O.call(ve, t) !== -1 && (e[t] == null || !isNaN(e[t])))) return !1;
    for (s = 0; s < a; ++s)
        if (e[ve[s]]) {
            if (r) return !1;
            parseFloat(e[ve[s]]) !== _(e[ve[s]]) && (r = !0);
        }
    return !0;
}
function Qa() {
    return this._isValid;
}
function Ka() {
    return I(NaN);
}
function Qe(e) {
    var t = vt(e),
        r = t.year || 0,
        s = t.quarter || 0,
        a = t.month || 0,
        n = t.week || t.isoWeek || 0,
        i = t.day || 0,
        o = t.hour || 0,
        f = t.minute || 0,
        c = t.second || 0,
        M = t.millisecond || 0;
    (this._isValid = Ja(t)),
        (this._milliseconds = +M + c * 1e3 + f * 6e4 + o * 1e3 * 60 * 60),
        (this._days = +i + n * 7),
        (this._months = +a + s * 3 + r * 12),
        (this._data = {}),
        (this._locale = Q()),
        this._bubble();
}
function We(e) {
    return e instanceof Qe;
}
function ut(e) {
    return e < 0 ? Math.round(-1 * e) * -1 : Math.round(e);
}
function Xa(e, t, r) {
    var s = Math.min(e.length, t.length),
        a = Math.abs(e.length - t.length),
        n = 0,
        i;
    for (i = 0; i < s; i++) ((r && e[i] !== t[i]) || (!r && _(e[i]) !== _(t[i]))) && n++;
    return n + a;
}
function Sr(e, t) {
    h(e, 0, 0, function () {
        var r = this.utcOffset(),
            s = '+';
        return r < 0 && ((r = -r), (s = '-')), s + U(~~(r / 60), 2) + t + U(~~r % 60, 2);
    });
}
Sr('Z', ':');
Sr('ZZ', '');
d('Z', qe);
d('ZZ', qe);
v(['Z', 'ZZ'], function (e, t, r) {
    (r._useUTC = !0), (r._tzm = Pt(qe, e));
});
var en = /([\+\-]|\d\d)/gi;
function Pt(e, t) {
    var r = (t || '').match(e),
        s,
        a,
        n;
    return r === null
        ? null
        : ((s = r[r.length - 1] || []),
          (a = (s + '').match(en) || ['-', 0, 0]),
          (n = +(a[1] * 60) + _(a[2])),
          n === 0 ? 0 : a[0] === '+' ? n : -n);
}
function Rt(e, t) {
    var r, s;
    return t._isUTC
        ? ((r = t.clone()),
          (s = (E(e) || De(e) ? e.valueOf() : w(e).valueOf()) - r.valueOf()),
          r._d.setTime(r._d.valueOf() + s),
          u.updateOffset(r, !1),
          r)
        : w(e).local();
}
function dt(e) {
    return -Math.round(e._d.getTimezoneOffset());
}
u.updateOffset = function () {};
function tn(e, t, r) {
    var s = this._offset || 0,
        a;
    if (!this.isValid()) return e != null ? this : NaN;
    if (e != null) {
        if (typeof e == 'string') {
            if (((e = Pt(qe, e)), e === null)) return this;
        } else Math.abs(e) < 16 && !r && (e = e * 60);
        return (
            !this._isUTC && t && (a = dt(this)),
            (this._offset = e),
            (this._isUTC = !0),
            a != null && this.add(a, 'm'),
            s !== e &&
                (!t || this._changeInProgress
                    ? Dr(this, I(e - s, 'm'), 1, !1)
                    : this._changeInProgress ||
                      ((this._changeInProgress = !0), u.updateOffset(this, !0), (this._changeInProgress = null))),
            this
        );
    } else return this._isUTC ? s : dt(this);
}
function rn(e, t) {
    return e != null ? (typeof e != 'string' && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset();
}
function sn(e) {
    return this.utcOffset(0, e);
}
function an(e) {
    return this._isUTC && (this.utcOffset(0, e), (this._isUTC = !1), e && this.subtract(dt(this), 'm')), this;
}
function nn() {
    if (this._tzm != null) this.utcOffset(this._tzm, !1, !0);
    else if (typeof this._i == 'string') {
        var e = Pt(Os, this._i);
        e != null ? this.utcOffset(e) : this.utcOffset(0, !0);
    }
    return this;
}
function ln(e) {
    return this.isValid() ? ((e = e ? w(e).utcOffset() : 0), (this.utcOffset() - e) % 60 === 0) : !1;
}
function on() {
    return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function un() {
    if (!N(this._isDSTShifted)) return this._isDSTShifted;
    var e = {},
        t;
    return (
        yt(e, this),
        (e = vr(e)),
        e._a
            ? ((t = e._isUTC ? A(e._a) : w(e._a)), (this._isDSTShifted = this.isValid() && Xa(e._a, t.toArray()) > 0))
            : (this._isDSTShifted = !1),
        this._isDSTShifted
    );
}
function dn() {
    return this.isValid() ? !this._isUTC : !1;
}
function fn() {
    return this.isValid() ? this._isUTC : !1;
}
function Mr() {
    return this.isValid() ? this._isUTC && this._offset === 0 : !1;
}
var hn = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
    cn =
        /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function I(e, t) {
    var r = e,
        s = null,
        a,
        n,
        i;
    return (
        We(e)
            ? (r = { ms: e._milliseconds, d: e._days, M: e._months })
            : J(e) || !isNaN(+e)
              ? ((r = {}), t ? (r[t] = +e) : (r.milliseconds = +e))
              : (s = hn.exec(e))
                ? ((a = s[1] === '-' ? -1 : 1),
                  (r = {
                      y: 0,
                      d: _(s[H]) * a,
                      h: _(s[D]) * a,
                      m: _(s[L]) * a,
                      s: _(s[Z]) * a,
                      ms: _(ut(s[ae] * 1e3)) * a,
                  }))
                : (s = cn.exec(e))
                  ? ((a = s[1] === '-' ? -1 : 1),
                    (r = {
                        y: se(s[2], a),
                        M: se(s[3], a),
                        w: se(s[4], a),
                        d: se(s[5], a),
                        h: se(s[6], a),
                        m: se(s[7], a),
                        s: se(s[8], a),
                    }))
                  : r == null
                    ? (r = {})
                    : typeof r == 'object' &&
                      ('from' in r || 'to' in r) &&
                      ((i = mn(w(r.from), w(r.to))), (r = {}), (r.ms = i.milliseconds), (r.M = i.months)),
        (n = new Qe(r)),
        We(e) && g(e, '_locale') && (n._locale = e._locale),
        We(e) && g(e, '_isValid') && (n._isValid = e._isValid),
        n
    );
}
I.fn = Qe.prototype;
I.invalid = Ka;
function se(e, t) {
    var r = e && parseFloat(e.replace(',', '.'));
    return (isNaN(r) ? 0 : r) * t;
}
function Ut(e, t) {
    var r = {};
    return (
        (r.months = t.month() - e.month() + (t.year() - e.year()) * 12),
        e.clone().add(r.months, 'M').isAfter(t) && --r.months,
        (r.milliseconds = +t - +e.clone().add(r.months, 'M')),
        r
    );
}
function mn(e, t) {
    var r;
    return e.isValid() && t.isValid()
        ? ((t = Rt(t, e)),
          e.isBefore(t) ? (r = Ut(e, t)) : ((r = Ut(t, e)), (r.milliseconds = -r.milliseconds), (r.months = -r.months)),
          r)
        : { milliseconds: 0, months: 0 };
}
function Or(e, t) {
    return function (r, s) {
        var a, n;
        return (
            s !== null &&
                !isNaN(+s) &&
                (Xt(
                    t,
                    'moment().' +
                        t +
                        '(period, number) is deprecated. Please use moment().' +
                        t +
                        '(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.',
                ),
                (n = r),
                (r = s),
                (s = n)),
            (a = I(r, s)),
            Dr(this, a, e),
            this
        );
    };
}
function Dr(e, t, r, s) {
    var a = t._milliseconds,
        n = ut(t._days),
        i = ut(t._months);
    e.isValid() &&
        ((s = s ?? !0),
        i && ur(e, ke(e, 'Month') + i * r),
        n && ir(e, 'Date', ke(e, 'Date') + n * r),
        a && e._d.setTime(e._d.valueOf() + a * r),
        s && u.updateOffset(e, n || i));
}
var _n = Or(1, 'add'),
    yn = Or(-1, 'subtract');
function Yr(e) {
    return typeof e == 'string' || e instanceof String;
}
function gn(e) {
    return E(e) || De(e) || Yr(e) || J(e) || vn(e) || pn(e) || e === null || e === void 0;
}
function pn(e) {
    var t = ne(e) && !mt(e),
        r = !1,
        s = [
            'years',
            'year',
            'y',
            'months',
            'month',
            'M',
            'days',
            'day',
            'd',
            'dates',
            'date',
            'D',
            'hours',
            'hour',
            'h',
            'minutes',
            'minute',
            'm',
            'seconds',
            'second',
            's',
            'milliseconds',
            'millisecond',
            'ms',
        ],
        a,
        n,
        i = s.length;
    for (a = 0; a < i; a += 1) (n = s[a]), (r = r || g(e, n));
    return t && r;
}
function vn(e) {
    var t = C(e),
        r = !1;
    return (
        t &&
            (r =
                e.filter(function (s) {
                    return !J(s) && Yr(e);
                }).length === 0),
        t && r
    );
}
function wn(e) {
    var t = ne(e) && !mt(e),
        r = !1,
        s = ['sameDay', 'nextDay', 'lastDay', 'nextWeek', 'lastWeek', 'sameElse'],
        a,
        n;
    for (a = 0; a < s.length; a += 1) (n = s[a]), (r = r || g(e, n));
    return t && r;
}
function kn(e, t) {
    var r = e.diff(t, 'days', !0);
    return r < -6
        ? 'sameElse'
        : r < -1
          ? 'lastWeek'
          : r < 0
            ? 'lastDay'
            : r < 1
              ? 'sameDay'
              : r < 2
                ? 'nextDay'
                : r < 7
                  ? 'nextWeek'
                  : 'sameElse';
}
function Sn(e, t) {
    arguments.length === 1 &&
        (arguments[0]
            ? gn(arguments[0])
                ? ((e = arguments[0]), (t = void 0))
                : wn(arguments[0]) && ((t = arguments[0]), (e = void 0))
            : ((e = void 0), (t = void 0)));
    var r = e || w(),
        s = Rt(r, this).startOf('day'),
        a = u.calendarFormat(this, s) || 'sameElse',
        n = t && (V(t[a]) ? t[a].call(this, r) : t[a]);
    return this.format(n || this.localeData().calendar(a, this, w(r)));
}
function Mn() {
    return new Ye(this);
}
function On(e, t) {
    var r = E(e) ? e : w(e);
    return this.isValid() && r.isValid()
        ? ((t = F(t) || 'millisecond'),
          t === 'millisecond' ? this.valueOf() > r.valueOf() : r.valueOf() < this.clone().startOf(t).valueOf())
        : !1;
}
function Dn(e, t) {
    var r = E(e) ? e : w(e);
    return this.isValid() && r.isValid()
        ? ((t = F(t) || 'millisecond'),
          t === 'millisecond' ? this.valueOf() < r.valueOf() : this.clone().endOf(t).valueOf() < r.valueOf())
        : !1;
}
function Yn(e, t, r, s) {
    var a = E(e) ? e : w(e),
        n = E(t) ? t : w(t);
    return this.isValid() && a.isValid() && n.isValid()
        ? ((s = s || '()'),
          (s[0] === '(' ? this.isAfter(a, r) : !this.isBefore(a, r)) &&
              (s[1] === ')' ? this.isBefore(n, r) : !this.isAfter(n, r)))
        : !1;
}
function bn(e, t) {
    var r = E(e) ? e : w(e),
        s;
    return this.isValid() && r.isValid()
        ? ((t = F(t) || 'millisecond'),
          t === 'millisecond'
              ? this.valueOf() === r.valueOf()
              : ((s = r.valueOf()), this.clone().startOf(t).valueOf() <= s && s <= this.clone().endOf(t).valueOf()))
        : !1;
}
function xn(e, t) {
    return this.isSame(e, t) || this.isAfter(e, t);
}
function Tn(e, t) {
    return this.isSame(e, t) || this.isBefore(e, t);
}
function Nn(e, t, r) {
    var s, a, n;
    if (!this.isValid()) return NaN;
    if (((s = Rt(e, this)), !s.isValid())) return NaN;
    switch (((a = (s.utcOffset() - this.utcOffset()) * 6e4), (t = F(t)), t)) {
        case 'year':
            n = Fe(this, s) / 12;
            break;
        case 'month':
            n = Fe(this, s);
            break;
        case 'quarter':
            n = Fe(this, s) / 3;
            break;
        case 'second':
            n = (this - s) / 1e3;
            break;
        case 'minute':
            n = (this - s) / 6e4;
            break;
        case 'hour':
            n = (this - s) / 36e5;
            break;
        case 'day':
            n = (this - s - a) / 864e5;
            break;
        case 'week':
            n = (this - s - a) / 6048e5;
            break;
        default:
            n = this - s;
    }
    return r ? n : R(n);
}
function Fe(e, t) {
    if (e.date() < t.date()) return -Fe(t, e);
    var r = (t.year() - e.year()) * 12 + (t.month() - e.month()),
        s = e.clone().add(r, 'months'),
        a,
        n;
    return (
        t - s < 0
            ? ((a = e.clone().add(r - 1, 'months')), (n = (t - s) / (s - a)))
            : ((a = e.clone().add(r + 1, 'months')), (n = (t - s) / (a - s))),
        -(r + n) || 0
    );
}
u.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
u.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';
function Pn() {
    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
}
function Rn(e) {
    if (!this.isValid()) return null;
    var t = e !== !0,
        r = t ? this.clone().utc() : this;
    return r.year() < 0 || r.year() > 9999
        ? Re(r, t ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ')
        : V(Date.prototype.toISOString)
          ? t
              ? this.toDate().toISOString()
              : new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace('Z', Re(r, 'Z'))
          : Re(r, t ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
}
function Wn() {
    if (!this.isValid()) return 'moment.invalid(/* ' + this._i + ' */)';
    var e = 'moment',
        t = '',
        r,
        s,
        a,
        n;
    return (
        this.isLocal() || ((e = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone'), (t = 'Z')),
        (r = '[' + e + '("]'),
        (s = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY'),
        (a = '-MM-DD[T]HH:mm:ss.SSS'),
        (n = t + '[")]'),
        this.format(r + s + a + n)
    );
}
function Fn(e) {
    e || (e = this.isUtc() ? u.defaultFormatUtc : u.defaultFormat);
    var t = Re(this, e);
    return this.localeData().postformat(t);
}
function Ln(e, t) {
    return this.isValid() && ((E(e) && e.isValid()) || w(e).isValid())
        ? I({ to: this, from: e }).locale(this.locale()).humanize(!t)
        : this.localeData().invalidDate();
}
function Cn(e) {
    return this.from(w(), e);
}
function En(e, t) {
    return this.isValid() && ((E(e) && e.isValid()) || w(e).isValid())
        ? I({ from: this, to: e }).locale(this.locale()).humanize(!t)
        : this.localeData().invalidDate();
}
function In(e) {
    return this.to(w(), e);
}
function br(e) {
    var t;
    return e === void 0 ? this._locale._abbr : ((t = Q(e)), t != null && (this._locale = t), this);
}
var xr = W(
    'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
    function (e) {
        return e === void 0 ? this.localeData() : this.locale(e);
    },
);
function Tr() {
    return this._locale;
}
var Ee = 1e3,
    he = 60 * Ee,
    Ie = 60 * he,
    Nr = (365 * 400 + 97) * 24 * Ie;
function ce(e, t) {
    return ((e % t) + t) % t;
}
function Pr(e, t, r) {
    return e < 100 && e >= 0 ? new Date(e + 400, t, r) - Nr : new Date(e, t, r).valueOf();
}
function Rr(e, t, r) {
    return e < 100 && e >= 0 ? Date.UTC(e + 400, t, r) - Nr : Date.UTC(e, t, r);
}
function jn(e) {
    var t, r;
    if (((e = F(e)), e === void 0 || e === 'millisecond' || !this.isValid())) return this;
    switch (((r = this._isUTC ? Rr : Pr), e)) {
        case 'year':
            t = r(this.year(), 0, 1);
            break;
        case 'quarter':
            t = r(this.year(), this.month() - (this.month() % 3), 1);
            break;
        case 'month':
            t = r(this.year(), this.month(), 1);
            break;
        case 'week':
            t = r(this.year(), this.month(), this.date() - this.weekday());
            break;
        case 'isoWeek':
            t = r(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
            break;
        case 'day':
        case 'date':
            t = r(this.year(), this.month(), this.date());
            break;
        case 'hour':
            (t = this._d.valueOf()), (t -= ce(t + (this._isUTC ? 0 : this.utcOffset() * he), Ie));
            break;
        case 'minute':
            (t = this._d.valueOf()), (t -= ce(t, he));
            break;
        case 'second':
            (t = this._d.valueOf()), (t -= ce(t, Ee));
            break;
    }
    return this._d.setTime(t), u.updateOffset(this, !0), this;
}
function Hn(e) {
    var t, r;
    if (((e = F(e)), e === void 0 || e === 'millisecond' || !this.isValid())) return this;
    switch (((r = this._isUTC ? Rr : Pr), e)) {
        case 'year':
            t = r(this.year() + 1, 0, 1) - 1;
            break;
        case 'quarter':
            t = r(this.year(), this.month() - (this.month() % 3) + 3, 1) - 1;
            break;
        case 'month':
            t = r(this.year(), this.month() + 1, 1) - 1;
            break;
        case 'week':
            t = r(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
            break;
        case 'isoWeek':
            t = r(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
            break;
        case 'day':
        case 'date':
            t = r(this.year(), this.month(), this.date() + 1) - 1;
            break;
        case 'hour':
            (t = this._d.valueOf()), (t += Ie - ce(t + (this._isUTC ? 0 : this.utcOffset() * he), Ie) - 1);
            break;
        case 'minute':
            (t = this._d.valueOf()), (t += he - ce(t, he) - 1);
            break;
        case 'second':
            (t = this._d.valueOf()), (t += Ee - ce(t, Ee) - 1);
            break;
    }
    return this._d.setTime(t), u.updateOffset(this, !0), this;
}
function Un() {
    return this._d.valueOf() - (this._offset || 0) * 6e4;
}
function An() {
    return Math.floor(this.valueOf() / 1e3);
}
function Vn() {
    return new Date(this.valueOf());
}
function Gn() {
    var e = this;
    return [e.year(), e.month(), e.date(), e.hour(), e.minute(), e.second(), e.millisecond()];
}
function zn() {
    var e = this;
    return {
        years: e.year(),
        months: e.month(),
        date: e.date(),
        hours: e.hours(),
        minutes: e.minutes(),
        seconds: e.seconds(),
        milliseconds: e.milliseconds(),
    };
}
function $n() {
    return this.isValid() ? this.toISOString() : null;
}
function Zn() {
    return _t(this);
}
function qn() {
    return X({}, m(this));
}
function Bn() {
    return m(this).overflow;
}
function Jn() {
    return { input: this._i, format: this._f, locale: this._locale, isUTC: this._isUTC, strict: this._strict };
}
h('N', 0, 0, 'eraAbbr');
h('NN', 0, 0, 'eraAbbr');
h('NNN', 0, 0, 'eraAbbr');
h('NNNN', 0, 0, 'eraName');
h('NNNNN', 0, 0, 'eraNarrow');
h('y', ['y', 1], 'yo', 'eraYear');
h('y', ['yy', 2], 0, 'eraYear');
h('y', ['yyy', 3], 0, 'eraYear');
h('y', ['yyyy', 4], 0, 'eraYear');
d('N', Wt);
d('NN', Wt);
d('NNN', Wt);
d('NNNN', li);
d('NNNNN', oi);
v(['N', 'NN', 'NNN', 'NNNN', 'NNNNN'], function (e, t, r, s) {
    var a = r._locale.erasParse(e, s, r._strict);
    a ? (m(r).era = a) : (m(r).invalidEra = e);
});
d('y', _e);
d('yy', _e);
d('yyy', _e);
d('yyyy', _e);
d('yo', ui);
v(['y', 'yy', 'yyy', 'yyyy'], x);
v(['yo'], function (e, t, r, s) {
    var a;
    r._locale._eraYearOrdinalRegex && (a = e.match(r._locale._eraYearOrdinalRegex)),
        r._locale.eraYearOrdinalParse ? (t[x] = r._locale.eraYearOrdinalParse(e, a)) : (t[x] = parseInt(e, 10));
});
function Qn(e, t) {
    var r,
        s,
        a,
        n = this._eras || Q('en')._eras;
    for (r = 0, s = n.length; r < s; ++r) {
        switch (typeof n[r].since) {
            case 'string':
                (a = u(n[r].since).startOf('day')), (n[r].since = a.valueOf());
                break;
        }
        switch (typeof n[r].until) {
            case 'undefined':
                n[r].until = 1 / 0;
                break;
            case 'string':
                (a = u(n[r].until).startOf('day').valueOf()), (n[r].until = a.valueOf());
                break;
        }
    }
    return n;
}
function Kn(e, t, r) {
    var s,
        a,
        n = this.eras(),
        i,
        o,
        f;
    for (e = e.toUpperCase(), s = 0, a = n.length; s < a; ++s)
        if (((i = n[s].name.toUpperCase()), (o = n[s].abbr.toUpperCase()), (f = n[s].narrow.toUpperCase()), r))
            switch (t) {
                case 'N':
                case 'NN':
                case 'NNN':
                    if (o === e) return n[s];
                    break;
                case 'NNNN':
                    if (i === e) return n[s];
                    break;
                case 'NNNNN':
                    if (f === e) return n[s];
                    break;
            }
        else if ([i, o, f].indexOf(e) >= 0) return n[s];
}
function Xn(e, t) {
    var r = e.since <= e.until ? 1 : -1;
    return t === void 0 ? u(e.since).year() : u(e.since).year() + (t - e.offset) * r;
}
function ei() {
    var e,
        t,
        r,
        s = this.localeData().eras();
    for (e = 0, t = s.length; e < t; ++e)
        if (
            ((r = this.clone().startOf('day').valueOf()),
            (s[e].since <= r && r <= s[e].until) || (s[e].until <= r && r <= s[e].since))
        )
            return s[e].name;
    return '';
}
function ti() {
    var e,
        t,
        r,
        s = this.localeData().eras();
    for (e = 0, t = s.length; e < t; ++e)
        if (
            ((r = this.clone().startOf('day').valueOf()),
            (s[e].since <= r && r <= s[e].until) || (s[e].until <= r && r <= s[e].since))
        )
            return s[e].narrow;
    return '';
}
function ri() {
    var e,
        t,
        r,
        s = this.localeData().eras();
    for (e = 0, t = s.length; e < t; ++e)
        if (
            ((r = this.clone().startOf('day').valueOf()),
            (s[e].since <= r && r <= s[e].until) || (s[e].until <= r && r <= s[e].since))
        )
            return s[e].abbr;
    return '';
}
function si() {
    var e,
        t,
        r,
        s,
        a = this.localeData().eras();
    for (e = 0, t = a.length; e < t; ++e)
        if (
            ((r = a[e].since <= a[e].until ? 1 : -1),
            (s = this.clone().startOf('day').valueOf()),
            (a[e].since <= s && s <= a[e].until) || (a[e].until <= s && s <= a[e].since))
        )
            return (this.year() - u(a[e].since).year()) * r + a[e].offset;
    return this.year();
}
function ai(e) {
    return g(this, '_erasNameRegex') || Ft.call(this), e ? this._erasNameRegex : this._erasRegex;
}
function ni(e) {
    return g(this, '_erasAbbrRegex') || Ft.call(this), e ? this._erasAbbrRegex : this._erasRegex;
}
function ii(e) {
    return g(this, '_erasNarrowRegex') || Ft.call(this), e ? this._erasNarrowRegex : this._erasRegex;
}
function Wt(e, t) {
    return t.erasAbbrRegex(e);
}
function li(e, t) {
    return t.erasNameRegex(e);
}
function oi(e, t) {
    return t.erasNarrowRegex(e);
}
function ui(e, t) {
    return t._eraYearOrdinalRegex || _e;
}
function Ft() {
    var e = [],
        t = [],
        r = [],
        s = [],
        a,
        n,
        i,
        o,
        f,
        c = this.eras();
    for (a = 0, n = c.length; a < n; ++a)
        (i = q(c[a].name)),
            (o = q(c[a].abbr)),
            (f = q(c[a].narrow)),
            t.push(i),
            e.push(o),
            r.push(f),
            s.push(i),
            s.push(o),
            s.push(f);
    (this._erasRegex = new RegExp('^(' + s.join('|') + ')', 'i')),
        (this._erasNameRegex = new RegExp('^(' + t.join('|') + ')', 'i')),
        (this._erasAbbrRegex = new RegExp('^(' + e.join('|') + ')', 'i')),
        (this._erasNarrowRegex = new RegExp('^(' + r.join('|') + ')', 'i'));
}
h(0, ['gg', 2], 0, function () {
    return this.weekYear() % 100;
});
h(0, ['GG', 2], 0, function () {
    return this.isoWeekYear() % 100;
});
function Ke(e, t) {
    h(0, [e, e.length], 0, t);
}
Ke('gggg', 'weekYear');
Ke('ggggg', 'weekYear');
Ke('GGGG', 'isoWeekYear');
Ke('GGGGG', 'isoWeekYear');
d('G', Ze);
d('g', Ze);
d('GG', k, P);
d('gg', k, P);
d('GGGG', kt, wt);
d('gggg', kt, wt);
d('GGGGG', $e, Ge);
d('ggggg', $e, Ge);
xe(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (e, t, r, s) {
    t[s.substr(0, 2)] = _(e);
});
xe(['gg', 'GG'], function (e, t, r, s) {
    t[s] = u.parseTwoDigitYear(e);
});
function di(e) {
    return Wr.call(
        this,
        e,
        this.week(),
        this.weekday() + this.localeData()._week.dow,
        this.localeData()._week.dow,
        this.localeData()._week.doy,
    );
}
function fi(e) {
    return Wr.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4);
}
function hi() {
    return B(this.year(), 1, 4);
}
function ci() {
    return B(this.isoWeekYear(), 1, 4);
}
function mi() {
    var e = this.localeData()._week;
    return B(this.year(), e.dow, e.doy);
}
function _i() {
    var e = this.localeData()._week;
    return B(this.weekYear(), e.dow, e.doy);
}
function Wr(e, t, r, s, a) {
    var n;
    return e == null ? Me(this, s, a).year : ((n = B(e, s, a)), t > n && (t = n), yi.call(this, e, t, r, s, a));
}
function yi(e, t, r, s, a) {
    var n = hr(e, t, r, s, a),
        i = Se(n.year, 0, n.dayOfYear);
    return this.year(i.getUTCFullYear()), this.month(i.getUTCMonth()), this.date(i.getUTCDate()), this;
}
h('Q', 0, 'Qo', 'quarter');
d('Q', tr);
v('Q', function (e, t) {
    t[$] = (_(e) - 1) * 3;
});
function gi(e) {
    return e == null ? Math.ceil((this.month() + 1) / 3) : this.month((e - 1) * 3 + (this.month() % 3));
}
h('D', ['DD', 2], 'Do', 'date');
d('D', k, ye);
d('DD', k, P);
d('Do', function (e, t) {
    return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient;
});
v(['D', 'DD'], H);
v('Do', function (e, t) {
    t[H] = _(e.match(k)[0]);
});
var Fr = ge('Date', !0);
h('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');
d('DDD', ze);
d('DDDD', rr);
v(['DDD', 'DDDD'], function (e, t, r) {
    r._dayOfYear = _(e);
});
function pi(e) {
    var t = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
    return e == null ? t : this.add(e - t, 'd');
}
h('m', ['mm', 2], 0, 'minute');
d('m', k, St);
d('mm', k, P);
v(['m', 'mm'], L);
var vi = ge('Minutes', !1);
h('s', ['ss', 2], 0, 'second');
d('s', k, St);
d('ss', k, P);
v(['s', 'ss'], Z);
var wi = ge('Seconds', !1);
h('S', 0, 0, function () {
    return ~~(this.millisecond() / 100);
});
h(0, ['SS', 2], 0, function () {
    return ~~(this.millisecond() / 10);
});
h(0, ['SSS', 3], 0, 'millisecond');
h(0, ['SSSS', 4], 0, function () {
    return this.millisecond() * 10;
});
h(0, ['SSSSS', 5], 0, function () {
    return this.millisecond() * 100;
});
h(0, ['SSSSSS', 6], 0, function () {
    return this.millisecond() * 1e3;
});
h(0, ['SSSSSSS', 7], 0, function () {
    return this.millisecond() * 1e4;
});
h(0, ['SSSSSSSS', 8], 0, function () {
    return this.millisecond() * 1e5;
});
h(0, ['SSSSSSSSS', 9], 0, function () {
    return this.millisecond() * 1e6;
});
d('S', ze, tr);
d('SS', ze, P);
d('SSS', ze, rr);
var ee, Lr;
for (ee = 'SSSS'; ee.length <= 9; ee += 'S') d(ee, _e);
function ki(e, t) {
    t[ae] = _(('0.' + e) * 1e3);
}
for (ee = 'S'; ee.length <= 9; ee += 'S') v(ee, ki);
Lr = ge('Milliseconds', !1);
h('z', 0, 0, 'zoneAbbr');
h('zz', 0, 0, 'zoneName');
function Si() {
    return this._isUTC ? 'UTC' : '';
}
function Mi() {
    return this._isUTC ? 'Coordinated Universal Time' : '';
}
var l = Ye.prototype;
l.add = _n;
l.calendar = Sn;
l.clone = Mn;
l.diff = Nn;
l.endOf = Hn;
l.format = Fn;
l.from = Ln;
l.fromNow = Cn;
l.to = En;
l.toNow = In;
l.get = Rs;
l.invalidAt = Bn;
l.isAfter = On;
l.isBefore = Dn;
l.isBetween = Yn;
l.isSame = bn;
l.isSameOrAfter = xn;
l.isSameOrBefore = Tn;
l.isValid = Zn;
l.lang = xr;
l.locale = br;
l.localeData = Tr;
l.max = $a;
l.min = za;
l.parsingFlags = qn;
l.set = Ws;
l.startOf = jn;
l.subtract = yn;
l.toArray = Gn;
l.toObject = zn;
l.toDate = Vn;
l.toISOString = Rn;
l.inspect = Wn;
typeof Symbol < 'u' &&
    Symbol.for != null &&
    (l[Symbol.for('nodejs.util.inspect.custom')] = function () {
        return 'Moment<' + this.format() + '>';
    });
l.toJSON = $n;
l.toString = Pn;
l.unix = An;
l.valueOf = Un;
l.creationData = Jn;
l.eraName = ei;
l.eraNarrow = ti;
l.eraAbbr = ri;
l.eraYear = si;
l.year = nr;
l.isLeapYear = Ps;
l.weekYear = di;
l.isoWeekYear = fi;
l.quarter = l.quarters = gi;
l.month = dr;
l.daysInMonth = As;
l.week = l.weeks = Js;
l.isoWeek = l.isoWeeks = Qs;
l.weeksInYear = mi;
l.weeksInWeekYear = _i;
l.isoWeeksInYear = hi;
l.isoWeeksInISOWeekYear = ci;
l.date = Fr;
l.day = l.days = da;
l.weekday = fa;
l.isoWeekday = ha;
l.dayOfYear = pi;
l.hour = l.hours = va;
l.minute = l.minutes = vi;
l.second = l.seconds = wi;
l.millisecond = l.milliseconds = Lr;
l.utcOffset = tn;
l.utc = sn;
l.local = an;
l.parseZone = nn;
l.hasAlignedHourOffset = ln;
l.isDST = on;
l.isLocal = dn;
l.isUtcOffset = fn;
l.isUtc = Mr;
l.isUTC = Mr;
l.zoneAbbr = Si;
l.zoneName = Mi;
l.dates = W('dates accessor is deprecated. Use date instead.', Fr);
l.months = W('months accessor is deprecated. Use month instead', dr);
l.years = W('years accessor is deprecated. Use year instead', nr);
l.zone = W(
    'moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/',
    rn,
);
l.isDSTShifted = W(
    'isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information',
    un,
);
function Oi(e) {
    return w(e * 1e3);
}
function Di() {
    return w.apply(null, arguments).parseZone();
}
function Cr(e) {
    return e;
}
var p = gt.prototype;
p.calendar = us;
p.longDateFormat = cs;
p.invalidDate = _s;
p.ordinal = ps;
p.preparse = Cr;
p.postformat = Cr;
p.relativeTime = ws;
p.pastFuture = ks;
p.set = ls;
p.eras = Qn;
p.erasParse = Kn;
p.erasConvertYear = Xn;
p.erasAbbrRegex = ni;
p.erasNameRegex = ai;
p.erasNarrowRegex = ii;
p.months = Is;
p.monthsShort = js;
p.monthsParse = Us;
p.monthsRegex = Gs;
p.monthsShortRegex = Vs;
p.week = $s;
p.firstDayOfYear = Bs;
p.firstDayOfWeek = qs;
p.weekdays = na;
p.weekdaysMin = la;
p.weekdaysShort = ia;
p.weekdaysParse = ua;
p.weekdaysRegex = ca;
p.weekdaysShortRegex = ma;
p.weekdaysMinRegex = _a;
p.isPM = ga;
p.meridiem = wa;
function je(e, t, r, s) {
    var a = Q(),
        n = A().set(s, t);
    return a[r](n, e);
}
function Er(e, t, r) {
    if ((J(e) && ((t = e), (e = void 0)), (e = e || ''), t != null)) return je(e, t, r, 'month');
    var s,
        a = [];
    for (s = 0; s < 12; s++) a[s] = je(e, s, r, 'month');
    return a;
}
function Lt(e, t, r, s) {
    typeof e == 'boolean'
        ? (J(t) && ((r = t), (t = void 0)), (t = t || ''))
        : ((t = e), (r = t), (e = !1), J(t) && ((r = t), (t = void 0)), (t = t || ''));
    var a = Q(),
        n = e ? a._week.dow : 0,
        i,
        o = [];
    if (r != null) return je(t, (r + n) % 7, s, 'day');
    for (i = 0; i < 7; i++) o[i] = je(t, (i + n) % 7, s, 'day');
    return o;
}
function Yi(e, t) {
    return Er(e, t, 'months');
}
function bi(e, t) {
    return Er(e, t, 'monthsShort');
}
function xi(e, t, r) {
    return Lt(e, t, r, 'weekdays');
}
function Ti(e, t, r) {
    return Lt(e, t, r, 'weekdaysShort');
}
function Ni(e, t, r) {
    return Lt(e, t, r, 'weekdaysMin');
}
te('en', {
    eras: [
        { since: '0001-01-01', until: 1 / 0, offset: 1, name: 'Anno Domini', narrow: 'AD', abbr: 'AD' },
        { since: '0000-12-31', until: -1 / 0, offset: 1, name: 'Before Christ', narrow: 'BC', abbr: 'BC' },
    ],
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal: function (e) {
        var t = e % 10,
            r = _((e % 100) / 10) === 1 ? 'th' : t === 1 ? 'st' : t === 2 ? 'nd' : t === 3 ? 'rd' : 'th';
        return e + r;
    },
});
u.lang = W('moment.lang is deprecated. Use moment.locale instead.', te);
u.langData = W('moment.langData is deprecated. Use moment.localeData instead.', Q);
var G = Math.abs;
function Pi() {
    var e = this._data;
    return (
        (this._milliseconds = G(this._milliseconds)),
        (this._days = G(this._days)),
        (this._months = G(this._months)),
        (e.milliseconds = G(e.milliseconds)),
        (e.seconds = G(e.seconds)),
        (e.minutes = G(e.minutes)),
        (e.hours = G(e.hours)),
        (e.months = G(e.months)),
        (e.years = G(e.years)),
        this
    );
}
function Ir(e, t, r, s) {
    var a = I(t, r);
    return (
        (e._milliseconds += s * a._milliseconds), (e._days += s * a._days), (e._months += s * a._months), e._bubble()
    );
}
function Ri(e, t) {
    return Ir(this, e, t, 1);
}
function Wi(e, t) {
    return Ir(this, e, t, -1);
}
function At(e) {
    return e < 0 ? Math.floor(e) : Math.ceil(e);
}
function Fi() {
    var e = this._milliseconds,
        t = this._days,
        r = this._months,
        s = this._data,
        a,
        n,
        i,
        o,
        f;
    return (
        (e >= 0 && t >= 0 && r >= 0) ||
            (e <= 0 && t <= 0 && r <= 0) ||
            ((e += At(ft(r) + t) * 864e5), (t = 0), (r = 0)),
        (s.milliseconds = e % 1e3),
        (a = R(e / 1e3)),
        (s.seconds = a % 60),
        (n = R(a / 60)),
        (s.minutes = n % 60),
        (i = R(n / 60)),
        (s.hours = i % 24),
        (t += R(i / 24)),
        (f = R(jr(t))),
        (r += f),
        (t -= At(ft(f))),
        (o = R(r / 12)),
        (r %= 12),
        (s.days = t),
        (s.months = r),
        (s.years = o),
        this
    );
}
function jr(e) {
    return (e * 4800) / 146097;
}
function ft(e) {
    return (e * 146097) / 4800;
}
function Li(e) {
    if (!this.isValid()) return NaN;
    var t,
        r,
        s = this._milliseconds;
    if (((e = F(e)), e === 'month' || e === 'quarter' || e === 'year'))
        switch (((t = this._days + s / 864e5), (r = this._months + jr(t)), e)) {
            case 'month':
                return r;
            case 'quarter':
                return r / 3;
            case 'year':
                return r / 12;
        }
    else
        switch (((t = this._days + Math.round(ft(this._months))), e)) {
            case 'week':
                return t / 7 + s / 6048e5;
            case 'day':
                return t + s / 864e5;
            case 'hour':
                return t * 24 + s / 36e5;
            case 'minute':
                return t * 1440 + s / 6e4;
            case 'second':
                return t * 86400 + s / 1e3;
            case 'millisecond':
                return Math.floor(t * 864e5) + s;
            default:
                throw new Error('Unknown unit ' + e);
        }
}
function K(e) {
    return function () {
        return this.as(e);
    };
}
var Hr = K('ms'),
    Ci = K('s'),
    Ei = K('m'),
    Ii = K('h'),
    ji = K('d'),
    Hi = K('w'),
    Ui = K('M'),
    Ai = K('Q'),
    Vi = K('y'),
    Gi = Hr;
function zi() {
    return I(this);
}
function $i(e) {
    return (e = F(e)), this.isValid() ? this[e + 's']() : NaN;
}
function le(e) {
    return function () {
        return this.isValid() ? this._data[e] : NaN;
    };
}
var Zi = le('milliseconds'),
    qi = le('seconds'),
    Bi = le('minutes'),
    Ji = le('hours'),
    Qi = le('days'),
    Ki = le('months'),
    Xi = le('years');
function el() {
    return R(this.days() / 7);
}
var z = Math.round,
    de = { ss: 44, s: 45, m: 45, h: 22, d: 26, w: null, M: 11 };
function tl(e, t, r, s, a) {
    return a.relativeTime(t || 1, !!r, e, s);
}
function rl(e, t, r, s) {
    var a = I(e).abs(),
        n = z(a.as('s')),
        i = z(a.as('m')),
        o = z(a.as('h')),
        f = z(a.as('d')),
        c = z(a.as('M')),
        M = z(a.as('w')),
        b = z(a.as('y')),
        j =
            (n <= r.ss && ['s', n]) ||
            (n < r.s && ['ss', n]) ||
            (i <= 1 && ['m']) ||
            (i < r.m && ['mm', i]) ||
            (o <= 1 && ['h']) ||
            (o < r.h && ['hh', o]) ||
            (f <= 1 && ['d']) ||
            (f < r.d && ['dd', f]);
    return (
        r.w != null && (j = j || (M <= 1 && ['w']) || (M < r.w && ['ww', M])),
        (j = j || (c <= 1 && ['M']) || (c < r.M && ['MM', c]) || (b <= 1 && ['y']) || ['yy', b]),
        (j[2] = t),
        (j[3] = +e > 0),
        (j[4] = s),
        tl.apply(null, j)
    );
}
function sl(e) {
    return e === void 0 ? z : typeof e == 'function' ? ((z = e), !0) : !1;
}
function al(e, t) {
    return de[e] === void 0 ? !1 : t === void 0 ? de[e] : ((de[e] = t), e === 's' && (de.ss = t - 1), !0);
}
function nl(e, t) {
    if (!this.isValid()) return this.localeData().invalidDate();
    var r = !1,
        s = de,
        a,
        n;
    return (
        typeof e == 'object' && ((t = e), (e = !1)),
        typeof e == 'boolean' && (r = e),
        typeof t == 'object' && ((s = Object.assign({}, de, t)), t.s != null && t.ss == null && (s.ss = t.s - 1)),
        (a = this.localeData()),
        (n = rl(this, !r, s, a)),
        r && (n = a.pastFuture(+this, n)),
        a.postformat(n)
    );
}
var st = Math.abs;
function oe(e) {
    return (e > 0) - (e < 0) || +e;
}
function Xe() {
    if (!this.isValid()) return this.localeData().invalidDate();
    var e = st(this._milliseconds) / 1e3,
        t = st(this._days),
        r = st(this._months),
        s,
        a,
        n,
        i,
        o = this.asSeconds(),
        f,
        c,
        M,
        b;
    return o
        ? ((s = R(e / 60)),
          (a = R(s / 60)),
          (e %= 60),
          (s %= 60),
          (n = R(r / 12)),
          (r %= 12),
          (i = e ? e.toFixed(3).replace(/\.?0+$/, '') : ''),
          (f = o < 0 ? '-' : ''),
          (c = oe(this._months) !== oe(o) ? '-' : ''),
          (M = oe(this._days) !== oe(o) ? '-' : ''),
          (b = oe(this._milliseconds) !== oe(o) ? '-' : ''),
          f +
              'P' +
              (n ? c + n + 'Y' : '') +
              (r ? c + r + 'M' : '') +
              (t ? M + t + 'D' : '') +
              (a || s || e ? 'T' : '') +
              (a ? b + a + 'H' : '') +
              (s ? b + s + 'M' : '') +
              (e ? b + i + 'S' : ''))
        : 'P0D';
}
var y = Qe.prototype;
y.isValid = Qa;
y.abs = Pi;
y.add = Ri;
y.subtract = Wi;
y.as = Li;
y.asMilliseconds = Hr;
y.asSeconds = Ci;
y.asMinutes = Ei;
y.asHours = Ii;
y.asDays = ji;
y.asWeeks = Hi;
y.asMonths = Ui;
y.asQuarters = Ai;
y.asYears = Vi;
y.valueOf = Gi;
y._bubble = Fi;
y.clone = zi;
y.get = $i;
y.milliseconds = Zi;
y.seconds = qi;
y.minutes = Bi;
y.hours = Ji;
y.days = Qi;
y.weeks = el;
y.months = Ki;
y.years = Xi;
y.humanize = nl;
y.toISOString = Xe;
y.toString = Xe;
y.toJSON = Xe;
y.locale = br;
y.localeData = Tr;
y.toIsoString = W('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', Xe);
y.lang = xr;
h('X', 0, 0, 'unix');
h('x', 0, 0, 'valueOf');
d('x', Ze);
d('X', Ds);
v('X', function (e, t, r) {
    r._d = new Date(parseFloat(e) * 1e3);
});
v('x', function (e, t, r) {
    r._d = new Date(_(e));
}); //! moment.js
u.version = '2.30.1';
ns(w);
u.fn = l;
u.min = Za;
u.max = qa;
u.now = Ba;
u.utc = A;
u.unix = Oi;
u.months = Yi;
u.isDate = De;
u.locale = te;
u.invalid = Ve;
u.duration = I;
u.isMoment = E;
u.weekdays = xi;
u.parseZone = Di;
u.localeData = Q;
u.isDuration = We;
u.monthsShort = bi;
u.weekdaysMin = Ni;
u.defineLocale = bt;
u.updateLocale = Oa;
u.locales = Da;
u.weekdaysShort = Ti;
u.normalizeUnits = F;
u.relativeTimeRounding = sl;
u.relativeTimeThreshold = al;
u.calendarFormat = kn;
u.prototype = l;
u.HTML5_FMT = {
    DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',
    DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',
    DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',
    DATE: 'YYYY-MM-DD',
    TIME: 'HH:mm',
    TIME_SECONDS: 'HH:mm:ss',
    TIME_MS: 'HH:mm:ss.SSS',
    WEEK: 'GGGG-[W]WW',
    MONTH: 'YYYY-MM',
}; //! moment.js locale configuration
//! locale : Norwegian Bokmål [nb]
//! authors : Espen Hovlandsdal : https://github.com/rexxars
//!           Sigurd Gartmann : https://github.com/sigurdga
//!           Stephen Ramthun : https://github.com/stephenramthun
u.defineLocale('nb', {
    months: 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
    monthsShort: 'jan._feb._mars_apr._mai_juni_juli_aug._sep._okt._nov._des.'.split('_'),
    monthsParseExact: !0,
    weekdays: 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
    weekdaysShort: 'sø._ma._ti._on._to._fr._lø.'.split('_'),
    weekdaysMin: 'sø_ma_ti_on_to_fr_lø'.split('_'),
    weekdaysParseExact: !0,
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY [kl.] HH:mm',
        LLLL: 'dddd D. MMMM YYYY [kl.] HH:mm',
    },
    calendar: {
        sameDay: '[i dag kl.] LT',
        nextDay: '[i morgen kl.] LT',
        nextWeek: 'dddd [kl.] LT',
        lastDay: '[i går kl.] LT',
        lastWeek: '[forrige] dddd [kl.] LT',
        sameElse: 'L',
    },
    relativeTime: {
        future: 'om %s',
        past: '%s siden',
        s: 'noen sekunder',
        ss: '%d sekunder',
        m: 'ett minutt',
        mm: '%d minutter',
        h: 'én time',
        hh: '%d timer',
        d: 'én dag',
        dd: '%d dager',
        w: 'én uke',
        ww: '%d uker',
        M: 'én måned',
        MM: '%d måneder',
        y: 'ett år',
        yy: '%d år',
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: { dow: 1, doy: 4 },
});
u.locale('nb');
const il = 'DD.MM.YYYY HH:mm',
    He = 'DD.MM.YYYY',
    Ue = (e, t = il) => {
        try {
            if (e === '-999999999-01-01') return '';
            const r = u(e).format(t);
            return r.includes('NaN') ? e : r;
        } catch {
            return e;
        }
    },
    ll = ({ startDato: e, sluttDato: t }) =>
        Y.jsx(ct, {
            header: 'Tiltaket er avsluttet',
            body: Y.jsxs(ht, {
                size: 'small',
                children: ['Tiltaket varte fra ', Ue(e, He), ' til', ' ', Ue(t, He), '.'],
            }),
        });
ll.__docgenInfo = {
    description: '',
    methods: [],
    displayName: 'Avsluttet',
    props: {
        startDato: { required: !1, tsType: { name: 'string' }, description: '' },
        sluttDato: { required: !1, tsType: { name: 'string' }, description: '' },
    },
};
const ol = ({ avtaleInngått: e, startDato: t }) =>
    Y.jsx(ct, {
        header: 'Tiltaket gjennomføres',
        body: Y.jsxs(ht, {
            size: 'small',
            children: ['Avtale ble inngått ', Ue(e, He), '. Tiltaket startet', ' ', Ue(t, He), '.'],
        }),
    });
ol.__docgenInfo = {
    description: '',
    methods: [],
    displayName: 'Gjennomføres',
    props: {
        avtaleInngått: { required: !1, tsType: { name: 'string' }, description: '' },
        startDato: { required: !1, tsType: { name: 'string' }, description: '' },
    },
};
export {
    ll as A,
    ht as B,
    ol as G,
    Ct as H,
    Bt as I,
    fl as L,
    He as N,
    ct as S,
    at as V,
    dl as a,
    $t as b,
    re as c,
    il as d,
    Ue as f,
    Y as j,
};
