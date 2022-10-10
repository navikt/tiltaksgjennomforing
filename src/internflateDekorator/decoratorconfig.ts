import { DecoratorProps } from '@/internflateDekorator/decoratorprops';

const decoratorconfig = (): DecoratorProps => {
    return {
        appname: 'Tiltaksgjennomføring',
        useProxy: true,
        toggles: {
            visVeileder: true,
        },
    };
};

export default decoratorconfig;
