import * as React from 'react';
import { Systemtittel, Undertittel } from 'nav-frontend-typografi';
import { Context, medContext } from '../AvtaleContext';
import Innholdsboks from '../../komponenter/Innholdsboks/Innholdsboks';
import { Textarea } from 'nav-frontend-skjema';
import './OppfolgingSteg.less';

const OppfolgingSteg = (props: Context) => {
    const onChange = (label: string) => {
        return (event: any) => props.settAvtaleVerdi(label, event.target.value);
    };

    const lagTellerTekst = (antallTegn: number, maxLength: number) => {
        return maxLength - antallTegn;
    };

    return (
        <Innholdsboks>
            <Systemtittel className="oppfolgingsteg__tittel">
                Oppfølging og tilrettelegging
            </Systemtittel>
            <Undertittel className="oppfolgingsteg__oppfolging-undertittel">
                Oppfølging
            </Undertittel>
            <Textarea
                label="Hvordan skal oppfølgingen fra NAV være?"
                value={props.avtale.oppfolging}
                onChange={onChange('oppfolging')}
                maxLength={1000}
                tellerTekst={lagTellerTekst}
            />
            <Undertittel className="oppfolgingsteg__tilrettelegging-undertittel">
                Tilrettelegging
            </Undertittel>
            <Textarea
                label="Beskriv hvilken tilrettelegging det er behov for"
                value={props.avtale.tilrettelegging}
                onChange={onChange('tilrettelegging')}
                maxLength={1000}
                tellerTekst={lagTellerTekst}
            />
        </Innholdsboks>
    );
};

export default medContext(OppfolgingSteg);
