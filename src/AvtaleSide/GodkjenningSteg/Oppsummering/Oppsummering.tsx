import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent } from 'react';
import Innholdsboks from '../../../komponenter/Innholdsboks/Innholdsboks';
import { Avtale } from '../../avtale';
import Avtaleparter from './Avtaleparter/Avtaleparter';
import MaalOppsummering from './MaalOppsummering';
import OppfolgingOppsummering from './OppfolgingOppsummering';
import OppgaverOppsummering from './OppgaverOppsummering';
import './Oppsummering.less';
import VarighetOppsummering from './VarighetOppsummering';

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
    </Innholdsboks>
);

export default Oppsummering;
