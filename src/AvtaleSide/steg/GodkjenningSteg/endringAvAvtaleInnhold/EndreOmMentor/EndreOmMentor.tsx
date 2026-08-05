import { AvtaleContext } from '@/AvtaleProvider';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import PakrevdInput from '@/komponenter/form/PakrevdInput';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import MobilnummerInput from '@/komponenter/MobilnummerInput/MobilnummerInput';
import { endreOmMentor } from '@/services/rest-service';
import { HGrid, Link } from '@navikt/ds-react';
import VisueltDisabledInputFelt from '@/komponenter/VisueltDisabledInputFelt/VisueltDisabledInputFelt';
import type { FunctionComponent } from 'react';
import { useContext, useState } from 'react';
import { TasklistIcon } from '@navikt/aksel-icons';
import styles from './EndreOmMentor.module.less';

const EndreOmMentor: FunctionComponent = () => {
    const [modalApen, setModalApen] = useState(false);
    const avtaleContext = useContext(AvtaleContext);

    const [mentorInfo, setMentorInfo] = useState({
        mentorFornavn: avtaleContext.avtale.gjeldendeInnhold.mentorFornavn,
        mentorEtternavn: avtaleContext.avtale.gjeldendeInnhold.mentorEtternavn,
        mentorTlf: avtaleContext.avtale.gjeldendeInnhold.mentorTlf,
        mentorOppgaver: avtaleContext.avtale.gjeldendeInnhold.mentorOppgaver,
        mentorAntallTimer: avtaleContext.avtale.gjeldendeInnhold.mentorAntallTimer,
        mentorTimelonn: avtaleContext.avtale.gjeldendeInnhold.mentorTimelonn,
    });

    const lukkModal = () => {
        setModalApen(false);
    };

    const kallEndreOmMentor = async () => {
        await endreOmMentor(avtaleContext.avtale, mentorInfo);
        await avtaleContext.hentAvtale();
        setModalApen(false);
    };

    return (
        <>
            <Link
                className={styles.endreOmMentorLenke}
                onClick={(event) => {
                    event.stopPropagation();
                    setModalApen(true);
                }}
                href="#"
                role="menuitem"
            >
                <div className={styles.endreOmMentorTekst} aria-hidden={true}>
                    <TasklistIcon />
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
            >
                <HGrid columns={2} gap="space-16">
                    <VisueltDisabledInputFelt
                        label="Fødselsnummer"
                        className={styles.limitMaxWidth}
                        tekst={avtaleContext.avtale.mentorFnr}
                    />
                    <PakrevdInput
                        name="mentorFornavn"
                        label="Fornavn"
                        verdi={mentorInfo.mentorFornavn}
                        settVerdi={(verdi) => setMentorInfo({ ...mentorInfo, mentorFornavn: verdi })}
                    />
                    <PakrevdInput
                        name="mentorEtternavn"
                        label="Etternavn"
                        verdi={mentorInfo.mentorEtternavn}
                        settVerdi={(verdi) => setMentorInfo({ ...mentorInfo, mentorEtternavn: verdi })}
                    />
                    <MobilnummerInput
                        label="Mobilnummer"
                        name="mentorTlf"
                        className={styles.limitMaxWidth}
                        verdi={mentorInfo.mentorTlf}
                        settVerdi={(verdi) => setMentorInfo({ ...mentorInfo, mentorTlf: verdi })}
                    />
                    <PakrevdTextarea
                        label="Arbeidsoppgaver til mentor"
                        className={styles.span2}
                        verdi={mentorInfo.mentorOppgaver}
                        settVerdi={(verdi) => setMentorInfo({ ...mentorInfo, mentorOppgaver: verdi })}
                        maxLengde={1000}
                        feilmelding="Beskrivelse av arbeidsoppgaver er påkrevd"
                    />
                </HGrid>
            </BekreftelseModal>
        </>
    );
};

export default EndreOmMentor;
