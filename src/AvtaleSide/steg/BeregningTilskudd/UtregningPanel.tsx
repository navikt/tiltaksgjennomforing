import { ReactComponent as ArbeidsgiveravgiftIkon } from '@/assets/ikoner/arbeidsgiveravgift.svg';
import { ReactComponent as ErlikTegn } from '@/assets/ikoner/erlikTegn.svg';
import { ReactComponent as FeriepengerIkon } from '@/assets/ikoner/feriepenger.svg';
import { ReactComponent as GraphRefusjonAvLonnIkon } from '@/assets/ikoner/graphRefusjonAvLønn.svg';
import { ReactComponent as ManedslonnIkon } from '@/assets/ikoner/manedsLonn.svg';
import { ReactComponent as ObligTjenestePensjonIkon } from '@/assets/ikoner/obligTjenestepensjon.svg';
import { ReactComponent as PlussTegn } from '@/assets/ikoner/plussTegn.svg';
import { ReactComponent as ProsentTegn } from '@/assets/ikoner/prosentTegn.svg';
import { ReactComponent as StillingsprosentIkon } from '@/assets/ikoner/stillingsprosent.svg';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Beregningsgrunnlag } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { formatterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { formatterPenger } from '@/utils/PengeUtils';
import { Accordion } from '@navikt/ds-react';
import { Element } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import './UtregningPanel.less';
import Utregningsrad from './Utregningsrad';
import { TiltaksType } from '@/types/avtale';

const UtregningPanel: FunctionComponent<Beregningsgrunnlag> = (props) => {
    const cls = BEMHelper('utregningspanel');
    const regnUtRedusertProsent = (tiltakstype: TiltaksType, tilskuddsprosent: number) => {
        /**
         *  TODO: Kalkulering av redusert prosent og redusert dato bør kun skje i backend og ikke her
         */
        if (tiltakstype === 'VARIG_LONNSTILSKUDD') {
            if (tilskuddsprosent >= 68) return 67;
            return tilskuddsprosent;
        }
        return tilskuddsprosent - 10;
    };
    return (
        <Accordion style={{ border: '1px solid #c6c2bf' }}>
            <Accordion.Item defaultOpen>
                <Accordion.Header style={{ backgroundColor: 'white' }}>
                    <Element>Tilskudd for en måned</Element>
                </Accordion.Header>
                <Accordion.Content>
                    <div className={cls.element('wrapper')}>
                        <Utregningsrad
                            labelIkon={<StillingsprosentIkon />}
                            labelTekst="Stillingsprosent"
                            verdiOperator={<ProsentTegn />}
                            verdi={props.stillingprosent || 0}
                            ikkePenger
                        />
                        <Utregningsrad
                            labelIkon={<ManedslonnIkon />}
                            labelTekst="Månedslønn"
                            verdiOperator={<PlussTegn />}
                            verdi={props.manedslonn || 0}
                        />
                        <Utregningsrad
                            labelIkon={<FeriepengerIkon />}
                            labelTekst="Feriepenger"
                            labelSats={props.feriepengesats}
                            verdiOperator={<PlussTegn />}
                            verdi={props.feriepengerBelop || 0}
                        />
                        <Utregningsrad
                            labelIkon={<ObligTjenestePensjonIkon />}
                            labelTekst="Obligatorisk tjenestepensjon"
                            labelSats={props.otpSats}
                            verdiOperator={<PlussTegn />}
                            verdi={props.otpBelop || 0}
                        />
                        <Utregningsrad
                            labelTekst="Arbeidsgiveravgift"
                            labelIkon={<ArbeidsgiveravgiftIkon />}
                            verdiOperator={<PlussTegn />}
                            labelSats={props.arbeidsgiveravgift}
                            verdi={props.arbeidsgiveravgiftBelop || 0}
                        />
                        <Utregningsrad
                            labelTekst="Sum utgifter"
                            verdiOperator={<ErlikTegn />}
                            verdi={props.sumLonnsutgifter || 0}
                            borderTykk={true}
                        />
                        <Utregningsrad
                            labelTekst={props.datoForRedusertProsent ? `Tilskuddsprosent frem til` : 'Tilskuddsprosent'}
                            midtrekkeTekst={
                                props.datoForRedusertProsent
                                    ? formatterDato(props.datoForRedusertProsent, NORSK_DATO_FORMAT)
                                    : null
                            }
                            labelIkon={<GraphRefusjonAvLonnIkon />}
                            ikkePenger
                            verdiOperator={<ProsentTegn />}
                            verdi={props.lonnstilskuddProsent || 0}
                        />
                        <Utregningsrad
                            labelTekst="Sum tilskudd for en måned"
                            tekstType="element"
                            verdi={`Inntil ${formatterPenger(props.sumLonnstilskudd || 0)}`}
                        />
                        {props.datoForRedusertProsent && (
                            <>
                                <Utregningsrad
                                    labelTekst={`Tilskuddsprosent fra og med`}
                                    midtrekkeTekst={formatterDato(props.datoForRedusertProsent, NORSK_DATO_FORMAT)}
                                    labelIkon={<GraphRefusjonAvLonnIkon />}
                                    ikkePenger
                                    verdiOperator={<ProsentTegn />}
                                    verdi={
                                        props.lonnstilskuddProsent
                                            ? regnUtRedusertProsent(props.tiltakstype!, props.lonnstilskuddProsent)
                                            : 0
                                    }
                                />
                                <Utregningsrad
                                    labelTekst="Sum tilskudd for en måned"
                                    tekstType="element"
                                    verdi={`Inntil ${formatterPenger(props.sumLønnstilskuddRedusert || 0)}`}
                                />
                            </>
                        )}
                        <VerticalSpacer rem={1} />
                    </div>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

export default UtregningPanel;
