import { AvtaleContext } from '@/AvtaleProvider';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { InkluderingstilskuddsutgiftType } from '@/types/avtale';
import { formatterPenger } from '@/utils/PengeUtils';
import { Datepicker } from 'nav-datovelger';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Column, Row } from 'nav-frontend-grid';
import Lenke from 'nav-frontend-lenker';
import { Element, Ingress, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
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
                <Systemtittel>Inkluderingstilskudd</Systemtittel>
                <VerticalSpacer rem={1} />
                <Normaltekst>
                    Tilskuddet skal dekke tilleggskostnader som arbeidsgiveren har i forbindelse med tilrettelegging.
                    Det dekker dokumenterte utgifter opp til en
                    <Lenke href="https://www.nav.no/inkluderingstilskudd#hvor-mye" target="_blank">
                        {' '}
                        maksimal sats.
                    </Lenke>{' '}
                </Normaltekst>
                <VerticalSpacer rem={1} />
                <Normaltekst>
                    Utgifter som virksomheten normalt vil ha ved ansettelser, dekkes ikke av ordningen.
                    Inkluderingstilskudd gis heller ikke når de samme utgiftene dekkes på andre måter. Du må sende
                    søknad til NAV før det planlagte innkjøpet blir gjennomført. NAV utbetaler tilskuddet
                    etterskuddsvis.
                </Normaltekst>
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
                <PakrevdTextarea
                    label="Hvorfor er det behov for inkluderingstilskudd?"
                    verdi={avtale.gjeldendeInnhold.inkluderingstilskuddBegrunnelse}
                    settVerdi={(verdi) => settAvtaleInnholdVerdi('inkluderingstilskuddBegrunnelse', verdi)}
                    maxLengde={1000}
                    feilmelding="Beskrivelse av behovet for inkluderingstilskudd er påkrevd"
                />
                <VerticalSpacer rem={2} />

                <Ekspanderbartpanel apen tittel="Beskrivelse av hva tilskuddet kan dekke tilleggsutgifter knyttet til">
                    <div style={{borderLeft: '2px solid #2626265C'}}>
                        <div style={{marginLeft: '0.5rem'}}>
                        <Element>a. Vurdering av funksjonsevne / tilretteleggingsbehov</Element>
                        <Normaltekst>
                            Nødvendig vurdering av personens funksjonsevne eller tilretteleggingsbehov på den konkrete
                            arbeidsplassen.
                        </Normaltekst>
                        <VerticalSpacer rem={1} />
                        <Element>b. Ekstra tiltaksplass</Element>
                        <Normaltekst>Opprettelse av ekstra tiltaksplass, for eksempel kontormøbler</Normaltekst>
                        <VerticalSpacer rem={1} />
                        <Element>c. Personlig utstyr</Element>
                        <Normaltekst>
                            Personlig utstyr som arbeidstøy, vernesko, databriller o.l. knyttet til arbeidet.
                        </Normaltekst>
                        <VerticalSpacer rem={1} />
                        <Element>d. Arbeidshjelpemidler</Element>
                        <Normaltekst>
                            Nødvendige gjenstander og arbeidshjelpemidler personen trenger for å utføre arbeidet og
                            tilpasninger som ikke kan dekkes etter folketrygdlovens § 10-5.
                        </Normaltekst>
                        <VerticalSpacer rem={1} />
                        <Element>e. Programvare</Element>
                        <Normaltekst>
                            Merkostnader til å kjøpe og installere programvare som skal brukes av personen, herunder
                            teknologisk utstyr eller teknologiske hjelpemidler
                        </Normaltekst>
                        <VerticalSpacer rem={1} />
                        <Element>f. Forsikring, lisenser og sertifisering</Element>
                        <Normaltekst>
                            Nødvendige merutgifter til forsikring, lisenser, sertifisering o.l. knyttet til arbeidet
                        </Normaltekst>
                        <VerticalSpacer rem={1} />
                        <Element>g. Ekstern opplæring</Element>
                        <Normaltekst>Ekstern opplæring for å kunne utføre arbeidet i virksomheten</Normaltekst>

                        </div>
                    </div>
                </Ekspanderbartpanel>

                <VerticalSpacer rem={2} />
                <div>
                    <Element>Totalt konstadsoverslag:</Element>
                    <Ingress>{formatterPenger(avtale.gjeldendeInnhold.inkluderingstilskuddTotalBeløp)}</Ingress>
                    <VerticalSpacer rem={1} />
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

                <VerticalSpacer rem={2} />
                <div style={{ borderBottom: '1px solid #6A6A6A', display: 'flex', justifyContent: 'space-between' }}>
                    <Normaltekst>Tilskudd</Normaltekst>
                    <Normaltekst>Dato</Normaltekst>
                    <Normaltekst>Utgifter</Normaltekst>
                    <Normaltekst>Handling</Normaltekst>
                </div>
                <VerticalSpacer rem={0.5} />
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

                <VerticalSpacer rem={1} />
                <VerticalSpacer rem={2} />
                <LagreKnapp lagre={lagreAvtale} label={'Lagre'} suksessmelding={'Avtale lagret'} />
            </Innholdsboks>
        </>
    );
};

export default InkluderingstilskuddSteg;
