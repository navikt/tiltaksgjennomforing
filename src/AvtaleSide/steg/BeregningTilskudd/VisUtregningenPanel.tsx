import { ReactComponent as ArbeidsgiveravgiftIkon } from '@/assets/ikoner/arbeidsgiveravgift.svg';
import { ReactComponent as FeriepengerIkon } from '@/assets/ikoner/feriepenger.svg';
import { ReactComponent as GraphRefusjonAvLonnIkon } from '@/assets/ikoner/graphRefusjonAvLønn.svg';
import { ReactComponent as ManedsLonnIkon } from '@/assets/ikoner/manedsLonn.svg';
import { ReactComponent as ObligTjenestepensjonIkon } from '@/assets/ikoner/obligTjenestepensjon.svg';
import { ReactComponent as StillingProsentIkon } from '@/assets/ikoner/stillingsprosent.svg';
import { Beregningsgrunnlag } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { visSatsMedEttDesimal, visTalletEller0 } from '@/utils/lonnstilskuddUtregningUtils';
import classNames from 'classnames';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Column, Container, Row } from 'nav-frontend-grid';
import React, { FunctionComponent } from 'react';
import MediaQuery from 'react-responsive';
import './VisUtregningenPanel.less';
import { Element } from 'nav-frontend-typografi';

const cls = BEMHelper('visUtregningenPanel');

const VisUtregningenPanel: FunctionComponent<Beregningsgrunnlag> = (props) => {
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
                        {visTalletEller0(props.stillingprosent)} %
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
                        <div> {visTalletEller0(props.manedslonn)} kr</div>
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
                        ({visSatsMedEttDesimal(props.feriepengesats)}%)
                    </Column>
                    <Column md="1" sm="1" xs="1">
                        +
                    </Column>
                    <Column md="2" sm="2" xs="5" className={cls.element('column__siste')}>
                        {props.feriepengerBelop} kr
                    </Column>
                </Row>
                <Row className={cls.element('rad')}>
                    <Column md="6" sm="6" xs="4" className={cls.element('tittel')}>
                        <MediaQuery minWidth={700}>
                            <ObligTjenestepensjonIkon className={cls.element('ikon')} />
                        </MediaQuery>
                        <div>
                            Obligatorisk tjenestepensjon{' '}
                            <MediaQuery maxWidth={699}>({(props.otpSats || 0.0) * 100} %)</MediaQuery>{' '}
                        </div>
                    </Column>
                    <Column md="3" sm="3" xs="3">
                        <MediaQuery minWidth={700}>({(props.otpSats || 0.0) * 100}%)</MediaQuery>
                    </Column>
                    <Column md="1" sm="1" xs="1">
                        +
                    </Column>
                    <Column md="2" sm="2" xs="4" className={cls.element('column__siste')}>
                        {props.otpBelop} kr
                    </Column>
                </Row>
                <Row className={cls.element('rad')}>
                    <Column md="6" sm="6" xs="4" className={cls.element('tittel')}>
                        <MediaQuery minWidth={700}>
                            <ArbeidsgiveravgiftIkon className={cls.element('ikon')} />
                        </MediaQuery>
                        <div>
                            Arbeidsgiveravgift{' '}
                            <MediaQuery maxWidth={699}>({visSatsMedEttDesimal(props.arbeidsgiveravgift)}%)</MediaQuery>
                        </div>
                    </Column>
                    <Column md="3" sm="3" xs="3">
                        <MediaQuery minWidth={700}>({visSatsMedEttDesimal(props.arbeidsgiveravgift)}%)</MediaQuery>
                    </Column>
                    <Column md="1" sm="1" xs="1">
                        +
                    </Column>
                    <Column md="2" sm="2" xs="4" className={cls.element('column__siste')}>
                        {props.arbeidsgiveravgiftBelop} kr
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
                        {props.sumLonnsutgifter} kr
                    </Column>
                </Row>
                <Row className={classNames(cls.element('rad'), cls.element('rad__siste'))}>
                    <Column md="6" sm="9" xs="6" className={cls.element('tittel')}>
                        <MediaQuery minWidth={700}>
                            <GraphRefusjonAvLonnIkon className={cls.element('ikon')} />
                        </MediaQuery>
                        <div>Fastsatt tilskudds prosent</div>
                    </Column>
                    <Column md="6" sm="3" xs="6" className={cls.element('column__siste')}>
                        {props.lonnstilskuddProsent || 0} %
                    </Column>
                </Row>
                <Row className={classNames(cls.element('rad'), cls.element('rad__oppsummering'))}>
                    <Column md="9" sm="9" xs="6" className={cls.element('tittel')}>
                        <Element> Sum tilskudd per måned:</Element>
                    </Column>

                    <Column md="3" sm="3" xs="6" className={cls.element('column__siste')}>
                        <Element>Inntil {props.sumLonnstilskudd} kr</Element>
                    </Column>
                </Row>
            </Container>
        </Ekspanderbartpanel>
    );
};
export default VisUtregningenPanel;
