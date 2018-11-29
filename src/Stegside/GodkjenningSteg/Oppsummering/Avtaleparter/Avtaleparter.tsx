import * as React from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Avtale } from '../../../avtale';

interface Props {
    avtale: Avtale;
}

const Avtaleparter = (props: Props) => (
    <>
        <Systemtittel>Godkjenning av avtale</Systemtittel>
        <Normaltekst>
            Dette er en avtale inngått av følgende parter:
        </Normaltekst>
        <Normaltekst>Deltaker</Normaltekst>
        <Normaltekst>{`${props.avtale.deltakerFornavn} ${
            props.avtale.deltakerEtternavn
        }`}</Normaltekst>
        <Normaltekst>Arbeidsgiver</Normaltekst>
        <Normaltekst>{`${props.avtale.bedriftNavn} v/${
            props.avtale.arbeidsgiverFornavn
        } ${props.avtale.arbeidsgiverEtternavn}`}</Normaltekst>
        <Normaltekst>NAV</Normaltekst>
        <Normaltekst>{`${props.avtale.veilederFornavn} ${
            props.avtale.veilederEtternavn
        }`}</Normaltekst>
    </>
);

export default Avtaleparter;
