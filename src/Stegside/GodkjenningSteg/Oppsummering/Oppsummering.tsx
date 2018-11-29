import * as React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import { Avtale } from '../../avtale';
import Innholdsboks from '../../../komponenter/Innholdsboks/Innholdsboks';
import Avtaleparter from './Avtaleparter/Avtaleparter';
import './Oppsummering.less';
import MaalOppsummering from './MaalOppsummering';
import OppgaverOppsummering from './OppgaverOppsummering';
import VarighetOppsummering from './VarighetOppsummering';
import OppfolgingOppsummering from './OppfolgingOppsummering';

interface Props {
    avtale: Avtale;
}

const Oppsummering = (props: Props) => {
    return (
        <Innholdsboks>
            <Systemtittel className="oppsummering__tittel">
                Godkjenning av avtale
            </Systemtittel>
            <Avtaleparter avtale={props.avtale} />
            <MaalOppsummering avtale={props.avtale} />
            <OppgaverOppsummering avtale={props.avtale} />
            <VarighetOppsummering avtale={props.avtale} />
            <OppfolgingOppsummering avtale={props.avtale} />
        </Innholdsboks>
    );
};

export default Oppsummering;
