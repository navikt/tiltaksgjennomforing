import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import { Innholdstittel } from 'nav-frontend-typografi';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './Banner.less';

interface Props {
    tekst: string;
    byttetOrg?: (org: Organisasjon) => void;
}

const Banner: React.FunctionComponent<Props> = props => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const history = useHistory();

    switch (innloggetBruker.rolle) {
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
                    <Innholdstittel role="heading" aria-level={1}>
                        {props.tekst}
                    </Innholdstittel>
                </div>
            );
        default:
            return null;
    }
};

export default Banner;
