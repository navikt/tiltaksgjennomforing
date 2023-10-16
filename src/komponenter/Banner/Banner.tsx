import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { NotifikasjonWidget } from '@navikt/arbeidsgiver-notifikasjon-widget';
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
}



const Banner: React.FunctionComponent<Props> = (props) => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const [searchParams] = useSearchParams();
    const bedriftParam = searchParams.get('bedrift');

    const useOrgnrHook2: () => [string | null, (orgnr: string) => void] =
    useCallback(() => {
        const currentOrgnr = bedriftParam || null;

        return [
            currentOrgnr,
            (orgnr: string) => {
                if (currentOrgnr !== orgnr) {
                    if (orgnr === null) {
                        //push("");
                    } else {
                        //push(`?bedrift=${orgnr}`);
                        if (props.byttetOrg) {
                            props.byttetOrg(orgnr);
                        }

                    }
                }
            },
        ];
    }, [bedriftParam, props]);


    // const useOrgnrHook: () => [string | null, (orgnr: string) => void] = () => {
    //     const [searchParams, setSearchParams] = useSearchParams();
    //     const bedrift = searchParams.get('bedrift');
    //     const currentOrgnr = bedrift || null;
    //     return [
    //         currentOrgnr,
    //         (orgnr: string) => {
    //             if (currentOrgnr !== orgnr) {
    //                 if (orgnr === null) {
    //                     console.log('orgnr og currentOrgnr er ulikt', orgnr, currentOrgnr);                      
    //                     //push('');
    //                 } else {
    //                     console.log('hook fikk orgnr', orgnr, currentOrgnr);
    //                     if (props.byttetOrg) {
    //                         props.byttetOrg(orgnr);
    //                     }
    //                     // const alleSearchParams = lagObjektAvSearchParams(searchParams);
    //                     // const shouldReplace = searchParams.get('sokId') !== null;
    //                     // setSearchParams({ ...alleSearchParams, bedrift: orgnr }, { replace: shouldReplace });
    //                     //setSearchParams({ bedrift: orgnr }, { replace: true });
    //                     //push(`?bedrift=${orgnr}`);
    //                     //console.log('setter ikke orgnr, vi håndter det sjæl!!!');
                        
    //                 }
    //         },
    //     ];
    // };

    switch (innloggetBruker.rolle) {
        case 'ARBEIDSGIVER':
            return (
                <Bedriftsmeny
                    orgnrSearchParam={useOrgnrHook2}
                    onOrganisasjonChange={(org: Organisasjon) => {
                        if (props.byttetOrg) {
                            console.log('HALOOOOOOOOOO');
                            props.byttetOrg(org.OrganizationNumber);
                        }
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
