import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import StatusIkon from '@/komponenter/StatusIkon/StatusIkon';
import { InnloggetBruker, Rolle } from '@/types/innlogget-bruker';
import { avtaleStatusTekst } from '@/messages';
import { pathTilAvtale } from '@/paths';
import { Avtale } from '@/types/avtale';
import { Varsel } from '@/types/varsel';
import BEMHelper from '@/utils/bem';
import moment from 'moment';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Ingress, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React, {FunctionComponent, useState} from 'react';
import { Link } from 'react-router-dom';
import './AvtalekortMobil.less';
import TaushetserklæringModal from "@/AvtaleOversikt/Taushetserklæring/Taushetserklæring";

const cls = BEMHelper('avtalekortMobil');

const AvtalekortMobil: FunctionComponent<{
    avtaler: Avtale[];
    varsler: Varsel[];
    innloggetBruker: InnloggetBruker;
}> = ({ avtaler, varsler , innloggetBruker}) => {

    const [visTaushetserklæringForAvtaleId, setVisTaushetserklæringForAvtaleId] = useState<string>("");

    return <>
        {avtaler.map((avtale: Avtale) => {
            const ulestVarsel = varsler.find((value) => value.avtaleId === avtale.id);
            return (<>
                <LenkepanelBase
                    key={avtale.id}
                    className={cls.className}
                    href={pathTilAvtale(avtale.id)}
                    linkCreator={(props: any) => (
                        <Link to={{pathname: props.href, search: window.location.search}} {...props} />
                    )}

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
                    {ulestVarsel && <span aria-hidden={!ulestVarsel} className={cls.element('ulest-varsel-ikon')}/>}
                    <div>
                        <Undertittel>
                            {avtale.gjeldendeInnhold.deltakerFornavn || ''}&nbsp;
                            {avtale.gjeldendeInnhold.deltakerEtternavn || ''}
                        </Undertittel>
                        <VerticalSpacer rem={0.5}/>
                        <Ingress>{avtale.gjeldendeInnhold.bedriftNavn}</Ingress>
                        <VerticalSpacer rem={0.5}/>
                        <Normaltekst>Opprettet {moment(avtale.opprettetTidspunkt).format('DD.MM.YYYY')}</Normaltekst>
                        <div className={cls.element('status')}>
                            <StatusIkon status={avtale.statusSomEnum}/>

                            <div className={cls.element('statustekst')}>{avtaleStatusTekst[avtale.statusSomEnum]}</div>
                        </div>
                    </div>
                </LenkepanelBase>
            <TaushetserklæringModal
                open={visTaushetserklæringForAvtaleId === avtale.id}
                togglesetTaushetserklæringForMentorAvtale={setVisTaushetserklæringForAvtaleId}
                avtale={avtale}
            />
            </>);
        })}
</>
};

export default AvtalekortMobil;
