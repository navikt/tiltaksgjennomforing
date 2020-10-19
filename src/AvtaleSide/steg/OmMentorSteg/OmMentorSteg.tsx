import { AvtaleContext } from '@/AvtaleProvider';
import { InputStegProps } from '@/AvtaleSide/input-steg-props';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { Mentorinfo } from '@/types/avtale';
import { Column, Container, Row } from 'nav-frontend-grid';
import * as React from 'react';
import { useContext } from 'react';

const OmMentorSteg = () => {
    const avtaleContext: InputStegProps<Mentorinfo> = useContext(AvtaleContext);
    const sjekkOgSettVerdi = (verdi: string | number | undefined): number | undefined => {
        if (typeof verdi === 'number') {
            return verdi;
        }
    };

    return (
        <Innholdsboks utfyller="veileder">
            <SkjemaTittel>Om mentoren</SkjemaTittel>
            <Container fluid={true}>
                <Row className="">
                    <Column md="6">
                        <PakrevdInput
                            label="Fornavn"
                            verdi={avtaleContext.avtale.mentorFornavn}
                            settVerdi={verdi => avtaleContext.settAvtaleVerdi('mentorFornavn', verdi)}
                        />
                    </Column>
                    <Column md="6">
                        <PakrevdInput
                            label="Etternavn"
                            verdi={avtaleContext.avtale.mentorEtternavn}
                            settVerdi={verdi => avtaleContext.settAvtaleVerdi('mentorEtternavn', verdi)}
                        />
                    </Column>
                </Row>
            </Container>
            <VerticalSpacer thirtyTwoPx={true} />
            <Container fluid={true}>
                <PakrevdTextarea
                    label="Arbeidsoppgaver til mentor"
                    verdi={avtaleContext.avtale.mentorOppgaver}
                    settVerdi={verdi => avtaleContext.settAvtaleVerdi('mentorOppgaver', verdi)}
                    maxLengde={1000}
                    feilmelding="Beskrivelse av arbeidsoppgaver er påkrevd"
                />
            </Container>
            <VerticalSpacer thirtyTwoPx={true} />
            <Container fluid={true}>
                <Row className="begge__tekst">
                    <Column md="6">
                        <PakrevdInput
                            label="Antall timer med mentor"
                            verdi={avtaleContext.avtale.mentorAntallTimer}
                            settVerdi={verdi =>
                                avtaleContext.settAvtaleVerdi('mentorAntallTimer', sjekkOgSettVerdi(verdi))
                            }
                        />
                    </Column>
                    <Column md="6">
                        <PakrevdInput
                            label="Timelønn"
                            verdi={avtaleContext.avtale.mentorTimelonn}
                            settVerdi={verdi =>
                                avtaleContext.settAvtaleVerdi('mentorTimelonn', sjekkOgSettVerdi(verdi))
                            }
                        />
                    </Column>
                </Row>
            </Container>
            <VerticalSpacer thirtyTwoPx={true} />
            <LagreKnapp lagre={avtaleContext.lagreAvtale} label={'Lagre'} suksessmelding={'Avtale lagret'} />
        </Innholdsboks>
    );
};

export default OmMentorSteg;
