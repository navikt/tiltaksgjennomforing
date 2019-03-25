import React from 'react';
import Innholdsboks from '../../komponenter/Innholdsboks/Innholdsboks';
import { Systemtittel, Undertittel } from 'nav-frontend-typografi';
import HjelpetekstBase from 'nav-frontend-hjelpetekst';
import LagreKnapp from '../../komponenter/LagreKnapp/LagreKnapp';
import { Context, medContext } from '../../AvtaleContext';
import './TilretteleggingSteg.less';
import PakrevdTextarea from '../../komponenter/PakrevdTextarea/PakrevdTextarea';

const TilretteleggingSteg = (props: Context) => {
    const onChange = (label: string) => {
        return (event: any) => props.settAvtaleVerdi(label, event.target.value);
    };

    return (
        <Innholdsboks utfyller="veileder_og_arbeidsgiver">
            <Systemtittel className="tilretteleggingsteg__tittel">
                Tilrettelegging
                <HjelpetekstBase id="hjelpetekst">
                    Beskriv avtalt tilrettelegging av arbeidssituasjonen (for
                    eksempel tilpasning i arbeidstid, hjelpemidler, unngå
                    enkelte typer arbeidsoppgaver mv.)
                </HjelpetekstBase>
            </Systemtittel>

            <PakrevdTextarea
                label="Beskriv hvilken tilrettelegging det er behov for"
                verdi={props.avtale.tilrettelegging}
                onChange={onChange('tilrettelegging')}
                maxLengde={1000}
                feilmelding="Beskrivelse av tilrettelegging er påkrevd"
            />
            <LagreKnapp
                className="tilretteleggingsteg__lagre-knapp"
                lagre={props.lagreAvtale}
                label={'Lagre avtale'}
                suksessmelding={'Avtale lagret'}
            />
        </Innholdsboks>
    );
};

export default medContext<{}>(TilretteleggingSteg);
