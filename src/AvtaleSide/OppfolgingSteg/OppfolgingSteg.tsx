import * as _ from 'lodash';
import HjelpetekstBase from 'nav-frontend-hjelpetekst';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { Context, medContext } from '../../AvtaleContext';
import Innholdsboks from '../../komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '../../komponenter/LagreKnapp/LagreKnapp';
import PakrevdTextarea from '../../komponenter/PakrevdTextarea/PakrevdTextarea';
import './OppfolgingSteg.less';

const OppfolgingSteg = (props: Context) => (
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
            settVerdi={_.partial(props.settAvtaleVerdi, 'oppfolging')}
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

export default medContext<{}>(OppfolgingSteg);
