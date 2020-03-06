/* tslint:disable:no-console */
import { DecoratorProps } from '@/internflateDekorator/decoratorprops';

const decoratorconfig = (fodselnr?: string, enhetnr?: string): DecoratorProps => {
    return {
        appname: 'tiltaksgjennomføring',
        fnr: fodselnr ? fodselnr : '', // fnr som blir sendt til context-holder
        enhet: enhetnr ? enhetnr : '', // enhet som blir sendt til context-holder
        toggles: {
            visEnhet: false,
            visEnhetVelger: false,
            visSokefelt: false,
            visVeilder: false,
        },
        contextholder: true, // satt true pr default. Vil ikke trigges så lenge gyldig fnr eller enhet er satt.

        onSok(fnr: string): void {
            // callback funksjon. Denne blir kalt av context-holder når fnr har forandret seg
            console.warn('fnr byttet', fnr);
        },
        onEnhetChange(enhet: string): void {
            // callback funksjon. Denne blir kalt av context-holder når enhet har forandret seg.
            console.warn('enhet byttet', enhet);
        },
    };
};

export default decoratorconfig;
