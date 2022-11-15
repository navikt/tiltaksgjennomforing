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
import { Input } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { useState, useContext } from 'react';

const OmMentorSteg = () => {
    const avtaleContext = useContext(AvtaleContext);
    const [mentorAntallTimerInput, setMentorAntallTimerInput] = useState<string>(
        avtaleContext.avtale.gjeldendeInnhold.mentorAntallTimer?.toString().replace(/\./g, ',') ?? ""
    );
    const inputToNumber = (verdi: string | undefined): number | undefined => {
        verdi = verdi?.replace(/,/g, '.');
        if (!isNaN(Number(verdi))) {
            return Number(verdi);
        }
    };

    return (
        <Innholdsboks utfyller="veileder">
            <SkjemaTittel>Om mentoren</SkjemaTittel>
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
                <VerticalSpacer rem={1} />
                <Row className={'rad'}>
                    <Column md="6">
                        <TelefonnummerInput
                            label="Telefonnummer"
                            verdi={avtaleContext.avtale.gjeldendeInnhold.mentorTlf}
                            settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('mentorTlf', verdi)}
                        />
                    </Column>
                </Row>
            </Container>
            <VerticalSpacer rem={1} />
            <Container fluid={true}>
                <PakrevdTextarea
                    label="Arbeidsoppgaver til mentor"
                    verdi={avtaleContext.avtale.gjeldendeInnhold.mentorOppgaver}
                    settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('mentorOppgaver', verdi)}
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
                                avtaleContext.settAvtaleInnholdVerdi('mentorAntallTimer', inputToNumber(verdi));
                            }}
                        />
                    </Column>
                    <Column md="6">
                        <PakrevdInputValidering
                            validering={/^\d{0,5}$/}
                            label="Timelønn*"
                            verdi={avtaleContext.avtale.gjeldendeInnhold.mentorTimelonn?.toFixed(0)}
                            settVerdi={(verdi) =>
                                avtaleContext.settAvtaleInnholdVerdi('mentorTimelonn', inputToNumber(verdi))
                            }
                        />
                        <VerticalSpacer rem={0.5} />
                        <Normaltekst>
                            *Inkludert feriepenger, arbeidsgiveravgift og obligatorisk tjenestepensjon
                        </Normaltekst>
                    </Column>
                </Row>
            </Container>
            <VerticalSpacer rem={2} />
            <LagreKnapp lagre={avtaleContext.lagreAvtale} label={'Lagre'} suksessmelding={'Avtale lagret'} />
        </Innholdsboks>
    );
};

export default OmMentorSteg;
