/* tslint:disable:no-console */
import { DecoratorProps } from '@/internflateDekorator/decoratorprops';

const decoratorconfig = (fodselnr?: string, enhetnr?: string): DecoratorProps => {
    return {
        appname: 'tiltaksgjennomføring',
        toggles: {
            visVeileder: true,
        },
    };
};

export default decoratorconfig;
