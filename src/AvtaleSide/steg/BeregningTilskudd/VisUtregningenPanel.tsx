import ArbeidsgiveravgiftIkon from '@/assets/ikoner/arbeidsgiveravgift.svg?react';
import FeriepengerIkon from '@/assets/ikoner/feriepenger.svg?react';
import GraphRefusjonAvLonnIkon from '@/assets/ikoner/graphRefusjonAvLønn.svg?react';
import ManedsLonnIkon from '@/assets/ikoner/manedsLonn.svg?react';
import ObligTjenestepensjonIkon from '@/assets/ikoner/obligTjenestepensjon.svg?react';
import StillingProsentIkon from '@/assets/ikoner/stillingsprosent.svg?react';
import { Beregningsgrunnlag } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { formaterNorskeTall, visTalletEller0 } from '@/utils';
import classNames from 'classnames';
import { Accordion, Label } from '@navikt/ds-react';
import { Column, Container, Row } from '@/komponenter/NavGrid/Grid';
import React, { FunctionComponent } from 'react';
import MediaQuery from 'react-responsive';
import './VisUtregningenPanel.less';

const cls = BEMHelper('visUtregningenPanel');

const VisUtregningenPanel: FunctionComponent<Beregningsgrunnlag> = (props) => {
    return (
        <Accordion className="accordion">
            <Accordion.Item defaultOpen>
                <Accordion.Header>Utregningen</Accordion.Header>
                <Accordion.Content>
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
                                {formaterNorskeTall(props.stillingprosent)} %
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
                                <div> {formaterNorskeTall(props.manedslonn)} kr</div>
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
                                ({formaterNorskeTall(props.feriepengesats)}%)
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
                                    <MediaQuery maxWidth={699}>
                                        ({formaterNorskeTall(props.arbeidsgiveravgift)}%)
                                    </MediaQuery>
                                </div>
                            </Column>
                            <Column md="3" sm="3" xs="3">
                                <MediaQuery minWidth={700}>
                                    ({formaterNorskeTall(props.arbeidsgiveravgift)}%)
                                </MediaQuery>
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
                                <Label> Sum tilskudd per måned:</Label>
                            </Column>

                            <Column md="3" sm="3" xs="6" className={cls.element('column__siste')}>
                                <Label>Inntil {props.sumLonnstilskudd} kr</Label>
                            </Column>
                        </Row>
                    </Container>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};
export default VisUtregningenPanel;
