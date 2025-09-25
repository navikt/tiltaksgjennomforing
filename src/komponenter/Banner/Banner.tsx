import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { NotifikasjonWidget } from '@navikt/arbeidsgiver-notifikasjon-widget';
import '@navikt/arbeidsgiver-notifikasjon-widget/lib/esm/index.css';
import Bedriftsmeny, { Organisasjon } from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import { Detail, Heading } from '@navikt/ds-react';
import React, { useCallback, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import VerticalSpacer from '../layout/VerticalSpacer';
import './Banner.less';

interface Props {
    tekst: string;
    byttetOrg?: (org: string) => void;
    undertittel?: string;
    valgtOrganisasjon?: string;
}

const Banner: React.FunctionComponent<Props> = ({ tekst, byttetOrg, undertittel, valgtOrganisasjon }) => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const [searchParams] = useSearchParams();
    const bedriftParam = searchParams.get('bedrift');
    const erLangTittel = tekst.length > 40;

    const orgnrProvider: () => [string | null, (orgnr: string) => void] = useCallback(() => {
        const currentOrgnr = bedriftParam || valgtOrganisasjon || null;

        return [
            currentOrgnr,
            (orgnr: string) => {
                if (currentOrgnr !== orgnr) {
                    byttetOrg?.(orgnr);
                }
            },
        ];
    }, [bedriftParam, valgtOrganisasjon, byttetOrg]);

    switch (innloggetBruker.rolle) {
        case 'ARBEIDSGIVER':
            return (
                <Bedriftsmeny
                    orgnrSearchParam={orgnrProvider}
                    onOrganisasjonChange={(org: Organisasjon) => {
                        byttetOrg?.(org.OrganizationNumber);
                    }}
                    organisasjoner={innloggetBruker.altinnOrganisasjoner}
                    sidetittel={
                        <>
                            <Heading className={erLangTittel ? 'banner-lang-tittel' : ''} size="large">
                                {tekst}
                            </Heading>
                            {undertittel && (
                                <Detail style={{ marginTop: '0.25rem', fontWeight: 'bold' }}>{undertittel}</Detail>
                            )}
                        </>
                    }
                >
                    <NotifikasjonWidget />
                </Bedriftsmeny>
            );
        case 'DELTAKER':
        case 'MENTOR':
            return (
                <div className="banner">
                    <Heading
                        className={erLangTittel ? 'banner-lang-tittel' : ''}
                        size="large"
                        role="heading"
                        aria-level={1}
                    >
                        {tekst}
                    </Heading>
                    {undertittel && (
                        <>
                            <VerticalSpacer rem={0.5} />
                            <Detail style={{ fontWeight: 'bold' }}>{undertittel}</Detail>
                        </>
                    )}
                </div>
            );
        default:
            return null;
    }
};

export default Banner;
