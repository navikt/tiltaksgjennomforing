import React, { FunctionComponent } from 'react';
import BEMHelper from '@/utils/bem';
import './TimeloennHjelpetekst.less';
import { BodyLong, List } from '@navikt/ds-react';

const TimeloennHjelpetekst: FunctionComponent = () => {
    const cls = BEMHelper('timeloenn');

    return (
        <div className={cls.element('hjelpetekst')}>
            <BodyLong>Timelønn inkluderer kun:</BodyLong>
            <List>
                <List.Item>Lønn avtalt mellom mentor og arbeidsgiver per arbeidsavtale</List.Item>
            </List>
            <BodyLong>Timelønn skal ikke inkludere:</BodyLong>
            <List>
                <List.Item>Sosiale avgifter som arbeidsgiveravgift, feriepenger og pensjon</List.Item>
                <List.Item>Bortfall av inntekt for arbeidsgiver</List.Item>
                <List.Item>Reisegodtgjørelse, bonus og lignende</List.Item>
            </List>
            <BodyLong>
                Eksempel på omregning til timelønn for arbeidstaker som jobber 37,5 timer per uke (1950 timer per år):
            </BodyLong>
            <BodyLong>Timelønn = Månedslønn/162.5 timer</BodyLong>
            <BodyLong spacing>Timelønn = Årslønn/1950 timer</BodyLong>
            <BodyLong>
                Eksempel på omregning til timelønn for arbeidstaker som jobber i en fast deltidsstilling:
            </BodyLong>
            <BodyLong>Timelønn = Månedslønn/162.5 timer/stillingsprosent</BodyLong>
            <BodyLong>Timelønn = Årslønn/1950 timer/stillingsprosent</BodyLong>
        </div>
    );
};
export default TimeloennHjelpetekst;
