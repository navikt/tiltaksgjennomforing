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

const VisUtregningenPanel = (props: Context) => {
    return (
        <Ekspanderbartpanel border={true} tittel="Vis hele utregningen" apen={true}>
            <Container fluid={true}>
                <Row className="visUtregningenPanel__rad">
                    <Column md="6" className="visUtregningenPanel__tittel">
                        <div className="visUtregningenPanel__tittel">
                            <StillingProsentIkon className="visUtregningenPanel__ikon" />
                            Stillingsprosent
                        </div>
                    </Column>
                    <Column md="6" className="visUtregningenPanel__column__siste">
                        {props.avtale.stillingprosent} %
                    </Column>
                </Row>
                <Row className="visUtregningenPanel__rad">
                    <Column md="6">
                        {' '}
                        <div className="visUtregningenPanel__tittel">
                            <ManedsLonnIkon className="visUtregningenPanel__ikon" />
                            Månedslønn
                        </div>
                    </Column>
                    <Column md="6" className="visUtregningenPanel__column__siste">
                        <div>{props.avtale.manedslonn} kr</div>
                    </Column>
                </Row>
                <Row className="visUtregningenPanel__rad">
                    <Column md="6" className="visUtregningenPanel__tittel">
                        <FeriepengerIkon className="visUtregningenPanel__ikon" />
                        <div>Feriepenger</div>
                    </Column>
                    <Column md="3">({(props.avtale.feriepengesats * 100).toFixed(1)}%)</Column>
                    <Column md="1">+</Column>
                    <Column md="2" className="visUtregningenPanel__column__siste">
                        {props.avtale.manedslonn === undefined || props.avtale.feriepengesats === undefined
                            ? 0
                            : props.avtale.manedslonn * props.avtale.feriepengesats}{' '}
                        kr
                    </Column>
                </Row>
                <Row className="visUtregningenPanel__rad">
                    <Column md="6" className="visUtregningenPanel__tittel">
                        <ObligTjenestepensjonIkon className="visUtregningenPanel__ikon" />
                        <div>Obligatorisk tjenestepensjon</div>
                    </Column>
                    <Column md="3">(2%)</Column>
                    <Column md="1">+</Column>
                    <Column md="2" className="visUtregningenPanel__column__siste">
                        {props.avtale.manedslonn === undefined ? 0 : props.avtale.manedslonn * 0.02} kr
                    </Column>
                </Row>
                <Row className="visUtregningenPanel__rad">
                    <Column md="6" className="visUtregningenPanel__tittel">
                        <ArbeidsgiveravgiftIkon className="visUtregningenPanel__ikon" />
                        <div>Arbeidsgiveravgift</div>
                    </Column>
                    <Column md="3">({props.avtale.arbeidsgiveravgift * 100}%)</Column>
                    <Column md="1">+</Column>
                    <Column md="2" className="visUtregningenPanel__column__siste">
                        {props.avtale.manedslonn === undefined || props.avtale.arbeidsgiveravgift === undefined
                            ? 0
                            : props.avtale.manedslonn * props.avtale.arbeidsgiveravgift}{' '}
                        kr
                    </Column>
                </Row>
                <Row className="visUtregningenPanel__rad">
                    <Column md="6" className="visUtregningenPanel__tittel">
                        <div>Sum utgifter for arbeidsgiver</div>
                    </Column>
                    <Column md="3" />
                    <Column md="1">+</Column>
                    <Column md="2" className="visUtregningenPanel__column__siste">
                        {props.avtale.manedslonn === undefined
                            ? 0
                            : props.avtale.manedslonn +
                              props.avtale.manedslonn * props.avtale.feriepengesats +
                              props.avtale.manedslonn * 0.02 +
                              props.avtale.manedslonn * props.avtale.arbeidsgiveravgift}{' '}
                        kr
                    </Column>
                </Row>
                <Row className="visUtregningenPanel__rad visUtregningenPanel__rad__siste">
                    <Column md="6" className="visUtregningenPanel__tittel">
                        <GraphRefusjonAvLonnIkon className="visUtregningenPanel__ikon" />
                        <div>Fastsatt refusjon av lønn</div>
                    </Column>
                    <Column md="3" />
                    <Column md="1" />
                    <Column md="2" className="visUtregningenPanel__column__siste">
                        {props.avtale.lonnstilskuddProsent} %
                    </Column>
                </Row>
                <Row className="visUtregningenPanel__rad visUtregningenPanel__rad__oppsummering">
                    <Column md="9" className="visUtregningenPanel__tittel">
                        <Undertittel> Månedlig lønnstilskudd fra Nav(inntil):</Undertittel>
                    </Column>

                    <Column md="3" className="visUtregningenPanel__column__siste">
                        <Undertittel>
                            {props.avtale.manedslonn === undefined || !parseFloat(props.avtale.lonnstilskuddProsent)
                                ? 0
                                : (props.avtale.manedslonn +
                                      props.avtale.manedslonn * props.avtale.feriepengesats +
                                      props.avtale.manedslonn * 0.02 +
                                      props.avtale.manedslonn * props.avtale.arbeidsgiveravgift) *
                                  (parseFloat(props.avtale.lonnstilskuddProsent) / 100)}{' '}
                            kr
                        </Undertittel>
                    </Column>
                </Row>
            </Container>{' '}
            {/*<div className="visUtregningenPanel__rad">
                <div className="visUtregningenPanel__tittel">
                    <StillingProsentIkon className="visUtregningenPanel__ikon" />
                    Stillingsprosent
                </div>
                <div>{props.avtale.stillingprosent} %</div>
            </div>
            <div className="visUtregningenPanel__rad">
                <div className="visUtregningenPanel__tittel">
                    <ManedsLonnIkon className="visUtregningenPanel__ikon" />
                    Månedslønn
                </div>
                <div>{props.avtale.manedslonn} kr</div>
            </div>
            <div className="visUtregningenPanel__rad">
                <div className="visUtregningenPanel__tittel">
                    <FeriepengerIkon className="visUtregningenPanel__ikon" />
                    <div>Feriepenger</div>
                </div>
                <div style={{ marginLeft: '7.5rem' }}>({(props.avtale.feriepengesats * 100).toFixed(1)}%)</div>
                <div className="visUtregningenPanel__tittel">
                    <div className="visUtregningenPanel__orienter">+</div>
                    {props.avtale.manedslonn === undefined || props.avtale.feriepengesats === undefined
                        ? 0
                        : props.avtale.manedslonn * props.avtale.feriepengesats}{' '}
                    kr
                </div>
            </div>*/}
            {/*<div className="visUtregningenPanel__rad">
                <div className="visUtregningenPanel__tittel">
                    <ObligTjenestepensjonIkon className="visUtregningenPanel__ikon" />
                    <div>Obligatorisk tjenestepensjon</div>
                </div>
                <div>(2%)</div>
                <div>+</div>
                <div>{props.avtale.manedslonn === undefined ? 0 : props.avtale.manedslonn * 0.02} kr</div>
            </div>*/}
            {/* <div className="visUtregningenPanel__rad">
                <div className="visUtregningenPanel__tittel">
                    <ArbeidsgiveravgiftIkon className="visUtregningenPanel__ikon" />
                    <div>Arbeidsgiveravgift</div>
                </div>
                <div style={{ marginLeft: '6rem' }}>({props.avtale.arbeidsgiveravgift * 100}%)</div>
                <div className="visUtregningenPanel__tittel">
                    <div className="visUtregningenPanel__orienter">+</div>
                    {props.avtale.manedslonn === undefined || props.avtale.arbeidsgiveravgift === undefined
                        ? 0
                        : props.avtale.manedslonn * props.avtale.arbeidsgiveravgift}{' '}
                    kr
                </div>
            </div>*/}
            {/*     <div className="visUtregningenPanel__rad">
                <div className="visUtregningenPanel__orienter__sum__tittel">
                    <div>Sum utgifter for arbeidsgiver</div>
                </div>
                <div className="visUtregningenPanel__tittel">
                    <div className="visUtregningenPanel__orienter__sum">=</div>
                    {props.avtale.manedslonn === undefined
                        ? 0
                        : props.avtale.manedslonn +
                          props.avtale.manedslonn * props.avtale.feriepengesats +
                          props.avtale.manedslonn * 0.02 +
                          props.avtale.manedslonn * props.avtale.arbeidsgiveravgift}{' '}
                    kr
                </div>
            </div>*/}
            {/* <div className="visUtregningenPanel__rad visUtregningenPanel__rad__siste">
                <div className="visUtregningenPanel__tittel">
                    <GraphRefusjonAvLonnIkon className="visUtregningenPanel__ikon" />
                    <div>Fastsatt refusjon av lønn</div>
                </div>
                <div>{props.avtale.lonnstilskuddProsent} %</div>
            </div>*/}
            {/* <div className="visUtregningenPanel__rad visUtregningenPanel__rad__oppsummering">
                <div className="visUtregningenPanel__tittel">
                    <Undertittel> Månedlig lønnstilskudd fra Nav(inntil):</Undertittel>
                </div>
                <Undertittel>
                    {props.avtale.manedslonn === undefined || !parseFloat(props.avtale.lonnstilskuddProsent)
                        ? 0
                        : (props.avtale.manedslonn +
                              props.avtale.manedslonn * props.avtale.feriepengesats +
                              props.avtale.manedslonn * 0.02 +
                              props.avtale.manedslonn * props.avtale.arbeidsgiveravgift) *
                          (parseFloat(props.avtale.lonnstilskuddProsent) / 100)}{' '}
                    kr
                </Undertittel>
            </div>*/}
        </Ekspanderbartpanel>
    );
};
export default VisUtregningenPanel;
