//https://medium.com/@vshab/create-react-app-and-sentry-cde1f15cbaa
import SentryCli from '@sentry/cli';
import { execSync } from 'node:child_process';

async function createReleaseAndUpload() {
    const release = execSync("git log -n 1 --pretty=format:'%h'").toString();
    if (!release) {
        console.warn('GIT_COMMIT_HASH is not set');
        return;
    }
    const cli = new SentryCli();
    try {
        console.log('Creating sentry release ' + release);
        await cli.releases.new(release);

        console.log('Uploading source maps');
        await cli.releases.uploadSourceMaps(release, {
            include: ['dist/assets'],
            urlPrefix: '~/tiltaksgjennomforing/assets',
            rewrite: false,
        });
        console.log('Finalizing release');
        await cli.releases.finalize(release);
    } catch (e) {
        console.error('Source maps uploading failed:', e);
    }
}

createReleaseAndUpload();
