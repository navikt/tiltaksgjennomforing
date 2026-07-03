import ErrorIkon from '@/assets/ikoner/error.svg?react';
import SuccessIkon from '@/assets/ikoner/success.svg?react';
import { useFeatureToggles } from '@/FeatureToggles';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import { useAsyncError } from '@/komponenter/useError';
import { tiltakstypeTekst } from '@/messages';
import { BeOmRettigheterUrler, hentBeOmRettighetUrler } from '@/services/rest-service';
import { Tilganger } from '@/types/innlogget-bruker';
import { tiltakToggleFilter } from '@/utils/firearigltToggleFilter';
import { storForbokstav } from '@/utils/stringUtils';
import { FunctionComponent, useEffect, useState } from 'react';
import { BodyShort, HStack, Hide, Show, Table } from '@navikt/ds-react';

interface Props {
    bedriftNr: string;
    tilganger: Tilganger;
}

const TilgangTabell: FunctionComponent<Props> = (props) => {
    const [beOmRettighetUrler, setBeOmRettighetUrler] = useState<BeOmRettigheterUrler>({});
    const throwError = useAsyncError();
    const { firearigLonnstilskudd } = useFeatureToggles();

    useEffect(() => {
        hentBeOmRettighetUrler(props.bedriftNr).then(setBeOmRettighetUrler).catch(throwError);
    }, [props.bedriftNr, throwError]);

    return (
        <Table size="small">
            <Table.Body>
                {tiltakToggleFilter(firearigLonnstilskudd).map((tiltakstype) => {
                    const harTilgangTilTiltakstype =
                        props.bedriftNr && props.tilganger[props.bedriftNr]?.includes(tiltakstype);

                    return (
                        <Table.Row key={tiltakstype}>
                            <Table.DataCell>
                                <BodyShort size="small">{storForbokstav(tiltakstypeTekst[tiltakstype])}</BodyShort>
                            </Table.DataCell>
                            <Table.DataCell>
                                <HStack align="center" gap="space-8">
                                    <Show above="sm">{harTilgangTilTiltakstype ? <SuccessIkon /> : <ErrorIkon />}</Show>
                                    <BodyShort size="small">
                                        {harTilgangTilTiltakstype ? 'Har tilgang' : 'Mangler tilgang'}
                                    </BodyShort>
                                </HStack>
                            </Table.DataCell>
                            <Table.DataCell align="right">
                                {!harTilgangTilTiltakstype && beOmRettighetUrler[tiltakstype] && (
                                    <>
                                        <Hide below="sm">
                                            <EksternLenke href={beOmRettighetUrler[tiltakstype] || ''}>
                                                Be om tilgang i Altinn her
                                            </EksternLenke>
                                        </Hide>
                                        <Show below="sm">
                                            <EksternLenke href={beOmRettighetUrler[tiltakstype] || ''}>
                                                Be om tilgang
                                            </EksternLenke>
                                        </Show>
                                    </>
                                )}
                            </Table.DataCell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
    );
};

export default TilgangTabell;
