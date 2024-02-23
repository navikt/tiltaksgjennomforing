const paths = ['/feature'];

const whitelistPaths: Array<string> = [];
paths.forEach((path) => {
    whitelistPaths.push((path = '/tiltaksgjennomforing/api' + path));
});

export default whitelistPaths;
