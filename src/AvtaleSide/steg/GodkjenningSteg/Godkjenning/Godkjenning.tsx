import { Avtale } from '@/types/avtale';
import { Rolle } from '@/types/innlogget-bruker';
import React, { FunctionComponent } from 'react';
import './Godkjenning.less';
import GodkjenningArbeidsgiver from './GodkjenningArbeidsgiver';
import GodkjenningDeltaker from './GodkjenningDeltaker';
import GodkjenningVeileder from './GodkjenningVeileder';

interface Props {
    avtale: Avtale;
    rolle: Rolle;
}

const harGodkjentSelv = (avtale: Avtale, rolle: Rolle) => {
    switch (rolle) {
        case 'DELTAKER':
            return avtale.godkjentAvDeltaker;
        case 'ARBEIDSGIVER':
            return avtale.godkjentAvArbeidsgiver;
        case 'VEILEDER':
            return avtale.godkjentAvVeileder;
        default:
            return false;
    }
};

const Godkjenning: FunctionComponent<Props> = props => {
    if (harGodkjentSelv(props.avtale, props.rolle)) {
        return null;
    }

    return (
        <>
            {props.rolle === 'VEILEDER' && <GodkjenningVeileder />}
            {props.rolle === 'ARBEIDSGIVER' && <GodkjenningArbeidsgiver />}
            {props.rolle === 'DELTAKER' && <GodkjenningDeltaker />}
        </>
    );
};

export default Godkjenning;
