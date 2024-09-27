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
        environment: 'local',
        urlFormat: 'LOCAL',
        proxy: '/modiacontextholder',
        // toggles: {
        //     visVeileder: true,
        // },
    };
};

export default decoratorconfig;
