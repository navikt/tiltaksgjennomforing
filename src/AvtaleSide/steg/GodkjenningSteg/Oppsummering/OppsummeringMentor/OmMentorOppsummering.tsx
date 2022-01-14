import { ReactComponent as MentorIkon } from '@/assets/ikoner/mentor.svg';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Mentorinfo } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { Column, Container, Row } from 'nav-frontend-grid';
import { Element } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import {AvtaleinfoFeltSjekk} from "@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/Avtalepart/AvtaleinfoFeltSjekk";

const cls = BEMHelper('mentorOppsummering');

const verdi = (tall?: number) => {
    return tall === null || tall === undefined ? '' : tall.toString();
};

const OmMentorOppsummering: FunctionComponent<Mentorinfo> = props => {
    return (
        <Stegoppsummering ikon={<MentorIkon />} tittel="Om mentoren">
            <div>
                <AvtaleinfoFeltSjekk
                    navnFelter={[
                        { felt: 'fornavn', verdi: props.mentorFornavn },
                        { felt: 'etternavn', verdi: props.mentorEtternavn },
                    ]}
                    borderFarge={''}
                    overskrift={''}
                    skjulHvaMangler={false}
                    tilleggFelter={[]}
                />
            </div>
            <div>
                <Container fluid={true}>
                    <Row className={''}>
                        <Column md="12" sm="12" xs="12">
                            <Element className={cls.element('label')}>Arbeidsoppgaver</Element>
                            <SjekkOmVerdiEksisterer verdi={props.mentorOppgaver} />
                            <VerticalSpacer rem={1} />
                        </Column>
                    </Row>
                    <Row className={''}>
                        <Column md="4" sm="6" xs="6">
                            <Element className={cls.element('label')}>Antall timer med mentor</Element>
                            <SjekkOmVerdiEksisterer verdi={verdi(props.mentorAntallTimer)} />
                        </Column>
                        <Column md="4" sm="12" xs="12">
                            <Element className={cls.element('label')}>Timelønn</Element>
                            <SjekkOmVerdiEksisterer verdi={verdi(props.mentorTimelonn)} />
                        </Column>
                    </Row>
                </Container>
            </div>
        </Stegoppsummering>
    );
};

export default OmMentorOppsummering;
