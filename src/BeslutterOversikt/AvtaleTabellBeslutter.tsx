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
                            <Table.DataCell textSize="small">
                                {ulestVarsel && <span aria-hidden={!ulestVarsel} className="ulest-varsel-ikon" />}
                                {kunStorForbokstav(tiltakstypeTekstKort[avtale.tiltakstype])}
                            </Table.DataCell>
                            <Table.DataCell textSize="small">{avtale.bedriftNavn}</Table.DataCell>
                            <Table.DataCell textSize="small">
                                <NavnMedDiskresjonskode
                                    diskresjonskode={avtale.diskresjonskode}
                                    fornavn={avtale.deltakerFornavn}
                                    etternavn={avtale.deltakerEtternavn}
                                />
                            </Table.DataCell>
                            <Table.DataCell textSize="small">{avtale.veilederNavIdent || 'Ufordelt'}</Table.DataCell>
                            <Table.DataCell textSize="small">
                                {new Date(avtale.startDato).toLocaleDateString('no-NB', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: '2-digit',
                                })}
                            </Table.DataCell>
                            <Table.DataCell>
                                <EtikettStatus
                                    tilskuddsperiodestatus={avtale.status}
                                    antallKlarTilgodkjenning={Number(avtale.antallUbehandlet)}
                                    godkjentAv={avtale.veilederNavIdent}
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
