import * as _ from 'lodash';
import HjelpetekstBase from 'nav-frontend-hjelpetekst';
import { Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import { Context, medContext } from '../../AvtaleContext';
import Innholdsboks from '../../komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '../../komponenter/LagreKnapp/LagreKnapp';
import PakrevdTextarea from '../../komponenter/PakrevdTextarea/PakrevdTextarea';
import './TilretteleggingSteg.less';

const TilretteleggingSteg = (props: Context) => (
    <Innholdsboks utfyller="veileder_og_arbeidsgiver">
        <Systemtittel className="tilretteleggingsteg__tittel">
            Tilrettelegging
            <HjelpetekstBase id="hjelpetekst">
                Beskriv avtalt tilrettelegging av arbeidssituasjonen (for
                eksempel tilpasning i arbeidstid, hjelpemidler, unngå enkelte
                typer arbeidsoppgaver mv.)
            </HjelpetekstBase>
        </Systemtittel>
        <PakrevdTextarea
            label="Beskriv hvilken tilrettelegging det er behov for"
            verdi={props.avtale.tilrettelegging}
            settVerdi={_.partial(props.settAvtaleVerdi, 'tilrettelegging')}
            maxLengde={1000}
            feilmelding="Beskrivelse av tilrettelegging er påkrevd"
        />
        <LagreKnapp
            className="tilretteleggingsteg__lagre-knapp"
            lagre={props.lagreAvtale}
            label={'Lagre'}
            suksessmelding={'Avtale lagret'}
        />
    </Innholdsboks>
);

export default medContext<{}>(TilretteleggingSteg);
