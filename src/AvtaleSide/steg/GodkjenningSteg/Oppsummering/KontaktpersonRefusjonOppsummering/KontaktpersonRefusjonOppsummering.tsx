import React, { FunctionComponent } from 'react';
import Stegoppsummering from "@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/Stegoppsummering/Stegoppsummering";
import {ReactComponent as MentorIkon} from "@/assets/ikoner/mentor.svg";
import BedriftsnummerEllerTelefon
    from "@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/Avtaleparter/BedriftsnummerEllerTelefon";
import {Kontaktperson, RefusjonKontaktperson} from "@/types/avtale";
import {Undertekst, Undertittel} from "nav-frontend-typografi";
import BEMHelper from "@/utils/bem";

const cls = BEMHelper('kontaktpersonRefusjonOppsumering');

interface Props {
    kontaktpersonRefusjon : RefusjonKontaktperson;
}

const KontaktpersonRefusjonOppsumering: FunctionComponent<Props> = ({kontaktpersonRefusjon}) => {
    return (
        <Stegoppsummering ikon={<MentorIkon />} tittel={'Kontaktperson for refusjon'}>
            <div style={{borderLeft: "3px solid blue", paddingLeft: '5px'}}>
                <Undertekst>Arbeidsgiver</Undertekst>
                <Undertittel>{kontaktpersonRefusjon.refusjonKontaktpersonFornavn + " " + kontaktpersonRefusjon.refusjonKontaktpersonEtternavn}</Undertittel>
                <BedriftsnummerEllerTelefon felt={"telefon"} verdi={kontaktpersonRefusjon.refusjonKontaktpersonTlf} />
            </div>
        </Stegoppsummering>)
}
export default  KontaktpersonRefusjonOppsumering
