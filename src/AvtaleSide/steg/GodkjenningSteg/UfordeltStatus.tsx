import * as React from 'react';
import { FunctionComponent } from 'react';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { ReactComponent as UtkastIkon } from '@/assets/ikoner/utkast.svg';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';

export const UfordeltStatus: FunctionComponent = () => {
    return (
        <Innholdsboks>
            <div style={{ textAlign: 'center' }}>
                <UtkastIkon style={{ display: 'inline-block' }} />
                <VerticalSpacer rem={1} />
                <Systemtittel>Avtalen kan godkjennes</Systemtittel>
                <VerticalSpacer rem={1} />
                <Normaltekst>
                    Når avtalen er ferdig utfylt kan du og deltaker godkjenne den. Deltaker vil få tilgang til avtalen
                    via lenken til avtalen. Når alt er utfylt og avtalen er tildelt en veileder i NAV, må alle parter
                    godkjenne avtalen før tiltaket kan iverksettes.
                </Normaltekst>
            </div>
        </Innholdsboks>
    );
};
