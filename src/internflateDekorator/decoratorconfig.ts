import { DecoratorProps } from '@/internflateDekorator/decoratorprops';

const decoratorconfig = (): DecoratorProps => {
    return {
        appName: 'Tiltaksgjennomføring',
        onEnhetChanged: () => {},
        onFnrChanged: () => {},
        showEnheter: false,
        showSearchArea: false,
        showHotkeys: false,
        environment: 'local',
        urlFormat: 'LOCAL',
        // toggles: {
        //     visVeileder: true,
        // },
    };
};

export default decoratorconfig;
