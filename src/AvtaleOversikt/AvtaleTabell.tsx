import AvtaleTabellRadHeader from '@/AvtaleOversikt/AvtaleTabellRadHeader';
import { useFilter } from '@/AvtaleOversikt/Filtrering/useFilter';
import EtikettStatus from '@/BeslutterSide/EtikettStatus';
import StatusIkon from '@/komponenter/StatusIkon/StatusIkon';
import { avtaleStatusTekst } from '@/messages';
import { pathTilAvtaleNy } from '@/paths';
import { Avtale } from '@/types/avtale';
import { InnloggetBruker, Rolle } from '@/types/innlogget-bruker';
import { Varsel } from '@/types/varsel';
import BEMHelper from '@/utils/bem';
import { BodyShort, LinkPanel } from '@navikt/ds-react';
import classNames from 'classnames';
import moment from 'moment';
import { FunctionComponent, useEffect, useState } from 'react';
import MediaQuery from 'react-responsive';
import { useNavigate } from 'react-router';
import './AvtaleTabell.less';
import TaushetserklæringModal from './Taushetserklæring/Taushetserklæring';

const cls = BEMHelper('avtaletabell');

export interface AntallKlarTilgodkjenning {
    id: string;
    antallKlarTilgodkjenning: number;
}

const hentAvtaleStatus = (
    avtale: Avtale,
    rolle: Rolle,
    skalViseAntallUbehandlet: boolean,
    ubehandletPerioder?: AntallKlarTilgodkjenning
) => {
    if (rolle === 'BESLUTTER') {
        return (
            <div className={cls.element('beslutterStatus')}>
                {avtale.gjeldendeTilskuddsperiode && (
                    <EtikettStatus
                        tilskuddsperiodestatus={avtale.gjeldendeTilskuddsperiode?.status}
                        refusjonStatus={avtale.gjeldendeTilskuddsperiode?.refusjonStatus}
                        antallKlarTilgodkjenning={
                            skalViseAntallUbehandlet && ubehandletPerioder
                                ? ubehandletPerioder.antallKlarTilgodkjenning
                                : undefined
                        }
                    />
                )}
            </div>
        );
    }
    return (
        <>
            <div className={cls.element('statusikon')}>
                <StatusIkon status={avtale.statusSomEnum} />
            </div>
            <BodyShort className={cls.element('status')}>{avtaleStatusTekst[avtale.statusSomEnum]}</BodyShort>
        </>
    );
};

const AvtaleTabell: FunctionComponent<{
    avtaler: Avtale[];
    varsler: Varsel[];
    innloggetBruker: InnloggetBruker;
}> = ({ avtaler, varsler, innloggetBruker }) => {
    const { filtre } = useFilter();
    const navigate = useNavigate();

    const erBeslutter: boolean = innloggetBruker.rolle === 'BESLUTTER';
    const skalViseAntallUbehandlet =
        erBeslutter && (filtre?.tilskuddPeriodeStatus === undefined || filtre?.tilskuddPeriodeStatus === 'UBEHANDLET');
    const [antallKlar, setAntallKlar] = useState<AntallKlarTilgodkjenning[] | undefined>(undefined);

    const [visTaushetserklæringForAvtaleId, setVisTaushetserklæringForAvtaleId] = useState<string>('');

    useEffect(() => {
        skalViseAntallUbehandlet
            ? setAntallKlar(
                  avtaler.map((a) => ({
                      id: a.id,
                      antallKlarTilgodkjenning: a.tilskuddPeriode.filter(
                          (t) =>
                              (new Date(t.kanBesluttesFom) <= new Date() || t.kanBesluttesFom === '-999999999-01-01') &&
                              t.status === 'UBEHANDLET'
                      )?.length,
                  }))
              )
            : setAntallKlar(undefined);
    }, [avtaler, erBeslutter, filtre?.tilskuddPeriodeStatus, skalViseAntallUbehandlet]);

    return (
        <div className={cls.className}>
            <AvtaleTabellRadHeader
                className={cls.className}
                erBeslutter={erBeslutter}
                innloggetBruker={innloggetBruker}
            />
            <div role="list">
                {avtaler.map((avtale: Avtale, index: number) => {
                    const ulestVarsel = varsler.find((value) => value.avtaleId === avtale.id);
                    return (
                        <div key={avtale.id} className={cls.element('linkpanel')}>
                            <LinkPanel
                                border={false}
                                id={avtale.id}
                                key={avtale.id}
                                className={
                                    avtale.tiltakstype === 'MENTOR' && !avtale.erGodkjentTaushetserklæringAvMentor
                                        ? 'skjulIndikator'
                                        : ''
                                }
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
                                <LinkPanel.Title>
                                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                        {ulestVarsel && (
                                            <span aria-hidden={!ulestVarsel} className="ulest-varsel-ikon" />
                                        )}{' '}
                                        <div
                                            className={classNames(cls.element('rad'), {
                                                uthevet: ulestVarsel,
                                            })}
                                        >
                                            <div className={cls.element('deltakerOgBedrift')}>
                                                <BodyShort size="small">
                                                    {avtale.gjeldendeInnhold.bedriftNavn}
                                                </BodyShort>
                                            </div>
                                            <div className={cls.element('deltakerOgBedrift')}>
                                                <BodyShort size="small">
                                                    {avtale.gjeldendeInnhold.deltakerFornavn || ''}&nbsp;
                                                    {avtale.gjeldendeInnhold.deltakerEtternavn || ''}
                                                </BodyShort>
                                            </div>
                                            {innloggetBruker.erNavAnsatt && (
                                                <div className={cls.element('veileder')}>
                                                    <BodyShort size="small">
                                                        {avtale.veilederNavIdent || 'Ufordelt'}
                                                    </BodyShort>
                                                </div>
                                            )}
                                            <MediaQuery minWidth={576}>
                                                {erBeslutter && (
                                                    <div className={(cls.element('dato'), cls.element('besluterdato'))}>
                                                        <BodyShort size="small">
                                                            {moment(avtale.gjeldendeTilskuddsperiode?.startDato).format(
                                                                'DD.MM.YYYY'
                                                            )}
                                                        </BodyShort>
                                                    </div>
                                                )}
                                                {!erBeslutter && (
                                                    <>
                                                        <div className={cls.element('dato')}>
                                                            <BodyShort size="small">
                                                                {avtale.gjeldendeInnhold.startDato &&
                                                                    moment(avtale.gjeldendeInnhold.startDato).format(
                                                                        'DD.MM.YYYY'
                                                                    )}
                                                            </BodyShort>
                                                        </div>
                                                        <div className={cls.element('dato')}>
                                                            <BodyShort size="small">
                                                                {avtale.gjeldendeInnhold.sluttDato &&
                                                                    moment(avtale.gjeldendeInnhold.sluttDato).format(
                                                                        'DD.MM.YYYY'
                                                                    )}
                                                            </BodyShort>
                                                        </div>
                                                    </>
                                                )}
                                            </MediaQuery>
                                            {hentAvtaleStatus(
                                                avtale,
                                                innloggetBruker.rolle,
                                                skalViseAntallUbehandlet,
                                                antallKlar ? antallKlar[index] : undefined
                                            )}
                                        </div>
                                    </div>
                                </LinkPanel.Title>
                            </LinkPanel>
                            <TaushetserklæringModal
                                open={visTaushetserklæringForAvtaleId === avtale.id}
                                togglesetTaushetserklæringForMentorAvtale={setVisTaushetserklæringForAvtaleId}
                                avtale={avtale}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default AvtaleTabell;
