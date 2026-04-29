import { AvtaleContext } from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import React, { useContext } from 'react';
import AvtaleStatus from '@/AvtaleSide/AvtaleStatus/AvtaleStatus';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';

const OppfolgingOgTilretteleggingSteg = () => {
    const avtaleContext = useContext(AvtaleContext);

    return (
        <>
            <AvtaleStatus />
            <Innholdsboks>
                <SkjemaTittel>Oppfølging</SkjemaTittel>
                <PakrevdTextarea
                    placeholder="Skriv inn innholdstekst i tekstfeltet her"
                    label="Beskriv hvilken oppfølging dere har avtalt"
                    description="Eksempel på oppfølging kan være en eller flere avtalte oppfølgingssamtaler"
                    verdi={avtaleContext.avtale.gjeldendeInnhold.oppfolging || ''}
                    settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('oppfolging', verdi)}
                    maxLengde={1000}
                    feilmelding="Beskrivelse av oppfølgingen er påkrevd"
                />
                <VerticalSpacer rem={2.5} />
                <SkjemaTittel>Tilrettelegging</SkjemaTittel>
                <PakrevdTextarea
                    placeholder="Skriv inn innholdstekst i tekstfeltet her"
                    label="Beskriv hvilken tilrettelegging dere har avtalt"
                    description="For eksempel tilpasning i arbeidstid, hjelpemidler, unngå enkelte typer arbeidsoppgaver"
                    verdi={avtaleContext.avtale.gjeldendeInnhold.tilrettelegging}
                    settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('tilrettelegging', verdi)}
                    maxLengde={1000}
                    feilmelding="Beskrivelse av tilrettelegging er påkrevd"
                />
                <VerticalSpacer rem={2.5} />
                <LagreKnapp lagre={avtaleContext.lagreAvtale} suksessmelding={'Avtale lagret'}>
                    Lagre
                </LagreKnapp>
            </Innholdsboks>
        </>
    );
};

export default OppfolgingOgTilretteleggingSteg;
