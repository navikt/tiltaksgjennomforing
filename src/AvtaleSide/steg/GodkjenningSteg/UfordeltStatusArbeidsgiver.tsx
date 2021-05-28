import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { TiltaksType } from '@/types/avtale';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import GodkjenningsLinjeArbeidsgiverDeltaker from './GodkjenningsLinjeArbeidsgiverDeltaker';

type Props = {
    tiltakstype: TiltaksType;
};

export const UfordeltStatusArbeidsgiver: FunctionComponent<Props> = props => {
    return (
        <Innholdsboks>
            <div style={{ textAlign: 'center' }}>
                <VerticalSpacer rem={1} />
                <Systemtittel>Avtalen er ikke fordelt til en veileder i NAV enda</Systemtittel>
                <VerticalSpacer rem={1} />
                {props.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' || props.tiltakstype === 'VARIG_LONNSTILSKUDD' ? (
                    <Normaltekst>
                        Du kan begynne å fylle ut avtalen, men lønnstilskuddsprosent må veileder fylle ut før avtalen
                        kan godkjennes.
                    </Normaltekst>
                ) : (
                    <Normaltekst>
                        Du kan likevel begynne å fylle ut avtalen og godkjenne den. Når avtalen har blitt tildelt en
                        veileder kan veilederen godkjenne den.
                    </Normaltekst>
                )}
            </div>
            <VerticalSpacer rem={2} />
            <GodkjenningsLinjeArbeidsgiverDeltaker />
        </Innholdsboks>
    );
};
