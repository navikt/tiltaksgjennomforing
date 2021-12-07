import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import { NotifikasjonWidget } from '@navikt/arbeidsgiver-notifikasjon-widget';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import { Innholdstittel, UndertekstBold } from 'nav-frontend-typografi';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import VerticalSpacer from '../layout/VerticalSpacer';
import './Banner.less';

interface Props {
    tekst: string;
    byttetOrg?: (org: Organisasjon) => void;
    undertittel?: string;
}

const miljo = (() => {
    switch (window.location.hostname) {
        case 'arbeidsgiver.nav.no':
            return 'prod';
        case 'arbeidsgiver-q.nav.no':
            return 'dev';
        case 'arbeidsgiver.labs.nais.io':
            return 'labs';
        default:
            return 'local';
    }
})();

const Banner: React.FunctionComponent<Props> = (props) => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const history = useHistory();

    switch (innloggetBruker.rolle) {
        case 'ARBEIDSGIVER':
            return (
                <Bedriftsmeny
                    history={history}
                    onOrganisasjonChange={(org) => {
                        props.byttetOrg && props.byttetOrg(org);
                    }}
                    organisasjoner={innloggetBruker.altinnOrganisasjoner}
                    sidetittel={
                        <>
                            <Innholdstittel>{props.tekst}</Innholdstittel>

                            {props.undertittel && (
                                <UndertekstBold style={{ marginTop: '0.25rem' }}>{props.undertittel}</UndertekstBold>
                            )}
                        </>
                    }
                >
                    <NotifikasjonWidget miljo={miljo}/>
                </Bedriftsmeny>
            );
        case 'DELTAKER':
            return (
                <div className="banner">
                    <Innholdstittel role="heading" aria-level={1}>
                        {props.tekst}
                    </Innholdstittel>
                    {props.undertittel && (
                        <>
                            <VerticalSpacer rem={0.5} />
                            <UndertekstBold>{props.undertittel}</UndertekstBold>
                        </>
                    )}
                </div>
            );
        default:
            return null;
    }
};

export default Banner;
