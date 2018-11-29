import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Avtale } from '../../../avtale';
import './Avtaleparter.less';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';

interface Props {
    avtale: Avtale;
}

const Avtaleparter = (props: Props) => {
    const {
        deltakerFornavn,
        deltakerEtternavn,
        bedriftNavn,
        arbeidsgiverFornavn,
        arbeidsgiverEtternavn,
        veilederFornavn,
        veilederEtternavn,
    } = props.avtale;

    const deltakerNavn = `${deltakerFornavn} ${deltakerEtternavn}`;
    const bedriftInfo = `${bedriftNavn} v/${arbeidsgiverFornavn} ${arbeidsgiverEtternavn}`;
    const veilederNavn = `${veilederFornavn} ${veilederEtternavn}`;

    return (
        <Stegoppsummering tittel="Avtalens parter">
            <Normaltekst className="avtaleparter__label">Deltaker</Normaltekst>
            <Normaltekst className="avtaleparter__navn">
                {deltakerNavn}
            </Normaltekst>
            <Normaltekst className="avtaleparter__label">
                Arbeidsgiver
            </Normaltekst>
            <Normaltekst className="avtaleparter__navn">
                {bedriftInfo}
            </Normaltekst>
            <Normaltekst className="avtaleparter__label">NAV</Normaltekst>
            <Normaltekst className="avtaleparter__navn">
                {veilederNavn}
            </Normaltekst>
        </Stegoppsummering>
    );
};

export default Avtaleparter;
