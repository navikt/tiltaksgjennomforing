import { FunctionComponent, useContext, useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import { AvtaleContext } from '@/AvtaleProvider';
import { TilskuddsperiodeContext } from '@/BeslutterSide/BeslutterSide';
import { useHentEnhet } from '@/services/use-rest';
import styles from './tilskuddsperiodeEndreKostnadssted.module.less';
import { BodyShort } from '@navikt/ds-react';

const getFeilmelding = (verdi?: string, enhet?: string) => {
    if (!verdi?.match(/^\d{4}$/)) {
        return 'Enhet må bestå av 4 siffer';
    }
    if (!enhet) {
        return 'Ukjent enhet';
    }
    return 'En feil oppstod';
};

const TilskuddsperiodeEndreKostnadssted: FunctionComponent = () => {
    const { avtale } = useContext(AvtaleContext);
    const { gjeldendeTilskuddsperiode } = avtale;
    const { enhet, visEnhetFeil, setVisEnhetFeil, setEnhet } = useContext(TilskuddsperiodeContext);

    const [verdi, setVerdi] = useState(enhet);

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
        <div className={styles.inputRad}>
            <PakrevdInput
                className={styles.kostnadssted}
                size="medium"
                label="Endre kostnadssted"
                verdi={verdi}
                maxLength={4}
                htmlSize={3}
                feilmelding={visEnhetFeil ? getFeilmelding(verdi, enhet) : undefined}
                settVerdi={(nyVerdi) => {
                    setVerdi(nyVerdi);
                    setVisEnhetFeil(false);
                }}
            />
            <BodyShort size="small">
                {isValidating && <Skeleton width="5rem" />}
                {!isValidating && data && !error && data.navn}
            </BodyShort>
        </div>
    );
};
export default TilskuddsperiodeEndreKostnadssted;
