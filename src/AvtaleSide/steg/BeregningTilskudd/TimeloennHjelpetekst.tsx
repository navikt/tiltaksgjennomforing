import React, { FunctionComponent } from 'react';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BEMHelper from '@/utils/bem';

const TimeloennHjelpetekst: FunctionComponent = () => {
    const cls = BEMHelper('relasjoner');

    return (
        <div className={cls.element('relasjon-hjelpetekst')}>
            Timelønn inkluderer kun:
            {
                <ul>
                    <li>Lønn avtalt mellom mentor og arbeidsgiver per arbeidsavtale</li>
                </ul>
            }
            <VerticalSpacer rem={0.5} />
            Timelønn skal ikke inkludere:
            {
                <ul>
                    <li>Sosiale avgifter som arbeidsgiveravgift, feriepenger og pensjon</li>
                    <li>Bortfall av inntekt for arbeidsgiver (?)</li>
                    <li>Reisegodtgjørelse, bonus++</li>
                </ul>
            }
            <VerticalSpacer rem={0.5} />
            Eksempel på omregning til timelønn for arbeidstaker som jobber 37,5 timer per uke (1950 timer per år):
            <br />
            Timelønn = Månedslønn/162.5 timer
            <br />
            Timelønn = Årslønn/1950 timer
            <VerticalSpacer rem={0.5} />
            Eksempel på omregning til timelønn for arbeidstaker som jobber i en fast deltidsstilling:
            <br />
            Timelønn = Månedslønn/162.5 timer/stillingsprosent
            <br />
            Timelønn = Årslønn/1950 timer/stillingsprosent
        </div>
    );
};
export default TimeloennHjelpetekst;
