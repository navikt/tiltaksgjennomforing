import { ReactComponent as PrinterSvg } from '@/assets/ikoner/printer.svg';
import { medContext, Rolle } from '@/AvtaleContext';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { Avtale } from '@/types/avtale';
import { Knapp } from 'nav-frontend-knapper';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent } from 'react';
import Avtaleparter from '../Avtaleparter/Avtaleparter';
import MaalOppsummering from '../maalOppsummering/MaalOppsummering';
import OppfolgingOppsummering from '../oppfølging/OppfolgingOppsummering';
import OppgaverOppsummering from '../oppgaveOppsummering/OppgaverOppsummering';
import Tilrettelegging from '../tilrettelegging/Tilrettelegging';
import VarighetOppsummering from '../varighet/VarighetOppsummering';
import './OppsummeringArbeidstrening.less';
import BEMHelper from '@/utils/bem';

interface Props {
    avtale: Avtale;
    rolle: Rolle;
}

const printAvtale = () => {
    window.print();
};

const cls = BEMHelper('oppsummering-arbeidstrening');

const OppsummeringArbeidstrening: FunctionComponent<Props> = props => (
    <Innholdsboks>
        <div className={cls.element('header')}>
            <Systemtittel className={cls.element('tittel')}>
                {props.avtale.erLaast ? 'Oppsummering av inngått avtale' : 'Godkjenning av avtale'}
            </Systemtittel>

            {props.avtale.erLaast && (
                <Knapp className={cls.element('print-knapp')} onClick={printAvtale}>
                    skriv ut avtale
                    <div className={cls.element('print-knapp__ikon')}>
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

export default medContext(OppsummeringArbeidstrening);
