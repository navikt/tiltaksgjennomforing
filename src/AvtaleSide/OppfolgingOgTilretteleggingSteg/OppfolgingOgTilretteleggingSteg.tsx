import * as _ from 'lodash';
import HjelpetekstBase from 'nav-frontend-hjelpetekst';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { medContext } from '../../AvtaleContext';
import Innholdsboks from '../../komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '../../komponenter/LagreKnapp/LagreKnapp';
import PakrevdTextarea from '../../komponenter/PakrevdTextarea/PakrevdTextarea';
import './OppfolgingOgTilretteleggingSteg.less';
import { InputStegProps } from '@/AvtaleSide/input-steg-props';
import { Oppfolging, Tilrettelegging } from '@/types/avtale';

const OppfolgingTilretteleggingSteg = (
    props: InputStegProps<Oppfolging & Tilrettelegging>
) => (
    <div>
        <Innholdsboks utfyller="veileder_og_arbeidsgiver">
            <Systemtittel className="oppfolgingsteg__tittel">
                Oppfølging
                <HjelpetekstBase id="hjelpetekst">
                    Eksempler på oppfølging kan være en oppfølgingssamtale etter
                    første uke, faste møter hver måned eller en avtalt dato for
                    et møte.
                </HjelpetekstBase>
            </Systemtittel>
            <PakrevdTextarea
                className="begge__tekst"
                label="Beskriv hvilken oppfølging dere har avtalt"
                verdi={props.avtale.oppfolging || ''}
                settVerdi={_.partial(props.settAvtaleVerdi, 'oppfolging')}
                maxLengde={1000}
                feilmelding="Beskrivelse av oppfølgingen er påkrevd"
            />
            <Systemtittel className="tilretteleggingsteg__tittel">
                Tilrettelegging
                <HjelpetekstBase id="hjelpetekst">
                    Beskriv avtalt tilrettelegging av arbeidssituasjonen (for
                    eksempel tilpasning i arbeidstid, hjelpemidler, unngå
                    enkelte typer arbeidsoppgaver mv.)
                </HjelpetekstBase>
            </Systemtittel>
            <PakrevdTextarea
                className="begge__tekst"
                label="Beskriv hvilken tilrettelegging dere har avtalt"
                verdi={props.avtale.tilrettelegging}
                settVerdi={_.partial(props.settAvtaleVerdi, 'tilrettelegging')}
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
    </div>
);

export default medContext(OppfolgingTilretteleggingSteg);
