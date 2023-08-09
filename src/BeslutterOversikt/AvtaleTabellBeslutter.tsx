import EtikettStatus from '@/BeslutterSide/EtikettStatus';
import { pathTilAvtaleNy } from '@/paths';
import { AvtaleMinimalForBeslutter } from '@/types/avtale';
import { InnloggetBruker } from '@/types/innlogget-bruker';
import { Varsel } from '@/types/varsel';
import BEMHelper from '@/utils/bem';
import { Table, BodyShort } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import MediaQuery from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import '../AvtaleOversikt/AvtaleTabell.less';
import AvtaleTabellRadHeader from '@/AvtaleOversikt/AvtaleTabellRadHeader';
import { tiltakstypeTekst } from '@/messages';
import { storForbokstav } from '@/utils/stringUtils';
import { ChevronRightIcon } from '@navikt/aksel-icons';

const cls = BEMHelper('avtaletabell');

const AvtaleTabellBeslutter: FunctionComponent<{
    avtaler: AvtaleMinimalForBeslutter[];
    varsler: Varsel[];
    innloggetBruker: InnloggetBruker;
}> = ({ avtaler, varsler, innloggetBruker }) => {
    const navigate = useNavigate();

    const erBeslutter: boolean = true;

    return (
        <Table className={cls.className}>
            <AvtaleTabellRadHeader
                className={cls.className}
                erBeslutter={erBeslutter}
                erNavAnsatt={innloggetBruker.erNavAnsatt}
            />
            <Table.Body>
                {avtaler.map((avtale: AvtaleMinimalForBeslutter, index: number) => {
                    const ulestVarsel = varsler.find((value) => value.avtaleId === avtale.id);
                    return (
                        <Table.Row
                            key={avtale.id + index}
                            className={cls.element('linkpanel')}
                            onClick={(e) => {
                                navigate({
                                    pathname: pathTilAvtaleNy(avtale.id, innloggetBruker.rolle),
                                    search: window.location.search,
                                });
                            }}
                        >
                            <Table.DataCell className={cls.element('tiltakstype')}>
                                <>
                                    {ulestVarsel && <span aria-hidden={!ulestVarsel} className="ulest-varsel-ikon" />}
                                    <BodyShort size="small">
                                        {storForbokstav(tiltakstypeTekst[avtale.tiltakstype])}
                                    </BodyShort>
                                </>
                            </Table.DataCell>
                            <Table.DataCell className={cls.element('beslutter-deltakerOgBedrift')}>
                                <BodyShort size="small">{avtale.bedriftNavn}</BodyShort>
                            </Table.DataCell>
                            <Table.DataCell className={cls.element('beslutter-deltakerOgBedrift')}>
                                <BodyShort size="small">
                                    {avtale.deltakerFornavn || ''}&nbsp;
                                    {avtale.deltakerEtternavn || ''}
                                </BodyShort>
                            </Table.DataCell>
                            {innloggetBruker.erNavAnsatt && (
                                <Table.DataCell className={cls.element('beslutter-veileder')}>
                                    <BodyShort size="small">{avtale.veilederNavIdent || 'Ufordelt'}</BodyShort>
                                </Table.DataCell>
                            )}
                            {erBeslutter && (
                                <Table.DataCell className={cls.element('beslutter-dato')}>
                                    <BodyShort size="small">
                                        {new Date(avtale.startDato).toLocaleDateString('no-NB', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: '2-digit',
                                        })}
                                    </BodyShort>
                                </Table.DataCell>
                            )}
                            <Table.DataCell className={cls.element('siste-celle')}>
                                <span>
                                    <EtikettStatus
                                        tilskuddsperiodestatus={avtale.status}
                                        antallKlarTilgodkjenning={Number(avtale.antallUbehandlet)}
                                    />
                                </span>
                            </Table.DataCell>
                            <Table.DataCell>
                                <ChevronRightIcon title="a11y-title" fontSize="1.75rem" />
                            </Table.DataCell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
    );
};
export default AvtaleTabellBeslutter;
