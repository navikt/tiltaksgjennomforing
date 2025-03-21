import { DecoratorProps } from '@/internflateDekorator/decoratorprops';
import { miljo } from '@/utils';

const decoratorconfig = (): DecoratorProps => {
    return {
        appName: 'Tiltaksgjennomføring',
        onEnhetChanged: () => {},
        onFnrChanged: () => {},
        fetchActiveEnhetOnMount: true,
        fetchActiveUserOnMount: true,
        fnrSyncMode: 'ignore',
        enhetSyncMode: 'ignore',
        showEnheter: false,
        showSearchArea: false,
        showHotkeys: false,
        environment: miljo() === 'prod' ? 'prod' : 'q2',
        urlFormat: 'NAV_NO',
        proxy: '/modiacontextholder',
    };
};

export default decoratorconfig;
