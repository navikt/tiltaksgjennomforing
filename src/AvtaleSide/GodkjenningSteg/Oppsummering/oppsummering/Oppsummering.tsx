import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent } from 'react';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { Avtale } from '@/types/avtale';
import Avtaleparter from '../Avtaleparter/Avtaleparter';
import './Oppsummering.less';
import MaalOppsummering from '../maalOppsummering/MaalOppsummering';
import OppgaverOppsummering from '../oppgaveOppsummering/OppgaverOppsummering';
import VarighetOppsummering from '../varighet/VarighetOppsummering';
import OppfolgingOppsummering from '../oppfølging/OppfolgingOppsummering';
import Tilrettelegging from '../tilrettelegging/Tilrettelegging';
import { Knapp } from 'nav-frontend-knapper';
import { ReactComponent as PrinterSvg } from '@/assets/ikoner/printer2.svg';
import { Rolle } from '@/AvtaleContext';
import VersjonTabs from '../../VersjonKontroll/VersjonTabs';
import { RouteComponentProps, withRouter } from 'react-router';
import { toQuery } from 'react-responsive';

interface Props {
    avtale: Avtale;
    rolle: Rolle;
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
                    skriv ut avtale
                    <div className="oppsummering__print-knapp__ikon">
                        <PrinterSvg />
                    </div>
                </Knapp>
            )}
        </div>

        <Avtaleparter {...props.avtale} />
        <MaalOppsummering {...props.avtale} />
        <OppgaverOppsummering {...props.avtale} />
        <VarighetOppsummering {...props.avtale} />
        <OppfolgingOppsummering {...props.avtale} />
        <Tilrettelegging {...props.avtale} />
    </Innholdsboks>
);

export default Oppsummering;
