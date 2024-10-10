import { DecoratorProps } from '@/internflateDekorator/decoratorprops';
import { miljo } from '@/utils/utils';

const decoratorconfig = (): DecoratorProps => {
    return {
        appName: 'Tiltaksgjennomføring',
        onEnhetChanged: () => {},
        onFnrChanged: () => {},
        fetchActiveEnhetOnMount: true,
        fetchActiveUserOnMount: true,
        fnrSyncMode: 'writeOnly',
        enhetSyncMode: 'writeOnly',
        showEnheter: false,
        showSearchArea: false,
        showHotkeys: false,
        environment: miljo() === 'prod' ? 'prod' : 'q2',
        urlFormat: 'NAV_NO',
        proxy: '/modiacontextholder',
    };
};

export default decoratorconfig;
