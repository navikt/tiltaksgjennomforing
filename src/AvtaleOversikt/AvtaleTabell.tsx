import AvtaleTabellRadHeader from '@/AvtaleOversikt/AvtaleTabellRadHeader';
import StatusIkon from '@/komponenter/StatusIkon/StatusIkon';
import { avtaleStatusTekst, tiltakstypeTekst } from '@/messages';
import { pathTilAvtaleNy } from '@/paths';
import { AvtaleMinimalListeVisning } from '@/types/avtale';
import { InnloggetBruker } from '@/types/innlogget-bruker';
import { Varsel } from '@/types/varsel';
import BEMHelper from '@/utils/bem';
import { BodyShort, Table } from '@navikt/ds-react';
import { Fragment, FunctionComponent, useState } from 'react';
import MediaQuery from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import TaushetserklæringModal from './Taushetserklæring/Taushetserklæring';
import './AvtaleTabell.less';
import { ChevronRightIcon } from '@navikt/aksel-icons';
import { storForbokstav } from '@/utils/stringUtils';

const cls = BEMHelper('avtaletabell');

const hentAvtaleStatus = (avtale: AvtaleMinimalListeVisning, erNavAnsatt: boolean): JSX.Element => {
    const erGjeldendeTilskuddsperiodeAvslått = avtale.gjeldendeTilskuddsperiodeStatus === 'AVSLÅTT';
    return (
        <>
            <Table.DataCell>
                <StatusIkon status={avtale.status} />
            </Table.DataCell>
            <Table.DataCell>
                <BodyShort size='small'>
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

    const [visTaushetserklæringForAvtaleId, setVisTaushetserklæringForAvtaleId] = useState<string>('');

    return (
        <Table className={cls.className}>
            <AvtaleTabellRadHeader
                erBeslutter={false}
                erNavAnsatt={innloggetBruker.erNavAnsatt}
            />
            <Table.Body>
                {avtaler.map((avtale: AvtaleMinimalListeVisning, index: number) => {
                    const ulestVarsel = varsler.find((value) => value.avtaleId === avtale.id);
                    return (
                        <Fragment key={index}>
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
                                            pathname: pathTilAvtaleNy(avtale.id, innloggetBruker.rolle),
                                            search: window.location.search,
                                        });
                                    }
                                }}
                            >
                                <Table.DataCell>
                                    {ulestVarsel && <span aria-hidden={!ulestVarsel} className="ulest-varsel-ikon" />}
                                    <BodyShort size="small">
                                    {storForbokstav(tiltakstypeTekst[avtale.tiltakstype])}
                                </BodyShort>
                                </Table.DataCell>
                                <Table.DataCell>
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
                                        <BodyShort size="small" className={cls.element('nowrap')}>
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
                                        <BodyShort size="small" className={cls.element('nowrap')}>
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
                                    <ChevronRightIcon className={cls.element('pil-hoyre')} title="a11y-title" fontSize="1.75rem" />
                                </Table.DataCell>
                            </Table.Row>
                            <TaushetserklæringModal
                                open={visTaushetserklæringForAvtaleId === avtale.id}
                                sistEndret={avtale.sistEndret}
                                togglesetTaushetserklæringForMentorAvtale={setVisTaushetserklæringForAvtaleId}
                                avtaleId={avtale.id}
                            />
                        </Fragment>
                    );
                })}
            </Table.Body>
        </Table>
    );
};
export default AvtaleTabell;
