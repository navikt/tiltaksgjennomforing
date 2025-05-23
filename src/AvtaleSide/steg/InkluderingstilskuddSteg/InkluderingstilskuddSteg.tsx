import { AvtaleContext } from '@/AvtaleProvider';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { InkluderingstilskuddsutgiftType } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { formaterPenger } from '@/utils/PengeUtils';
import { Column, Row } from '@/komponenter/NavGrid/Grid';
import { BodyShort, Heading, Ingress } from '@navikt/ds-react';
import React, { FunctionComponent, useContext, useState } from 'react';
import EnTilskuddsutgift from './EnTilskuddsutgift';
import InkluderingstilskuddIngress from './InkluderingstilskuddIngress';
import './inkluderingstilskuddSteg.less';
import { useTilskuddsutgift } from './inkluderingstilskuddsUtils';
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
    const {
        ledigeInkluderingstilskuddstyper,
        leggTilInkluderingstilskuddsutgift,
        endreInkluderingstilskuddsutgift,
        sletteInkluderingstilskuddsutgift,
    } = useTilskuddsutgift(
        avtale.gjeldendeInnhold.inkluderingstilskuddsutgift,
        avtale.gjeldendeInnhold.inkluderingstilskuddTotalBeløp,
    );

    const endre = (index: number, beløp: number, type: InkluderingstilskuddsutgiftType) =>
        settAvtaleInnholdVerdier(
            { inkluderingstilskuddsutgift: endreInkluderingstilskuddsutgift(index, beløp, type) },
            true,
        );

    const slett = (index: number) =>
        settAvtaleInnholdVerdier({ inkluderingstilskuddsutgift: sletteInkluderingstilskuddsutgift(index) }, true);

    const nyUtgift = (beløp: number, type: InkluderingstilskuddsutgiftType) =>
        settAvtaleInnholdVerdier(
            { inkluderingstilskuddsutgift: leggTilInkluderingstilskuddsutgift(beløp, type) },
            true,
        );

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
                <Row className="">
                    <Column md="6">
                        <Datovelger datoFelt="startDato" label="StartDato" />
                    </Column>
                    <Column md="6">
                        <Datovelger datoFelt="sluttDato" label="Forventet sluttdato" />
                    </Column>
                </Row>

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
                    ledigeInkluderingstilskuddtyper={ledigeInkluderingstilskuddstyper}
                    setIRedigeringsmodus={setIRedigermodus}
                    iRegideringsmodus={iRedigermodus}
                    tilskuddsutgift={avtale.gjeldendeInnhold.inkluderingstilskuddsutgift}
                    totalBeløp={avtale.gjeldendeInnhold.inkluderingstilskuddTotalBeløp}
                    inkluderingstilskuddSats={avtale.gjeldendeInnhold.inkluderingstilskuddSats}
                />

                <VerticalSpacer rem={2} />

                <TilskuddsutgiftTabell redigerbar={true}>
                    {avtale.gjeldendeInnhold.inkluderingstilskuddsutgift.map((tilskuddsutgift, index) => (
                        <EnTilskuddsutgift
                            skalKunneSlette={true}
                            key={index}
                            tilskuddsutgift={tilskuddsutgift}
                            endre={(beløp: number, type: InkluderingstilskuddsutgiftType) => endre(index, beløp, type)}
                            slett={() => slett(index)}
                            ledigeInkluderingstilskuddtyper={ledigeInkluderingstilskuddstyper}
                            setIRedigeringsmodus={setIRedigermodus}
                            iRegideringsmodus={iRedigermodus}
                        />
                    ))}
                </TilskuddsutgiftTabell>
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
