import { Avtale } from '@/types/avtale';
import { InnloggetBruker, Rolle } from '@/types/innlogget-bruker';
import React, { FunctionComponent } from 'react';
import GodkjenningArbeidsgiver from './godkjenningEksterneAktører/GodkjenningArbeidsgiver';
import GodkjenningDeltaker from './godkjenningEksterneAktører/GodkjenningDeltaker';
import GodkjenningMentor from './godkjenningEksterneAktører/GodkjenningMentor';
import GodkjenningVeileder from './godkjenningVeileder/GodkjenningVeileder';
import './Godkjenning.less';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import GodkjenningInstruks from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/GodkjenningInstruks';
import KanDeltakerMottaPostAlert from '@/AvtaleSide/steg/GodkjenningSteg/Godkjenning/godkjenningVeileder/KanDeltakerMottaPostAlert';
import GodkjenningBekreftelse from './GodkjenningBekreftelse';

interface Props {
    avtale: Avtale;
    innloggetBruker: InnloggetBruker;
    erSkrivebeskyttet: boolean;
}

const AKTIV_AVTALE_STATUS = ['GJENNOMFØRES', 'KLAR_FOR_OPPSTART', 'MANGLER_GODKJENNING'];

const harGodkjentSelv = (avtale: Avtale, rolle: Rolle) => {
    switch (rolle) {
        case 'DELTAKER':
            return avtale.godkjentAvDeltaker;
        case 'MENTOR':
            return avtale.erGodkjentTaushetserklæringAvMentor;
        case 'ARBEIDSGIVER':
            return avtale.godkjentAvArbeidsgiver;
        case 'VEILEDER':
            return avtale.godkjentAvVeileder;
        default:
            return false;
    }
};

const Godkjenning: FunctionComponent<Props> = (props) => {
    const { avtale, innloggetBruker, erSkrivebeskyttet } = props;
    const { rolle } = innloggetBruker;

    const erNavAnsattOgAvtaleErUfordelt = innloggetBruker.erNavAnsatt && avtale.erUfordelt;
    const erGodkjenningSperret = avtale.status === 'ANNULLERT' || erNavAnsattOgAvtaleErUfordelt || erSkrivebeskyttet;

    if (erGodkjenningSperret) {
        return (
            <Innholdsboks>
                <GodkjenningInstruks />
            </Innholdsboks>
        );
    }

    if (harGodkjentSelv(avtale, rolle)) {
        return (
            <Innholdsboks>
                <GodkjenningInstruks />
                {rolle === 'VEILEDER' && <KanDeltakerMottaPostAlert avtaleId={avtale.id} />}
                {AKTIV_AVTALE_STATUS.includes(avtale.status) && (
                    <GodkjenningBekreftelse avtale={avtale} rolle={rolle} />
                )}
            </Innholdsboks>
        );
    }

    return (
        <>
            {rolle === 'VEILEDER' && <GodkjenningVeileder />}
            {rolle === 'ARBEIDSGIVER' && <GodkjenningArbeidsgiver />}
            {rolle === 'DELTAKER' && <GodkjenningDeltaker />}
            {rolle === 'MENTOR' && <GodkjenningMentor />}
        </>
    );
};

export default Godkjenning;
