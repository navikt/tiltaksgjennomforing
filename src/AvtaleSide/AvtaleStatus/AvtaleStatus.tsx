import { ReactComponent as CheckIkon } from '@/assets/ikoner/check.svg';
import { ReactComponent as PabegyntIkon } from '@/assets/ikoner/pabegynt.svg';
import { ReactComponent as VarselIkon } from '@/assets/ikoner/varsel.svg';
import { Rolle } from '@/AvtaleContext';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import StatusIkon from '@/komponenter/StatusIkon/StatusIkon';
import RestService from '@/services/rest-service';
import { Avtale } from '@/types/avtale';
import AvtaleStatusDetaljer from '@/types/avtale-status-detaljer';
import BEMHelper from '@/utils/bem';
import { Innholdstittel, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React, { useEffect, useState } from 'react';
import MediaQuery from 'react-responsive';
import './AvtaleStatus.less';

const cls = BEMHelper('avtalestatus');

interface Props {
    avtale: Avtale;
    rolle: Rolle;
}

const AvtaleStatus: React.FunctionComponent<Props> = (props: Props) => {
    const [avtaleStatusDetaljer, setAvtaleStatusDetaljer] = useState<AvtaleStatusDetaljer | undefined>(undefined);
    useEffect(() => {
        RestService.hentAvtaleStatusDetaljer(props.avtale.id).then(setAvtaleStatusDetaljer);
    }, [
        props.avtale.id,
        props.avtale.godkjentAvDeltaker,
        props.avtale.godkjentAvArbeidsgiver,
        props.avtale.godkjentAvVeileder,
    ]);
    if (!avtaleStatusDetaljer) {
        return null;
    }
    return (
        <Innholdsboks className={cls.element('innholdsboks')}>
            <MediaQuery minWidth={576}>
                <div className={cls.element('hovedIkon')}>
                    <StatusIkon
                        rolle={props.rolle}
                        status={props.avtale.status}
                        godkjentAvInnloggetBruker={avtaleStatusDetaljer.godkjentAvInnloggetBruker}
                        andrePartnerHarGodkjent={avtaleStatusDetaljer.part1Status && avtaleStatusDetaljer.part2Status}
                        className={cls.element('hovedIkon__justerStorrelse')}
                    />
                </div>
                <div className={cls.element('header')}>
                    <Innholdstittel>{avtaleStatusDetaljer.header} </Innholdstittel>
                </div>
            </MediaQuery>
            <MediaQuery maxWidth={575}>
                <div className={cls.element('hovedIkonMobil')}>
                    <div>
                        <Undertittel className={cls.element('header')}>{avtaleStatusDetaljer.header} </Undertittel>
                    </div>
                    <div>
                        <StatusIkon
                            rolle={props.rolle}
                            status={props.avtale.status}
                            className={cls.element('hovedIkonMobil__justerStorrelse')}
                        />
                    </div>
                </div>
            </MediaQuery>
            <Normaltekst className={cls.element('infotekst')} tag="div">
                <p>
                    {' '}
                    {props.avtale.godkjentAvVeileder
                        ? 'Avtalen er godkjent av alle parter og låst. ' + avtaleStatusDetaljer.infoDel1
                        : avtaleStatusDetaljer.infoDel1}
                </p>
                <p>{avtaleStatusDetaljer.infoDel2}</p>
            </Normaltekst>
            <div className={cls.element('andreParter')}>
                <div className={cls.element('andreParter__begge')}>
                    <span className={cls.element('andreParter__ikon')}>
                        {avtaleStatusDetaljer.part1Status === true ? (
                            <CheckIkon />
                        ) : props.avtale.status === 'Påbegynt' ? (
                            <PabegyntIkon />
                        ) : (
                            <VarselIkon />
                        )}
                    </span>
                    {avtaleStatusDetaljer.part1}
                </div>
                <div className={cls.element('andreParter__begge')}>
                    <span className={cls.element('andreParter__ikon')}>
                        {avtaleStatusDetaljer.part2Status === true ? (
                            <CheckIkon />
                        ) : props.avtale.status === 'Påbegynt' ? (
                            <PabegyntIkon />
                        ) : (
                            <VarselIkon />
                        )}
                    </span>
                    {avtaleStatusDetaljer.part2}
                </div>
            </div>
        </Innholdsboks>
    );
};

export default AvtaleStatus;
