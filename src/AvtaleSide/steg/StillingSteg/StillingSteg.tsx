import React from 'react';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { Systemtittel } from 'nav-frontend-typografi';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import * as _ from 'lodash';
import { Context, medContext } from '@/AvtaleContext';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';

const StillingSteg = (props: Context) => {
    return (
        <Innholdsboks utfyller="veileder_og_arbeidsgiver">
            <Systemtittel className="deltakerinfo__tittel">Stilling</Systemtittel>
            <PakrevdInput
                label="Stilling"
                className="deltakerinfo__deltakernavn__fornavn"
                verdi={props.avtale.stillingtype || ''}
                settVerdi={_.partial(props.settAvtaleVerdi, 'stillingtype')}
            />
            <Systemtittel className="deltakerinfo__tittel">Arbeidsoppgaver</Systemtittel>
            <PakrevdTextarea
                className="begge__tekst"
                label="Beskriv arbeidsoppgavene som inngår i stillingen"
                verdi={props.avtale.stillingbeskrivelse || ''}
                settVerdi={_.partial(props.settAvtaleVerdi, 'stillingbeskrivelse')}
                maxLengde={1000}
                feilmelding="Beskrivelse av arbeidsoppgavene er påkrevd"
            />
            <LagreKnapp
                className="kontaktinfo-steg__lagre-knapp"
                lagre={props.lagreAvtale}
                label={'Lagre'}
                suksessmelding={'Avtale lagret'}
            />
        </Innholdsboks>
    );
};

export default medContext(StillingSteg);
