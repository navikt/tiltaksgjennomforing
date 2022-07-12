import { ReactComponent as KalkulatorIkon } from '@/assets/ikoner/kalkulator.svg';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { InkluderingsInnhold, Inkluderingstilskuddsutgift, InkluderingstilskuddsutgiftType } from '@/types/avtale';
import { formatterPenger } from '@/utils/PengeUtils';
import EtikettFokus from 'nav-frontend-etiketter/lib/etikettfokus';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext, useState } from 'react';
import { inkluderingstilskuddtypeTekst } from '../../../../../messages';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import TilskuddsutgiftTabell from '@/AvtaleSide/steg/InkluderingstilskuddSteg/TilskuddsutgiftTabell';
import EnTilskuddsutgift from '@/AvtaleSide/steg/InkluderingstilskuddSteg/EnTilskuddsutgift';
import { AvtaleContext } from '@/AvtaleProvider';
import { useTilskuddsutgift } from '@/AvtaleSide/steg/InkluderingstilskuddSteg/inkluderingstilskuddsUtils';
import { Input } from 'nav-frontend-skjema';
import '@/AvtaleSide/steg/InkluderingstilskuddSteg/inkluderingstilskuddSteg.less';
import BEMHelper from '@/utils/bem';

const InkluderingstilskuddOppsummering: FunctionComponent<InkluderingsInnhold> = (props) => {
    const cls = BEMHelper('inkluderingstilskudd');
    const { avtale } = useContext(AvtaleContext);
    const [iRedigermodus, setIRedigermodus] = useState(false);
    const {
        inkluderingstilskuddsutgiftListe,
        ledigeInkluderingstilskuddstyperInngåttAvtale,
        endreInkluderingstilskuddsutgift,
        sletteInkluderingstilskuddsutgift,
    } = useTilskuddsutgift(
        avtale.gjeldendeInnhold.inkluderingstilskuddsutgift,
        avtale.gjeldendeInnhold.inkluderingstilskuddTotalBeløp
    );

    const utgifter = props.inkluderingstilskuddsutgift.map((utgift: Inkluderingstilskuddsutgift, index: number) => (
        <div style={{ borderLeft: '3px solid #e0dae7', paddingLeft: '0.25rem' }} key={index}>
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
            <VerticalSpacer rem={2} />
            {utgifter.length > 0 ? (
                <div>
                    <TilskuddsutgiftTabell>
                        {inkluderingstilskuddsutgiftListe.map((tilskuddsutgift, index) => (
                            <EnTilskuddsutgift
                                skalKunneSlette={false}
                                key={index}
                                tilskuddsutgift={tilskuddsutgift}
                                endre={(beløp: number, type: InkluderingstilskuddsutgiftType) =>
                                    endreInkluderingstilskuddsutgift(index, beløp, type)
                                }
                                slett={() => sletteInkluderingstilskuddsutgift(index)}
                                ledigeInkluderingstilskuddtyper={ledigeInkluderingstilskuddstyperInngåttAvtale}
                                setIRedigeringsmodus={setIRedigermodus}
                                iRegideringsmodus={iRedigermodus}
                            />
                        ))}
                    </TilskuddsutgiftTabell>
                    <div className={cls.element('kostnadsoverslag-container')}>
                        <div>
                            <Element>Totalt kostnadsoverslag</Element>
                            <Input
                                className={cls.element('kostnadsoverslag')}
                                value={formatterPenger(avtale.gjeldendeInnhold.inkluderingstilskuddTotalBeløp)}
                                disabled={true}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <EtikettFokus>Ikke fylt ut</EtikettFokus>
            )}
        </Stegoppsummering>
    );
};

export default InkluderingstilskuddOppsummering;
