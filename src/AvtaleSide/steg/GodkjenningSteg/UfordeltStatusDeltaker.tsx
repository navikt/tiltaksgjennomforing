import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import GodkjenningsLinjeArbeidsgiverDeltaker from './GodkjenningsLinjeArbeidsgiverDeltaker';

export const UfordeltStatusDeltaker: FunctionComponent = () => {
    return (
        <Innholdsboks>
            <div style={{ textAlign: 'center' }}>
                <VerticalSpacer rem={1} />
                <Systemtittel>Utfylling av avtale påbegynt</Systemtittel>
                <VerticalSpacer rem={1} />
                <Normaltekst>
                    Innholdet i avtalen fylles ut av arbeidsgiveren og veilederen. Hvis du er uenig i innholdet eller
                    har spørsmål til avtalen, må du kontakte veilederen din via aktivitetsplanen før du godkjenner. Du
                    kan godkjenne avtalen når alt er fylt ut.
                </Normaltekst>
            </div>
            <VerticalSpacer rem={2} />
            <GodkjenningsLinjeArbeidsgiverDeltaker />
        </Innholdsboks>
    );
};
