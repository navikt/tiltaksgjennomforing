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
                Eksempler på oppfølging kan være en oppfølgingssamtale etter
                første uke, faste møter hver måned eller en avtalt dato for et
                møte.
            </HjelpetekstBase>
        </Systemtittel>
        <PakrevdTextarea
            label="Beskriv hvilken oppfølging som er avtalt"
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
