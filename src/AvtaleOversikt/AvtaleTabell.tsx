import EtikettStatus from '@/BeslutterSide/EtikettStatus';
import StatusIkon from '@/komponenter/StatusIkon/StatusIkon';
import { avtaleStatusTekst } from '@/messages';
import { pathTilAvtale } from '@/paths';
import { Avtale } from '@/types/avtale';
import { InnloggetBruker, Rolle } from '@/types/innlogget-bruker';
import { Varsel } from '@/types/varsel';
import BEMHelper from '@/utils/bem';
import classNames from 'classnames';
import moment from 'moment';
import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';
import { default as React, FunctionComponent, useEffect, useState } from 'react';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';
import './AvtaleTabell.less';
import { useFilter } from '@/AvtaleOversikt/Filtrering/useFilter';

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
                    <div className={cls.element('opprettet')}>
                        {erBeslutter ? (
                            <>
                                <div>Startdato</div>
                                <div>periode</div>
                            </>
                        ) : (
                            'Opprettet'
                        )}
                    </div>
                </MediaQuery>
                <div className={cls.element('status')}>Status</div>
                <div className={cls.element('statusikon')}>&nbsp;</div>
            </div>
            <div role="list">
                {avtaler.map((avtale: Avtale, index: number) => {
                    const ulestVarsel = varsler.find((value) => value.avtaleId === avtale.id);
                    return (
                        <LenkepanelBase
                            id={avtale.id}
                            key={avtale.id}
                            href={pathTilAvtale(avtale.id, innloggetBruker.rolle)}
                            linkCreator={(props: any) => (
                                <Link to={{ pathname: props.href, search: window.location.search }} {...props} />
                            )}
                            role="listitem"
                            aria-labelledby={avtale.id}
                        >
                            {ulestVarsel && <span aria-hidden={!ulestVarsel} className="ulest-varsel-ikon" />}
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
                                    <div className={cls.element('opprettet')}>
                                        {moment(
                                            erBeslutter
                                                ? avtale.gjeldendeTilskuddsperiode?.startDato
                                                : avtale.opprettetTidspunkt
                                        ).format('DD.MM.YYYY')}
                                    </div>
                                </MediaQuery>
                                {hentAvtaleStatus(
                                    avtale,
                                    innloggetBruker.rolle,
                                    skalViseAntallUbehandlet,
                                    antallKlar ? antallKlar[index] : undefined
                                )}
                            </div>
                        </LenkepanelBase>
                    );
                })}
            </div>
        </div>
    );
};

export default AvtaleTabell;
