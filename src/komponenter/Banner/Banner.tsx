import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { NotifikasjonWidget } from '@navikt/arbeidsgiver-notifikasjon-widget';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import { Heading, Detail } from '@navikt/ds-react';
import React, {PropsWithChildren, useContext, useCallback} from 'react';
import { useHistory } from 'react-router-dom';
import VerticalSpacer from '../layout/VerticalSpacer';
import './Banner.less';

interface Props {
    tekst: string;
    byttetOrg?: (org: Organisasjon) => void;
    undertittel?: string;
}

const Banner: React.FunctionComponent<PropsWithChildren<Props>> = (props) => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const history = useHistory();

    const { query, push } = useRouter()
    const useOrgnrHook: () => [string | null, (orgnr: string) => void] =
        useCallback(() => {
            const currentOrgnr =
                typeof query.bedrift === "string" ? query.bedrift : null;

            return [
                currentOrgnr,
                (orgnr: string) => {
                    if (currentOrgnr !== orgnr) {
                        if (orgnr === null) {
                            push("");
                        } else {
                            push(`?bedrift=${orgnr}`);
                        }
                    }
                },
            ];
        }, [push, query.bedrift]);

    switch (innloggetBruker.rolle) {
        case 'ARBEIDSGIVER':
            return (
                <Bedriftsmeny
                orgnrSearchParam={useHistory}
                    onOrganisasjonChange={(org) => {
                        if(props.byttetOrg){
                            props.byttetOrg(org);}
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
