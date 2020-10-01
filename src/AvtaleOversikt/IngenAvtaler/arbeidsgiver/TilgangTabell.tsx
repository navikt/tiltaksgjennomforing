import * as React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import { tiltakstypeTekst } from '@/messages';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import { TiltaksType } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import './TilgangTabell.less';
import { Tilganger } from '@/InnloggingBoundary/useInnlogget';
import { ReactComponent as SuccessIkon } from '@/assets/ikoner/success.svg';
import { ReactComponent as ErrorIkon } from '@/assets/ikoner/error.svg';
import { BeOmRettigheterUrler, hentBeOmRettighetUrler } from '@/services/rest-service';

const alleTilganger: TiltaksType[] = ['ARBEIDSTRENING', 'MIDLERTIDIG_LONNSTILSKUDD', 'VARIG_LONNSTILSKUDD'];

const cls = BEMHelper('tilgangtabell');

interface Props {
    bedriftNr: string;
    tilganger: Tilganger;
}

const TilgangTabell: FunctionComponent<Props> = props => {
    const [beOmRettighetUrler, setBeOmRettighetUrler] = useState<BeOmRettigheterUrler>({});
    useEffect(() => {
        hentBeOmRettighetUrler(props.bedriftNr).then(setBeOmRettighetUrler);
    }, [props.bedriftNr]);

    return (
        <div className={cls.className}>
            <table className="tabell">
                <tbody>
                    {alleTilganger.map(tiltakstype => {
                        const harTilgangTilTiltakstype =
                            props.bedriftNr && props.tilganger[props.bedriftNr]?.includes(tiltakstype);

                        return (
                            <tr key={tiltakstype}>
                                <td>{tiltakstypeTekst[tiltakstype]}</td>
                                <td>
                                    {harTilgangTilTiltakstype ? (
                                        <span>
                                            <SuccessIkon
                                                style={{
                                                    display: 'inline-block',
                                                    verticalAlign: '-0.45rem',
                                                    marginRight: '0.5rem',
                                                }}
                                            />
                                            Har tilgang
                                        </span>
                                    ) : (
                                        <span>
                                            <ErrorIkon
                                                style={{
                                                    display: 'inline-block',
                                                    verticalAlign: '-0.45rem',
                                                    marginRight: '0.5rem',
                                                }}
                                            />
                                            Mangler tilgang
                                        </span>
                                    )}
                                </td>
                                <td align="right">
                                    {!harTilgangTilTiltakstype ? (
                                        <EksternLenke href={beOmRettighetUrler[tiltakstype] || ''}>
                                            Be om tilgang i Altinn her
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
