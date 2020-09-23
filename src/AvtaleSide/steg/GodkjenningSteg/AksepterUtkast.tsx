import * as React from 'react';
import { FunctionComponent, useContext } from 'react';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { ReactComponent as UtkastIkon } from '@/assets/ikoner/utkast.svg';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import { AvtaleContext } from '@/AvtaleContext';

export const AksepterUtkast: FunctionComponent = () => {
    const { aksepterUtkast } = useContext(AvtaleContext);
    return (
        <Innholdsboks>
            <div style={{ textAlign: 'center' }}>
                <UtkastIkon style={{ display: 'inline-block' }} />
                <VerticalSpacer rem={1} />
                <Systemtittel>Avtalen er i utkastmodus</Systemtittel>
                <VerticalSpacer rem={1} />
                <Normaltekst>
                    Avtalen er opprettet av arbeidsgiver. Deltaker har enda ikke tilgang til den. Når du overtar avtalen
                    vil deltaker få tilgang.
                </Normaltekst>
                <VerticalSpacer rem={1} />
                <LagreKnapp
                    lagre={() => aksepterUtkast()}
                    label="Overta avtale og gi deltaker tilgang"
                    suksessmelding="Avtaleutkast akseptert"
                />
            </div>
        </Innholdsboks>
    );
};
