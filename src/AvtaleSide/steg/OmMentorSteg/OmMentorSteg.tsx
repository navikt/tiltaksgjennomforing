import * as React from 'react';
import { medContext } from '@/AvtaleContext';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { InputStegProps } from '@/AvtaleSide/input-steg-props';
import { Avtaleparter, Mentorinfo } from '@/types/avtale';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Column, Container, Row } from 'nav-frontend-grid';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';

const OmMentorSteg = (props: InputStegProps<Mentorinfo>) => (
    <Innholdsboks utfyller="veileder">
        <SkjemaTittel>Om mentoren</SkjemaTittel>
        <Container fluid={true}>
            <Row className="">
                <Column md="6">
                    <PakrevdInput
                        label="Fornavn"
                        verdi={props.avtale.mentorFornavn}
                        settVerdi={verdi => props.settAvtaleVerdi('mentorFornavn', verdi)}
                    />
                </Column>
                <Column md="6">
                    <PakrevdInput
                        label="Etternavn"
                        verdi={props.avtale.mentorEtternavn}
                        settVerdi={verdi => props.settAvtaleVerdi('mentorEtternavn', verdi)}
                    />
                </Column>
            </Row>
        </Container>
        <VerticalSpacer thirtyTwoPx={true} />
        <Container fluid={true}>
            <PakrevdTextarea
                label="Arbeidsoppgaver til mentor"
                verdi={props.avtale.mentorOppgaver}
                settVerdi={verdi => props.settAvtaleVerdi('mentorOppgaver', verdi)}
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
                        verdi={props.avtale.mentorAntallTimer}
                        settVerdi={verdi => props.settAvtaleVerdi('mentorAntallTimer', verdi)}
                    />
                </Column>
                <Column md="6">
                    <PakrevdInput
                        label="Timelønn"
                        verdi={props.avtale.mentorTimelonn}
                        settVerdi={verdi => props.settAvtaleVerdi('mentorTimelonn', verdi)}
                    />
                </Column>
            </Row>
        </Container>
        <VerticalSpacer thirtyTwoPx={true} />
        <LagreKnapp lagre={props.lagreAvtale} label={'Lagre'} suksessmelding={'Avtale lagret'} />
    </Innholdsboks>
);

export default medContext(OmMentorSteg);
