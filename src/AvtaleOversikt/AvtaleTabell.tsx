import { FunctionComponent, useState } from 'react';
import { useNavigate, generatePath } from 'react-router-dom';
import MediaQuery from 'react-responsive';

import './AvtaleTabell.less';
import AvtaleTabellRadHeader from '@/AvtaleOversikt/AvtaleTabellRadHeader';
import BEMHelper from '@/utils/bem';
import StatusIkon from '@/komponenter/StatusIkon/StatusIkon';
import TaushetserklæringModal from './Taushetserklæring/Taushetserklæring';
import { AvtaleMinimalListeVisning } from '@/types/avtale';
import { BodyShort, Table } from '@navikt/ds-react';
import { ChevronRightIcon } from '@navikt/aksel-icons';
import { InnloggetBruker } from '@/types/innlogget-bruker';
import { Path } from '@/Router';
import { Varsel } from '@/types/varsel';
import { avtaleStatusTekst, tiltakstypeTekstKort } from '@/messages';
import { kunStorForbokstav } from '@/utils/stringUtils';
import { erNil } from '@/utils/predicates';
import NavnMedDiskresjonskode from '@/AvtaleOversikt/NavnMedDiskresjonskode';

const cls = BEMHelper('avtaletabell');

const hentAvtaleStatus = (avtale: AvtaleMinimalListeVisning, erNavAnsatt: boolean): JSX.Element => {
    const erGjeldendeTilskuddsperiodeReturnert = avtale.gjeldendeTilskuddsperiodeStatus === 'AVSLÅTT';
    const kreverOppfølging = !erNil(avtale.oppfolgingVarselSendt);

    return (
        <>
            <Table.DataCell>
                <StatusIkon status={kreverOppfølging ? 'OPPFØLGING_KREVES' : avtale.status} />
            </Table.DataCell>
            <Table.DataCell>
                <BodyShort size="small">
                    {erNavAnsatt && erGjeldendeTilskuddsperiodeReturnert
                        ? 'Tilskuddsperiode returnert'
                        : kreverOppfølging
                          ? 'Oppfølging kreves'
                          : avtaleStatusTekst[avtale.status]}
                </BodyShort>
            </Table.DataCell>
        </>
    );
};

const AvtaleTabell: FunctionComponent<{
    avtaler: AvtaleMinimalListeVisning[];
    varsler: Varsel[];
    innloggetBruker: InnloggetBruker;
}> = ({ avtaler, varsler, innloggetBruker }) => {
    const navigate = useNavigate();

    const [visTaushetserklæringForAvtaleId, setVisTaushetserklæringForAvtaleId] = useState<string | undefined>(
        undefined,
    );

    return (
        <>
            <Table className={cls.className}>
                <AvtaleTabellRadHeader erBeslutter={false} erNavAnsatt={innloggetBruker.erNavAnsatt} />
                <Table.Body>
                    {avtaler.map((avtale: AvtaleMinimalListeVisning, index: number) => {
                        const ulestVarsel = varsler.find((value) => value.avtaleId === avtale.id);
                        return (
                            <Table.Row
                                id={avtale.id}
                                key={avtale.id}
                                role="listitem"
                                aria-labelledby={avtale.id}
                                onClick={(e) => {
                                    if (
                                        innloggetBruker.rolle === 'MENTOR' &&
                                        avtale.tiltakstype === 'MENTOR' &&
                                        !avtale.erGodkjentTaushetserklæringAvMentor
                                    ) {
                                        setVisTaushetserklæringForAvtaleId(avtale.id);
                                        e.preventDefault();
                                    } else {
                                        navigate({
                                            pathname: generatePath(Path.AVTALE, { avtaleId: avtale.id }),
                                            search: window.location.search,
                                        });
                                    }
                                }}
                            >
                                <Table.DataCell textSize="small">
                                    <>
                                        {ulestVarsel && (
                                            <span aria-hidden={!ulestVarsel} className="ulest-varsel-ikon" />
                                        )}
                                        {kunStorForbokstav(tiltakstypeTekstKort[avtale.tiltakstype])}
                                    </>
                                </Table.DataCell>
                                <Table.DataCell textSize="small">{avtale?.bedriftNavn || '-'}</Table.DataCell>
                                <Table.DataCell textSize="small">
                                    <NavnMedDiskresjonskode
                                        fornavn={avtale.deltakerFornavn}
                                        etternavn={avtale.deltakerEtternavn}
                                        diskresjonskode={avtale.diskresjonskode}
                                    />
                                </Table.DataCell>
                                {innloggetBruker.erNavAnsatt && (
                                    <Table.DataCell textSize="small">
                                        {avtale.veilederNavIdent ?? 'Ufordelt'}
                                    </Table.DataCell>
                                )}
                                <MediaQuery minWidth={576}>
                                    <Table.DataCell textSize="small">
                                        {avtale.startDato
                                            ? new Date(avtale.startDato).toLocaleDateString('no-NB', {
                                                  day: 'numeric',
                                                  month: 'short',
                                                  year: '2-digit',
                                              })
                                            : '-'}
                                    </Table.DataCell>
                                    <Table.DataCell textSize="small">
                                        {avtale.sluttDato
                                            ? new Date(avtale.sluttDato).toLocaleDateString('no-NB', {
                                                  day: 'numeric',
                                                  month: 'short',
                                                  year: '2-digit',
                                              })
                                            : '-'}
                                    </Table.DataCell>
                                </MediaQuery>

                                {hentAvtaleStatus(avtale, innloggetBruker.erNavAnsatt)}
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
            {visTaushetserklæringForAvtaleId &&
                avtaler
                    .filter((avtale) => avtale.id === visTaushetserklæringForAvtaleId)
                    .map((avtale) => (
                        <TaushetserklæringModal
                            key={avtale.id}
                            open={visTaushetserklæringForAvtaleId === avtale.id}
                            sistEndret={avtale.sistEndret}
                            togglesetTaushetserklæringForMentorAvtale={(avtaleid) =>
                                setVisTaushetserklæringForAvtaleId(undefined)
                            }
                            avtaleId={avtale.id}
                        />
                    ))}
        </>
    );
};
export default AvtaleTabell;
