import * as React from 'react';
import { Systemtittel, Undertittel } from 'nav-frontend-typografi';
import { Context, medContext } from '../../AvtaleContext';
import Innholdsboks from '../../komponenter/Innholdsboks/Innholdsboks';
import './OppfolgingSteg.less';
import HjelpetekstBase from 'nav-frontend-hjelpetekst';
import LagreKnapp from '../../komponenter/LagreKnapp/LagreKnapp';
import PakrevdTextarea from '../../komponenter/PakrevdTextarea/PakrevdTextarea';
import { Avtale } from '../avtale';

const OppfolgingSteg = (props: Context) => {
    const onChange = (label: keyof Avtale) => {
        return (event: any) => props.settAvtaleVerdi(label, event.target.value);
    };

    return (
        <Innholdsboks utfyller="arbeidsgiver">
            <Systemtittel className="oppfolgingsteg__tittel">
                Oppfølging
                <HjelpetekstBase id="hjelpetekst">
                    Eksempelvis: oppfølgingssamtale etter første uke, møter hver
                    måned eller avtalt dato for møte.
                </HjelpetekstBase>
            </Systemtittel>
            <PakrevdTextarea
                label="Beskriv hvor ofte og i hvilken form dere ønsker å få oppfølging fra NAV"
                verdi={props.avtale.oppfolging || ''}
                onChange={onChange('oppfolging')}
                maxLengde={1000}
                feilmelding="Beskrivelse av oppfølgingen er påkrevd"
            />
            <LagreKnapp
                className="oppfolgingsteg__lagre-knapp"
                lagre={props.lagreAvtale}
                label={'Lagre'}
                suksessmelding={'Avtale lagret'}
            />
        </Innholdsboks>
    );
};

export default medContext<{}>(OppfolgingSteg);
