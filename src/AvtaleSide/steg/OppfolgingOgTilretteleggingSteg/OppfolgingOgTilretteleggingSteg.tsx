import { AvtaleContext } from '@/AvtaleProvider';
import { InputStegProps } from '@/AvtaleSide/input-steg-props';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { Oppfolging, Tilrettelegging } from '@/types/avtale';
import HjelpetekstBase from 'nav-frontend-hjelpetekst';
import React, { useContext } from 'react';

const OppfolgingOgTilretteleggingSteg = () => {
    const avtaleContext: InputStegProps<Oppfolging & Tilrettelegging> = useContext(AvtaleContext);
    return (
        <Innholdsboks utfyller="veileder_og_arbeidsgiver">
            <SkjemaTittel>
                <span style={{ marginLeft: '0.25rem' }}>Oppfølging</span>
                <HjelpetekstBase id="hjelpetekst">
                    Eksempler på oppfølging kan være en oppfølgingssamtale etter første uke, faste møter hver måned
                    eller en avtalt dato for et møte.
                </HjelpetekstBase>
            </SkjemaTittel>
            <PakrevdTextarea
                label="Beskriv hvilken oppfølging dere har avtalt"
                verdi={avtaleContext.avtale.oppfolging || ''}
                settVerdi={verdi => avtaleContext.settAvtaleVerdi('oppfolging', verdi)}
                maxLengde={1000}
                feilmelding="Beskrivelse av oppfølgingen er påkrevd"
            />
            <VerticalSpacer thirtyTwoPx={true} />
            <SkjemaTittel>
                <span style={{ marginLeft: '0.25rem' }}>Tilrettelegging</span>
                <HjelpetekstBase id="hjelpetekst">
                    Beskriv avtalt tilrettelegging av arbeidssituasjonen (for eksempel tilpasning i arbeidstid,
                    hjelpemidler, unngå enkelte typer arbeidsoppgaver mv.)
                </HjelpetekstBase>
            </SkjemaTittel>
            <PakrevdTextarea
                label="Beskriv hvilken tilrettelegging dere har avtalt"
                verdi={avtaleContext.avtale.tilrettelegging}
                settVerdi={verdi => avtaleContext.settAvtaleVerdi('tilrettelegging', verdi)}
                maxLengde={1000}
                feilmelding="Beskrivelse av tilrettelegging er påkrevd"
            />
            <VerticalSpacer thirtyTwoPx={true} />
            <LagreKnapp lagre={avtaleContext.sjekkOgLagreAvtale} label={'Lagre'} suksessmelding={'Avtale lagret'} />
        </Innholdsboks>
    );
};

export default OppfolgingOgTilretteleggingSteg;
