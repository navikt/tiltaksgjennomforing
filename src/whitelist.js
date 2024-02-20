const whitelistPaths = [
    'avtaler',
    'innlogget-bruker',
    'feature',
    'organisasjoner',
    'varsler',
    'bjelle-varsler',
    'hendelselogg',
    'be-om-altinn-rettighet-urler',
    'kodeverk',
];

if (process.env.NODE_ENV === 'development') {
    // Funksjoner som bare skal finnes lokalt, bl.a. generering av id-token
    whitelistPaths.push('local');
}

const whitelist = {};
whitelistPaths.forEach((url) => {
    const fraUrl = '^/tiltaksgjennomforing/api/' + url;
    const tilUrl = '/tiltaksgjennomforing-api/' + url;
    whitelist[fraUrl] = tilUrl;
});

module.exports = whitelist;
