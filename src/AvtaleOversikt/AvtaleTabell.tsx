import { useFilter } from '@/AvtaleOversikt/Filtrering/useFilter';
import EtikettStatus from '@/BeslutterSide/EtikettStatus';
import StatusIkon from '@/komponenter/StatusIkon/StatusIkon';
import { avtaleStatusTekst } from '@/messages';
import { pathTilAvtaleNy } from '@/paths';
import { Avtale } from '@/types/avtale';
import { InnloggetBruker, Rolle } from '@/types/innlogget-bruker';
import { Varsel } from '@/types/varsel';
import BEMHelper from '@/utils/bem';
import classNames from 'classnames';
import moment from 'moment';
import { default as React, FunctionComponent, useEffect, useState } from 'react';
import MediaQuery from 'react-responsive';
import './AvtaleTabell.less';
import TaushetserklæringModal from './Taushetserklæring/Taushetserklæring';
import { LinkPanel } from '@navikt/ds-react';
import { Normaltekst } from 'nav-frontend-typografi';

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
            <div className={cls.element('status')}>
                {avtale.gjeldendeTilskuddsperiode && (
                    <EtikettStatus
                        tilskuddsperiodestatus={avtale.gjeldendeTilskuddsperiode?.status}
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
            <div className={cls.element('status')}>{avtaleStatusTekst[avtale.statusSomEnum]}</div>
        </>
    );
};

const AvtaleTabell: FunctionComponent<{
    avtaler: Avtale[];
    varsler: Varsel[];
    innloggetBruker: InnloggetBruker;
}> = ({ avtaler, varsler, innloggetBruker }) => {
    const { filtre } = useFilter();
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
            <div className={classNames(cls.element('rad'), cls.element('header'))}>
                <div className={cls.element('deltakerOgBedrift')}>Bedrift</div>
                <div className={cls.element('deltakerOgBedrift')}>Deltaker</div>
                {innloggetBruker.erNavAnsatt && <div className={cls.element('veileder')}>Veileder</div>}
                <MediaQuery minWidth={576}>
                    <div className={cls.element('dato')}>
                        {erBeslutter ? (
                            <>
                                <div>Startdato</div>
                                <div>periode</div>
                            </>
                        ) : (
                            'Startdato'
                        )}
                    </div>
                    {!erBeslutter && <div className={cls.element('dato')}>Sluttdato</div>}
                </MediaQuery>
                <div className={cls.element('status')}>Status</div>
                <div className={cls.element('statusikon')}>&nbsp;</div>
            </div>
            <div role="list">
                {avtaler.map((avtale: Avtale, index: number) => {
                    const ulestVarsel = varsler.find((value) => value.avtaleId === avtale.id);
                    const periodeStartDato = avtale.gjeldendeTilskuddsperiode?.startDato || null;
                    const startDato = avtale.gjeldendeInnhold.startDato || null;
                    const sluttDato = avtale.gjeldendeInnhold.sluttDato || null;
                    return (
                        <div key={avtale.id} className={cls.element('linkpanel')} >
                            <LinkPanel
                                id={avtale.id}
                                key={avtale.id}
                                href={pathTilAvtaleNy(avtale.id, innloggetBruker.rolle)}
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
                                    }
                                }}
                            >
                                <LinkPanel.Title>
                                    <Normaltekst>
                                        {' '}
                                        {ulestVarsel && (
                                            <span aria-hidden={!ulestVarsel} className="ulest-varsel-ikon" />
                                        )}
                                        <div
                                            className={classNames(cls.element('rad'), {
                                                uthevet: ulestVarsel,
                                            })}
                                        >
                                            <div className={cls.element('deltakerOgBedrift')}>
                                                {avtale.gjeldendeInnhold.bedriftNavn}
                                            </div>
                                            <div className={cls.element('deltakerOgBedrift')}>
                                                {avtale.gjeldendeInnhold.deltakerFornavn || ''}&nbsp;
                                                {avtale.gjeldendeInnhold.deltakerEtternavn || ''}
                                            </div>
                                            {innloggetBruker.erNavAnsatt && (
                                                <div className={cls.element('veileder')}>
                                                    {avtale.veilederNavIdent || 'Ufordelt'}
                                                </div>
                                            )}
                                            <MediaQuery minWidth={576}>
                                                {erBeslutter && (
                                                    <div className={cls.element('dato')}>
                                                        {moment(periodeStartDato).format('DD.MM.YYYY')}
                                                    </div>
                                                )}
                                                {!erBeslutter && (
                                                    <>
                                                        <div className={cls.element('dato')}>
                                                            {startDato && moment(startDato).format('DD.MM.YYYY')}
                                                        </div>
                                                        <div className={cls.element('dato')}>
                                                            {sluttDato && moment(sluttDato).format('DD.MM.YYYY')}
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
                                    </Normaltekst>
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
