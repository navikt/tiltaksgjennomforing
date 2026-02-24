import { AvtaleContext } from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import TelefonnummerInput from '@/komponenter/TelefonnummerInput/TelefonnummerInput';
import { Button, TextField } from '@navikt/ds-react';
import React, { useContext, useEffect, useState } from 'react';
import VisueltDisabledInputFelt from '@/komponenter/VisueltDisabledInputFelt/VisueltDisabledInputFelt';
import BEMHelper from '@/utils/bem';
import './omMentorSteg.less';
import AvtaleStatus from '@/AvtaleSide/AvtaleStatus/AvtaleStatus';

const OmMentorSteg = () => {
    const avtaleContext = useContext(AvtaleContext);

    const [mentorFnr, setMentorFnr] = useState<string | undefined>(undefined);
    const [mentorError, setMentorError] = useState<string | undefined>(undefined);

    useEffect(() => {
        setMentorFnr(avtaleContext.avtale.mentorFnr);
    }, [avtaleContext.avtale]);

    const cls = BEMHelper('omMentorSteg');

    // TODO: Dette kan fjernes når alle mentor-avtaler er "migrert ferdig" eller annullert med feilregistrering
    const kanRedigereMentorFnr =
        avtaleContext.avtale.opphav === 'ARENA' && avtaleContext.avtale.godkjentAvMentor === null;

    return (
        <>
            <AvtaleStatus />
            <Innholdsboks className={cls.className}>
                <SkjemaTittel>Om mentoren</SkjemaTittel>
                <div className={cls.element('rad')}>
                    {kanRedigereMentorFnr ? (
                        <>
                            <PakrevdInput
                                label="Fødselsnummer"
                                error={mentorError}
                                verdi={mentorFnr ?? ''}
                                settVerdi={(verdi) => {
                                    setMentorFnr(verdi);
                                    setMentorError(undefined);
                                }}
                            />
                            <Button
                                style={{ marginTop: '39px' }}
                                disabled={avtaleContext.underLagring || mentorFnr === avtaleContext.avtale.mentorFnr}
                                variant="secondary"
                                size="small"
                                onClick={async () => {
                                    try {
                                        if (mentorFnr && mentorFnr.length === 11) {
                                            await avtaleContext.oppdaterMentorFnr({ mentorFnr });
                                        }
                                    } catch (error) {
                                        setMentorError('Feil ved oppdatering av fødselsnummer' + error);
                                    }
                                }}
                            >
                                Oppdater
                            </Button>
                        </>
                    ) : (
                        <VisueltDisabledInputFelt label="Fødselsnummer" tekst={avtaleContext.avtale.mentorFnr} />
                    )}
                </div>
                <div className={cls.element('rad')}>
                    {kanRedigereMentorFnr ? (
                        <TextField
                            label="Fornavn"
                            readOnly={true}
                            value={avtaleContext.avtale.gjeldendeInnhold.mentorFornavn}
                        />
                    ) : (
                        <PakrevdInput
                            label="Fornavn"
                            verdi={avtaleContext.avtale.gjeldendeInnhold.mentorFornavn}
                            settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('mentorFornavn', verdi)}
                        />
                    )}
                    {kanRedigereMentorFnr ? (
                        <TextField
                            label="Etternavn"
                            readOnly={true}
                            value={avtaleContext.avtale.gjeldendeInnhold.mentorEtternavn}
                        />
                    ) : (
                        <PakrevdInput
                            label="Etternavn"
                            verdi={avtaleContext.avtale.gjeldendeInnhold.mentorEtternavn}
                            settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('mentorEtternavn', verdi)}
                        />
                    )}
                </div>
                <div className={cls.element('rad')}>
                    <TelefonnummerInput
                        label="Mobilnummer"
                        verdi={avtaleContext.avtale.gjeldendeInnhold.mentorTlf}
                        settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('mentorTlf', verdi)}
                    />
                </div>
                <div className={cls.element('textArea')}>
                    <PakrevdTextarea
                        label="Arbeidsoppgaver til mentor"
                        verdi={avtaleContext.avtale.gjeldendeInnhold.mentorOppgaver}
                        settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('mentorOppgaver', verdi)}
                        maxLengde={1000}
                        feilmelding="Beskrivelse av arbeidsoppgaver er påkrevd"
                    />
                </div>
                <VerticalSpacer rem={2} />
                <LagreKnapp lagre={avtaleContext.lagreAvtale} suksessmelding={'Avtale lagret'}>
                    Lagre
                </LagreKnapp>
            </Innholdsboks>
        </>
    );
};

export default OmMentorSteg;
