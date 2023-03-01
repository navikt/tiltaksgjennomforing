interface HTMLKeyValueMap {
    key: string;
    value: string;
}

const internalSciptUri: string =
    'https://internarbeidsflatedecorator.nais.adeo.no/internarbeidsflatedecorator/v2/static/js/head.v2.min.js';
const internalStyleUri: string =
    'https://internarbeidsflatedecorator.nais.adeo.no/internarbeidsflatedecorator/v2/static/css/main.css';

const externalMenuUri: string =
    'https://www.nav.no/dekoratoren/?context=arbeidsgiver&redirectToApp=true&level=Level4/no/';

const scripts: string = `<script src=${process.env.DECORATOR_INTERNAL_SCRIPT || internalSciptUri}></script>`;
const styles: string = `<link rel="stylesheet" href=${process.env.DECORATOR_INTERNAL_STYLING || internalStyleUri}>`;

const htmlKeyValueMap: HTMLKeyValueMap[] = [
    { key: 'styles', value: 'styles' },
    { key: 'scripts', value: 'scripts' },
    { key: 'headerWithmenu', value: 'header-withmenu' },
    { key: 'footerWithmenu', value: 'footer-withmenu' },
    { key: 'megamenuResources', value: 'megamenu-resources' },
];

const htmlInternalKeyValueMap: HTMLKeyValueMap[] = [
    { key: 'styles', value: styles },
    { key: 'scripts', value: scripts },
];

export default { externalMenuUri, htmlKeyValueMap, htmlInternalKeyValueMap };
