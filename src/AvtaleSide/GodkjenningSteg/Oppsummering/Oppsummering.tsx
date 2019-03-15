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
import Tilrettelegging from './tilrettelegging/Tilrettelegging';
import { Knapp } from 'nav-frontend-knapper';


interface Props {
    avtale: Avtale;
}

const printAvtale = () => {
    window.print();
};

const PrinterSvg = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="24"
            height="24"
            viewBox="0 0 24 24"
        >
            <defs>
                <path
                    id="a"
                    d="M21.5 7.644c1.378 0 2.5 1.122 2.5 2.5v6c0 1.379-1.122 2.5-2.5 2.5H19v4.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-4.5H2.5c-1.378 0-2.5-1.121-2.5-2.5v-6c0-1.378 1.122-2.5 2.5-2.5h19zm-15.5 15h12v-7H6v7zM19.722 1v5.084l-14.609.03V1h14.61z"
                />
            </defs>
            <g fill="none" fill-rule="evenodd">
                <mask id="b" fill="#fff">
                    <use xlinkHref="#a" />
                </mask>
                <use fill="#3E3832" xlinkHref="#a" />
                <g fill="#0067C5" mask="url(#b)" id="printer">
                    <path d="M0 24h24V0H0z" />
                </g>
            </g>
        </svg>
    );
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
