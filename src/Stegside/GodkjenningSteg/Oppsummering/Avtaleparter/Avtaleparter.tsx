import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Avtale } from '../../../avtale';
import './Avtaleparter.less';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';

interface Props {
    avtale: Avtale;
}

const Avtaleparter = (props: Props) => (
    <Stegoppsummering tittel="Avtalens parter">
        <Normaltekst className="avtaleparter__label">Deltaker</Normaltekst>
        <Normaltekst className="avtaleparter__navn">{`${
            props.avtale.deltakerFornavn
        } ${props.avtale.deltakerEtternavn}`}</Normaltekst>
        <Normaltekst className="avtaleparter__label">Arbeidsgiver</Normaltekst>
        <Normaltekst className="avtaleparter__navn">{`${
            props.avtale.bedriftNavn
        } v/${props.avtale.arbeidsgiverFornavn} ${
            props.avtale.arbeidsgiverEtternavn
        }`}</Normaltekst>
        <Normaltekst className="avtaleparter__label">NAV</Normaltekst>
        <Normaltekst className="avtaleparter__navn">{`${
            props.avtale.veilederFornavn
        } ${props.avtale.veilederEtternavn}`}</Normaltekst>
    </Stegoppsummering>
);

export default Avtaleparter;
