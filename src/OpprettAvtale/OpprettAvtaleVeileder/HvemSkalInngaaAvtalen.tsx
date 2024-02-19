import React, { Dispatch, SetStateAction } from 'react';
import { TiltaksType } from '@/types/avtale';
import { BodyShort, Heading, TextField } from '@navikt/ds-react';
import { setFnrBrukerOnChange } from '@/utils/fnrUtils';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { AlleredeOpprettetInfo } from '@/komponenter/alleredeOpprettetTiltak/api/AlleredeOpprettetAvtaleProvider';
import AlleredeOpprettetAvtaleAdvarsel from '@/komponenter/alleredeOpprettetTiltak/advarsel/AlleredeOpprettetAvtaleAdvarsel';
import BEMHelper from '@/utils/bem';
import './HvemSkalInngaaAvtalen.less';

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
    const cls = BEMHelper('hvem-skal-inngaa-avtalen-container');

    return (
        <Innholdsboks>
            <Heading level="2" size="medium">
                Hvem skal inngå i avtalen?
            </Heading>
            <VerticalSpacer rem={1} />
            <div className={cls.element('fnr-rad')}>
                <TextField
                    className={cls.element('typo-element')}
                    label="Deltakers fødselsnummer"
                    value={deltakerFnr}
                    size={'small'}
                    onChange={(event) => setFnrBrukerOnChange(event, setDeltakerFnr, setDeltakerFnrFeil)}
                    onBlur={validerDeltakerFnr}
                    error={deltakerFnrFeil}
                />

                {valgtTiltaksType === 'MENTOR' && (
                    <TextField
                        className={cls.element('typo-element')}
                        label="Mentors fødselsnummer"
                        value={mentorFnr}
                        size="small"
                        onChange={(event) => setFnrBrukerOnChange(event, setMentorFnr, setMentorFnrFeil)}
                        onBlur={validerMentorFnr}
                        error={mentorFnrFeil}
                    />
                )}
            </div>
            <TextField
                className={cls.element('typo-element')}
                label="Virksomhetsnummer"
                value={bedriftNr}
                size={'small'}
                description="Virksomhetsnummeret må være det samme som der det blir registrert inntekt for deltaker i A-meldingen."
                onChange={orgnrOnChange}
                onBlur={orgnrOnBlur}
                error={bedriftNrFeil}
            />
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
