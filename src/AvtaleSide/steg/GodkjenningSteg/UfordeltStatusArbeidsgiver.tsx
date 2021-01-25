import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent } from 'react';
import GodkjenningsLinjeArbeidsgiverDeltaker from './GodkjenningsLinjeArbeidsgiverDeltaker';

export const UfordeltStatusArbeidsgiver: FunctionComponent = () => {
    return (
        <Innholdsboks>
            <div style={{ textAlign: 'center' }}>
                <VerticalSpacer rem={1} />
                <Systemtittel>Avtalen er ikke fordelt til en veileder i NAV enda</Systemtittel>
                <VerticalSpacer rem={1} />
                <Normaltekst>
                    Du kan likevel begynne å fylle ut avtalen og godkjenne den. Når avtalen har blitt tildelt en
                    veileder kan veilederen godkjenne den.
                </Normaltekst>
            </div>
            <VerticalSpacer rem={2} />
            <GodkjenningsLinjeArbeidsgiverDeltaker />
        </Innholdsboks>
    );
};
