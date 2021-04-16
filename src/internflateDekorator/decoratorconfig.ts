import { DecoratorProps } from '@/internflateDekorator/decoratorprops';

const decoratorconfig = (): DecoratorProps => {
    return {
        appname: 'Tiltaksgjennomføring',
        onSok(fnr: string) {
            return null;
        },
        onEnhetChange(enhet: string) {
            return null;
        },
        toggles: {
            visEnhet: false,
            visEnhetVelger: false,
            visSokefelt: false,
            visVeilder: true,
        },
    };
};

export default decoratorconfig;
