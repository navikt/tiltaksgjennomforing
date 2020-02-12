import { default as React, FunctionComponent } from 'react';
import { Avtale } from '@/types/avtale';
import classNames from 'classnames';
import MediaQuery from 'react-responsive';
import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';
import { pathTilAvtale } from '@/paths';
import { Link } from 'react-router-dom';
import moment from 'moment';
import StatusIkon from '@/komponenter/StatusIkon/StatusIkon';
import Varsel from '@/types/varsel';
import BEMHelper from '@/utils/bem';
import { InnloggetBruker } from '@/InnloggingBoundary/useInnlogget';
import './AvtaleTabell.less';
const cls = BEMHelper('avtaletabell');

const AvtaleTabell: FunctionComponent<{
    avtaler: Avtale[];
    varsler: Varsel[];
    innloggetBruker: InnloggetBruker;
}> = ({ avtaler, varsler, innloggetBruker }) => (
    <div className={cls.className}>
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
        {avtaler.map((avtale: Avtale) => {
            const ulestVarsel = varsler.find(value => value.avtaleId === avtale.id);
            return (
                <LenkepanelBase
                    key={avtale.id}
                    href={pathTilAvtale(avtale.id)}
                    linkCreator={(props: any) => <Link to={props.href} {...props} />}
                >
                    {ulestVarsel && <span className="ulest-varsel-ikon" />}
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
                            <div className={cls.element('veileder')}>{avtale.veilederNavIdent}</div>
                        )}
                        <MediaQuery minWidth={576}>
                            <div className={cls.element('opprettet')}>
                                {moment(avtale.opprettetTidspunkt).format('DD.MM.YYYY')}
                            </div>
                        </MediaQuery>
                        <div className={cls.element('statusikon')}>
                            <StatusIkon status={avtale.status} />
                        </div>
                        <div className={cls.element('status')}>{avtale.status}</div>
                    </div>
                </LenkepanelBase>
            );
        })}
    </div>
);

export default AvtaleTabell;
