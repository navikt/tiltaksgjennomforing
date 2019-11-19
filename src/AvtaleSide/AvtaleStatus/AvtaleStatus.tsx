import React from 'react';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import BEMHelper from '@/utils/bem';
import './AvtaleStatus.less';
import CheckIkon from '@/assets/ikoner/check.svg';
import VarselIkon from '@/assets/ikoner/varsel.svg';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { Avtale } from '@/types/avtale';
import { medContext, Rolle } from '@/AvtaleContext';
import AvtaleStatusDetaljer from '@/types/avtale-status-detaljer';
// import Statustekst from '@/AvtaleSide/AvtaleStatus/Statustekst';

const cls = BEMHelper('avtalestatus');

interface Props {
    avtale: Avtale;
    rolle: Rolle;
    avtaleStatusDetaljer: AvtaleStatusDetaljer;
}

const AvtaleStatus: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <Innholdsboks className={cls.element('innholdsboks')}>
            <div className={cls.element('hovedIkon')}>
                {props.avtaleStatusDetaljer.godkjentAvInnloggetBruker ? (
                    <img className={cls.element('hovedIkon__resize')} src={CheckIkon} />
                ) : (
                    <img className={cls.element('hovedIkon__resize')} src={VarselIkon} />
                )}
            </div>
            <Innholdstittel className={cls.element('header')}>{props.avtaleStatusDetaljer.header} </Innholdstittel>
            <Normaltekst className={cls.element('infotekst')}>
                <p> {props.avtaleStatusDetaljer.infoDel1}</p>
                <p>{props.avtaleStatusDetaljer.infoDel2}</p>
            </Normaltekst>
            <div className={cls.element('andreParter')}>
                <div>
                    {props.avtaleStatusDetaljer.part1}
                    {/* har godkjent */}
                    <span className={cls.element('andreParter__ikon')}>
                        {props.avtaleStatusDetaljer.part1Status === true ? (
                            <img src={CheckIkon} />
                        ) : (
                            <img src={VarselIkon} />
                        )}
                    </span>
                </div>

                <div>
                    <span className={cls.element('andreParter__part2')}>
                        {props.avtaleStatusDetaljer.part2}
                        <span />
                        <span className={cls.element('andreParter__ikon')}>
                            {props.avtaleStatusDetaljer.part2Status === true ? (
                                <img src={CheckIkon} />
                            ) : (
                                <img src={VarselIkon} />
                            )}
                        </span>
                    </span>
                </div>
            </div>
        </Innholdsboks>
    );
};

export default medContext(AvtaleStatus);
