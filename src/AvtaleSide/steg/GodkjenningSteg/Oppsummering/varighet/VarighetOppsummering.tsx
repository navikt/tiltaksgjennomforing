import moment from 'moment';
import { Element } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent } from 'react';
import BEMHelper from '@/utils/bem';
import { Varighet } from '@/types/avtale';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import VarighetIkon from './VarighetIkon';
import { Column, Container, Row } from 'nav-frontend-grid';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';

const cls = BEMHelper('varighetOppsummering');

const formaterDato = (dato: number): string => {
    return moment(dato).format('DD.MM.YYYY');
};

const harDato = (dato: number): string => {
    return dato ? formaterDato(dato).toString() : '';
};

const VarighetOppsummering: FunctionComponent<Varighet> = ({ startDato, sluttDato, stillingprosent }) => {
    const stillingProsent = stillingprosent ? stillingprosent.toString() + '%' : '';

    return (
        <Stegoppsummering ikon={<VarighetIkon />} tittel="Dato og arbeidstid">
            <Container fluid={true}>
                <Row className={''}>
                    <Column md="4" sm="6" xs="6">
                        <Element className={cls.element('label')}>Startdato</Element>
                        <SjekkOmVerdiEksisterer verdi={harDato(startDato)} clsName="varighetOppsummering" />
                        <VerticalSpacer sixteenPx={true} />
                    </Column>
                    <Column md="4" sm="6" xs="6">
                        <Element className={cls.element('label')}>Sluttdato</Element>
                        <SjekkOmVerdiEksisterer verdi={harDato(sluttDato)} clsName="varighetOppsummering" />
                    </Column>
                    <Column md="4" sm="12" xs="12">
                        <Element className={cls.element('label')}>Stillingsprosent</Element>
                        <SjekkOmVerdiEksisterer verdi={stillingProsent} clsName="varighetOppsummering" />
                    </Column>
                </Row>
            </Container>
        </Stegoppsummering>
    );
};

export default VarighetOppsummering;
