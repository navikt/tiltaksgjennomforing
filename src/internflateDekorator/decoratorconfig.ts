import { DecoratorProps } from '@/internflateDekorator/decoratorprops';

const decoratorconfig = (): DecoratorProps => {
    return {
        appname: 'Tiltaksgjennomføring',
        toggles: {
            visVeileder: true,
        },
    };
};

export default decoratorconfig;
