import { AvtaleContext } from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdInput from '@/komponenter/form/PakrevdInput';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import MobilnummerInput from '@/komponenter/MobilnummerInput/MobilnummerInput';
import React, { useContext } from 'react';
import VisueltDisabledInputFelt from '@/komponenter/VisueltDisabledInputFelt/VisueltDisabledInputFelt';
import AvtaleStatus from '@/AvtaleSide/AvtaleStatus/AvtaleStatus';
import { HGrid, Hide } from '@navikt/ds-react';

const OmMentorSteg = () => {
    const avtaleContext = useContext(AvtaleContext);

    return (
        <>
            <AvtaleStatus />
            <Innholdsboks>
                <SkjemaTittel>Om mentoren</SkjemaTittel>
                <HGrid gap="space-16" columns={{ xs: 1, md: 2 }}>
                    <VisueltDisabledInputFelt label="Fødselsnummer" tekst={avtaleContext.avtale.mentorFnr} />
                    <Hide below="md" asChild>
                        <div aria-hidden="true" />
                    </Hide>
                    <PakrevdInput
                        name="mentorFornavn"
                        label="Fornavn"
                        verdi={avtaleContext.avtale.gjeldendeInnhold.mentorFornavn}
                        settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('mentorFornavn', verdi)}
                    />
                    <PakrevdInput
                        name="mentorEtternavn"
                        label="Etternavn"
                        verdi={avtaleContext.avtale.gjeldendeInnhold.mentorEtternavn}
                        settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('mentorEtternavn', verdi)}
                    />
                    <MobilnummerInput
                        label="Mobilnummer"
                        name="mentorTlf"
                        verdi={avtaleContext.avtale.gjeldendeInnhold.mentorTlf}
                        settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('mentorTlf', verdi)}
                    />
                </HGrid>
                <VerticalSpacer rem={1} />
                <PakrevdTextarea
                    label="Arbeidsoppgaver til mentor"
                    verdi={avtaleContext.avtale.gjeldendeInnhold.mentorOppgaver}
                    settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('mentorOppgaver', verdi)}
                    maxLengde={1000}
                    feilmelding="Beskrivelse av arbeidsoppgaver er påkrevd"
                />
                <VerticalSpacer rem={2} />
                <LagreKnapp lagre={avtaleContext.lagreAvtale} suksessmelding={'Avtale lagret'}>
                    Lagre
                </LagreKnapp>
            </Innholdsboks>
        </>
    );
};

export default OmMentorSteg;
