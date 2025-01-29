import ArbeidsgiveravgiftIkon from '@/assets/ikoner/arbeidsgiveravgift.svg?react';
import ErlikTegn from '@/assets/ikoner/erlikTegn.svg?react';
import FeriepengerIkon from '@/assets/ikoner/feriepenger.svg?react';
import GraphRefusjonAvLonnIkon from '@/assets/ikoner/graphRefusjonAvLønn.svg?react';
import ManedslonnIkon from '@/assets/ikoner/manedsLonn.svg?react';
import ObligTjenestePensjonIkon from '@/assets/ikoner/obligTjenestepensjon.svg?react';
import PlussTegn from '@/assets/ikoner/plussTegn.svg?react';
import ProsentTegn from '@/assets/ikoner/prosentTegn.svg?react';
import StillingsprosentIkon from '@/assets/ikoner/stillingsprosent.svg?react';
import { AvtaleContext } from '@/AvtaleProvider';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Beregningsgrunnlag } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { formaterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { formaterPenger } from '@/utils/PengeUtils';
import { Accordion, Label } from '@navikt/ds-react';
import { FunctionComponent, useContext } from 'react';
import './UtregningPanel.less';
import Utregningsrad from './Utregningsrad';
import { formaterNorskeTall } from '@/utils';

const UtregningPanel: FunctionComponent<Beregningsgrunnlag> = (props) => {
    const cls = BEMHelper('utregningspanel');
    const avtaleContext = useContext(AvtaleContext);

    const regnUtRedusertProsent = (tilskuddsprosent: number) => {
        /**
         *  TODO: Kalkulering av redusert prosent og redusert dato bør kun skje i backend og ikke her
         */
        if (avtaleContext.avtale.tiltakstype === 'VARIG_LONNSTILSKUDD') {
            if (tilskuddsprosent >= 68) return 67;
            return tilskuddsprosent;
        }
        return tilskuddsprosent - 10;
    };

    return (
        <Accordion className="accordion">
            <Accordion.Item defaultOpen>
                <Accordion.Header>
                    <Label>Tilskudd for en måned</Label>
                </Accordion.Header>
                <Accordion.Content>
                    <div className={cls.element('wrapper')}>
                        <Utregningsrad
                            labelIkon={<StillingsprosentIkon />}
                            labelTekst="Stillingsprosent"
                            verdiOperator={<ProsentTegn />}
                            verdi={formaterNorskeTall(props.stillingprosent) || 0}
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
                                    ? formaterDato(props.datoForRedusertProsent, NORSK_DATO_FORMAT)
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
                            verdi={`Inntil ${formaterPenger(props.sumLonnstilskudd || 0)}`}
                        />
                        {props.datoForRedusertProsent && (
                            <>
                                <Utregningsrad
                                    labelTekst={`Tilskuddsprosent fra og med`}
                                    midtrekkeTekst={formaterDato(props.datoForRedusertProsent, NORSK_DATO_FORMAT)}
                                    labelIkon={<GraphRefusjonAvLonnIkon />}
                                    ikkePenger
                                    verdiOperator={<ProsentTegn />}
                                    verdi={
                                        props.lonnstilskuddProsent
                                            ? regnUtRedusertProsent(props.lonnstilskuddProsent)
                                            : 0
                                    }
                                />
                                <Utregningsrad
                                    labelTekst="Sum tilskudd for en måned"
                                    tekstType="element"
                                    verdi={`Inntil ${formaterPenger(props.sumLønnstilskuddRedusert || 0)}`}
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
