import ErrorIkon from '@/assets/ikoner/error.svg?react';
import SuccessIkon from '@/assets/ikoner/success.svg?react';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import { useAsyncError } from '@/komponenter/useError';
import { tiltakstypeTekst } from '@/messages';
import { BeOmRettigheterUrler, hentBeOmRettighetUrler } from '@/services/rest-service';
import { Tilganger } from '@/types/innlogget-bruker';
import BEMHelper from '@/utils/bem';
import { storForbokstav } from '@/utils/stringUtils';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import './TilgangTabell.less';
import { TiltaksType } from '@/types';

const cls = BEMHelper('tilgangtabell');

interface Props {
    bedriftNr: string;
    tilganger: Tilganger;
}

const TILTAKSTYPER: TiltaksType[] = [
    'ARBEIDSTRENING',
    'INKLUDERINGSTILSKUDD',
    'MENTOR',
    'MIDLERTIDIG_LONNSTILSKUDD',
    'VARIG_LONNSTILSKUDD',
    'SOMMERJOBB',
    'VTAO',
    'FIREARIG_LONNSTILSKUDD',
];

const TilgangTabell: FunctionComponent<Props> = (props) => {
    const [beOmRettighetUrler, setBeOmRettighetUrler] = useState<BeOmRettigheterUrler>({});
    const throwError = useAsyncError();

    useEffect(() => {
        hentBeOmRettighetUrler(props.bedriftNr).then(setBeOmRettighetUrler).catch(throwError);
    }, [props.bedriftNr, throwError]);

    const harGodPlass = useMediaQuery({ minWidth: '40rem' });

    return (
        <div className={cls.className}>
            <table className="tabell">
                <tbody>
                    {TILTAKSTYPER.map((tiltakstype) => {
                        const harTilgangTilTiltakstype =
                            props.bedriftNr && props.tilganger[props.bedriftNr]?.includes(tiltakstype);

                        return (
                            <tr key={tiltakstype}>
                                <td>{storForbokstav(tiltakstypeTekst[tiltakstype])}</td>
                                <td>
                                    <span style={{ display: 'flex', alignItems: 'center' }}>
                                        {harTilgangTilTiltakstype ? (
                                            <>
                                                {harGodPlass && (
                                                    <SuccessIkon
                                                        style={{
                                                            marginRight: '0.5rem',
                                                        }}
                                                    />
                                                )}
                                                Har tilgang
                                            </>
                                        ) : (
                                            <>
                                                {harGodPlass && (
                                                    <ErrorIkon
                                                        style={{
                                                            marginRight: '0.5rem',
                                                        }}
                                                    />
                                                )}
                                                Mangler tilgang
                                            </>
                                        )}
                                    </span>
                                </td>
                                <td align="right">
                                    {!harTilgangTilTiltakstype ? (
                                        <EksternLenke href={beOmRettighetUrler[tiltakstype] || ''}>
                                            Be om tilgang {harGodPlass && 'i Altinn her'}
                                        </EksternLenke>
                                    ) : (
                                        <span>&nbsp;</span>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TilgangTabell;
