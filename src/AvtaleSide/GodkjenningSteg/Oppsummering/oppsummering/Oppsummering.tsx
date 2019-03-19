import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent } from 'react';
import Innholdsboks from '../../../../komponenter/Innholdsboks/Innholdsboks';
import { Avtale } from '../../../avtale';
import Avtaleparter from '../Avtaleparter/Avtaleparter';
import './Oppsummering.less';
import MaalOppsummering from '../målOppsummering/MaalOppsummering';
import OppgaverOppsummering from '../oppgaveOppsummering/OppgaverOppsummering';
import VarighetOppsummering from '../varighet/VarighetOppsummering';
import OppfolgingOppsummering from '../oppfølging/OppfolgingOppsummering';
import Tilrettelegging from '../tilrettelegging/Tilrettelegging';
import { Knapp } from 'nav-frontend-knapper';
import PrinterSvg from './PrinterSvg';

interface Props {
    avtale: Avtale;
}

const printAvtale = () => {
    window.print();
};

const Oppsummering: FunctionComponent<Props> = props => (
    <Innholdsboks>
        <div className="oppsummering__header">
            <Systemtittel className="oppsummering__tittel">
                {props.avtale.erLaast
                    ? 'Oppsummering av inngått avtale'
                    : 'Godkjenning av avtale'}
            </Systemtittel>

            {props.avtale.erLaast && (
                <Knapp
                    className="oppsummering__print-knapp"
                    onClick={printAvtale}
                >
                    PRINT AVTALE
                    <div className="oppsummering__print-knapp__ikon">
                        <PrinterSvg />
                    </div>
                </Knapp>
            )}
        </div>

        <Avtaleparter avtale={props.avtale} />
        <MaalOppsummering avtale={props.avtale} />
        <OppgaverOppsummering avtale={props.avtale} />
        <VarighetOppsummering avtale={props.avtale} />
        <OppfolgingOppsummering avtale={props.avtale} />
        <Tilrettelegging avtale={props.avtale} />
    </Innholdsboks>
);

export default Oppsummering;
