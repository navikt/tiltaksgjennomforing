import MentorIkon from '@/assets/ikoner/mentor.svg?react';
import TausetserklæringTekst from '@/AvtaleOversikt/Taushetserklæring/TaushetserklæringTekst';
import { AvtaleContext } from '@/AvtaleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Mentorinfo } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { Accordion, Label } from '@navikt/ds-react';
import { Column, Container, Row } from '@/komponenter/NavGrid/Grid';
import React, { FunctionComponent, useContext } from 'react';
import { AvtaleinfoFeltSjekk } from '../AvtaleinfoFeltSjekk/AvtaleinfoFeltSjekk';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';

const cls = BEMHelper('mentorOppsummering');

const verdi = (tall?: number) => {
    return tall === null || tall === undefined ? '' : tall.toString();
};

const OmMentorOppsummering: FunctionComponent<Mentorinfo> = (props) => {
    const { rolle } = useContext(InnloggetBrukerContext);
    const { avtale } = useContext(AvtaleContext);
    return (
        <Stegoppsummering ikon={<MentorIkon />} tittel="Om mentoren">
            <div>
                <AvtaleinfoFeltSjekk
                    navnFelter={[
                        { felt: 'fornavn', verdi: props.mentorFornavn },
                        { felt: 'etternavn', verdi: props.mentorEtternavn },
                    ]}
                    tilleggFelter={
                        rolle === 'DELTAKER'
                            ? [
                                  {
                                      felt: 'telefon',
                                      verdi: props.mentorTlf,
                                  },
                              ]
                            : [
                                  {
                                      felt: 'fødselsnummer',
                                      verdi: avtale.mentorFnr,
                                  },
                                  {
                                      felt: 'telefon',
                                      verdi: props.mentorTlf,
                                  },
                              ]
                    }
                    borderFarge={'farge-lyslilla'}
                    overskrift={'Mentor'}
                    skjulHvaMangler={false}
                />
                <div>
                    <Container fluid={true}>
                        <Row className={''}>
                            <Column md="12" sm="12" xs="12">
                                <Label>Arbeidsoppgaver</Label>
                                <SjekkOmVerdiEksisterer ariaLabel={'Arbeidsoppgaver'} verdi={props.mentorOppgaver} />
                                <VerticalSpacer rem={1} />
                            </Column>
                        </Row>
                        <Row className={''}>
                            <Column md="4" sm="6" xs="6">
                                <Label>Antall timer med mentor per uke</Label>
                                <SjekkOmVerdiEksisterer
                                    ariaLabel={'Antall timer med mentor per uke'}
                                    verdi={verdi(props.mentorAntallTimer)}
                                />
                            </Column>
                            {rolle !== 'DELTAKER' && (
                                <Column md="6" sm="6" xs="6">
                                    <Label className={cls.element('label')}>
                                        Timelønn inkl. Feriepenger, arbeidsgiveravgift og obligatorisk tjenestepensjon
                                    </Label>
                                    <SjekkOmVerdiEksisterer
                                        ariaLabel={
                                            'Kroner beløp for timelønn inkludert Feriepenger, arbeidsgiveravgift og obligatorisk tjenestepensjon'
                                        }
                                        verdi={verdi(props.mentorTimelonn)}
                                    />
                                </Column>
                            )}
                        </Row>
                    </Container>
                    <VerticalSpacer rem={2} />
                    <Accordion className="accordion">
                        <Accordion.Item>
                            <Accordion.Header>
                                <Label>Les mer om taushetsplikten til mentor</Label>
                            </Accordion.Header>
                            <Accordion.Content>
                                <TausetserklæringTekst />
                            </Accordion.Content>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </div>
        </Stegoppsummering>
    );
};

export default OmMentorOppsummering;
