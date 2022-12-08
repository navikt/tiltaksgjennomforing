import React, { Dispatch, SetStateAction } from 'react';
import { Input } from 'nav-frontend-skjema';
import { TiltaksType } from '@/types/avtale';
import { BodyShort, Heading } from '@navikt/ds-react';
import { setFnrBrukerOnChange } from '@/utils/fnrUtils';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { AlleredeOpprettetInfo } from '@/komponenter/alleredeOpprettetTiltak/api/AlleredeOpprettetAvtaleProvider';
import AlleredeOpprettetAvtaleAdvarsel from '@/komponenter/alleredeOpprettetTiltak/advarsel/AlleredeOpprettetAvtaleAdvarsel';

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
            <Heading size="medium">Hvem skal inngå i avtalen?</Heading>
            <VerticalSpacer rem={1} />
            <Input
                className="typo-element"
                label="Deltakers fødselsnummer"
                value={deltakerFnr}
                bredde={'M'}
                onChange={(event) => setFnrBrukerOnChange(event, setDeltakerFnr, setDeltakerFnrFeil)}
                onBlur={validerDeltakerFnr}
                feil={deltakerFnrFeil}
            />
            <VerticalSpacer rem={1} />

            <Input
                className="typo-element"
                label="Virksomhetsnummer"
                bredde={'M'}
                description="Virksomhetsnummeret må være det samme som der det blir registrert inntekt for deltaker i A-meldingen."
                value={bedriftNr}
                onChange={orgnrOnChange}
                onBlur={orgnrOnBlur}
                feil={bedriftNrFeil}
            />
            {bedriftNavn && (
                <BodyShort size="small" className="opprett-avtale__bedriftNavn">
                    {bedriftNavn}
                </BodyShort>
            )}
            <VerticalSpacer rem={1} />
            {valgtTiltaksType === 'MENTOR' && (
                <Input
                    className="typo-element"
                    label="Mentors fødselsnummer"
                    value={mentorFnr}
                    bredde={'M'}
                    onChange={(event) => setFnrBrukerOnChange(event, setMentorFnr, setMentorFnrFeil)}
                    onBlur={validerMentorFnr}
                    feil={mentorFnrFeil}
                />
            )}
            <AlleredeOpprettetAvtaleAdvarsel
                alleredeRegistrertAvtale={alleredeRegistrertAvtale.avtaler}
                setModalIsOpen={setModalIsOpen}
            />
        </Innholdsboks>
    );
};
export default HvemSkalInngaaAvtalen;
