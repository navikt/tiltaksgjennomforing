import MentorIkon from '@/assets/ikoner/mentor.svg?react';
import TaushetserklæringTekst from '@/AvtaleOversikt/Taushetserklæring/TaushetserklæringTekst';
import { AvtaleContext } from '@/AvtaleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Mentorinfo } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { ExpansionCard, Heading, Label, ReadMore } from '@navikt/ds-react';
import { Column, Container, Row } from '@/komponenter/NavGrid/Grid';
import { useContext } from 'react';
import { AvtaleinfoFeltSjekk } from '../AvtaleinfoFeltSjekk/AvtaleinfoFeltSjekk';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import { storForbokstav } from '@/utils/stringUtils';
import TimeloennHjelpetekst from '@/AvtaleSide/steg/BeregningTilskudd/TimeloennHjelpetekst';

const cls = BEMHelper('mentorOppsummering');

const verdi = (tall?: number) => {
    return tall === null || tall === undefined ? '' : tall.toString();
};

interface Props extends Mentorinfo {
    visInnholdFraEtterMigrering: boolean;
}

const OmMentorOppsummering = (props: Props) => {
    const { visInnholdFraEtterMigrering } = props;
    const { rolle } = useContext(InnloggetBrukerContext);
    const { avtale } = useContext(AvtaleContext);
    const periodeType = visInnholdFraEtterMigrering ? 'måned' : 'uke';

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
                                <Label>Antall timer med mentor per {periodeType}</Label>
                                <SjekkOmVerdiEksisterer
                                    ariaLabel={`Antall timer med mentor per ${periodeType}`}
                                    verdi={verdi(props.mentorAntallTimer)}
                                />
                            </Column>
                            {!visInnholdFraEtterMigrering && rolle !== 'DELTAKER' && (
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
                        {visInnholdFraEtterMigrering && rolle !== 'DELTAKER' && (
                            <>
                                <VerticalSpacer rem={1} />
                                <Row>
                                    <Column md="4" sm="6" xs="6">
                                        <Label>{storForbokstav(props.mentorValgtLonnstype || 'Årslønn')}</Label>
                                        <SjekkOmVerdiEksisterer
                                            ariaLabel={'Mentors valgte lønn'}
                                            verdi={verdi(props.mentorValgtLonnstypeBelop)}
                                        />
                                    </Column>
                                    <Column md="6" sm="6" xs="6">
                                        <Label>Stillingsprosent</Label>
                                        <SjekkOmVerdiEksisterer
                                            ariaLabel={'Mentors stillingsprosent'}
                                            verdi={verdi(props.stillingprosent)}
                                        />
                                    </Column>
                                </Row>
                                <VerticalSpacer rem={1} />
                                <div>
                                    <ReadMore header={'Slik beregnes timelønn'} size={'small'}>
                                        <TimeloennHjelpetekst />
                                    </ReadMore>
                                </div>
                            </>
                        )}
                    </Container>
                    <VerticalSpacer rem={2} />
                    <ExpansionCard aria-label="Les mer om taushetsplikten til mentor" size="small">
                        <ExpansionCard.Header>
                            <Heading level="2" size="small">
                                Les mer om taushetsplikten til mentor
                            </Heading>
                        </ExpansionCard.Header>
                        <ExpansionCard.Content>
                            <TaushetserklæringTekst />
                        </ExpansionCard.Content>
                    </ExpansionCard>
                </div>
            </div>
        </Stegoppsummering>
    );
};

export default OmMentorOppsummering;
