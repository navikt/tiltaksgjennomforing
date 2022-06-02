import amplitude from 'amplitude-js';

const erProd =
    window.location.hostname === 'arbeidsgiver.nav.no' || window.location.hostname === 'arbeidsgiver.nais.adeo.no';
const apiKey = erProd ? '3a6fe32c3457e77ce81c356bb14ca886' : '55477baea93c5227d8c0f6b813653615';

const instance = amplitude.getInstance();
instance.init(apiKey, '', {
    apiEndpoint: 'amplitude.nav.no/collect',
    saveEvents: false,
    includeUtm: true,
    batchEvents: false,
    includeReferrer: true,
});

export default instance;

export const trackVideo = (event: any): void => {
    const attributeName = 'amplitude-tracked';
    const played = event.target.currentTime / event.target.duration;
    const amplitudeTracked = event.target.getAttribute(attributeName);
    if (played > 0.5 && amplitudeTracked !== '50') {
        instance.logEvent('#tiltak-infoside-video-spilt-av', {
            src: event.target.currentSrc,
        });
        event.target.setAttribute(attributeName, '50');
    }
};
