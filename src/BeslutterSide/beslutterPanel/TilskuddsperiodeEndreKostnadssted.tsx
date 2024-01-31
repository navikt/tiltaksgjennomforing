import React, { FunctionComponent, useContext, useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';

import BEMHelper from '@/utils/bem';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import { AvtaleContext } from '@/AvtaleProvider';
import { TilskuddsperiodeContext } from '@/BeslutterSide/BeslutterSide';
import { useHentEnhet } from '@/services/use-rest';

const getFeilmelding = (verdi?: string, enhet?: string) => {
    if (!verdi?.match(/^\d{4}$/)) {
        return 'Enhet må bestå av 4 siffer';
    }
    if (!enhet) {
        return "Ukjent enhet";
    }
    return "En feil oppstod";
}

const TilskuddsperiodeEndreKostnadssted: FunctionComponent = () => {
    const { avtale } = useContext(AvtaleContext);
    const { gjeldendeTilskuddsperiode } = avtale;
    const { enhet, visEnhetFeil, setVisEnhetFeil, setEnhet } = useContext(TilskuddsperiodeContext);

    const [ verdi, setVerdi ] = useState(enhet);
    const cls = BEMHelper('beslutter-panel');
    
    const { data, error, isValidating } = useHentEnhet(verdi?.match(/^\d{4}$/) ? verdi : undefined);

    useEffect(() => {
        if (isValidating || error) {
            setEnhet(undefined);
        } else {
            setEnhet(data?.enhetNr);
        }
    }, [setEnhet, data, error, isValidating]);

    if (gjeldendeTilskuddsperiode && gjeldendeTilskuddsperiode.status !== 'UBEHANDLET') {
        return null;
    }

    return (
        <>
            <div className={cls.element('input-wrapper')}>
                <PakrevdInput
                    className={cls.element('input')}
                    size="small"
                    label=""
                    verdi={verdi}
                    feilmelding={visEnhetFeil ? getFeilmelding(verdi, enhet) : undefined}
                    settVerdi={(nyVerdi) => {
                        setVerdi(nyVerdi);
                        setVisEnhetFeil(false);
                    }}
                />
                <span className={cls.element('input-meta')} title={data?.navn}>
                    {isValidating && (<Skeleton width="5rem" />)}
                    {!isValidating && data && !error && data.navn}
                </span>
            </div>
        </>
    );
};
export default TilskuddsperiodeEndreKostnadssted;
