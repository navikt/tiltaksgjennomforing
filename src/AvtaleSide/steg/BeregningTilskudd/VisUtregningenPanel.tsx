import React from 'react';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Context, medContext } from '@/AvtaleContext';
import RadioPanelGruppeHorisontal from '@/komponenter/form/RadioPanelGruppeHorisontal';
import { Column, Container, Row } from 'nav-frontend-grid';
import ValutaInput from '@/komponenter/form/ValutaInput';
import ProsentInput from '@/komponenter/form/ProsentInput';
import SelectInput from '@/komponenter/form/SelectInput';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import KontonummerInput from '@/komponenter/form/KontonummerInput';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { ReactComponent as StillingProsentIkon } from '@/assets/ikoner/stillingsprosent.svg';
import { ReactComponent as ManedsLonnIkon } from '@/assets/ikoner/manedsLonn.svg';
import './BeregningTilskuddSteg.less';

const VisUtregningenPanel = (props: Context) => {
    return (
        <Ekspanderbartpanel border={true} tittel="Vis hele utregningen">
            <div className="beregningTilskuddSteg__rad">
                <div className="beregningTilskuddSteg__tittel">
                    <StillingProsentIkon className="beregningTilskuddSteg__ikon" />
                    Stillingsprosent
                </div>
                <div>{props.avtale.stillingprosent} % </div>
            </div>
            <div className="beregningTilskuddSteg__rad">
                <div className="beregningTilskuddSteg__tittel">
                    <ManedsLonnIkon className="beregningTilskuddSteg__ikon" />
                    Månedslønn
                </div>
                <div>{props.avtale.manedslonn} kr </div>
            </div>
            <div className="beregningTilskuddSteg__rad">
                <div className="beregningTilskuddSteg__tittel">
                    <StillingProsentIkon className="beregningTilskuddSteg__ikon" />
                    Stilling prosent
                </div>
                <div>{props.avtale.stillingprosent} % </div>
            </div>
            <div className="beregningTilskuddSteg__rad">
                <div className="beregningTilskuddSteg__tittel">
                    <StillingProsentIkon className="beregningTilskuddSteg__ikon" />
                    Stilling prosent
                </div>
                <div>{props.avtale.stillingprosent} % </div>
            </div>
            <div className="beregningTilskuddSteg__rad">
                <div className="beregningTilskuddSteg__tittel">
                    <StillingProsentIkon className="beregningTilskuddSteg__ikon" />
                    Stilling prosent
                </div>
                <div>{props.avtale.stillingprosent} % </div>
            </div>
            <div className="beregningTilskuddSteg__rad">
                <div className="beregningTilskuddSteg__tittel">
                    <StillingProsentIkon className="beregningTilskuddSteg__ikon" />
                    Stilling prosent
                </div>
                <div>{props.avtale.stillingprosent} % </div>
            </div>
            <div className="beregningTilskuddSteg__rad">
                <div className="beregningTilskuddSteg__tittel">
                    <StillingProsentIkon className="beregningTilskuddSteg__ikon" />
                    Stilling prosent
                </div>
                <div>{props.avtale.stillingprosent} % </div>
            </div>
        </Ekspanderbartpanel>
    );
};
export default VisUtregningenPanel;
