import * as React from 'react';
import { Systemtittel, Undertittel } from 'nav-frontend-typografi';
import { Context, medContext } from '../../AvtaleContext';
import Innholdsboks from '../../komponenter/Innholdsboks/Innholdsboks';
import './OppfolgingSteg.less';
import HjelpetekstBase from 'nav-frontend-hjelpetekst';
import LagreKnapp from '../../komponenter/LagreKnapp/LagreKnapp';
import PakrevdTextarea from '../../komponenter/PakrevdTextarea/PakrevdTextarea';

const OppfolgingSteg = (props: Context) => {
    const onChange = (label: string) => {
        return (event: any) => props.settAvtaleVerdi(label, event.target.value);
    };

    return (
        <Innholdsboks utfyller="arbeidsgiver">
            <Systemtittel className="oppfolgingsteg__tittel">
                Oppfølging
                <HjelpetekstBase id="hjelpetekst">
                    Beskriv hvor ofte og i hvilken form det er ønskelig at dere
                    skal få oppfølging fra NAV.
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
                label={'Lagre avtale'}
                suksessmelding={'Avtale lagret'}
            />
        </Innholdsboks>
    );
};

export default medContext<{}>(OppfolgingSteg);
