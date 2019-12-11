import React, { FunctionComponent } from 'react';
import { Undertittel, Normaltekst, Ingress } from 'nav-frontend-typografi';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { InnloggetBruker } from '@/InnloggingBoundary/useInnlogget';
import { pathTilAvtale } from '@/paths';
import { Link } from 'react-router-dom';
// import { basename } from '@/paths';
import StatusIkon from '@/komponenter/StatusIkon/StatusIkon';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import './AvtalekortMobil.less';
import BEMHelper from '@/utils/bem';
import { Avtale } from '@/types/avtale';
import Varsel from '@/types/varsel';
import moment from 'moment';

const cls = BEMHelper('avtalekortMobil');

const AvtalekortMobil: FunctionComponent<{
    avtaler: Avtale[];
    varsler: Varsel[];
    innloggetBruker: InnloggetBruker;
}> = ({ avtaler, varsler, innloggetBruker }) => (
    <>
        {avtaler.map((avtale: Avtale) => {
            const ulestVarsel = varsler.find(value => value.avtaleId === avtale.id);
            return (
                // <a className={cls.element('lenke')}>
                <LenkepanelBase
                    key={avtale.id}
                    className={cls.className}
                    href={pathTilAvtale(avtale.id)}
                    linkCreator={(props: any) => <Link to={props.href} {...props} />}
                >
                    {ulestVarsel && <span className={cls.element('ulest-varsel-ikon')} />}
                    <div>
                        <Undertittel>
                            {avtale.deltakerFornavn || ''}&nbsp;
                            {avtale.deltakerEtternavn || ''}
                        </Undertittel>
                        <VerticalSpacer eightPx={true}></VerticalSpacer>
                        <Ingress>{avtale.bedriftNavn}</Ingress>
                        <VerticalSpacer eightPx={true}></VerticalSpacer>
                        <Normaltekst>Opprettet {moment(avtale.opprettetTidspunkt).format('DD.MM.YYYY')}</Normaltekst>
                        <div className={cls.element('status')}>
                            <StatusIkon status={avtale.status} />

                            <div className={cls.element('statustekst')}>{avtale.status}</div>
                        </div>
                    </div>
                </LenkepanelBase>
                // </a>
            );
        })}
    </>
);

export default AvtalekortMobil;
