import React, { Dispatch, SetStateAction } from 'react';
import { TiltaksType } from '@/types/avtale';
import { Alert, BodyShort, Heading, HStack, ReadMore, TextField } from '@navikt/ds-react';
import { erUnder18, setFnrBrukerOnChange } from '@/utils/fnrUtils';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { AlleredeOpprettetInfo } from '@/komponenter/alleredeOpprettetTiltak/api/AlleredeOpprettetAvtaleProvider';
import AlleredeOpprettetAvtaleAdvarsel from '@/komponenter/alleredeOpprettetTiltak/advarsel/AlleredeOpprettetAvtaleAdvarsel';
import styles from './HvemSkalInngaaAvtalen.module.less';
import EksternLenke from '@/komponenter/navigation/EksternLenke';

interface Props {
    deltakerFnr: string;
    setDeltakerFnr: Dispatch<SetStateAction<string>>;
    deltakerFnrFeil: string | undefined;
    setDeltakerFnrFeil: Dispatch<SetStateAction<string | undefined>>;
    validerDeltakerFnr: () => boolean;
    bedriftNr: string;
    orgnrOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    orgnrOnBlur: () => void;
    bedriftNrFeil: string | undefined;
    bedriftNavn: string;
    valgtTiltaksType: TiltaksType | undefined;
    mentorFnr: string;
    setMentorFnr: Dispatch<SetStateAction<string>>;
    mentorFnrFeil: string | undefined;
    setMentorFnrFeil: Dispatch<SetStateAction<string | undefined>>;
    validerMentorFnr: () => boolean;
    alleredeRegistrertAvtale: AlleredeOpprettetInfo;
    setModalIsOpen: Dispatch<SetStateAction<boolean>>;
}

const HvemSkalInngaaAvtalen: React.FC<Props> = ({
    deltakerFnr,
    setDeltakerFnr,
    deltakerFnrFeil,
    setDeltakerFnrFeil,
    validerDeltakerFnr,
    bedriftNr,
    orgnrOnChange,
    orgnrOnBlur,
    bedriftNrFeil,
    bedriftNavn,
    valgtTiltaksType,
    mentorFnr,
    setMentorFnr,
    mentorFnrFeil,
    setMentorFnrFeil,
    validerMentorFnr,
    alleredeRegistrertAvtale,
    setModalIsOpen,
}) => {
    return (
        <Innholdsboks>
            <Heading level="2" size="medium">
                Hvem skal inngå i avtalen?
            </Heading>
            <VerticalSpacer rem={1} />

            <HStack gap="space-16">
                <TextField
                    className={styles.numberInput}
                    label="Deltakers fødselsnummer"
                    value={deltakerFnr}
                    onChange={(event) => setFnrBrukerOnChange(event, setDeltakerFnr, setDeltakerFnrFeil)}
                    onBlur={validerDeltakerFnr}
                    error={deltakerFnrFeil}
                />
                {valgtTiltaksType === 'MENTOR' && (
                    <TextField
                        className={styles.numberInput}
                        label="Mentors fødselsnummer"
                        value={mentorFnr}
                        onChange={(event) => setFnrBrukerOnChange(event, setMentorFnr, setMentorFnrFeil)}
                        onBlur={validerMentorFnr}
                        error={mentorFnrFeil}
                    />
                )}
            </HStack>
            <VerticalSpacer rem={1} />
            {erUnder18(deltakerFnr) && (
                <>
                    <Alert variant="warning">
                        Denne deltakeren er under 18 år. Det må derfor innhentes samtykke fra foresatte på at deltakeren
                        kan delta i arbeidsrettet tiltak.
                        <VerticalSpacer rem={1} />
                        <EksternLenke href={'https://www.nav.no/samtykke-foresatte'}>
                            Samtykke fra foresatte
                        </EksternLenke>
                    </Alert>
                    <VerticalSpacer rem={1} />
                </>
            )}
            <TextField
                className={styles.numberInput}
                label="Virksomhetsnummer"
                value={bedriftNr}
                description="Virksomhetsnummeret må være det samme som der det blir registrert inntekt for deltaker i A-meldingen."
                onChange={orgnrOnChange}
                onBlur={orgnrOnBlur}
                error={bedriftNrFeil}
            />
            <VerticalSpacer rem={1} />
            <ReadMore header="Hva er virksomhetsnummer?" variant="moderate">
                Virksomhetsnummer (tidligere kalt bedriftsnummer) er organisasjonsnummeret som brukes for
                ansettelsesforhold, og som A-meldingen registreres på. Dette er ikke det samme som organisasjonsnummeret
                til hovedenheten.
            </ReadMore>
            {bedriftNavn && (
                <BodyShort size="small" className="opprett-avtale__bedriftNavn">
                    {bedriftNavn}
                </BodyShort>
            )}
            <VerticalSpacer rem={1} />
            <AlleredeOpprettetAvtaleAdvarsel
                alleredeRegistrertAvtale={alleredeRegistrertAvtale.avtaler}
                setModalIsOpen={setModalIsOpen}
            />
        </Innholdsboks>
    );
};
export default HvemSkalInngaaAvtalen;
