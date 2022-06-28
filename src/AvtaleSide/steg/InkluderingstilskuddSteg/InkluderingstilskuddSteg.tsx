import { AvtaleContext } from '@/AvtaleProvider';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { InkluderingstilskuddsutgiftType } from '@/types/avtale';
import { formatterPenger } from '@/utils/PengeUtils';
import { Datepicker } from 'nav-datovelger';
import { Column, Row } from 'nav-frontend-grid';
import Lenke from 'nav-frontend-lenker';
import { Element, Ingress, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext, useState } from 'react';
import { AvtaleMinMaxDato } from '../VarighetSteg/AvtaleMinMaxDato/AvtaleMinMaxDato';
import EnTilskuddsutgift from './EnTilskuddsutgift';
import { useTilskuddsutgift } from './inkluderingstilskuddsUtils';
import OpprettEnTilskuddsutgift from './OpprettEnTilskuddsutgift';

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
                <Undertittel>Inkluderingstilskudd</Undertittel>
                <VerticalSpacer rem={1} />
                <Normaltekst>
                    Inkluderingstilskudd kan ikke gis hvis utgiftene allerede dekkes gjennom deltakelse i et annet
                    arbeidsmarkedstiltak. Du må sende søknad til NAV før det planlagte innkjøpet blir gjennomført. NAV
                    utbetaler tilskuddet etterskuddsvis.
                </Normaltekst>
                <VerticalSpacer rem={2} />
                <PakrevdTextarea
                    label="Hvorfor er det behov for inkluderingstilskudd?"
                    verdi={avtale.gjeldendeInnhold.inkluderingstilskuddBegrunnelse}
                    settVerdi={(verdi) => settAvtaleInnholdVerdi('inkluderingstilskuddBegrunnelse', verdi)}
                    maxLengde={1000}
                    feilmelding="Beskrivelse av behovet for inkluderingstilskudd er påkrevd"
                />
                <VerticalSpacer rem={2} />
                <div>
                    <Element>Totalt konstadsoverslag:</Element>
                    <Ingress>{formatterPenger(avtale.gjeldendeInnhold.inkluderingstilskuddTotalBeløp)}</Ingress>
                    <VerticalSpacer rem={1} />
                    <Normaltekst>
                        Det er et{' '}
                        <Lenke href="https://www.nav.no/inkluderingstilskudd#hvor-mye" target="_blank">
                            {' '}
                            årlig maksimalbeløp
                        </Lenke>{' '}
                        på inkluderingstilskudd på 136 700 (gjelder fra 1. januar 2022).
                    </Normaltekst>
                </div>
                <VerticalSpacer rem={2} />
                <div>
                    <OpprettEnTilskuddsutgift
                        leggTilTilskuddsutgift={nyUtgift}
                        ledigeInkluderingstilskuddtyper={inkluderingsutgiftUtils.ledigeInkluderingstilskuddstyper}
                        setIRedigeringsmodus={setIRedigermodus}
                        iRegideringsmodus={iRedigermodus}
                        tilskuddsutgift={avtale.gjeldendeInnhold.inkluderingstilskuddsutgift}
                        totalBeløp={avtale.gjeldendeInnhold.inkluderingstilskuddTotalBeløp}
                    />
                </div>
            </Innholdsboks>
            <div>
                {avtale.gjeldendeInnhold.inkluderingstilskuddsutgift.map((tilskuddsutgift, index) => (
                    <EnTilskuddsutgift
                        key={index}
                        tilskuddsutgift={tilskuddsutgift}
                        endre={(beløp: number, type: InkluderingstilskuddsutgiftType) => endre(index, beløp, type)}
                        slett={() => slett(index)}
                        ledigeInkluderingstilskuddtyper={inkluderingsutgiftUtils.ledigeInkluderingstilskuddstyper}
                        setIRedigeringsmodus={setIRedigermodus}
                        iRegideringsmodus={iRedigermodus}
                    />
                ))}
            </div>
            <VerticalSpacer rem={0.5} />
            <Innholdsboks>
                <VerticalSpacer rem={1} />
                <Row className="">
                    <Column md="6">
                        <label className="skjemaelement__label">Startdato</label>
                        <Datepicker
                            inputProps={{ placeholder: 'dd.mm.åååå' }}
                            value={avtale.gjeldendeInnhold.startDato || undefined}
                            limitations={AvtaleMinMaxDato()}
                            onChange={(dato) => settAvtaleInnholdVerdier({ startDato: dato })}
                        />
                    </Column>
                    <Column md="6">
                        <label className="skjemaelement__label">Forventet sluttdato</label>
                        <Datepicker
                            inputProps={{ placeholder: 'dd.mm.åååå' }}
                            value={avtale.gjeldendeInnhold.sluttDato || undefined}
                            limitations={AvtaleMinMaxDato()}
                            onChange={(dato) => settAvtaleInnholdVerdier({ sluttDato: dato })}
                        />
                    </Column>
                </Row>
                <VerticalSpacer rem={2} />
                <LagreKnapp lagre={lagreAvtale} label={'Lagre'} suksessmelding={'Avtale lagret'} />
            </Innholdsboks>
        </>
    );
};

export default InkluderingstilskuddSteg;
