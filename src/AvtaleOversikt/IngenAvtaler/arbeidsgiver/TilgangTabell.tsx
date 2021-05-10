import { ReactComponent as ErrorIkon } from '@/assets/ikoner/error.svg';
import { ReactComponent as SuccessIkon } from '@/assets/ikoner/success.svg';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import { useAsyncError } from '@/komponenter/useError';
import { tiltakstypeTekst } from '@/messages';
import { BeOmRettigheterUrler, hentBeOmRettighetUrler } from '@/services/rest-service';
import { TiltaksType } from '@/types/avtale';
import { Tilganger } from '@/types/innlogget-bruker';
import BEMHelper from '@/utils/bem';
import * as React from 'react';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import './TilgangTabell.less';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';
import { storForbokstav } from '@/utils/stringUtils';

const cls = BEMHelper('tilgangtabell');

interface Props {
    bedriftNr: string;
    tilganger: Tilganger;
}

const TilgangTabell: FunctionComponent<Props> = props => {
    const [beOmRettighetUrler, setBeOmRettighetUrler] = useState<BeOmRettigheterUrler>({});
    const throwError = useAsyncError();
    const sommerjobbToggle = useContext(FeatureToggleContext)[Feature.Sommerjobb];

    const alleTilganger: TiltaksType[] = ['ARBEIDSTRENING', 'MIDLERTIDIG_LONNSTILSKUDD', 'VARIG_LONNSTILSKUDD'];
    if (sommerjobbToggle) {
        alleTilganger.push('SOMMERJOBB');
    }

    useEffect(() => {
        hentBeOmRettighetUrler(props.bedriftNr)
            .then(setBeOmRettighetUrler)
            .catch(throwError);
    }, [props.bedriftNr, throwError]);

    const harGodPlass = useMediaQuery({ minWidth: '40rem' });

    return (
        <div className={cls.className}>
            <table className="tabell">
                <tbody>
                    {alleTilganger.map(tiltakstype => {
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
