import HjelpetekstBase from 'nav-frontend-hjelpetekst';
import * as React from 'react';
import { medContext } from '@/AvtaleContext';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import './OppfolgingOgTilretteleggingSteg.less';
import { InputStegProps } from '@/AvtaleSide/input-steg-props';
import { Oppfolging, Tilrettelegging } from '@/types/avtale';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';

const OppfolgingTilretteleggingSteg = (props: InputStegProps<Oppfolging & Tilrettelegging>) => (
    <Innholdsboks utfyller="veileder_og_arbeidsgiver">
        <SkjemaTittel>
            Oppfølging
            <HjelpetekstBase id="hjelpetekst">
                Eksempler på oppfølging kan være en oppfølgingssamtale etter første uke, faste møter hver måned eller en
                avtalt dato for et møte.
            </HjelpetekstBase>
        </SkjemaTittel>
        <PakrevdTextarea
            className="begge__tekst"
            label="Beskriv hvilken oppfølging dere har avtalt"
            verdi={props.avtale.oppfolging || ''}
            settVerdi={verdi => props.settAvtaleVerdi('oppfolging', verdi)}
            maxLengde={1000}
            feilmelding="Beskrivelse av oppfølgingen er påkrevd"
        />
        <VerticalSpacer thirtyTwoPx={true} />
        <SkjemaTittel>
            Tilrettelegging
            <HjelpetekstBase id="hjelpetekst">
                Beskriv avtalt tilrettelegging av arbeidssituasjonen (for eksempel tilpasning i arbeidstid,
                hjelpemidler, unngå enkelte typer arbeidsoppgaver mv.)
            </HjelpetekstBase>
        </SkjemaTittel>
        <PakrevdTextarea
            className="begge__tekst"
            label="Beskriv hvilken tilrettelegging dere har avtalt"
            verdi={props.avtale.tilrettelegging}
            settVerdi={verdi => props.settAvtaleVerdi('tilrettelegging', verdi)}
            maxLengde={1000}
            feilmelding="Beskrivelse av tilrettelegging er påkrevd"
        />
        <LagreKnapp
            className="oppfolgingsteg__lagre-knapp"
            lagre={props.lagreAvtale}
            label={'Lagre'}
            suksessmelding={'Avtale lagret'}
        />
    </Innholdsboks>
);

export default medContext(OppfolgingTilretteleggingSteg);
