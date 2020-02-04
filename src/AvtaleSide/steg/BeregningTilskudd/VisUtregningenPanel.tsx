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
import BEMHelper from '@/utils/bem';
import classNames from 'classnames';

const cls = BEMHelper('visUtregningenPanel');

const VisUtregningenPanel = (props: Context) => {
    return (
        <Ekspanderbartpanel border={true} tittel={'Utregningen'} apen={true}>
            <Container fluid={true}>
                <Row className={cls.element('rad')}>
                    <Column md="6" sm="6" xs="6" className={cls.element('tittel')}>
                        <div className={cls.element('tittel')}>
                            <MediaQuery minWidth={700}>
                                <StillingProsentIkon className={cls.element('ikon')} />
                            </MediaQuery>
                            Stillingsprosent
                        </div>
                    </Column>
                    <Column md="6" sm="6" xs="6" className={cls.element('column__siste')}>
                        {props.avtale.stillingprosent !== undefined && props.avtale.stillingprosent > 0
                            ? props.avtale.stillingprosent
                            : 0}{' '}
                        %
                    </Column>
                </Row>
                <Row className={cls.element('rad')}>
                    <Column md="6" sm="6" xs="6">
                        {' '}
                        <div className={cls.element('tittel')}>
                            <MediaQuery minWidth={700}>
                                <ManedsLonnIkon className={cls.element('ikon')} />
                            </MediaQuery>
                            Månedslønn
                        </div>
                    </Column>
                    <Column md="6" sm="6" xs="6" className={cls.element('column__siste')}>
                        <div>
                            {' '}
                            {props.avtale.manedslonn !== undefined && props.avtale.manedslonn > 0
                                ? props.avtale.manedslonn
                                : 0}{' '}
                            kr
                        </div>
                    </Column>
                </Row>
                <Row className={cls.element('rad')}>
                    <Column md="6" sm="6" xs="4" className={cls.element('tittel')}>
                        <MediaQuery minWidth={700}>
                            <FeriepengerIkon className={cls.element('ikon')} />
                        </MediaQuery>
                        <div>Feriepenger</div>
                    </Column>
                    <Column md="3" sm="3" xs="3">
                        ({(props.avtale.feriepengesats * 100).toFixed(1)}%)
                    </Column>
                    <Column md="1" sm="1" xs="1">
                        +
                    </Column>
                    <Column md="2" sm="2" xs="5" className={cls.element('column__siste')}>
                        {props.avtale.manedslonn !== undefined &&
                        props.avtale.manedslonn > 0 &&
                        props.avtale.feriepengesats !== undefined &&
                        props.avtale.feriepengesats > 0
                            ? (props.avtale.manedslonn * props.avtale.feriepengesats).toFixed(0)
                            : 0}{' '}
                        kr
                    </Column>
                </Row>
                <Row className={cls.element('rad')}>
                    <Column md="6" sm="6" xs="4" className={cls.element('tittel')}>
                        <MediaQuery minWidth={700}>
                            <ObligTjenestepensjonIkon className={cls.element('ikon')} />
                        </MediaQuery>
                        <div>
                            Obligatorisk tjenestepensjon <MediaQuery maxWidth={699}>(2%)</MediaQuery>{' '}
                        </div>
                    </Column>
                    <Column md="3" sm="3" xs="3">
                        <MediaQuery minWidth={700}>(2%)</MediaQuery>
                    </Column>
                    <Column md="1" sm="1" xs="1">
                        +
                    </Column>
                    <Column md="2" sm="2" xs="4" className={cls.element('column__siste')}>
                        {props.avtale.manedslonn !== undefined && props.avtale.manedslonn > 0
                            ? (props.avtale.manedslonn * 0.02).toFixed(0)
                            : 0}{' '}
                        kr
                    </Column>
                </Row>
                <Row className={cls.element('rad')}>
                    <Column md="6" sm="6" xs="4" className={cls.element('tittel')}>
                        <MediaQuery minWidth={700}>
                            <ArbeidsgiveravgiftIkon className={cls.element('ikon')} />
                        </MediaQuery>
                        <div>
                            Arbeidsgiveravgift{' '}
                            <MediaQuery maxWidth={699}>
                                ({(props.avtale.arbeidsgiveravgift * 100).toFixed(1)}.%)
                            </MediaQuery>
                        </div>
                    </Column>
                    <Column md="3" sm="3" xs="3">
                        <MediaQuery minWidth={700}>({(props.avtale.arbeidsgiveravgift * 100).toFixed(1)}.%)</MediaQuery>
                    </Column>
                    <Column md="1" sm="1" xs="1">
                        +
                    </Column>
                    <Column md="2" sm="2" xs="4" className={cls.element('column__siste')}>
                        {props.avtale.manedslonn !== undefined &&
                        props.avtale.manedslonn > 0 &&
                        props.avtale.arbeidsgiveravgift !== undefined &&
                        props.avtale.arbeidsgiveravgift > 0
                            ? (props.avtale.manedslonn * props.avtale.arbeidsgiveravgift).toFixed(0)
                            : 0}{' '}
                        kr
                    </Column>
                </Row>
                <Row className={cls.element('rad')}>
                    <Column
                        md="6"
                        sm="6"
                        xs="4"
                        className={classNames(cls.element('tittel'), cls.element('orienter__sum__tittel'))}
                    >
                        <div>Sum utgifter</div>
                    </Column>
                    <Column md="3" sm="3" xs="3" />
                    <Column md="1" sm="1" xs="1">
                        =
                    </Column>
                    <Column md="2" sm="2" xs="4" className={cls.element('column__siste')}>
                        {props.avtale.manedslonn !== undefined &&
                        props.avtale.manedslonn > 0 &&
                        props.avtale.feriepengesats > 0 &&
                        props.avtale.arbeidsgiveravgift > 0
                            ? (
                                  props.avtale.manedslonn +
                                  props.avtale.manedslonn * props.avtale.feriepengesats +
                                  props.avtale.manedslonn * 0.02 +
                                  props.avtale.manedslonn * props.avtale.arbeidsgiveravgift
                              ).toFixed(0)
                            : 0}{' '}
                        kr
                    </Column>
                </Row>
                <Row className={classNames(cls.element('rad'), cls.element('rad__siste'))}>
                    <Column md="6" sm="9" xs="6" className={cls.element('tittel')}>
                        <MediaQuery minWidth={700}>
                            <GraphRefusjonAvLonnIkon className={cls.element('ikon')} />
                        </MediaQuery>
                        <div>Fastsatt refusjon</div>
                    </Column>
                    <Column md="6" sm="3" xs="6" className={cls.element('column__siste')}>
                        {props.avtale.lonnstilskuddProsent !== undefined &&
                        parseFloat(props.avtale.lonnstilskuddProsent) > 0
                            ? props.avtale.lonnstilskuddProsent
                            : 0}{' '}
                        %
                    </Column>
                </Row>
                <Row className={classNames(cls.element('rad'), cls.element('rad__oppsummering'))}>
                    <Column md="9" sm="9" xs="6" className={cls.element('tittel')}>
                        <Undertittel> Sum lønnstilskudd:</Undertittel>
                    </Column>

                    <Column md="3" sm="3" xs="6" className={cls.element('column__siste')}>
                        <Undertittel>
                            {props.avtale.manedslonn !== undefined &&
                            props.avtale.manedslonn > 0 &&
                            props.avtale.feriepengesats !== undefined &&
                            props.avtale.feriepengesats > 0 &&
                            props.avtale.arbeidsgiveravgift !== undefined &&
                            props.avtale.arbeidsgiveravgift > 0 &&
                            parseFloat(props.avtale.lonnstilskuddProsent)
                                ? (
                                      (props.avtale.manedslonn +
                                          props.avtale.manedslonn * props.avtale.feriepengesats +
                                          props.avtale.manedslonn * 0.02 +
                                          props.avtale.manedslonn * props.avtale.arbeidsgiveravgift) *
                                      (parseFloat(props.avtale.lonnstilskuddProsent) / 100)
                                  ).toFixed(0)
                                : 0}{' '}
                            kr
                        </Undertittel>
                    </Column>
                </Row>
            </Container>
        </Ekspanderbartpanel>
    );
};
export default VisUtregningenPanel;
