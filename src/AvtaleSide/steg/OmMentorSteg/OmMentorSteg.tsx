import { AvtaleContext } from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import PakrevdInputValidering from '@/komponenter/PakrevdInputValidering/PakrevdInputValidering';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import TelefonnummerInput from '@/komponenter/TelefonnummerInput/TelefonnummerInput';
import { BodyShort } from '@navikt/ds-react';
import ValutaInput from '@/komponenter/form/ValutaInput';
import React, { useContext, useState } from 'react';
import VisueltDisabledInputFelt from '@/komponenter/VisueltDisabledInputFelt/VisueltDisabledInputFelt';
import BEMHelper from '@/utils/bem';
import './omMentorSteg.less';
import AvtaleStatus from '@/AvtaleSide/AvtaleStatus/AvtaleStatus';
import { useFeatureToggles } from '@/FeatureToggleProvider';
import { inputToNumber } from '@/utils';

const OmMentorSteg = () => {
    const avtaleContext = useContext(AvtaleContext);
    const { mentorFeatureToggle } = useFeatureToggles();
    const [mentorAntallTimerInput, setMentorAntallTimerInput] = useState<string>(
        avtaleContext.avtale.gjeldendeInnhold.mentorAntallTimer?.toString().replace(/\./g, ',') ?? '',
    );

    const [forHøyTimelønn, settForHøyTimelønn] = useState<string | undefined>(undefined);

    const cls = BEMHelper('omMentorSteg');

    return (
        <>
            <AvtaleStatus />
            <Innholdsboks className={cls.className}>
                <SkjemaTittel>Om mentoren</SkjemaTittel>
                <div className={cls.element('rad')}>
                    <VisueltDisabledInputFelt label="Fødselsnummer" tekst={avtaleContext.avtale.mentorFnr} />
                </div>
                <div className={cls.element('rad')}>
                    <PakrevdInput
                        label="Fornavn"
                        verdi={avtaleContext.avtale.gjeldendeInnhold.mentorFornavn}
                        settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('mentorFornavn', verdi)}
                    />
                    <PakrevdInput
                        label="Etternavn"
                        verdi={avtaleContext.avtale.gjeldendeInnhold.mentorEtternavn}
                        settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('mentorEtternavn', verdi)}
                    />
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

                {!mentorFeatureToggle && (
                    <>
                        <div className={cls.element('rad')}>
                            <PakrevdInputValidering
                                validering={/^\d{0,3}(,5?)?$/}
                                label="Antall timer med mentor per uke"
                                verdi={mentorAntallTimerInput}
                                settVerdi={(verdi) => {
                                    setMentorAntallTimerInput(verdi);
                                    avtaleContext.settAvtaleInnholdVerdi('mentorAntallTimer', inputToNumber(verdi));
                                }}
                            />
                            <ValutaInput
                                min={0}
                                className="input"
                                name="Timelønn"
                                size="medium"
                                label="Timelønn*"
                                autoComplete={'off'}
                                value={avtaleContext.avtale.gjeldendeInnhold.mentorTimelonn}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    settForHøyTimelønn(undefined);
                                }}
                                onBlur={(event) => {
                                    if (/^\d{0,4}(\.\d{0,2})?$/.test(event.target.value)) {
                                        avtaleContext.settAvtaleInnholdVerdi(
                                            'mentorTimelonn',
                                            Math.round(parseFloat(event.target.value)),
                                        );
                                    } else {
                                        avtaleContext.settAvtaleInnholdVerdi('mentorTimelonn', undefined);
                                        settForHøyTimelønn('Overskrider maks timelønn');
                                    }
                                }}
                                error={forHøyTimelønn}
                            />
                        </div>
                        <div>
                            <VerticalSpacer rem={0.75} />
                            <BodyShort size="small">
                                *Inkludert feriepenger, arbeidsgiveravgift og obligatorisk tjenestepensjon
                            </BodyShort>
                        </div>
                    </>
                )}
                <VerticalSpacer rem={2} />
                <LagreKnapp lagre={avtaleContext.lagreAvtale} suksessmelding={'Avtale lagret'}>
                    Lagre
                </LagreKnapp>
            </Innholdsboks>
        </>
    );
};

export default OmMentorSteg;
