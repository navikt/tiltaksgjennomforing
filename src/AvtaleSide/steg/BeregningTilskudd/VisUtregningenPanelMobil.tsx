import React from 'react';
import { Context } from '@/AvtaleContext';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import './VisUtregningenPanelMobil.less';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import { Column, Container, Row } from 'nav-frontend-grid';

const visUtregningenPanelMobil = (props: Context) => {
    return (
        <Ekspanderbartpanel border={true} tittel="Vis hele utregningen" apen={true}>
            <Container fluid={true}>
                <Row className="visUtregningenPanelMobil__rad">
                    <Column sm="12" xs="12" className="visUtregningenPanelMobil__tittel">
                        Stillingsprosent
                    </Column>

                    <Column sm="6" xs="6" className="visUtregningenPanelMobil__column__siste">
                        {props.avtale.stillingprosent} %
                    </Column>
                </Row>
                <Row className="visUtregningenPanelMobil__rad">
                    <Column sm="12" xs="12">
                        <div className="visUtregningenPanelMobil__tittel">Månedslønn</div>
                    </Column>
                    <Column sm="6" xs="6" className="visUtregningenPanelMobil__column__siste">
                        <div>{props.avtale.manedslonn} kr</div>
                    </Column>
                </Row>
                <Row className="visUtregningenPanelMobil__rad">
                    <Column sm="12" xs="12" className="visUtregningenPanelMobil__tittel">
                        <div>Feriepenger ({(props.avtale.feriepengesats * 100).toFixed(1)}%)</div>
                    </Column>
                    <Column sm="1" xs="1">
                        +
                    </Column>
                    <Column sm="5" xs="5" className="visUtregningenPanelMobil__column__siste">
                        {props.avtale.manedslonn === undefined || props.avtale.feriepengesats === undefined
                            ? 0
                            : props.avtale.manedslonn * props.avtale.feriepengesats}{' '}
                        kr
                    </Column>
                </Row>
                <Row className="visUtregningenPanelMobil__rad">
                    <Column sm="12" xs="12" className="visUtregningenPanelMobil__tittel">
                        <div>Obligatorisk tjenestepensjon (2%)</div>
                    </Column>
                    <Column sm="1" xs="1">
                        +
                    </Column>
                    <Column sm="5" xs="5" className="visUtregningenPanelMobil__column__siste">
                        {props.avtale.manedslonn === undefined ? 0 : props.avtale.manedslonn * 0.02} kr
                    </Column>
                </Row>
                <Row className="visUtregningenPanelMobil__rad">
                    <Column sm="12" xs="12" className="visUtregningenPanelMobil__tittel">
                        <div>Arbeidsgiveravgift ({props.avtale.arbeidsgiveravgift * 100}%)</div>
                    </Column>
                    <Column sm="1" xs="1">
                        +
                    </Column>
                    <Column sm="5" xs="5" className="visUtregningenPanelMobil__column__siste">
                        {props.avtale.manedslonn === undefined || props.avtale.arbeidsgiveravgift === undefined
                            ? 0
                            : props.avtale.manedslonn * props.avtale.arbeidsgiveravgift}{' '}
                        kr
                    </Column>
                </Row>
                <Row className="visUtregningenPanelMobil__rad">
                    <Column sm="12" xs="12" className="visUtregningenPanelMobil__tittel">
                        Sum utgifter for arbeidsgiver
                    </Column>
                    <Column sm="1" xs="1">
                        =
                    </Column>
                    <Column sm="5" xs="5" className="visUtregningenPanelMobil__column__siste">
                        {props.avtale.manedslonn === undefined
                            ? 0
                            : props.avtale.manedslonn +
                              props.avtale.manedslonn * props.avtale.feriepengesats +
                              props.avtale.manedslonn * 0.02 +
                              props.avtale.manedslonn * props.avtale.arbeidsgiveravgift}{' '}
                        kr
                    </Column>
                </Row>
                <Row className="visUtregningenPanelMobil__rad visUtregningenPanelMobil__rad__siste">
                    <Column sm="12" xs="12" className="visUtregningenPanelMobil__tittel">
                        <div>Fastsatt refusjon av lønn</div>
                    </Column>

                    <Column sm="6" xs="12" className="visUtregningenPanelMobil__column__siste">
                        {props.avtale.lonnstilskuddProsent} %
                    </Column>
                </Row>
                <Row className="visUtregningenPanelMobil__rad visUtregningenPanelMobil__rad__oppsummering">
                    <Column sm="12" xs="12" className="visUtregningenPanelMobil__tittel">
                        <Undertittel> Månedlig lønnstilskudd:</Undertittel>
                    </Column>

                    <Column sm="6" xs="12" className="visUtregningenPanelMobil__column__siste">
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
            </Container>
        </Ekspanderbartpanel>
    );
};
export default visUtregningenPanelMobil;
