import { Avtale } from '@/types/avtale';
import { Rolle } from '@/types/innlogget-bruker';
import React, { FunctionComponent } from 'react';
import GodkjenningArbeidsgiver from './godkjenningEksterneAktører/GodkjenningArbeidsgiver';
import GodkjenningDeltaker from './godkjenningEksterneAktører/GodkjenningDeltaker';
import GodkjenningMentor from './godkjenningEksterneAktører/GodkjenningMentor';
import GodkjenningVeileder from './godkjenningVeileder/GodkjenningVeileder';
import './Godkjenning.less';

interface Props {
    avtale: Avtale;
    rolle: Rolle;
}

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
    if (harGodkjentSelv(props.avtale, props.rolle)) {
        return null;
    }

    return (
        <>
            {props.rolle === 'VEILEDER' && <GodkjenningVeileder />}
            {props.rolle === 'ARBEIDSGIVER' && <GodkjenningArbeidsgiver />}
            {props.rolle === 'DELTAKER' && <GodkjenningDeltaker />}
            {props.rolle === 'MENTOR' && <GodkjenningMentor />}
        </>
    );
};

export default Godkjenning;
