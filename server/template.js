const internalSciptUri =
    'https://internarbeidsflatedecorator.nais.adeo.no/internarbeidsflatedecorator/v2/static/js/head.v2.min.js';
const internalStyleUri =
    'https://internarbeidsflatedecorator.nais.adeo.no/internarbeidsflatedecorator/v2/static/css/main.css';

const externalMenuUri = 'https://www.nav.no/dekoratoren/?context=arbeidsgiver&redirectToApp=true&level=Level4/no/';

const scripts = `<script src=${process.env.DECORATOR_INTERNAL_SCRIPT || internalSciptUri}></script>`;
const styles = `<link rel="stylesheet" href=${process.env.DECORATOR_INTERNAL_STYLING || internalStyleUri}>`;

const htmlExternal = [
    { inject: 'styles', from: 'styles' },
    { inject: 'scripts', from: 'scripts' },
    { inject: 'headerWithmenu', from: 'header-withmenu' },
    { inject: 'footerWithmenu', from: 'footer-withmenu' },
    { inject: 'megamenuResources', from: 'megamenu-resources' },
];

const htmlInternal = [
    { inject: 'styles', from: styles },
    { inject: 'scripts', from: scripts },
];

module.exports.externalMenuUri = externalMenuUri;
module.exports.htmlExternal = htmlExternal;
module.exports.htmlInternal = htmlInternal;
