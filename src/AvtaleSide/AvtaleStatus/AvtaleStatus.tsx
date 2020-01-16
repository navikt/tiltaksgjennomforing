import React, { useEffect, useState } from 'react';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import BEMHelper from '@/utils/bem';
import './AvtaleStatus.less';
import { ReactComponent as CheckIkon } from '@/assets/ikoner/check.svg';
import { ReactComponent as VarselIkon } from '@/assets/ikoner/varsel.svg';
import { Innholdstittel, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Avtale } from '@/types/avtale';
import { Rolle } from '@/AvtaleContext';
import AvtaleStatusDetaljer from '@/types/avtale-status-detaljer';
import RestService from '@/services/rest-service';
import StatusIkon from '@/komponenter/StatusIkon/StatusIkon';
import MediaQuery from 'react-responsive';
import { ReactComponent as PabegyntIkon } from '@/assets/ikoner/pabegynt.svg';

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
    const part1Ikon =
        avtaleStatusDetaljer.part1Status === true ? (
            <CheckIkon />
        ) : props.avtale.status === 'Påbegynt' ? (
            <PabegyntIkon />
        ) : (
            <VarselIkon />
        );
    const part2Ikon =
        avtaleStatusDetaljer.part2Status === true ? (
            <CheckIkon />
        ) : props.avtale.status === 'Påbegynt' ? (
            <PabegyntIkon />
        ) : (
            <VarselIkon />
        );
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
                <Innholdstittel className={cls.element('header')}>{avtaleStatusDetaljer.header} </Innholdstittel>
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
                    <MediaQuery minWidth={768}>
                        <span className={cls.element('andreParter__ikon')}>{part1Ikon}</span>
                        {avtaleStatusDetaljer.part1}
                    </MediaQuery>
                    <MediaQuery maxWidth={767}>
                        {avtaleStatusDetaljer.part1}
                        <span className={cls.element('andreParter__ikon')}>{part1Ikon}</span>
                    </MediaQuery>
                </div>
                <div className={cls.element('andreParter__begge')}>
                    <MediaQuery minWidth={768}>
                        <span className={cls.element('andreParter__ikon')}>{part2Ikon}</span>
                        {avtaleStatusDetaljer.part2}
                    </MediaQuery>
                    <MediaQuery maxWidth={767}>
                        {avtaleStatusDetaljer.part2}
                        <span className={cls.element('andreParter__ikon')}>{part2Ikon}</span>
                    </MediaQuery>
                </div>
            </div>
        </Innholdsboks>
    );
};

export default AvtaleStatus;
