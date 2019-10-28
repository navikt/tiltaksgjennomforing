import { ReactComponent as PrinterSvg } from '@/assets/ikoner/printer.svg';
import { medContext } from '@/AvtaleContext';
import OppfolgingOppsummering from '@/AvtaleSide/GodkjenningSteg/Oppsummering/oppfølging/OppfolgingOppsummering';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { Avtale } from '@/types/avtale';
import { Knapp } from 'nav-frontend-knapper';
import { Systemtittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import Avtaleparter from '../Avtaleparter/Avtaleparter';
import BeregningTilskuddOppsummering from '../BeregningTilskuddOppsummering/BeregningTilskuddOppsummering';
import LonnstilskuddOppsummering from '../LonnstilskuddOppsummering/LonnstilskuddOppsummering';
import StillingsOppsummering from '../StillingsOppsummering/StillingsOppsummering';

interface Props {
    avtale: Avtale;
}

const printAvtale = () => {
    window.print();
};

const OppsummeringLonnstilskudd: FunctionComponent<Props> = props => (
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
        <StillingsOppsummering />
        <LonnstilskuddOppsummering />
        <OppfolgingOppsummering {...props.avtale} />
        <BeregningTilskuddOppsummering />
    </Innholdsboks>
);

export default medContext(OppsummeringLonnstilskudd);
