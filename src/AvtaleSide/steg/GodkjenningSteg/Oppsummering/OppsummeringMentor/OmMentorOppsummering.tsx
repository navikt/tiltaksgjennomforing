import MentorIkon from '@/assets/ikoner/mentor.svg?react';
import TaushetserklæringTekst from '@/AvtaleOversikt/Taushetserklæring/TaushetserklæringTekst';
import { AvtaleContext } from '@/AvtaleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Mentorinfo, VersjonInnhold } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { ExpansionCard, Heading, HGrid, Label, ReadMore } from '@navikt/ds-react';
import { useContext } from 'react';
import { AvtaleinfoFeltSjekk } from '../AvtaleinfoFeltSjekk/AvtaleinfoFeltSjekk';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import { storForbokstav } from '@/utils/stringUtils';
import TimeloennHjelpetekst from '@/AvtaleSide/steg/BeregningTilskudd/TimeloennHjelpetekst';
import { formaterPenger } from '@/utils';

const cls = BEMHelper('mentorOppsummering');

const verdi = (tall?: number) => {
    return tall === null || tall === undefined ? '' : tall.toString();
};

interface Props extends Mentorinfo {
    versjonInnhold: VersjonInnhold;
}

const OmMentorOppsummering = (props: Props) => {
    const { versjonInnhold } = props;
    const { rolle } = useContext(InnloggetBrukerContext);
    const { avtale } = useContext(AvtaleContext);
    const periodeType = versjonInnhold === 'MENTOR_BEREGNING' ? 'måned' : 'uke';

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
                    <div>
                        <Label>Arbeidsoppgaver</Label>
                        <SjekkOmVerdiEksisterer ariaLabel={'Arbeidsoppgaver'} verdi={props.mentorOppgaver} />
                    </div>
                    <VerticalSpacer rem={1} />
                    <div>
                        <Label>Antall timer med mentor per {periodeType}</Label>
                        <SjekkOmVerdiEksisterer
                            ariaLabel={`Antall timer med mentor per ${periodeType}`}
                            verdi={verdi(props.mentorAntallTimer)}
                        />
                    </div>
                    <VerticalSpacer rem={1} />
                    {versjonInnhold === 'OPPRINNELIG' && rolle !== 'DELTAKER' && (
                        <div>
                            <Label className={cls.element('label')}>
                                Timelønn inkl. Feriepenger, arbeidsgiveravgift og obligatorisk tjenestepensjon
                            </Label>
                            <SjekkOmVerdiEksisterer
                                ariaLabel={
                                    'Kroner beløp for timelønn inkludert Feriepenger, arbeidsgiveravgift og obligatorisk tjenestepensjon'
                                }
                                verdi={formaterPenger(props.mentorTimelonn)}
                            />
                        </div>
                    )}
                    {versjonInnhold === 'MENTOR_BEREGNING' && rolle !== 'DELTAKER' && (
                        <>
                            <VerticalSpacer rem={1} />
                            <HGrid columns={{ xs: 1, sm: 2, md: 3 }} gap="space-16">
                                <div>
                                    <Label>{storForbokstav(props.mentorValgtLonnstype || 'Årslønn')}</Label>
                                    <SjekkOmVerdiEksisterer
                                        ariaLabel={'Mentors valgte lønn'}
                                        verdi={verdi(props.mentorValgtLonnstypeBelop)}
                                    />
                                </div>
                                {props.mentorValgtLonnstype !== 'TIMELØNN' && (
                                    <div>
                                        <Label>Stillingsprosent</Label>
                                        <SjekkOmVerdiEksisterer
                                            ariaLabel={'Mentors stillingsprosent'}
                                            verdi={verdi(props.stillingprosent) + '\u00A0%'}
                                        />
                                    </div>
                                )}
                            </HGrid>
                            <VerticalSpacer rem={1} />
                            <div>
                                <ReadMore header={'Slik beregnes timelønn'} size={'small'}>
                                    <TimeloennHjelpetekst />
                                </ReadMore>
                            </div>
                        </>
                    )}
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
