import * as React from 'react';
import { FunctionComponent } from 'react';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { ReactComponent as UtkastIkon } from '@/assets/ikoner/utkast.svg';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';

export const UtkastStatus: FunctionComponent = () => {
    return (
        <Innholdsboks>
            <div style={{ textAlign: 'center' }}>
                <UtkastIkon style={{ display: 'inline-block' }} />
                <VerticalSpacer rem={1} />
                <Systemtittel>Avtalen er i utkastmodus</Systemtittel>
                <VerticalSpacer rem={1} />
                <Normaltekst>
                    Du kan begynne å fylle ut avtalen, men deltager vil ikke få tilgang før NAV har godkjent dette. Når
                    deltaker har fått tilgang og alt er utfylt må alle parter godkjenne avtalen før tiltaket kan
                    iverksettes.
                </Normaltekst>
            </div>
        </Innholdsboks>
    );
};
