import React from 'react';
import Innholdsboks from '../../komponenter/Innholdsboks/Innholdsboks';
import { Systemtittel, Undertittel } from 'nav-frontend-typografi';
import HjelpetekstBase from 'nav-frontend-hjelpetekst';
import { Textarea } from 'nav-frontend-skjema';
import LagreKnapp from '../../komponenter/LagreKnapp/LagreKnapp';
import { Context, medContext } from '../../AvtaleContext';
import './TilretteleggingSteg.less';

const TilretteleggingSteg = (props: Context) => {
    const onChange = (label: string) => {
        return (event: any) => props.settAvtaleVerdi(label, event.target.value);
    };

    const lagTellerTekst = (antallTegn: number, maxLength: number) => {
        return maxLength - antallTegn;
    };

    return (
        <>
            <Innholdsboks utfyller="veileder">
                <Systemtittel className="tilretteleggingsteg__tittel">
                    Tilrettelegging
                    <HjelpetekstBase id="hjelpetekst">
                        Beskriv avtalt tilrettelegging av arbeidssituasjonen
                        (for eksempel tilpasning i arbeidstid, hjelpemidler,
                        unngå enkelte typer arbeidsoppgaver mv.)
                    </HjelpetekstBase>
                </Systemtittel>

                <Textarea
                    label="Beskriv hvilken tilrettelegging det er behov for"
                    value={props.avtale.tilrettelegging || ''}
                    onChange={onChange('tilrettelegging')}
                    maxLength={1000}
                    tellerTekst={lagTellerTekst}
                />
            </Innholdsboks>
            <LagreKnapp
                lagre={props.lagreAvtale}
                label={'Lagre avtale'}
                suksessmelding={'Avtale lagret'}
            />
        </>
    );
};

export default medContext<{}>(TilretteleggingSteg);
