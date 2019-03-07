import { Hovedknapp } from 'nav-frontend-knapper';
import { Input } from 'nav-frontend-skjema';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { RouteComponentProps, RouterProps } from 'react-router';
import { Context, medContext } from '../../AvtaleContext';
import VeilederpanelMedAvsjekkIkon from '../../komponenter/Veilederpanel/VeilederpanelMedAvsjekkIkon';
import {
    absoluttPathTilAvtaleSelvbetjening,
    pathTilKontaktinformasjonSteg,
} from '../../paths';

import './OpprettelseFullfort.less';

const OpprettelseFullfort: React.FunctionComponent<
    RouteComponentProps<{ avtaleId: string }>
> = props => {
    const avtaleId = props.match.params.avtaleId;

    const tilAvtalenKlikk = () => {
        props.history.push(pathTilKontaktinformasjonSteg(avtaleId));
    };

    const hrefTilAvtaleSelvbetjening = absoluttPathTilAvtaleSelvbetjening(
        avtaleId
    );

    const inputLabel = (
        <Element className="opprettelseFullfort__undertittel">
            Kopier denne lenken for å dele
        </Element>
    );

    const veilederpanel = (
        <VeilederpanelMedAvsjekkIkon>
            <Systemtittel className="opprettelseFullfort__innholdstittel">
                Avtalen er opprettet
            </Systemtittel>

            <div className="opprettelseFullfort__lenkedeling">
                <Input
                    label={inputLabel}
                    className="opprettelseFullfort__inputfelt"
                    value={hrefTilAvtaleSelvbetjening}
                    readOnly={true}
                />
                <CopyToClipboard text={hrefTilAvtaleSelvbetjening}>
                    <Hovedknapp className="opprettelseFullfort__kopier-knapp">
                        Kopier lenke
                    </Hovedknapp>
                </CopyToClipboard>
            </div>

            <Normaltekst>
                For at arbeidsgiver og deltaker skal kunne logge seg inn og
                fylle ut avtalen må du sende dem lenken vist nedenfor. De kan da
                logge seg inn i avtalen med ID-porten.
            </Normaltekst>
            <Normaltekst>PS! Du kan dele avtalen senere også.</Normaltekst>
        </VeilederpanelMedAvsjekkIkon>
    );

    return (
        <div className="opprettelseFullfort">
            {veilederpanel}
            <Hovedknapp
                onClick={tilAvtalenKlikk}
                className="opprettelseFullfort__knapp"
            >
                Gå til avtalen
            </Hovedknapp>
            <a className="lenke" onClick={() => props.history.goBack()}>
                Tilbake
            </a>
        </div>
    );
};

export default OpprettelseFullfort;
