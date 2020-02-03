import React from 'react';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import { Context, medContext } from '@/AvtaleContext';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';

const StillingSteg = (props: Context) => {
    return (
        <Innholdsboks utfyller="veileder_og_arbeidsgiver">
            <SkjemaTittel>Stilling</SkjemaTittel>
            <PakrevdInput
                label="Stilling"
                verdi={props.avtale.stillingtype || ''}
                settVerdi={verdi => props.settAvtaleVerdi('stillingtype', verdi)}
            />
            <SkjemaTittel>Arbeidsoppgaver</SkjemaTittel>
            <PakrevdTextarea
                label="Beskriv arbeidsoppgavene som inngår i stillingen"
                verdi={props.avtale.arbeidsoppgaver || ''}
                settVerdi={verdi => props.settAvtaleVerdi('arbeidsoppgaver', verdi)}
                maxLengde={1000}
                feilmelding="Beskrivelse av arbeidsoppgavene er påkrevd"
            />
            <LagreKnapp lagre={props.lagreAvtale} label={'Lagre'} suksessmelding={'Avtale lagret'} />
        </Innholdsboks>
    );
};

export default medContext(StillingSteg);
