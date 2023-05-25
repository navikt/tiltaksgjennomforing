import { AvtaleContext } from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import PakrevdInputValidering from '@/komponenter/PakrevdInputValidering/PakrevdInputValidering';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import TelefonnummerInput from '@/komponenter/TelefonnummerInput/TelefonnummerInput';
import { Column, Container, Row } from '@/komponenter/NavGrid/Grid';
import { BodyShort } from '@navikt/ds-react';
import ValutaInput from '@/komponenter/form/ValutaInput';
import React, { useState, useContext } from 'react';
import VisueltDisabledInputFelt from '@/komponenter/VisueltDisabledInputFelt/VisueltDisabledInputFelt';
import BEMHelper from '@/utils/bem';
import './omMentorSteg.less';

const OmMentorSteg = () => {
    const avtaleContext = useContext(AvtaleContext);
    const [mentorAntallTimerInput, setMentorAntallTimerInput] = useState<string>(
        avtaleContext.avtale.gjeldendeInnhold.mentorAntallTimer?.toString().replace(/\./g, ',') ?? ''
    );
    const inputToNumber = (verdi: string | undefined): number | undefined => {
        verdi = verdi?.replace(/,/g, '.');
        if (!isNaN(Number(verdi))) {
            return Number(verdi);
        }
    };
    const cls = BEMHelper('omMentorSteg');

    return (
        <Innholdsboks className={cls.className} utfyller="veileder">
            <SkjemaTittel>Om mentoren</SkjemaTittel>
            <Container fluid={true}>
                <Row className={cls.element('rad')}>
                    <Column md="6">
                        <div className="rad">
                            <VisueltDisabledInputFelt label="Fødselsnummer" tekst={avtaleContext.avtale.mentorFnr} />
                        </div>
                    </Column>
                </Row>
                <Row className={cls.element('rad')}>
                    <Column md="6">
                        <PakrevdInput
                            label="Fornavn"
                            verdi={avtaleContext.avtale.gjeldendeInnhold.mentorFornavn}
                            settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('mentorFornavn', verdi)}
                        />
                    </Column>
                    <Column md="6">
                        <PakrevdInput
                            label="Etternavn"
                            verdi={avtaleContext.avtale.gjeldendeInnhold.mentorEtternavn}
                            settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('mentorEtternavn', verdi)}
                        />
                    </Column>
                </Row>
                <Row className={cls.element('rad')}>
                    <Column md="6">
                        <TelefonnummerInput
                            label="Mobilnummer"
                            verdi={avtaleContext.avtale.gjeldendeInnhold.mentorTlf}
                            settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('mentorTlf', verdi)}
                        />
                    </Column>
                </Row>
            </Container>
            <Container fluid={true} className={cls.element('arbeidsoppgaver-mentor')}>
                <PakrevdTextarea
                    label="Arbeidsoppgaver til mentor"
                    verdi={avtaleContext.avtale.gjeldendeInnhold.mentorOppgaver}
                    settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('mentorOppgaver', verdi)}
                    maxLengde={1000}
                    feilmelding="Beskrivelse av arbeidsoppgaver er påkrevd"
                />
            </Container>
            <Container fluid={true}>
                <Row className="begge__tekst">
                    <Column md="6">
                        <PakrevdInputValidering
                            validering={/^\d{0,3}(,5?)?$/}
                            label="Antall timer med mentor per uke"
                            verdi={mentorAntallTimerInput}
                            settVerdi={(verdi) => {
                                setMentorAntallTimerInput(verdi);
                                avtaleContext.settAvtaleInnholdVerdi('mentorAntallTimer', inputToNumber(verdi));
                            }}
                        />
                    </Column>
                    <Column md="6">
                        <ValutaInput
                            className="input"
                            name="Timelønn"
                            size="medium"
                            label="Timelønn*"
                            autoComplete={'off'}
                            value={avtaleContext.avtale.gjeldendeInnhold.mentorTimelonn}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                if(/^\d{0,5}(,\d{0,2})?$/.test(event.target.value)){
                                    console.log("etv", event.target.value)
                                    //avtaleContext.settAvtaleInnholdVerdi('mentorTimelonn', parseFloat(event.target.value))
                                }}}                                
                            onBlur={(event) => {
                                if(/^\d{0,5}(,\d{0,2})?$/.test(event.target.value)){
                                    avtaleContext.settAvtaleInnholdVerdi('mentorTimelonn', parseFloat(event.target.value))
                                }
                                }} 

                            min={0}
                        />
                        <VerticalSpacer rem={0.5} />
                        <BodyShort size="small">
                            *Inkludert feriepenger, arbeidsgiveravgift og obligatorisk tjenestepensjon
                        </BodyShort>
                    </Column>
                </Row>
            </Container>
            <VerticalSpacer rem={2} />
            <LagreKnapp lagre={avtaleContext.lagreAvtale} label={'Lagre'} suksessmelding={'Avtale lagret'} />
        </Innholdsboks>
    );
};

export default OmMentorSteg;
