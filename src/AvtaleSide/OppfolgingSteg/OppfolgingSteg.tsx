import * as React from 'react';
import { Systemtittel, Undertittel } from 'nav-frontend-typografi';
import { Context, medContext } from '../../AvtaleContext';
import Innholdsboks from '../../komponenter/Innholdsboks/Innholdsboks';
import { Textarea } from 'nav-frontend-skjema';
import './OppfolgingSteg.less';
import HjelpetekstBase from 'nav-frontend-hjelpetekst';
import LagreKnapp from '../../komponenter/LagreKnapp/LagreKnapp';

const OppfolgingSteg = (props: Context) => {
    const onChange = (label: string) => {
        return (event: any) => props.settAvtaleVerdi(label, event.target.value);
    };

    const lagTellerTekst = (antallTegn: number, maxLength: number) => {
        return maxLength - antallTegn;
    };

    return (
        <>
            <Innholdsboks>
                <Systemtittel className="oppfolgingsteg__tittel">
                    Oppfølging og tilrettelegging
                </Systemtittel>
                <div className="oppfolgingsteg__undertittel-wrapper">
                    <Undertittel className="oppfolgingsteg__oppfolging-undertittel">
                        Oppfølging
                    </Undertittel>
                    <HjelpetekstBase id="hjelpetekst">
                        Beskriv hvor ofte og i hvilken form det er ønskelig at
                        dere skal få oppfølging fra NAV.
                    </HjelpetekstBase>
                </div>
                <Textarea
                    label="Hvordan skal oppfølgingen fra NAV være?"
                    value={props.avtale.oppfolging || ''}
                    onChange={onChange('oppfolging')}
                    maxLength={1000}
                    tellerTekst={lagTellerTekst}
                />
                <div className="oppfolgingsteg__undertittel-wrapper">
                    <Undertittel className="oppfolgingsteg__tilrettelegging-undertittel">
                        Tilrettelegging
                    </Undertittel>
                    <HjelpetekstBase id="hjelpetekst">
                        Beskriv avtalt tilrettelegging av arbeidssituasjonen
                        (for eksempel tilpasning i arbeidstid, hjelpemidler,
                        unngå enkelte typer arbeidsoppgaver mv.)
                    </HjelpetekstBase>
                </div>
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

export default medContext<{}>(OppfolgingSteg);
