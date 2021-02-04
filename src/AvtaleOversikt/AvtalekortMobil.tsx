import React, { FunctionComponent } from 'react';
import { Undertittel, Normaltekst, Ingress } from 'nav-frontend-typografi';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { pathTilAvtale } from '@/paths';
import { Link } from 'react-router-dom';
import StatusIkon from '@/komponenter/StatusIkon/StatusIkon';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import './AvtalekortMobil.less';
import BEMHelper from '@/utils/bem';
import { Avtale } from '@/types/avtale';
import { Varsel } from '@/types/varsel';
import moment from 'moment';

const cls = BEMHelper('avtalekortMobil');

const AvtalekortMobil: FunctionComponent<{
    avtaler: Avtale[];
    varsler: Varsel[];
}> = ({ avtaler, varsler }) => (
    <>
        {avtaler.map((avtale: Avtale) => {
            const ulestVarsel = varsler.find(value => value.avtaleId === avtale.id);
            return (
                <LenkepanelBase
                    key={avtale.id}
                    className={cls.className}
                    href={pathTilAvtale(avtale.id)}
                    linkCreator={(props: any) => (
                        <Link to={{ pathname: props.href, search: window.location.search }} {...props} />
                    )}
                >
                    {ulestVarsel && <span aria-hidden={!ulestVarsel} className={cls.element('ulest-varsel-ikon')} />}
                    <div>
                        <Undertittel>
                            {avtale.deltakerFornavn || ''}&nbsp;
                            {avtale.deltakerEtternavn || ''}
                        </Undertittel>
                        <VerticalSpacer eightPx={true} />
                        <Ingress>{avtale.bedriftNavn}</Ingress>
                        <VerticalSpacer eightPx={true} />
                        <Normaltekst>Opprettet {moment(avtale.opprettetTidspunkt).format('DD.MM.YYYY')}</Normaltekst>
                        <div className={cls.element('status')}>
                            <StatusIkon status={avtale.status} />

                            <div className={cls.element('statustekst')}>{avtale.status}</div>
                        </div>
                    </div>
                </LenkepanelBase>
            );
        })}
    </>
);

export default AvtalekortMobil;
