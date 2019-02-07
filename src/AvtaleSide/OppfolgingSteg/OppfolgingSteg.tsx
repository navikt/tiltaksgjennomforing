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
            <Innholdsboks utfyller="arbeidsgiver">
                <Systemtittel className="oppfolgingsteg__tittel">
                    Oppfølging
                    <HjelpetekstBase id="hjelpetekst">
                        Beskriv hvor ofte og i hvilken form det er ønskelig at
                        dere skal få oppfølging fra NAV.
                    </HjelpetekstBase>
                </Systemtittel>
                <Textarea
                    label="Beskriv hvor ofte og i hvilken form dere ønsker å få oppfølging fra NAV"
                    value={props.avtale.oppfolging || ''}
                    onChange={onChange('oppfolging')}
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
