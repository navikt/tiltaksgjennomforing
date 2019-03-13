import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent } from 'react';
import Innholdsboks from '../../../komponenter/Innholdsboks/Innholdsboks';
import { Avtale } from '../../avtale';
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

const Oppsummering: FunctionComponent<Props> = props => (
    <Innholdsboks>
        <Systemtittel className="oppsummering__tittel">
            {props.avtale.erLaast
                ? 'Oppsummering av inngått avtale'
                : 'Godkjenning av avtale'}
        </Systemtittel>
        <Avtaleparter avtale={props.avtale} />
        <MaalOppsummering avtale={props.avtale} />
        <OppgaverOppsummering avtale={props.avtale} />
        <VarighetOppsummering avtale={props.avtale} />
        <OppfolgingOppsummering avtale={props.avtale} />
        <Tilrettelegging avtale={props.avtale}/>
    </Innholdsboks>
);

export default Oppsummering;
