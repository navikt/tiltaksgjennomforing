import * as React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import { Avtale } from '../../avtale';
import Innholdsboks from '../../../komponenter/Innholdsboks/Innholdsboks';
import Avtaleparter from './Avtaleparter/Avtaleparter';
import './Oppsummering.less';
import MaalOppsummering from './målOppsummering/MaalOppsummering';
import OppgaverOppsummering from './oppgaveOppsummering/OppgaverOppsummering';
import VarighetOppsummering from './varighet/VarighetOppsummering';
import OppfolgingOppsummering from './oppfølging/OppfolgingOppsummering';
import Tilrettelegging from "./tilrettelegging/Tilrettelegging";

interface Props {
    avtale: Avtale;
}

const Oppsummering = (props: Props) => {
    return (
        <Innholdsboks>
            <Systemtittel className="oppsummering__tittel">
                Se over og godkjenn avtalen
            </Systemtittel>
            <Avtaleparter avtale={props.avtale} />
            <MaalOppsummering avtale={props.avtale} />
            <OppgaverOppsummering avtale={props.avtale} />
            <VarighetOppsummering avtale={props.avtale} />
            <OppfolgingOppsummering avtale={props.avtale} />
            <Tilrettelegging avtale={props.avtale}/>
        </Innholdsboks>
    );
};

export default Oppsummering;
