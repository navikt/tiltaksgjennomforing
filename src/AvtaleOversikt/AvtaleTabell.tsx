import StatusIkon from '@/komponenter/StatusIkon/StatusIkon';
import { pathTilAvtale } from '@/paths';
import { Avtale } from '@/types/avtale';
import { InnloggetBruker, Rolle } from '@/types/innlogget-bruker';
import { Varsel } from '@/types/varsel';
import BEMHelper from '@/utils/bem';
import classNames from 'classnames';
import moment from 'moment';
import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';
import { default as React, FunctionComponent } from 'react';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';
import './AvtaleTabell.less';
import EtikettStatus from '@/BeslutterSide/EtikettStatus';

const cls = BEMHelper('avtaletabell');

const hentAvtaleStatus = (avtale: Avtale, rolle: Rolle) => {
    if (rolle === 'BESLUTTER') {
        return (
            <div className={cls.element('status')}>
                {avtale.gjeldendeTilskuddsperiode && (
                    <EtikettStatus tilskuddsperiodestatus={avtale.gjeldendeTilskuddsperiode?.status} />
                )}
            </div>
        );
    } else {
        return (
            <>
                <div className={cls.element('statusikon')}>
                    <StatusIkon status={avtale.status} />
                </div>
                <div className={cls.element('status')}>{avtale.status}</div>
            </>
        );
    }
};

const AvtaleTabell: FunctionComponent<{
    avtaler: Avtale[];
    varsler: Varsel[];
    innloggetBruker: InnloggetBruker;
}> = ({ avtaler, varsler, innloggetBruker }) => (
    <div className={cls.className} role="main">
        <div className={classNames(cls.element('rad'), cls.element('header'))}>
            <div className={cls.element('deltakerOgBedrift')}>Bedrift</div>
            <div className={cls.element('deltakerOgBedrift')}>Deltaker</div>
            {innloggetBruker.erNavAnsatt && <div className={cls.element('veileder')}>Veileder</div>}
            <MediaQuery minWidth={576}>
                <div className={cls.element('opprettet')}>Opprettet</div>
            </MediaQuery>
            <div className={cls.element('status')}>Status</div>
            <div className={cls.element('statusikon')}>&nbsp;</div>
        </div>
        <div role="list">
            {avtaler.map((avtale: Avtale) => {
                const ulestVarsel = varsler.find(value => value.avtaleId === avtale.id);
                return (
                    <LenkepanelBase
                        key={avtale.id}
                        href={pathTilAvtale(avtale.id, innloggetBruker.rolle)}
                        linkCreator={(props: any) => (
                            <Link to={{ pathname: props.href, search: window.location.search }} {...props} />
                        )}
                        role="listitem"
                        aria-labelledby={'rad avtalelenke '.concat(avtale.deltakerFnr)}
                    >
                        {ulestVarsel && <span aria-hidden={!ulestVarsel} className="ulest-varsel-ikon" />}
                        <div
                            className={classNames(cls.element('rad'), {
                                uthevet: ulestVarsel,
                            })}
                        >
                            <div className={cls.element('deltakerOgBedrift')}>{avtale.bedriftNavn}</div>
                            <div className={cls.element('deltakerOgBedrift')}>
                                {avtale.deltakerFornavn || ''}&nbsp;
                                {avtale.deltakerEtternavn || ''}
                            </div>
                            {innloggetBruker.erNavAnsatt && (
                                <div className={cls.element('veileder')}>{avtale.veilederNavIdent || 'Ufordelt'}</div>
                            )}
                            <MediaQuery minWidth={576}>
                                <div className={cls.element('opprettet')}>
                                    {moment(avtale.opprettetTidspunkt).format('DD.MM.YYYY')}
                                </div>
                            </MediaQuery>
                            {hentAvtaleStatus(avtale, innloggetBruker.rolle)}
                        </div>
                    </LenkepanelBase>
                );
            })}
        </div>
    </div>
);

export default AvtaleTabell;
