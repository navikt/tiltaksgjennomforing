import React from 'react';
import { Context } from '@/AvtaleContext';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { ReactComponent as StillingProsentIkon } from '@/assets/ikoner/stillingsprosent.svg';
import { ReactComponent as ManedsLonnIkon } from '@/assets/ikoner/manedsLonn.svg';
import { ReactComponent as FeriepengerIkon } from '@/assets/ikoner/feriepenger.svg';
import { ReactComponent as ObligTjenestepensjonIkon } from '@/assets/ikoner/obligTjenestepensjon.svg';
import { ReactComponent as GraphRefusjonAvLonnIkon } from '@/assets/ikoner/graphRefusjonAvLønn.svg';
import { ReactComponent as ArbeidsgiveravgiftIkon } from '@/assets/ikoner/arbeidsgiveravgift.svg';
import './VisUtregningenPanel.less';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import { Column, Container, Row } from 'nav-frontend-grid';
import MediaQuery from 'react-responsive';

const VisUtregningenPanel = (props: Context) => {
    return (
        <Ekspanderbartpanel border={true} tittel="Vis hele utregningen" apen={true}>
            <Container fluid={true}>
                <Row className="visUtregningenPanel__rad">
                    <Column md="6" sm="12" xs="6" className="visUtregningenPanel__tittel">
                        <div className="visUtregningenPanel__tittel">
                            <MediaQuery minWidth={700}>
                                <StillingProsentIkon className="visUtregningenPanel__ikon" />
                            </MediaQuery>
                            Stillingsprosent
                        </div>
                    </Column>
                    <Column md="6" sm="6" xs="6" className="visUtregningenPanel__column__siste">
                        {props.avtale.stillingprosent} %
                    </Column>
                </Row>
                <Row className="visUtregningenPanel__rad">
                    <Column md="6" sm="12" xs="6">
                        {' '}
                        <div className="visUtregningenPanel__tittel">
                            <MediaQuery minWidth={700}>
                                <ManedsLonnIkon className="visUtregningenPanel__ikon" />
                            </MediaQuery>
                            Månedslønn
                        </div>
                    </Column>
                    <Column md="6" sm="6" xs="6" className="visUtregningenPanel__column__siste">
                        <div>{props.avtale.manedslonn} kr</div>
                    </Column>
                </Row>
                <Row className="visUtregningenPanel__rad">
                    <Column md="6" sm="9" xs="4" className="visUtregningenPanel__tittel">
                        <MediaQuery minWidth={700}>
                            <FeriepengerIkon className="visUtregningenPanel__ikon" />
                        </MediaQuery>
                        <div>Feriepenger</div>
                    </Column>
                    <Column md="3" sm="4" xs="3">
                        ({(props.avtale.feriepengesats * 100).toFixed(1)}%)
                    </Column>
                    <Column md="1" sm="2" xs="1">
                        +
                    </Column>
                    <Column md="2" sm="3" xs="5" className="visUtregningenPanel__column__siste">
                        {props.avtale.manedslonn === undefined || props.avtale.feriepengesats === undefined
                            ? 0
                            : (props.avtale.manedslonn * props.avtale.feriepengesats).toFixed(0)}{' '}
                        kr
                    </Column>
                </Row>
                <Row className="visUtregningenPanel__rad">
                    <Column md="6" sm="9" xs="4" className="visUtregningenPanel__tittel">
                        <MediaQuery minWidth={700}>
                            <ObligTjenestepensjonIkon className="visUtregningenPanel__ikon" />
                        </MediaQuery>
                        <div>
                            Obligatorisk tjenestepensjon <MediaQuery maxWidth={699}>(2%)</MediaQuery>{' '}
                        </div>
                    </Column>
                    <Column md="3" sm="4" xs="3">
                        <MediaQuery minWidth={700}>(2%)</MediaQuery>
                    </Column>
                    <Column md="1" sm="2" xs="1">
                        +
                    </Column>
                    <Column md="2" sm="3" xs="4" className="visUtregningenPanel__column__siste">
                        {props.avtale.manedslonn === undefined ? 0 : (props.avtale.manedslonn * 0.02).toFixed(0)} kr
                    </Column>
                </Row>
                <Row className="visUtregningenPanel__rad">
                    <Column md="6" sm="9" xs="4" className="visUtregningenPanel__tittel">
                        <MediaQuery minWidth={700}>
                            <ArbeidsgiveravgiftIkon className="visUtregningenPanel__ikon" />
                        </MediaQuery>
                        <div>
                            Arbeidsgiveravgift{' '}
                            <MediaQuery maxWidth={699}>
                                ({(props.avtale.arbeidsgiveravgift * 100).toFixed(1)}.%)
                            </MediaQuery>
                        </div>
                    </Column>
                    <Column md="3" sm="4" xs="3">
                        <MediaQuery minWidth={700}>({(props.avtale.arbeidsgiveravgift * 100).toFixed(1)}.%)</MediaQuery>
                    </Column>
                    <Column md="1" sm="2" xs="1">
                        +
                    </Column>
                    <Column md="2" sm="3" xs="4" className="visUtregningenPanel__column__siste">
                        {props.avtale.manedslonn === undefined || props.avtale.arbeidsgiveravgift === undefined
                            ? 0
                            : (props.avtale.manedslonn * props.avtale.arbeidsgiveravgift).toFixed(0)}{' '}
                        kr
                    </Column>
                </Row>
                <Row className="visUtregningenPanel__rad">
                    <Column md="6" sm="9" xs="4" className="visUtregningenPanel__tittel">
                        <div>Sum utgifter for arbeidsgiver</div>
                    </Column>
                    <Column md="3" sm="4" xs="3" />
                    <Column md="1" sm="2" xs="1">
                        =
                    </Column>
                    <Column md="2" sm="3" xs="4" className="visUtregningenPanel__column__siste">
                        {props.avtale.manedslonn === undefined
                            ? 0
                            : (
                                  props.avtale.manedslonn +
                                  props.avtale.manedslonn * props.avtale.feriepengesats +
                                  props.avtale.manedslonn * 0.02 +
                                  props.avtale.manedslonn * props.avtale.arbeidsgiveravgift
                              ).toFixed(0)}{' '}
                        kr
                    </Column>
                </Row>
                <Row className="visUtregningenPanel__rad visUtregningenPanel__rad__siste">
                    <Column md="6" sm="9" xs="6" className="visUtregningenPanel__tittel">
                        <MediaQuery minWidth={700}>
                            <GraphRefusjonAvLonnIkon className="visUtregningenPanel__ikon" />
                        </MediaQuery>
                        <div>Fastsatt refusjon av lønn</div>
                    </Column>
                    {/*  <Column md="3" sm="4" xs="3" />
                    <Column md="1" sm="2" xs="2" />*/}
                    <Column md="2" sm="3" xs="6" className="visUtregningenPanel__column__siste">
                        {props.avtale.lonnstilskuddProsent} %
                    </Column>
                </Row>
                <Row className="visUtregningenPanel__rad visUtregningenPanel__rad__oppsummering">
                    <Column md="9" sm="12" xs="6" className="visUtregningenPanel__tittel">
                        <Undertittel> Månedlig lønnstilskudd fra Nav:</Undertittel>
                    </Column>

                    <Column md="3" sm="3" xs="6" className="visUtregningenPanel__column__siste">
                        <Undertittel>
                            {props.avtale.manedslonn === undefined || !parseFloat(props.avtale.lonnstilskuddProsent)
                                ? 0
                                : (
                                      (props.avtale.manedslonn +
                                          props.avtale.manedslonn * props.avtale.feriepengesats +
                                          props.avtale.manedslonn * 0.02 +
                                          props.avtale.manedslonn * props.avtale.arbeidsgiveravgift) *
                                      (parseFloat(props.avtale.lonnstilskuddProsent) / 100)
                                  ).toFixed(0)}{' '}
                            kr
                        </Undertittel>
                    </Column>
                </Row>
            </Container>
        </Ekspanderbartpanel>
    );
};
export default VisUtregningenPanel;
