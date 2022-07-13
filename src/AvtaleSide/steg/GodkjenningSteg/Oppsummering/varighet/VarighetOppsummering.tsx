import { AvtaleContext } from '@/AvtaleProvider';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Varighet } from '@/types/avtale';
import moment from 'moment';
import { Column, Container, Row } from 'nav-frontend-grid';
import { Element } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext } from 'react';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import VarighetIkon from './VarighetIkon';

const formaterDato = (dato: string): string => {
    return moment(dato).format('DD.MM.YYYY');
};

const harDato = (dato?: string): string => {
    return dato ? formaterDato(dato).toString() : '';
};

const VarighetOppsummering: FunctionComponent<Varighet> = ({
    startDato,
    sluttDato,
    stillingprosent,
    antallDagerPerUke,
}) => {
    const avtaleContext = useContext(AvtaleContext);

    const stillingProsent = stillingprosent ? stillingprosent.toString() + '%' : '';

    return (
        <Stegoppsummering ikon={<VarighetIkon />} tittel="Dato og arbeidstid">
            <Container fluid={true}>
                <Row className={''}>
                    <Column md="4" sm="6" xs="6">
                        <Element>Startdato</Element>
                        <SjekkOmVerdiEksisterer verdi={harDato(startDato)} />
                        <VerticalSpacer rem={1} />
                    </Column>
                    <Column md="4" sm="6" xs="6">
                        <Element>Sluttdato</Element>
                        <SjekkOmVerdiEksisterer verdi={harDato(sluttDato)} />
                    </Column>
                    {avtaleContext.avtale.tiltakstype !== 'MENTOR' && (
                        <Column md="4" sm="12" xs="12">
                            <Element>Stillingsprosent</Element>
                            <SjekkOmVerdiEksisterer verdi={stillingProsent} />
                        </Column>
                    )}
                    <Column md="4" sm="12" xs="12">
                        <Element>Stillingsprosent</Element>
                        <SjekkOmVerdiEksisterer verdi={stillingProsent} />
                    </Column>
                </Row>
                {avtaleContext.avtale.tiltakstype !== 'MENTOR' && (
                    <Row className={''}>
                        <Column md="4" sm="12" xs="12">
                            <Element>Antall dager per uke</Element>
                            <p>dsfsdf</p>
                            <SjekkOmVerdiEksisterer verdi={antallDagerPerUke?.toString()} />
                        </Column>
                    </Row>
                )}
                <Row className={''}>
                    <Column md="4" sm="12" xs="12">
                        <Element>Antall dager per uke</Element>
                        <SjekkOmVerdiEksisterer verdi={antallDagerPerUke?.toString()} />
                    </Column>
                </Row>
            </Container>
        </Stegoppsummering>
    );
};

export default VarighetOppsummering;
