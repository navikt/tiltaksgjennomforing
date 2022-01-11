import { AvtaleContext } from '@/AvtaleProvider';
import BedriftsnummerEllerTelefon from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/Avtaleparter/BedriftsnummerEllerTelefon';
import BEMHelper from '@/utils/bem';
import { storForbokstav } from '@/utils/stringUtils';
import EtikettFokus from 'nav-frontend-etiketter/lib/etikettfokus';
import { Undertekst, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext } from 'react';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import './Avtaleparter.less';
import AvtaleparterHeaderIkon from './AvtalepartnerHeaderIkon';

const cls = BEMHelper('avtaleparter');

interface Felt {
    felt: string;
    verdi?: string;
}

interface Props {
    navnFelter: Felt[];
    tilleggFelter: Felt[];
    overskrift: string;
    borderFarge: string;
    skjulHvaMangler: boolean;
}

export const Avtalepart: FunctionComponent<Props> = (props) => {
    const alleFelter = props.navnFelter.concat(props.tilleggFelter);
    const hvaMangler = props.skjulHvaMangler ? [] : alleFelter.filter((felt) => !felt.verdi).map((felt) => felt.felt);

    let innhold;
    if (hvaMangler.length > 0) {
        innhold = (
            <EtikettFokus className={cls.element('etikettInfo')}>
                {storForbokstav(hvaMangler.join(', ') + ' er ikke fylt ut')}
            </EtikettFokus>
        );
    } else {
        innhold = (
            <>
                <Undertittel>{props.navnFelter.map((felt) => felt.verdi).join(' ')}</Undertittel>
                {props.tilleggFelter.map((felt, index) => (
                    <React.Fragment key={index}>
                        <BedriftsnummerEllerTelefon felt={felt.felt} verdi={felt.verdi} />
                    </React.Fragment>
                ))}
            </>
        );
    }

    return (
        <div className={cls.element('content', props.borderFarge)}>
            <Undertekst>{props.overskrift}</Undertekst>
            {innhold}
        </div>
    );
};

const Avtaleparter: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);
    const gjeldendeInnhold = avtaleContext.avtale.gjeldendeInnhold;

    const erLåst = Boolean(avtaleContext.avtale.godkjentAvVeileder);
    return (
        <Stegoppsummering tittel="Avtalens parter" ikon={<AvtaleparterHeaderIkon />}>
            <div>
                <Avtalepart
                    navnFelter={[
                        { felt: 'fornavn', verdi: gjeldendeInnhold.deltakerFornavn },
                        { felt: 'etternavn', verdi: gjeldendeInnhold.deltakerEtternavn },
                    ]}
                    tilleggFelter={[
                        {
                            felt: 'fødselsnummer',
                            verdi: avtaleContext.avtale.deltakerFnr,
                        },
                        {
                            felt: 'telefon',
                            verdi: gjeldendeInnhold.deltakerTlf,
                        },
                    ]}
                    overskrift="Deltaker"
                    borderFarge="farge-gronn"
                    skjulHvaMangler={erLåst}
                />
                <Avtalepart
                    navnFelter={[
                        {
                            felt: 'bedriftnavn',
                            verdi: gjeldendeInnhold.bedriftNavn,
                        },
                        {
                            felt: 'fornavn',
                            verdi: gjeldendeInnhold.arbeidsgiverFornavn && 'v/ ' + gjeldendeInnhold.arbeidsgiverFornavn,
                        },
                        { felt: 'etternavn', verdi: gjeldendeInnhold.arbeidsgiverEtternavn },
                    ]}
                    tilleggFelter={[
                        {
                            felt: 'bedriftsnummer',
                            verdi: avtaleContext.avtale.bedriftNr,
                        },
                        {
                            felt: 'telefon',
                            verdi: gjeldendeInnhold.arbeidsgiverTlf,
                        },
                    ]}
                    overskrift="Arbeidsgiver"
                    borderFarge="farge-graa"
                    skjulHvaMangler={erLåst}
                />
                <Avtalepart
                    navnFelter={[
                        { felt: 'fornavn', verdi: gjeldendeInnhold.veilederFornavn },
                        { felt: 'etternavn', verdi: gjeldendeInnhold.veilederEtternavn },
                    ]}
                    tilleggFelter={[
                        {
                            felt: 'telefon',
                            verdi: gjeldendeInnhold.veilederTlf,
                        },
                    ]}
                    overskrift="NAV-veileder"
                    borderFarge="farge-lysblaa"
                    skjulHvaMangler={erLåst}
                />
            </div>
        </Stegoppsummering>
    );
};

export default Avtaleparter;
