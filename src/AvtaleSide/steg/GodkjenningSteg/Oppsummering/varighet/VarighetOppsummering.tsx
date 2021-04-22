import moment from 'moment';
import { Element } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { Varighet } from '@/types/avtale';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import VarighetIkon from './VarighetIkon';
import { Column, Container, Row } from 'nav-frontend-grid';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';

const formaterDato = (dato: string): string => {
    return moment(dato).format('DD.MM.YYYY');
};

const harDato = (dato?: string): string => {
    return dato ? formaterDato(dato).toString() : '';
};

const VarighetOppsummering: FunctionComponent<Varighet> = ({ startDato, sluttDato, stillingprosent }) => {
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
                    <Column md="4" sm="12" xs="12">
                        <Element>Stillingsprosent</Element>
                        <SjekkOmVerdiEksisterer verdi={stillingProsent} />
                    </Column>
                </Row>
            </Container>
        </Stegoppsummering>
    );
};

export default VarighetOppsummering;
