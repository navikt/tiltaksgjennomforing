import {AvtaleContext} from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import HjelpetekstBase from 'nav-frontend-hjelpetekst';
import React, {useContext} from 'react';

const OppfolgingOgTilretteleggingSteg = () => {
  const avtaleContext = useContext(AvtaleContext);
    return (
        <Innholdsboks utfyller="veileder_og_arbeidsgiver">
          <SkjemaTittel>
            <span style={{marginLeft: '0.25rem'}}>Oppfølging</span>
            <HjelpetekstBase id="hjelpetekst">
              Eksempler på oppfølging kan være en oppfølgingssamtale etter første uke, faste møter hver måned
              eller en avtalt dato for et møte.
            </HjelpetekstBase>
          </SkjemaTittel>
          <PakrevdTextarea
              label="Beskriv hvilken oppfølging dere har avtalt"
              verdi={avtaleContext.avtale.gjeldendeInnhold.oppfolging || ''}
              settVerdi={verdi => avtaleContext.settAvtaleInnholdVerdi('oppfolging', verdi)}
              maxLengde={1000}
              feilmelding="Beskrivelse av oppfølgingen er påkrevd"
          />
          <VerticalSpacer rem={2}/>
          <SkjemaTittel>
            <span style={{marginLeft: '0.25rem'}}>Tilrettelegging</span>
            <HjelpetekstBase id="hjelpetekst">
              Beskriv avtalt tilrettelegging av arbeidssituasjonen (for eksempel tilpasning i arbeidstid,
              hjelpemidler, unngå enkelte typer arbeidsoppgaver mv.)
            </HjelpetekstBase>
          </SkjemaTittel>
          <PakrevdTextarea
              label="Beskriv hvilken tilrettelegging dere har avtalt"
              verdi={avtaleContext.avtale.gjeldendeInnhold.tilrettelegging}
              settVerdi={verdi => avtaleContext.settAvtaleInnholdVerdi('tilrettelegging', verdi)}
              maxLengde={1000}
              feilmelding="Beskrivelse av tilrettelegging er påkrevd"
          />
          <VerticalSpacer rem={2}/>
            <LagreKnapp lagre={avtaleContext.lagreAvtale} label={'Lagre'} suksessmelding={'Avtale lagret'} />
        </Innholdsboks>
    );
};

export default OppfolgingOgTilretteleggingSteg;
