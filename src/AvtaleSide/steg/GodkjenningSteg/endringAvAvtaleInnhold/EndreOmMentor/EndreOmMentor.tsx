import { AvtaleContext } from '@/AvtaleProvider';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import PakrevdInputValidering from '@/komponenter/PakrevdInputValidering/PakrevdInputValidering';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import TelefonnummerInput from '@/komponenter/TelefonnummerInput/TelefonnummerInput';
import { endreOmMentor } from '@/services/rest-service';
import { Task } from '@navikt/ds-icons/cjs';
import { Column, Container, Row } from '@/komponenter/NavGrid/Grid';
import { Link } from '@navikt/ds-react';
import { Input } from 'nav-frontend-skjema';
import React, { FunctionComponent, useContext, useState } from 'react';

const EndreOmMentor: FunctionComponent = () => {
    const [modalApen, setModalApen] = useState(false);
    const avtaleContext = useContext(AvtaleContext);

    const inputToNumber = (input: string | undefined): number | undefined => {
        input = input?.replace(/,/g, '.');
        if (!isNaN(Number(input))) {
            return Number(input);
        }
    };

    const [mentorInfo, setMentorInfo] = useState({
        mentorFornavn: avtaleContext.avtale.gjeldendeInnhold.mentorFornavn,
        mentorEtternavn: avtaleContext.avtale.gjeldendeInnhold.mentorEtternavn,
        mentorTlf: avtaleContext.avtale.gjeldendeInnhold.mentorTlf,
        mentorOppgaver: avtaleContext.avtale.gjeldendeInnhold.mentorOppgaver,
        mentorAntallTimer: avtaleContext.avtale.gjeldendeInnhold.mentorAntallTimer,
        mentorTimelonn: avtaleContext.avtale.gjeldendeInnhold.mentorTimelonn,
    });
    const [mentorAntallTimerInput, setMentorAntallTimerInput] =
        useState<string>(mentorInfo.mentorAntallTimer?.toString().replace(/\./g, ',') ?? "");

    const lukkModal = () => {
        setModalApen(false);
    };
    const kallEndreOmMentor = async () => {
        await endreOmMentor(avtaleContext.avtale, mentorInfo);
        await avtaleContext.hentAvtale();
        setModalApen(false);
    };

    const endreOmMentorInnhold = (
        <div>
            <Container fluid={true}>
                <Row className={''}>
                    <Column md="6">
                        <div className={'rad'}>
                            <Input label="Fødselsnummer" value={avtaleContext.avtale.mentorFnr} disabled={true} />
                        </div>
                    </Column>
                </Row>
                <VerticalSpacer rem={1} />
                <Row className="rad">
                    <Column md="6">
                        <PakrevdInput
                            label="Fornavn"
                            verdi={mentorInfo.mentorFornavn}
                            settVerdi={(verdi) => setMentorInfo({ ...mentorInfo, mentorFornavn: verdi })}
                        />
                    </Column>
                    <Column md="6">
                        <PakrevdInput
                            label="Etternavn"
                            verdi={mentorInfo.mentorEtternavn}
                            settVerdi={(verdi) => setMentorInfo({ ...mentorInfo, mentorEtternavn: verdi })}
                        />
                    </Column>
                </Row>
                <VerticalSpacer rem={1} />
                <Row className={'rad'}>
                    <Column md="6">
                        <TelefonnummerInput
                            label="Telefonnummer"
                            verdi={mentorInfo.mentorTlf}
                            settVerdi={(verdi) => setMentorInfo({ ...mentorInfo, mentorTlf: verdi })}
                        />
                    </Column>
                </Row>
            </Container>
            <VerticalSpacer rem={1} />
            <Container fluid={true}>
                <PakrevdTextarea
                    label="Arbeidsoppgaver til mentor"
                    verdi={mentorInfo.mentorOppgaver}
                    settVerdi={(verdi) => setMentorInfo({ ...mentorInfo, mentorOppgaver: verdi })}
                    maxLengde={1000}
                    feilmelding="Beskrivelse av arbeidsoppgaver er påkrevd"
                />
            </Container>
            <VerticalSpacer rem={2} />
            <Container fluid={true}>
                <Row className="begge__tekst">
                    <Column md="6">
                        <PakrevdInputValidering
                            validering={/^\d{0,3}(,5?)?$/}
                            label="Antall timer med mentor per uke"
                            verdi={mentorAntallTimerInput}
                            settVerdi={(verdi) => {
                                setMentorAntallTimerInput(verdi);
                                setMentorInfo({
                                    ...mentorInfo,
                                    mentorAntallTimer: inputToNumber(verdi),
                                })
                            }}
                        />
                        <PakrevdInputValidering
                            validering={/^\d{0,3}$/}
                            label="Timelønn inkl. Feriepenger, arbeidsgiveravgift og obligatorisk tjenestepensjon"
                            verdi={mentorInfo.mentorTimelonn?.toFixed(0)}
                            settVerdi={(verdi) =>
                                setMentorInfo({ ...mentorInfo, mentorTimelonn: inputToNumber(verdi) })
                            }
                        />
                    </Column>
                </Row>
            </Container>
        </div>
    );

    return (
        <>
            <Link
                style={{ display: 'flex', alignItems: 'center' }}
                onClick={(event) => {
                    event.stopPropagation();
                    setModalApen(true);
                }}
                href="#"
                role="menuitem"
            >
                <div style={{ marginRight: '0.5rem' }} aria-hidden={true}>
                    <Task />
                </div>
                Endre om Mentor
            </Link>
            <BekreftelseModal
                style={{ width: '40rem' }}
                avbrytelseTekst="Avbryt"
                bekreftelseTekst="Endre"
                oversiktTekst="Endre om mentor"
                modalIsOpen={modalApen}
                bekreftOnClick={kallEndreOmMentor}
                lukkModal={lukkModal}
                modalInnhold={endreOmMentorInnhold}
            />
        </>
    );
};

export default EndreOmMentor;
