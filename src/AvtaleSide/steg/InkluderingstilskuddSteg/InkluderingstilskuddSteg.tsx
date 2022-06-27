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
    const avtaleContext = useContext(AvtaleContext);
    const [iRedigermodus, setIRedigermodus] = useState(false);
    const inkluderingsutgiftUtils = useTilskuddsutgift(
        avtaleContext.avtale.gjeldendeInnhold.inkluderingstilskuddsutgift
    );

    const endre = (index: number, beløp: number, type: InkluderingstilskuddsutgiftType) => {
        const nyInkluderingstilskuddutgiftsliste = inkluderingsutgiftUtils.endreInkluderingstilskuddsutgift(
            index,
            beløp,
            type
        );
        avtaleContext.settAvtaleInnholdVerdier(
            { inkluderingstilskuddsutgift: nyInkluderingstilskuddutgiftsliste },
            true
        );
    };
    const slett = (index: number) => {
        const nyInkluderingstilskuddutgiftsliste = inkluderingsutgiftUtils.sletteInkluderingstilskuddsutgift(index);
        avtaleContext.settAvtaleInnholdVerdier(
            { inkluderingstilskuddsutgift: nyInkluderingstilskuddutgiftsliste },
            true
        );
    };
    const nyUtgift = (beløp: number, type: InkluderingstilskuddsutgiftType) => {
        const nyInkluderingstilskuddutgiftsliste = inkluderingsutgiftUtils.leggTilInkluderingstilskuddsutgift(
            beløp,
            type
        );
        avtaleContext.settAvtaleInnholdVerdier(
            { inkluderingstilskuddsutgift: nyInkluderingstilskuddutgiftsliste },
            true
        );
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
                    verdi={avtaleContext.avtale.gjeldendeInnhold.inkluderingstilskuddBegrunnelse}
                    settVerdi={(verdi) =>
                        avtaleContext.settAvtaleInnholdVerdi('inkluderingstilskuddBegrunnelse', verdi)
                    }
                    maxLengde={1000}
                    feilmelding="Beskrivelse av behovet for inkluderingstilskudd er påkrevd"
                />
                <VerticalSpacer rem={2} />
                <div>
                    <Element>Totalt konstadsoverslag:</Element>
                    <Ingress>
                        {formatterPenger(avtaleContext.avtale.gjeldendeInnhold.inkluderingstilskuddTotalBeløp)}
                    </Ingress>
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
                        tilskuddsutgift={avtaleContext.avtale.gjeldendeInnhold.inkluderingstilskuddsutgift}
                        totalBeløp={avtaleContext.avtale.gjeldendeInnhold.inkluderingstilskuddTotalBeløp}
                    />
                </div>
            </Innholdsboks>
            <div>
                {avtaleContext.avtale.gjeldendeInnhold.inkluderingstilskuddsutgift.map((tilskuddsutgift, index) => (
                    <EnTilskuddsutgift
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
                            value={avtaleContext.avtale.gjeldendeInnhold.startDato || undefined}
                            limitations={AvtaleMinMaxDato(true)}
                            onChange={(dato) => avtaleContext.settAvtaleInnholdVerdier({ startDato: dato })}
                        />
                    </Column>
                    <Column md="6">
                        <label className="skjemaelement__label">Forventet sluttdato</label>
                        <Datepicker
                            inputProps={{ placeholder: 'dd.mm.åååå' }}
                            value={avtaleContext.avtale.gjeldendeInnhold.sluttDato || undefined}
                            limitations={AvtaleMinMaxDato(false)}
                            onChange={(dato) => avtaleContext.settAvtaleInnholdVerdier({ sluttDato: dato })}
                        />
                    </Column>
                </Row>
                <VerticalSpacer rem={2} />
                <LagreKnapp lagre={avtaleContext.lagreAvtale} label={'Lagre'} suksessmelding={'Avtale lagret'} />
            </Innholdsboks>
        </>
    );
};

export default InkluderingstilskuddSteg;
