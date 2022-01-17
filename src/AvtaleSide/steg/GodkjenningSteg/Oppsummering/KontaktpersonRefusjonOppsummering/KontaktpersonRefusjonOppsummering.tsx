import React, {FunctionComponent, useContext} from 'react';
import Stegoppsummering from "@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/Stegoppsummering/Stegoppsummering";
import {ReactComponent as MentorIkon} from "@/assets/ikoner/mentor.svg";
import {RefusjonKontaktperson} from "@/types/avtale";
import {AvtaleContext} from "@/AvtaleProvider";
import {
    AvtaleinfoFeltSjekk
} from "@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/AvtaleinfoFeltSjekk/AvtaleinfoFeltSjekk";

interface Props {
    kontaktpersonRefusjon : RefusjonKontaktperson;
 }

const KontaktpersonRefusjonOppsumering: FunctionComponent<Props> = ({kontaktpersonRefusjon,}) => {
    const avtaleContext = useContext(AvtaleContext);
    const gjeldendeInnhold = avtaleContext.avtale.gjeldendeInnhold;

    const erLåst = Boolean(avtaleContext.avtale.godkjentAvVeileder);

    return (
        <Stegoppsummering  tittel={'Kontaktperson for refusjon'} ikon={<MentorIkon />}>
            <div>
                <AvtaleinfoFeltSjekk
                    navnFelter={[
                    {felt: 'fornavn', verdi: gjeldendeInnhold.refusjonKontaktperson?.refusjonKontaktpersonFornavn},
                    {felt: 'etternavn', verdi: gjeldendeInnhold.refusjonKontaktperson?.refusjonKontaktpersonEtternavn},
                    ]}
                    tilleggFelter={[
                        {felt: 'telefon', verdi: gjeldendeInnhold.refusjonKontaktperson?.refusjonKontaktpersonTlf}]}
                    overskrift={'Refusjon Kontaktperson'}
                    borderFarge="&--farge-graa"
                    skjulHvaMangler={erLåst}
                />
            </div>
        </Stegoppsummering>)
}
export default  KontaktpersonRefusjonOppsumering
