import { ReactComponent as KalkulatorIkon } from '@/assets/ikoner/kalkulator.svg';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { InkluderingsInnhold } from '@/types/avtale';
import { formatterPenger } from '@/utils/PengeUtils';
import EtikettFokus from 'nav-frontend-etiketter/lib/etikettfokus';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { inkluderingstilskuddtypeTekst } from '../../../../../messages';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';

const InkluderingstilskuddOppsummering: FunctionComponent<InkluderingsInnhold> = (props) => {
    const utgifter = props.inkluderingstilskuddsutgift.map((utgift) => (
        <div style={{borderLeft: '3px solid #e0dae7', paddingLeft: '0.25rem'}}>
            <VerticalSpacer rem={0.25} />
            <Element>{inkluderingstilskuddtypeTekst[utgift.type]}</Element>
            <Normaltekst>Kostnadsoverslag: {formatterPenger(utgift.beløp)}</Normaltekst>
        </div>
    ));

    return (
        <Stegoppsummering tittel="Inkluderingstilskudd" ikon={<KalkulatorIkon height={40} />}>
            <Element>Hvorfor er det behov for inkluderingstilskudd?</Element>
            <SjekkOmVerdiEksisterer verdi={props.inkluderingstilskuddBegrunnelse} />
            <VerticalSpacer rem={1} />
            <Element>Utgifter</Element>
            {utgifter.length > 0 ? utgifter : <EtikettFokus>Ikke fylt ut</EtikettFokus>}
            {/* {props.inkluderingstilskuddsutgift.map((utgift) => (
            <>
                <Element>{inkluderingstilskuddtypeTekst[utgift.type]}</Element>
                <Normaltekst>Kostnadsoverslag: {formatterPenger(utgift.beløp)}</Normaltekst>
            </>
        ))} */}
        </Stegoppsummering>
    );};

export default InkluderingstilskuddOppsummering;
