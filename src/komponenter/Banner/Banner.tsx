import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { NotifikasjonWidget } from '@navikt/arbeidsgiver-notifikasjon-widget';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import { Detail, Heading } from '@navikt/ds-react';
import React, { useContext } from 'react';
import VerticalSpacer from '../layout/VerticalSpacer';
import './Banner.less';

interface Props {
    tekst: string;
    byttetOrg?: (org: Organisasjon) => void;
    undertittel?: string;
}

const Banner: React.FunctionComponent<Props> = (props) => {
    const innloggetBruker = useContext(InnloggetBrukerContext);

    switch (innloggetBruker.rolle) {
        case 'ARBEIDSGIVER':
            return (
                <Bedriftsmeny
                    
                    onOrganisasjonChange={(org) => {
                        props.byttetOrg && props.byttetOrg(org);
                    }}
                    organisasjoner={innloggetBruker.altinnOrganisasjoner}
                    sidetittel={
                        <>
                            <Heading size="large">{props.tekst}</Heading>
                            {props.undertittel && (
                                <Detail style={{ marginTop: '0.25rem', fontWeight: 'bold' }}>
                                    {props.undertittel}
                                </Detail>
                            )}
                        </>
                    }
                >
                    <NotifikasjonWidget />
                </Bedriftsmeny>
            );
        case 'DELTAKER':
            return (
                <div className="banner">
                    <Heading size="large" role="heading" aria-level={1}>
                        {props.tekst}
                    </Heading>
                    {props.undertittel && (
                        <>
                            <VerticalSpacer rem={0.5} />
                            <Detail style={{ fontWeight: 'bold' }}>{props.undertittel}</Detail>
                        </>
                    )}
                </div>
            );
        case 'MENTOR':
            return (
                <div className="banner">
                    <Heading size="large" role="heading" aria-level={1}>
                        {props.tekst}
                    </Heading>
                    {props.undertittel && (
                        <>
                            <VerticalSpacer rem={0.5} />
                            <Detail style={{ fontWeight: 'bold' }}>{props.undertittel}</Detail>
                        </>
                    )}
                </div>
            );
        default:
            return null;
    }
};

export default Banner;