import { AvtaleContext } from '@/AvtaleProvider';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { Inkluderingstilskuddsutgift, InkluderingstilskuddsutgiftType } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { formaterPenger } from '@/utils';
import { BodyShort, Heading, HGrid, Ingress } from '@navikt/ds-react';
import React, { FunctionComponent, useContext, useState } from 'react';
import InkluderingstilskuddIngress from './InkluderingstilskuddIngress';
import './inkluderingstilskuddSteg.less';
import {
    alleInkluderingstilskuddstyper,
    leggTilUtgift,
    slettUtgift,
    summerUtgifter,
} from './inkluderingstilskuddsUtils';
import OpprettEnTilskuddsutgift from './OpprettEnTilskuddsutgift';
import Tilskuddsbeskrivelse from './Tilskuddsbeskrivelse';
import TilskuddsutgiftTabell from './TilskuddsutgiftTabell';
import Datovelger from '@/komponenter/datovelger/Datovelger';
import VisueltDisabledInputFelt from '@/komponenter/VisueltDisabledInputFelt/VisueltDisabledInputFelt';
import AvtaleStatus from '@/AvtaleSide/AvtaleStatus/AvtaleStatus';

const InkluderingstilskuddSteg: FunctionComponent = () => {
    const cls = BEMHelper('inkluderingstilskudd');
    const { avtale, settAvtaleInnholdVerdier, settAvtaleInnholdVerdi, lagreAvtale } = useContext(AvtaleContext);
    const [iRedigermodus, setIRedigermodus] = useState(false);

    const utgifter = avtale.gjeldendeInnhold.inkluderingstilskuddsutgift;
    const totalBeløp = summerUtgifter(avtale.gjeldendeInnhold.inkluderingstilskuddsutgift);

    const slett = (utgift: Inkluderingstilskuddsutgift) => {
        settAvtaleInnholdVerdier({ inkluderingstilskuddsutgift: slettUtgift(utgifter, utgift) }, true);
    };

    const nyUtgift = (beløp: number, type: InkluderingstilskuddsutgiftType) =>
        settAvtaleInnholdVerdier({ inkluderingstilskuddsutgift: leggTilUtgift(utgifter, beløp, type) }, true);

    return (
        <>
            <AvtaleStatus />
            <Innholdsboks>
                <Heading level="2" size="medium">
                    Inkluderingstilskudd
                </Heading>
                <VerticalSpacer rem={1} />
                <InkluderingstilskuddIngress />
                <VerticalSpacer rem={2} />
                <Ingress>Oppstart og varighet</Ingress>
                <VerticalSpacer rem={1} />
                <BodyShort size="small">I hvilken periode skal tilskuddet benyttes?</BodyShort>
                <VerticalSpacer rem={1} />
                <HGrid columns={{ xs: 1, md: 2 }} gap="space-16">
                    <Datovelger datoFelt="startDato" label="Startdato" />
                    <Datovelger datoFelt="sluttDato" label="Forventet sluttdato" />
                </HGrid>

                <VerticalSpacer rem={2} />

                <PakrevdTextarea
                    label="Hvorfor er det behov for inkluderingstilskudd?"
                    verdi={avtale.gjeldendeInnhold.inkluderingstilskuddBegrunnelse}
                    settVerdi={(verdi) => settAvtaleInnholdVerdi('inkluderingstilskuddBegrunnelse', verdi)}
                    maxLengde={1000}
                    feilmelding="Beskrivelse av behovet for inkluderingstilskudd er påkrevd"
                />

                <VerticalSpacer rem={2} />
                <Tilskuddsbeskrivelse åpen={true} />
                <VerticalSpacer rem={2} />

                <VerticalSpacer rem={2} />

                <OpprettEnTilskuddsutgift
                    leggTilTilskuddsutgift={nyUtgift}
                    ledigeInkluderingstilskuddtyper={alleInkluderingstilskuddstyper}
                    setIRedigeringsmodus={setIRedigermodus}
                    iRegideringsmodus={iRedigermodus}
                    tilskuddsutgift={utgifter}
                    totalBeløp={totalBeløp}
                    inkluderingstilskuddSats={avtale.gjeldendeInnhold.inkluderingstilskuddSats}
                />

                <VerticalSpacer rem={2} />

                <TilskuddsutgiftTabell utgifter={utgifter} redigerbar={true} skalKunneSlette={true} slett={slett} />
                <div className={cls.element('kostnadsoverslag-container')}>
                    <VisueltDisabledInputFelt
                        label="Totalt kostnadsoverslag"
                        tekst={formaterPenger(avtale.gjeldendeInnhold.inkluderingstilskuddTotalBeløp)}
                    />
                </div>
                <VerticalSpacer rem={2} />
                <LagreKnapp lagre={lagreAvtale} suksessmelding={'Avtale lagret'}>
                    Lagre
                </LagreKnapp>
            </Innholdsboks>
        </>
    );
};

export default InkluderingstilskuddSteg;
