import { ReactComponent as ArbeidsgiveravgiftIkon } from '@/assets/ikoner/arbeidsgiveravgift.svg';
import { ReactComponent as ErlikTegn } from '@/assets/ikoner/erlikTegn.svg';
import { ReactComponent as FeriepengerIkon } from '@/assets/ikoner/feriepenger.svg';
import { ReactComponent as GraphRefusjonAvLonnIkon } from '@/assets/ikoner/graphRefusjonAvLønn.svg';
import { ReactComponent as ManedslonnIkon } from '@/assets/ikoner/manedsLonn.svg';
import { ReactComponent as ObligTjenestePensjonIkon } from '@/assets/ikoner/obligTjenestepensjon.svg';
import { ReactComponent as PlussTegn } from '@/assets/ikoner/plussTegn.svg';
import { ReactComponent as ProsentTegn } from '@/assets/ikoner/prosentTegn.svg';
import StillingsprosentIkon from '@/assets/ikoner/StillingsprosentIkon';
//import { ReactComponent as StillingsprosentIkon } from '@/assets/ikoner/stillingsprosent.svg';

import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Beregningsgrunnlag } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { formatterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { formatterPenger } from '@/utils/PengeUtils';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Element } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import './UtregningPanel.less';
import Utregningsrad from './Utregningsrad';

const UtregningPanel: FunctionComponent<Beregningsgrunnlag> = props => {
    const cls = BEMHelper('utregningspanel');
    return (
        <Ekspanderbartpanel tittel={<Element>Tilskudd for en måned</Element>} apen>
            <div className={cls.element('wrapper')}>
                <Utregningsrad
                    labelIkon={<StillingsprosentIkon />}
                    //labelIkon={<StillingsprosentIkon role="presentation" focusable="false" />}
                    labelTekst="Stillingsprosent"
                    //verdiOperator={<PlussTegn/>}
                    verdiOperator={<ProsentTegn role="presentation" focusable="false" />}
                    verdi={props.stillingprosent || 0}
                    ikkePenger
                />
                <Utregningsrad
                    labelIkon={<ManedslonnIkon />}
                    labelTekst="Månedslønn"
                    verdiOperator={<PlussTegn role="presentation" focusable="false" />}
                    verdi={props.manedslonn || 0}
                />
                <Utregningsrad
                    labelIkon={<FeriepengerIkon role="presentation" focusable="false" />}
                    labelTekst="Feriepenger"
                    labelSats={props.feriepengesats}
                    verdiOperator={<PlussTegn role="presentation" focusable="false" />}
                    verdi={props.feriepengerBelop || 0}
                />
                <Utregningsrad
                    labelIkon={<ObligTjenestePensjonIkon role="presentation" focusable="false" />}
                    labelTekst="Obligatorisk tjenestepensjon"
                    labelSats={props.otpSats}
                    verdiOperator={<PlussTegn role="presentation" focusable="false" />}
                    verdi={props.otpBelop || 0}
                />
                <Utregningsrad
                    labelTekst="Arbeidsgiveravgift"
                    labelIkon={<ArbeidsgiveravgiftIkon role="presentation" focusable="false" />}
                    verdiOperator={<PlussTegn role="presentation" focusable="false" />}
                    labelSats={props.arbeidsgiveravgift}
                    verdi={props.arbeidsgiveravgiftBelop || 0}
                />
                <Utregningsrad
                    labelTekst="Sum utgifter"
                    verdiOperator={<ErlikTegn role="presentation" focusable="false" />}
                    verdi={props.sumLonnsutgifter || 0}
                    borderTykk={true}
                />
                <Utregningsrad
                    labelTekst={props.datoForRedusertProsent ? `Fastsatt refusjon frem til` : 'Fastsatt refusjon'}
                    midtrekkeTekst={
                        props.datoForRedusertProsent
                            ? formatterDato(props.datoForRedusertProsent, NORSK_DATO_FORMAT)
                            : null
                    }
                    labelIkon={<GraphRefusjonAvLonnIkon role="presentation" focusable="false" />}
                    ikkePenger
                    verdiOperator={<ProsentTegn role="presentation" focusable="false" />}
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
                            labelTekst={`Fastsatt refusjon fra og med`}
                            midtrekkeTekst={formatterDato(props.datoForRedusertProsent, NORSK_DATO_FORMAT)}
                            labelIkon={<GraphRefusjonAvLonnIkon role="presentation" focusable="false" />}
                            ikkePenger
                            verdiOperator={<ProsentTegn role="presentation" focusable="false" />}
                            verdi={props.lonnstilskuddProsent ? props.lonnstilskuddProsent - 10 : 0}
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
        </Ekspanderbartpanel>
    );
};

export default UtregningPanel;
