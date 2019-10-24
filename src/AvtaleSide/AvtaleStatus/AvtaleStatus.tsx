import React from 'react';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import BEMHelper from '@/utils/bem';
import './AvtaleStatus.less';
import CheckIkon from '@/assets/ikoner/check.svg';
import VarselIkon from '@/assets/ikoner/varsel.svg';
import { Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import { Avtale } from '@/types/avtale';
import { Rolle } from '@/AvtaleContext';
import AvtaleStatusDetaljer from '@/types/AvtaleStatusDetaljer';
// import Statustekst from '@/AvtaleSide/AvtaleStatus/Statustekst';

const cls = BEMHelper('avtalestatus');

interface Props {
    avtale: Avtale;
    rolle: Rolle;
    godkjentAvtale?: boolean;
    avtaleStatusDetaljer: AvtaleStatusDetaljer;
}

const AvtaleStatus: React.FunctionComponent<Props> = (props: Props) => {
    const aktuellPerson = () => {
        switch (props.rolle) {
            case 'DELTAKER':
                return props.avtale.godkjentAvDeltaker;
            case 'ARBEIDSGIVER':
                return props.avtale.godkjentAvArbeidsgiver;
            case 'VEILEDER':
                return props.avtale.godkjentAvVeileder;
        }
    };

    const hentParter = () => {
        if (props.rolle === 'VEILEDER') {
            return {
                part1: `${props.avtale.bedriftNavn} v/ ${props.avtale.arbeidsgiverFornavn}`,
                part1Status: props.avtale.godkjentAvArbeidsgiver,
                part2: `${props.avtale.deltakerFornavn}`,
                part2Status: props.avtale.godkjentAvDeltaker,
            };
        } else if (props.rolle === 'ARBEIDSGIVER') {
            return {
                part1: `${props.avtale.deltakerFornavn}`,
                part1Status: props.avtale.godkjentAvDeltaker,
                part2: `NAV v/ ${props.avtale.veilederFornavn}`,
                part2Status: props.avtale.godkjentAvVeileder,
            };
        } else if (props.rolle === 'DELTAKER') {
            return {
                part1: `${props.avtale.bedriftNavn} v/ ${props.avtale.arbeidsgiverFornavn}`,
                part1Status: props.avtale.godkjentAvArbeidsgiver,
                part2: `NAV v/ ${props.avtale.veilederFornavn}`,
                part2Status: props.avtale.godkjentAvVeileder,
            };
        } else {
            return {};
        }
    };
    // const hentAvtaleStatusDetaljer

    const parter = hentParter();

    return (
        <Innholdsboks className={cls.element('innholdsboks')}>
            <div className={cls.element('hovedIkon')}>
                {aktuellPerson() ? (
                    <img
                        className={cls.element('hovedIkon__resize')}
                        src={CheckIkon}
                    />
                ) : (
                    <img
                        className={cls.element('hovedIkon__resize')}
                        src={VarselIkon}
                    />
                )}
            </div>
            <Innholdstittel className={cls.element('header')}>
                Du må godkjenne
            </Innholdstittel>
            <Normaltekst className={cls.element('infotekst')}>
                <p>
                    Hele avtalen er nå fylt ut og klar for godkjenning av deg.
                    Les hele avtalen først. Hvis du er uenig i innholdet, eller
                    har spørsmål til avtalen, bør du kontakte din veileder via
                    Aktivitetsplanen før du godkjenner.
                </p>
                <p>
                    Du kan ikke redigere teksten i avtalen på grunn av hensyn
                    til personvern.
                </p>
            </Normaltekst>
            <div className={cls.element('andreParter')}>
                <div>
                    {hentParter().part1}
                    {/* har godkjent */}
                    <span className={cls.element('andreParter__ikon')}>
                        {hentParter().part1Status === true ? (
                            <img src={CheckIkon} />
                        ) : (
                            <img src={VarselIkon} />
                        )}
                    </span>
                </div>

                <div>
                    <span className={cls.element('andreParter__part2')}>
                        {hentParter().part2}
                        <span />
                        <span className={cls.element('andreParter__ikon')}>
                            {hentParter().part2Status === true ? (
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

export default AvtaleStatus;
