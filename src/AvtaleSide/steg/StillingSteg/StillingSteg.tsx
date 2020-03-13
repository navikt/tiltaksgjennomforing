import { Context, medContext } from '@/AvtaleContext';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import React from 'react';

const StillingSteg = (props: Context) => {
    return (
        <Innholdsboks utfyller="veileder_og_arbeidsgiver">
            <SkjemaTittel>Stilling</SkjemaTittel>
            <PakrevdInput
                label="Stillingstittel"
                verdi={props.avtale.stillingstittel || ''}
                settVerdi={verdi => props.settAvtaleVerdi('stillingstittel', verdi)}
            />
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
