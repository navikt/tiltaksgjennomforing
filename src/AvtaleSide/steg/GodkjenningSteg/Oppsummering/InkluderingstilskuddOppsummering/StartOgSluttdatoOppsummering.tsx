import { Varighet } from '@/types/avtale';
import { formatterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { Column, Container, Row } from '@/komponenter/NavGrid/Grid';
import { Element } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import VarighetIkon from '../varighet/VarighetIkon';

const StartOgSluttdatoOppsummering: FunctionComponent<Varighet> = (props) => {
    const harDato = (dato?: string): string =>  dato ? formatterDato(dato, NORSK_DATO_FORMAT) : '';
    
    return (
        <Stegoppsummering ikon={<VarighetIkon />} tittel="Varighet">
            <Container fluid={true}>
                <Row className={''}>
                    <Column md="4" sm="6" xs="6">
                        <Element>Startdato</Element>
                        <SjekkOmVerdiEksisterer verdi={harDato(props.startDato)} />
                    </Column>
                    <Column md="4" sm="6" xs="6">
                        <Element>Sluttdato</Element>
                        <SjekkOmVerdiEksisterer verdi={harDato(props.sluttDato)} />
                    </Column>
                </Row>
            </Container>
        </Stegoppsummering>
    );
};

export default StartOgSluttdatoOppsummering;
