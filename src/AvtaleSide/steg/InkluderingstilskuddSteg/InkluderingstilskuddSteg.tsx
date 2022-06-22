import { AvtaleContext } from '@/AvtaleProvider';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { InkluderingstilskuddsutgiftType } from '@/types/avtale';
import React, { FunctionComponent, useContext, useState } from 'react';
import EnTilskuddsutgift from './EnTilskuddsutgift';
import { useTilskuddsutgift } from './inkluderingstilskuddsUtils';
import OpprettEnTilskuddsutgift from './OpprettEnTilskuddsutgift';

const InkluderingstilskuddSteg: FunctionComponent = () =>  {
    const avtaleContext = useContext(AvtaleContext);
    const [iRedigermodus, setIRedigermodus] = useState(false);
    const inkluderingsutgiftUtils = useTilskuddsutgift(avtaleContext.avtale.gjeldendeInnhold.inkluderingstilskudd)

    const endre = (index: number, beløp: number, type: InkluderingstilskuddsutgiftType) => {
        const nyInkluderingstilskuddutgiftsliste = inkluderingsutgiftUtils.endreInkluderingstilskuddsutgift(index, beløp, type);
        avtaleContext.settAvtaleInnholdVerdier({ inkluderingstilskudd: nyInkluderingstilskuddutgiftsliste }, true);
    };
    const slett = (index: number) => {
        const nyInkluderingstilskuddutgiftsliste = inkluderingsutgiftUtils.sletteInkluderingstilskuddsutgift(index)
        avtaleContext.settAvtaleInnholdVerdier({ inkluderingstilskudd: nyInkluderingstilskuddutgiftsliste }, true);
    };
    const nyUtgift = (beløp: number, type: InkluderingstilskuddsutgiftType) => {
        const nyInkluderingstilskuddutgiftsliste = inkluderingsutgiftUtils.leggTilInkluderingstilskuddsutgift(beløp, type);
        avtaleContext.settAvtaleInnholdVerdier({ inkluderingstilskudd: nyInkluderingstilskuddutgiftsliste }, true);
    };

    return ( 
        <Innholdsboks utfyller="arbeidsgiver">

            <OpprettEnTilskuddsutgift
                leggTilTilskuddsutgift={nyUtgift}
                ledigeInkluderingstilskuddtyper={inkluderingsutgiftUtils.ledigeInkluderingstilskuddstyper}
                setIRedigeringsmodus={setIRedigermodus}
                iRegideringsmodus={iRedigermodus}
                tilskuddsutgift={avtaleContext.avtale.gjeldendeInnhold.inkluderingstilskudd}
            />
                

            {avtaleContext.avtale.gjeldendeInnhold.inkluderingstilskudd.map((tilskuddsutgift, index) => (
                <EnTilskuddsutgift
                    tilskuddsutgift={tilskuddsutgift}
                    endre={(beløp: number, type: InkluderingstilskuddsutgiftType) => endre(index, beløp, type)}
                    slett={() => slett(index)}
                    ledigeInkluderingstilskuddtyper={inkluderingsutgiftUtils.ledigeInkluderingstilskuddstyper}
                    setIRedigeringsmodus={setIRedigermodus}
                    iRegideringsmodus={iRedigermodus}
                    />
            ))}
        </Innholdsboks>
    )
};

export default InkluderingstilskuddSteg;
