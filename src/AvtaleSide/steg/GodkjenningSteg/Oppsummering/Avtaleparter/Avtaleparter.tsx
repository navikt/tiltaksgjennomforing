import { AvtaleContext } from '@/AvtaleProvider';
import { Avtaleinnhold } from '@/types/avtale';
import React, { FunctionComponent, useContext } from 'react';
import { AvtaleinfoFeltSjekk } from '../AvtaleinfoFeltSjekk/AvtaleinfoFeltSjekk';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import './Avtaleparter.less';
import AvtaleparterHeaderIkon from './AvtalepartnerHeaderIkon';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import KontaktpersonRefusjonOppsumering from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/KontaktpersonRefusjonOppsummering/KontaktpersonRefusjonOppsummering';
import HemmeligAdresseVarsel, { isSkalViseAdresseVarsel } from '@/komponenter/Adressesperre/HemmeligAdresseVarsel';

interface Props {
    avtaleinnhold: Avtaleinnhold;
}

const Avtaleparter: FunctionComponent<Props> = (props) => {
    const { avtale } = useContext(AvtaleContext);
    const { rolle } = useContext(InnloggetBrukerContext);
    const gjeldendeInnhold = props.avtaleinnhold;
    const erLåst = Boolean(avtale.godkjentAvVeileder);
    return (
        <Stegoppsummering tittel="Avtalens parter" ikon={<AvtaleparterHeaderIkon />}>
            <div>
                {isSkalViseAdresseVarsel(rolle) && <HemmeligAdresseVarsel avtaleId={avtale.id} />}
                <AvtaleinfoFeltSjekk
                    navnFelter={[
                        { felt: 'fornavn', verdi: gjeldendeInnhold.deltakerFornavn },
                        { felt: 'etternavn', verdi: gjeldendeInnhold.deltakerEtternavn },
                    ]}
                    tilleggFelter={
                        rolle !== 'MENTOR'
                            ? [
                                  {
                                      felt: 'fødselsnummer',
                                      verdi: avtale.deltakerFnr,
                                  },
                                  {
                                      felt: 'telefon',
                                      verdi: gjeldendeInnhold.deltakerTlf,
                                  },
                              ]
                            : [
                                  {
                                      felt: 'telefon',
                                      verdi: gjeldendeInnhold.deltakerTlf,
                                  },
                              ]
                    }
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
                        { felt: 'etternavn', verdi: gjeldendeInnhold.arbeidsgiverEtternavn },
                    ]}
                    tilleggFelter={[
                        {
                            felt: 'virksomhetsnummer',
                            verdi: avtale.bedriftNr,
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
                {avtale.gjeldendeInnhold.refusjonKontaktperson && <KontaktpersonRefusjonOppsumering />}
            </div>
        </Stegoppsummering>
    );
};

export default Avtaleparter;
