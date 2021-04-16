import { ReactComponent as CheckIkon } from '@/assets/ikoner/check.svg';
import { ReactComponent as PabegyntIkon } from '@/assets/ikoner/pabegynt.svg';
import { ReactComponent as VarselIkon } from '@/assets/ikoner/varsel.svg';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import StatusIkon from '@/komponenter/StatusIkon/StatusIkon';
import { hentAvtaleStatusDetaljer } from '@/services/rest-service';
import { Avtale } from '@/types/avtale';
import AvtaleStatusDetaljer from '@/types/avtale-status-detaljer';
import { Rolle } from '@/types/innlogget-bruker';
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
        hentAvtaleStatusDetaljer(props.avtale.id).then(setAvtaleStatusDetaljer);
    }, [
        props.avtale.id,
        props.avtale.godkjentAvDeltaker,
        props.avtale.godkjentAvArbeidsgiver,
        props.avtale.godkjentAvVeileder,
        props.avtale.avbrutt,
        props.avtale.annullertTidspunkt,
    ]);
    if (!avtaleStatusDetaljer) {
        return null;
    }
    const part1Ikon =
        avtaleStatusDetaljer.part1Status === true ? (
            <CheckIkon />
        ) : props.avtale.statusSomEnum === 'PÅBEGYNT' ? (
            <PabegyntIkon />
        ) : (
            <VarselIkon />
        );
    const part2Ikon =
        avtaleStatusDetaljer.part2Status === true ? (
            <CheckIkon />
        ) : props.avtale.statusSomEnum === 'PÅBEGYNT' ? (
            <PabegyntIkon />
        ) : (
            <VarselIkon />
        );
    return (
        <Innholdsboks className={cls.element('innholdsboks')} ariaLabel={props.avtale.statusSomEnum}>
            <MediaQuery minWidth={768}>
                <div className={cls.element('hovedIkon')}>
                    <StatusIkon
                        style={{ width: '40px', height: '40px' }}
                        rolle={props.rolle}
                        status={props.avtale.statusSomEnum}
                        godkjentAvInnloggetBruker={avtaleStatusDetaljer.godkjentAvInnloggetBruker}
                        andrePartnerHarGodkjent={avtaleStatusDetaljer.part1Status && avtaleStatusDetaljer.part2Status}
                        className={cls.element('hovedIkon__justerStorrelse')}
                    />
                </div>
                <div className={cls.element('header')}>
                    <Innholdstittel>{avtaleStatusDetaljer.header} </Innholdstittel>
                </div>
                <VerticalSpacer sixteenPx={true} />
                {props.rolle !== 'ARBEIDSGIVER' &&
                    props.avtale.avbruttGrunn &&
                    props.avtale.avbrutt &&
                    `Årsak: ${props.avtale.avbruttGrunn}`}
            </MediaQuery>
            <MediaQuery maxWidth={767}>
                <div className={cls.element('hovedIkonMobil')}>
                    <div>
                        <Undertittel className={cls.element('header')}>{avtaleStatusDetaljer.header} </Undertittel>
                    </div>
                    <div>
                        <StatusIkon
                            rolle={props.rolle}
                            status={props.avtale.statusSomEnum}
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
