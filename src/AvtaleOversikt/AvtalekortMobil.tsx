import React, { FunctionComponent } from 'react';
import './AvtalekortMobil.less';
// import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { Undertittel, Normaltekst, Systemtittel, Ingress } from 'nav-frontend-typografi';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { pathTilKontaktinformasjonSteg } from '@/paths';
import BEMHelper from '@/utils/bem';
import { Avtale } from '@/types/avtale';
import Varsel from '@/types/varsel';
// import { Link } from 'react-router-dom';
import { InnloggetBruker } from '@/InnloggingBoundary/useInnlogget';
import moment from 'moment';
import StatusIkon from '@/komponenter/StatusIkon/StatusIkon';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
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
                <a href={pathTilKontaktinformasjonSteg(avtale.id)}>
                    <LenkepanelBase key={avtale.id} className="avtalekortMobil">
                        {ulestVarsel && <span className={cls.element('ulest-varsel-ikon')} />}
                        <div>
                            <Undertittel>
                                {avtale.deltakerFornavn || ''}&nbsp;
                                {avtale.deltakerEtternavn || ''}
                            </Undertittel>
                            <VerticalSpacer eightPx={true}></VerticalSpacer>
                            <Normaltekst>{avtale.bedriftNavn}</Normaltekst>
                            <VerticalSpacer eightPx={true}></VerticalSpacer>
                            <Normaltekst>
                                Opprettet {moment(avtale.opprettetTidspunkt).format('DD.MM.YYYY')}
                            </Normaltekst>
                            <div className={cls.element('status')}>
                                <StatusIkon status={avtale.status} />

                                <div className={cls.element('statustekst')}>{avtale.status}</div>
                            </div>
                        </div>
                    </LenkepanelBase>
                </a>
            );
        })}
    </>
);

export default AvtalekortMobil;
