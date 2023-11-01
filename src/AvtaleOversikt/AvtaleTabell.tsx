import AvtaleTabellRadHeader from '@/AvtaleOversikt/AvtaleTabellRadHeader';
import StatusIkon from '@/komponenter/StatusIkon/StatusIkon';
import { avtaleStatusTekst } from '@/messages';
import { pathTilAvtaleNy } from '@/paths';
import { AvtaleMinimalListeVisning } from '@/types/avtale';
import { InnloggetBruker } from '@/types/innlogget-bruker';
import { Varsel } from '@/types/varsel';
import amplitude from '@/utils/amplitude';
import BEMHelper from '@/utils/bem';
import { ChevronRightIcon } from '@navikt/aksel-icons';
import { BodyShort, Table } from '@navikt/ds-react';
import { FunctionComponent, useState } from 'react';
import MediaQuery from 'react-responsive';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './AvtaleTabell.less';
import TaushetserklæringModal from './Taushetserklæring/Taushetserklæring';

const cls = BEMHelper('avtaletabell');

const hentAvtaleStatus = (avtale: AvtaleMinimalListeVisning, erNavAnsatt: boolean): JSX.Element => {
    const erGjeldendeTilskuddsperiodeAvslått = avtale.gjeldendeTilskuddsperiodeStatus === 'AVSLÅTT';
    return (
        <>
            <Table.DataCell>
                <StatusIkon status={avtale.status} />
            </Table.DataCell>
            <Table.DataCell>
                <BodyShort size="small">
                    {erGjeldendeTilskuddsperiodeAvslått && erNavAnsatt
                        ? 'Tilskuddsperiode avslått'
                        : avtaleStatusTekst[avtale.status]}
                </BodyShort>
            </Table.DataCell>
        </>
    );
};

const lagFulltNavn = (avtale: AvtaleMinimalListeVisning) => {
    if (avtale?.deltakerFornavn && avtale?.deltakerEtternavn) {
        return avtale?.deltakerFornavn + ' ' + avtale?.deltakerEtternavn;
    } else if (avtale?.deltakerFornavn) {
        return avtale?.deltakerFornavn;
    } else if (avtale?.deltakerEtternavn) {
        return avtale?.deltakerEtternavn;
    }
    return '-';
};

const AvtaleTabell: FunctionComponent<{
    avtaler: AvtaleMinimalListeVisning[];
    varsler: Varsel[];
    innloggetBruker: InnloggetBruker;
}> = ({ avtaler, varsler, innloggetBruker }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [visTaushetserklæringForAvtaleId, setVisTaushetserklæringForAvtaleId] = useState<string | undefined>(undefined);

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
                                        amplitude.logEvent('#tiltak-klikket-på-avtale-fra-oversikt', {page: searchParams.get('page')});
                                        navigate({
                                            pathname: pathTilAvtaleNy(avtale.id, innloggetBruker.rolle),
                                            search: window.location.search,
                                        });
                                    }
                                }}
                            >
                                <Table.DataCell>
                                    {ulestVarsel && <span aria-hidden={!ulestVarsel} className="ulest-varsel-ikon" />}
                                    <BodyShort size="small">{avtale?.bedriftNavn || '-'}</BodyShort>
                                </Table.DataCell>
                                <Table.DataCell>
                                    <BodyShort size="small">{lagFulltNavn(avtale)}</BodyShort>
                                </Table.DataCell>
                                {innloggetBruker.erNavAnsatt && (
                                    <Table.DataCell>
                                        <BodyShort size="small">{avtale.veilederNavIdent ?? 'Ufordelt'}</BodyShort>
                                    </Table.DataCell>
                                )}
                                <MediaQuery minWidth={576}>
                                    <Table.DataCell>
                                        <BodyShort size="small">
                                            {avtale.startDato
                                                ? new Date(avtale.startDato).toLocaleDateString('no-NB', {
                                                      day: 'numeric',
                                                      month: 'short',
                                                      year: '2-digit',
                                                  })
                                                : '-'}
                                        </BodyShort>
                                    </Table.DataCell>
                                    <Table.DataCell>
                                        <BodyShort size="small">
                                            {avtale.sluttDato
                                                ? new Date(avtale.sluttDato).toLocaleDateString('no-NB', {
                                                      day: 'numeric',
                                                      month: 'short',
                                                      year: '2-digit',
                                                  })
                                                : '-'}
                                        </BodyShort>
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
                    .filter(avtale => avtale.id === visTaushetserklæringForAvtaleId)
                    .map(avtale => 
                        <TaushetserklæringModal
                            key={avtale.id}
                            open={visTaushetserklæringForAvtaleId === avtale.id}
                            sistEndret={avtale.sistEndret}
                            togglesetTaushetserklæringForMentorAvtale={avtaleid => setVisTaushetserklæringForAvtaleId(undefined)}
                            avtaleId={avtale.id}
                        />
                    )}
        </>
    );
};
export default AvtaleTabell;
