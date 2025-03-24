import { FunctionComponent } from 'react';
import { useNavigate, generatePath } from 'react-router-dom';
import { Table, BodyShort } from '@navikt/ds-react';

import '../AvtaleOversikt/AvtaleTabell.less';
import AvtaleTabellBeslutterHeader from '@/BeslutterOversikt/AvtaleTabellBeslutterHeader';
import BEMHelper from '@/utils/bem';
import EtikettStatus from '@/BeslutterSide/EtikettStatus';
import { AvtaleMinimalForBeslutter } from '@/types/avtale';
import { ChevronRightIcon } from '@navikt/aksel-icons';
import { Path } from '@/Router';
import { Varsel } from '@/types/varsel';
import { kunStorForbokstav } from '@/utils/stringUtils';
import { tiltakstypeTekstKort } from '@/messages';
import NavnMedDiskresjonskode from '@/AvtaleOversikt/NavnMedDiskresjonskode';

const cls = BEMHelper('avtaletabell');

interface Props {
    avtaler: AvtaleMinimalForBeslutter[];
    varsler: Varsel[];
}

const AvtaleTabellBeslutter = (props: Props) => {
    const { avtaler, varsler } = props;
    const navigate = useNavigate();

    return (
        <Table className={cls.className}>
            <AvtaleTabellBeslutterHeader />
            <Table.Body>
                {avtaler.map((avtale: AvtaleMinimalForBeslutter, index: number) => {
                    const ulestVarsel = varsler.find((value) => value.avtaleId === avtale.id);
                    return (
                        <Table.Row
                            key={avtale.id + index}
                            onClick={(e) => {
                                navigate({
                                    pathname: generatePath(Path.AVTALE_BESLUTTER, { avtaleId: avtale.id }),
                                    search: window.location.search,
                                });
                            }}
                        >
                            <Table.DataCell>
                                {ulestVarsel && <span aria-hidden={!ulestVarsel} className="ulest-varsel-ikon" />}
                                <BodyShort size="small">
                                    {kunStorForbokstav(tiltakstypeTekstKort[avtale.tiltakstype])}
                                </BodyShort>
                            </Table.DataCell>
                            <Table.DataCell>
                                <BodyShort size="small">{avtale.bedriftNavn}</BodyShort>
                            </Table.DataCell>
                            <Table.DataCell>
                                <BodyShort size="small">
                                    <NavnMedDiskresjonskode
                                        diskresjonskode={avtale.diskresjonskode}
                                        fornavn={avtale.deltakerFornavn}
                                        etternavn={avtale.deltakerEtternavn}
                                    />
                                </BodyShort>
                            </Table.DataCell>
                            <Table.DataCell>
                                <BodyShort size="small">{avtale.veilederNavIdent || 'Ufordelt'}</BodyShort>
                            </Table.DataCell>
                            <Table.DataCell>
                                <BodyShort size="small">
                                    {new Date(avtale.startDato).toLocaleDateString('no-NB', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: '2-digit',
                                    })}
                                </BodyShort>
                            </Table.DataCell>
                            <Table.DataCell>
                                <EtikettStatus
                                    tilskuddsperiodestatus={avtale.status}
                                    antallKlarTilgodkjenning={Number(avtale.antallUbehandlet)}
                                />
                            </Table.DataCell>
                            <Table.DataCell>
                                <ChevronRightIcon
                                    className={cls.element('pil-hoyre')}
                                    title="a11y-title"
                                    fontSize="1.75rem"
                                />
                            </Table.DataCell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
    );
};
export default AvtaleTabellBeslutter;
