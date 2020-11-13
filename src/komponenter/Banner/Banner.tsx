import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import amplitude from 'amplitude-js';
import { Innholdstittel } from 'nav-frontend-typografi';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import nyheter from '../NyttIAppen/nyheter';
import Nytt from '../NyttIAppen/Nytt';
import './Banner.less';

interface Props {
    tekst: string;
    byttetOrg?: (org: Organisasjon) => void;
}

const Banner: React.FunctionComponent<Props> = props => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const history = useHistory();

    switch (innloggetBruker.rolle) {
        case 'VEILEDER':
            return (
                <div className={'banner-veileder-container'}>
                    <div className="banner-veileder" role="banner">
                        <Innholdstittel role="heading">{props.tekst}</Innholdstittel>

                        <div>
                            <Nytt
                                onÅpneNyheter={() => amplitude.logEvent('#tiltak-nyheter-apnet')}
                                åpneVedFørsteBesøk={true}
                                nyheter={nyheter}
                                title="Nytt i tiltaksgjennomføring"
                                navn="Tiltaksgjennomføring"
                            />
                        </div>
                    </div>
                </div>
            );
        case 'ARBEIDSGIVER':
            return (
                <Bedriftsmeny
                    history={history}
                    onOrganisasjonChange={org => {
                        props.byttetOrg && props.byttetOrg(org);
                    }}
                    organisasjoner={innloggetBruker.altinnOrganisasjoner}
                    sidetittel={props.tekst}
                />
            );
        case 'DELTAKER':
            return (
                <div className="banner">
                    <Innholdstittel role="heading">{props.tekst}</Innholdstittel>
                </div>
            );
        default:
            return null;
    }
};

export default Banner;
