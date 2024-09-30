import { DecoratorProps } from '@/internflateDekorator/decoratorprops';

const decoratorconfig = (): DecoratorProps => {
    return {
        appName: 'Tiltaksgjennomføring',
        onEnhetChanged: () => {},
        onFnrChanged: () => {},
        fetchActiveEnhetOnMount: false,
        fetchActiveUserOnMount: false,
        showEnheter: false,
        showSearchArea: false,
        showHotkeys: false,
        environment: 'q2',
        urlFormat: 'NAV_NO',
        proxy: '/modiacontextholder',
    };
};

export default decoratorconfig;
