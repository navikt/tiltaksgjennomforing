import React from 'react';
import { Context } from '@/AvtaleContext';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { ReactComponent as StillingProsentIkon } from '@/assets/ikoner/stillingsprosent.svg';
import { ReactComponent as ManedsLonnIkon } from '@/assets/ikoner/manedsLonn.svg';
import { ReactComponent as FeriepengerIkon } from '@/assets/ikoner/feriepenger.svg';
import { ReactComponent as ObligTjenestepensjon } from '@/assets/ikoner/obligTjenestepensjon.svg';
import { ReactComponent as GraphRefusjonAvLonn } from '@/assets/ikoner/graphRefusjonAvLønn.svg';
import './VisUtregningenPanel.less';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';

const VisUtregningenPanel = (props: Context) => {
    return (
        <Ekspanderbartpanel border={true} tittel="Vis hele utregningen">
            <div className="visUtregningenPanel__rad">
                <div className="visUtregningenPanel__tittel">
                    <StillingProsentIkon className="visUtregningenPanel__ikon" />
                    Stillingsprosent
                </div>
                <div>{props.avtale.stillingprosent} %</div>
            </div>
            <div className="visUtregningenPanel__rad">
                <div className="visUtregningenPanel__tittel">
                    <ManedsLonnIkon className="visUtregningenPanel__ikon" />
                    Månedslønn
                </div>
                <div>{props.avtale.manedslonn} kr</div>
            </div>
            <div className="visUtregningenPanel__rad">
                <div className="visUtregningenPanel__tittel">
                    <FeriepengerIkon className="visUtregningenPanel__ikon" />
                    <div>Feriepenger</div>
                </div>
                <div>({props.avtale.feriepengesats * 100}%)</div>
                <div className="visUtregningenPanel__tittel">
                    <div className="visUtregningenPanel__orienter">+</div>
                    {props.avtale.manedslonn === undefined || props.avtale.feriepengesats === undefined
                        ? 0
                        : props.avtale.manedslonn * props.avtale.feriepengesats}{' '}
                    kr
                </div>
            </div>
            <div className="visUtregningenPanel__rad">
                <div className="visUtregningenPanel__tittel">
                    <ObligTjenestepensjon className="visUtregningenPanel__ikon" />
                    <div>Obligatorisk tjenestepensjon</div>
                </div>
                <div>(2%)</div>
                <div>+</div>
                <div>{props.avtale.manedslonn === undefined ? 0 : props.avtale.manedslonn * 0.02} kr</div>
            </div>
            <div className="visUtregningenPanel__rad">
                <div className="visUtregningenPanel__tittel">
                    <ObligTjenestepensjon className="visUtregningenPanel__ikon" />
                    <div>Arbeidsgiveravgift</div>
                </div>
                <div>({props.avtale.arbeidsgiveravgift * 100}%)</div>
                <div className="visUtregningenPanel__tittel">
                    <div className="visUtregningenPanel__orienter">+</div>
                    {props.avtale.manedslonn === undefined || props.avtale.arbeidsgiveravgift === undefined
                        ? 0
                        : props.avtale.manedslonn * props.avtale.arbeidsgiveravgift}{' '}
                    kr
                </div>
            </div>

            <div className="visUtregningenPanel__rad">
                <div className="visUtregningenPanel__tittel">
                    <div className="visUtregningenPanel__ikon" />
                    <div>Sum utgifter for arbeidsgiver</div>
                </div>
                <div className="visUtregningenPanel__tittel">
                    <div className="visUtregningenPanel__orienter__sum">=</div>
                    {props.avtale.manedslonn === undefined
                        ? 0
                        : props.avtale.manedslonn +
                          props.avtale.manedslonn * props.avtale.feriepengesats +
                          props.avtale.manedslonn * 0.02 +
                          props.avtale.manedslonn * props.avtale.arbeidsgiveravgift}{' '}
                    kr
                </div>
            </div>
            <div className="visUtregningenPanel__rad visUtregningenPanel__rad__siste">
                <div className="visUtregningenPanel__tittel">
                    <GraphRefusjonAvLonn className="visUtregningenPanel__ikon" />
                    <div>Fastsatt refusjon av lønn</div>
                </div>
                <div>40 %</div>
            </div>
            <div className="visUtregningenPanel__rad visUtregningenPanel__rad__oppsummering">
                <div className="visUtregningenPanel__tittel">
                    <Undertittel> Månedlig lønnstilskudd fra Nav(inntil):</Undertittel>
                </div>
                <div>
                    {props.avtale.manedslonn === undefined || !parseFloat(props.avtale.lonnstilskuddProsent)
                        ? 0
                        : (props.avtale.manedslonn +
                              props.avtale.manedslonn * props.avtale.feriepengesats +
                              props.avtale.manedslonn * 0.02 +
                              props.avtale.manedslonn * props.avtale.arbeidsgiveravgift) *
                          parseFloat(props.avtale.lonnstilskuddProsent)}{' '}
                    kr
                </div>
            </div>
        </Ekspanderbartpanel>
    );
};
export default VisUtregningenPanel;
