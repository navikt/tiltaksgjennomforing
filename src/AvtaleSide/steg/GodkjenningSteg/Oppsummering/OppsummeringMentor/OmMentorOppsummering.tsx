import { Element } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent } from 'react';
import BEMHelper from '@/utils/bem';
import { Mentorinfo } from '@/types/avtale';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import { Column, Container, Row } from 'nav-frontend-grid';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Avtalepart } from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/Avtaleparter/Avtaleparter';
import { ReactComponent as MentorIkon } from '@/assets/ikoner/mentor.svg';

const cls = BEMHelper('mentorOppsummering');

const verdi = (tall: number) => {
    return tall === null ? '' : tall.toString();
};

const OmMentorOppsummering: FunctionComponent<Mentorinfo> = props => {
    return (
        <Stegoppsummering ikon={<MentorIkon />} tittel="Om mentoren">
            <div>
                <Avtalepart
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
                            <VerticalSpacer sixteenPx={true} />
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
