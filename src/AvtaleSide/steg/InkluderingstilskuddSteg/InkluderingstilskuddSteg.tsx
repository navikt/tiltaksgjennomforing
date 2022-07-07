import { AvtaleContext } from '@/AvtaleProvider';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { InkluderingstilskuddsutgiftType } from '@/types/avtale';
import { formatterPenger } from '@/utils/PengeUtils';
import { Datepicker } from 'nav-datovelger';
import { Column, Row } from 'nav-frontend-grid';
import { Element, Ingress, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext, useState } from 'react';
import { AvtaleMinMaxDato } from '../VarighetSteg/AvtaleMinMaxDato/AvtaleMinMaxDato';
import EnTilskuddsutgift from './EnTilskuddsutgift';
import InkluderingstilskuddIngress from './InkluderingstilskuddIngress';
import { useTilskuddsutgift } from './inkluderingstilskuddsUtils';
import OpprettEnTilskuddsutgift from './OpprettEnTilskuddsutgift';
import Tilskuddsbeskrivelse from './Tilskuddsbeskrivelse';
import TilskuddsutgiftTabell from './TilskuddsutgiftTabell';

const InkluderingstilskuddSteg: FunctionComponent = () => {
    const { avtale, settAvtaleInnholdVerdier, settAvtaleInnholdVerdi, lagreAvtale } = useContext(AvtaleContext);
    const [iRedigermodus, setIRedigermodus] = useState(false);
    const inkluderingsutgiftUtils = useTilskuddsutgift(avtale.gjeldendeInnhold.inkluderingstilskuddsutgift);

    const endre = (index: number, beløp: number, type: InkluderingstilskuddsutgiftType) => {
        const nyInkluderingstilskuddutgiftsliste = inkluderingsutgiftUtils.endreInkluderingstilskuddsutgift(
            index,
            beløp,
            type
        );
        settAvtaleInnholdVerdier({ inkluderingstilskuddsutgift: nyInkluderingstilskuddutgiftsliste }, true);
    };
    const slett = (index: number) => {
        const nyInkluderingstilskuddutgiftsliste = inkluderingsutgiftUtils.sletteInkluderingstilskuddsutgift(index);
        settAvtaleInnholdVerdier({ inkluderingstilskuddsutgift: nyInkluderingstilskuddutgiftsliste }, true);
    };
    const nyUtgift = (beløp: number, type: InkluderingstilskuddsutgiftType) => {
        const nyInkluderingstilskuddutgiftsliste = inkluderingsutgiftUtils.leggTilInkluderingstilskuddsutgift(
            beløp,
            type
        );
        settAvtaleInnholdVerdier({ inkluderingstilskuddsutgift: nyInkluderingstilskuddutgiftsliste }, true);
    };

    return (
        <>
            <Innholdsboks utfyller="arbeidsgiver">
                <Systemtittel>Inkluderingstilskudd</Systemtittel>
                <VerticalSpacer rem={1} />
                <InkluderingstilskuddIngress />
                <VerticalSpacer rem={2} />
                <Ingress>Oppstart og varighet</Ingress>
                <VerticalSpacer rem={1} />
                <Normaltekst>I hvilken periode skal tilskuddet benyttes?</Normaltekst>
                <VerticalSpacer rem={1} />
                <Row className="">
                    <Column md="6">
                        <label className="skjemaelement__label">Startdato</label>
                        <Datepicker
                            inputProps={{ placeholder: 'dd.mm.åååå' }}
                            value={avtale.gjeldendeInnhold.startDato || undefined}
                            limitations={AvtaleMinMaxDato(true)}
                            onChange={(dato) => settAvtaleInnholdVerdier({ startDato: dato })}
                        />
                    </Column>
                    <Column md="6">
                        <label className="skjemaelement__label">Forventet sluttdato</label>
                        <Datepicker
                            inputProps={{ placeholder: 'dd.mm.åååå' }}
                            value={avtale.gjeldendeInnhold.sluttDato || undefined}
                            limitations={AvtaleMinMaxDato(false)}
                            onChange={(dato) => settAvtaleInnholdVerdier({ sluttDato: dato })}
                        />
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

                <Element>Totalt kostnadsoverslag:</Element>
                <Ingress>{formatterPenger(avtale.gjeldendeInnhold.inkluderingstilskuddTotalBeløp)}</Ingress>

                <VerticalSpacer rem={2} />

                <OpprettEnTilskuddsutgift
                    leggTilTilskuddsutgift={nyUtgift}
                    ledigeInkluderingstilskuddtyper={inkluderingsutgiftUtils.ledigeInkluderingstilskuddstyper}
                    setIRedigeringsmodus={setIRedigermodus}
                    iRegideringsmodus={iRedigermodus}
                    tilskuddsutgift={avtale.gjeldendeInnhold.inkluderingstilskuddsutgift}
                    totalBeløp={avtale.gjeldendeInnhold.inkluderingstilskuddTotalBeløp}
                />

                <VerticalSpacer rem={2} />

                <TilskuddsutgiftTabell>
                    {avtale.gjeldendeInnhold.inkluderingstilskuddsutgift.map((tilskuddsutgift, index) => (
                        <EnTilskuddsutgift
                            skalKunneSlette={true}
                            key={index}
                            tilskuddsutgift={tilskuddsutgift}
                            endre={(beløp: number, type: InkluderingstilskuddsutgiftType) => endre(index, beløp, type)}
                            slett={() => slett(index)}
                            ledigeInkluderingstilskuddtyper={inkluderingsutgiftUtils.ledigeInkluderingstilskuddstyper}
                            setIRedigeringsmodus={setIRedigermodus}
                            iRegideringsmodus={iRedigermodus}
                        />
                    ))}
                </TilskuddsutgiftTabell>
                <VerticalSpacer rem={2} />
                <LagreKnapp lagre={lagreAvtale} label={'Lagre'} suksessmelding={'Avtale lagret'} />
            </Innholdsboks>
        </>
    );
};

export default InkluderingstilskuddSteg;
