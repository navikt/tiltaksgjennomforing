import {AvtaleContext} from '@/AvtaleProvider';
import React, {FunctionComponent, useContext} from 'react';
import { AvtaleinfoFeltSjekk } from '../AvtaleinfoFeltSjekk/AvtaleinfoFeltSjekk';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import './Avtaleparter.less';
import AvtaleparterHeaderIkon from './AvtalepartnerHeaderIkon';

const Avtaleparter: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);
    const gjeldendeInnhold = avtaleContext.avtale.gjeldendeInnhold;

    const erLåst = Boolean(avtaleContext.avtale.godkjentAvVeileder);
    return (
        <Stegoppsummering tittel="Avtalens parter" ikon={<AvtaleparterHeaderIkon/>}>
            <div>
                <AvtaleinfoFeltSjekk
                    navnFelter={[
                        {felt: 'fornavn', verdi: gjeldendeInnhold.deltakerFornavn},
                        {felt: 'etternavn', verdi: gjeldendeInnhold.deltakerEtternavn},
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
                <AvtaleinfoFeltSjekk
                    navnFelter={[
                        {
                            felt: 'bedriftnavn',
                            verdi: gjeldendeInnhold.bedriftNavn,
                        },
                        {
                            felt: 'fornavn',
                            verdi: gjeldendeInnhold.arbeidsgiverFornavn && 'v/ ' + gjeldendeInnhold.arbeidsgiverFornavn,
                        },
                        {felt: 'etternavn', verdi: gjeldendeInnhold.arbeidsgiverEtternavn},
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
                <AvtaleinfoFeltSjekk
                    navnFelter={[
                        {felt: 'fornavn', verdi: gjeldendeInnhold.veilederFornavn},
                        {felt: 'etternavn', verdi: gjeldendeInnhold.veilederEtternavn},
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
