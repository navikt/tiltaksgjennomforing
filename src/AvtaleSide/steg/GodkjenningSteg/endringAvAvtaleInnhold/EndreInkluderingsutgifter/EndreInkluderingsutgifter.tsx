import { AvtaleContext } from '@/AvtaleProvider';
import Tilskuddsbeskrivelse from '@/AvtaleSide/steg/InkluderingstilskuddSteg/Tilskuddsbeskrivelse';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { InkluderingstilskuddsutgiftType } from '@/types/avtale';
import { Task } from '@navikt/ds-icons/cjs';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext, useState } from 'react';
import EnTilskuddsutgift from '../../../InkluderingstilskuddSteg/EnTilskuddsutgift';
import { useTilskuddsutgift } from '../../../InkluderingstilskuddSteg/inkluderingstilskuddsUtils';
import OpprettEnTilskuddsutgift from '../../../InkluderingstilskuddSteg/OpprettEnTilskuddsutgift';

const EndreInkluderingsutgifter: FunctionComponent = () => {
    const [modalApen, setModalApen] = useState(false);
    const {avtale, settAvtaleInnholdVerdier, settAvtaleInnholdVerdi, lagreAvtale} = useContext(AvtaleContext);
    const inkluderingsutgiftUtils = useTilskuddsutgift(avtale.gjeldendeInnhold.inkluderingstilskuddsutgift);
    const [iRedigermodus, setIRedigermodus] = useState(false);

    const lukkModal = () => {
        setModalApen(false);
    };
    const endreUtgifter = async () => {
        // await lalal
        setModalApen(false);
    };

    const nyUtgift = (beløp: number, type: InkluderingstilskuddsutgiftType) => {
        const nyInkluderingstilskuddutgiftsliste = inkluderingsutgiftUtils.leggTilInkluderingstilskuddsutgift(
            beløp,
            type
        );
        settAvtaleInnholdVerdier({ inkluderingstilskuddsutgift: nyInkluderingstilskuddutgiftsliste }, true);
    };
    const slett = (index: number) => {
        const nyInkluderingstilskuddutgiftsliste = inkluderingsutgiftUtils.sletteInkluderingstilskuddsutgift(index);
        settAvtaleInnholdVerdier({ inkluderingstilskuddsutgift: nyInkluderingstilskuddutgiftsliste }, true);
    };
    const endre = (index: number, beløp: number, type: InkluderingstilskuddsutgiftType) => {
        const nyInkluderingstilskuddutgiftsliste = inkluderingsutgiftUtils.endreInkluderingstilskuddsutgift(
            index,
            beløp,
            type
        );
        settAvtaleInnholdVerdier({ inkluderingstilskuddsutgift: nyInkluderingstilskuddutgiftsliste }, true);
    };

    const endreUtgifterInnhold = (
        <div>
            <Normaltekst>
                Tilskuddet skal dekke tilleggskostnader som arbeidsgiveren har i forbindelse med tilrettelegging. Det
                dekker dokumenterte utgifter opp til en
                <Lenke href="https://www.nav.no/inkluderingstilskudd#hvor-mye" target="_blank">
                    {' '}
                    maksimal sats.
                </Lenke>{' '}
            </Normaltekst>
            <VerticalSpacer rem={1} />
            <Normaltekst>
                Utgifter som virksomheten normalt vil ha ved ansettelser, dekkes ikke av ordningen. Inkluderingstilskudd
                gis heller ikke når de samme utgiftene dekkes på andre måter. Du må sende søknad til NAV før det
                planlagte innkjøpet blir gjennomført. NAV utbetaler tilskuddet etterskuddsvis.
            </Normaltekst>
            <VerticalSpacer rem={2} />
            <Tilskuddsbeskrivelse åpen={false} />
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
        </div>
    );

    return (
        <>
            <Lenke
                style={{display: 'flex', alignItems: 'center'}}
                onClick={(event) => {
                    event.stopPropagation();
                    setModalApen(true);
                }}
                href="#"
                role="menuitem"
            >
                <div style={{marginRight: '0.5rem'}} aria-hidden={true}>
                    <Task />
                </div>
                Endre Tilskuddsutgifter
            </Lenke>
            <BekreftelseModal
                style={{ maxWidth: '50rem' }}
                avbrytelseTekst="Avbryt"
                bekreftelseTekst="Endre"
                oversiktTekst="Endre inkluderingstilskudd"
                modalIsOpen={modalApen}
                bekreftOnClick={endreUtgifter}
                lukkModal={lukkModal}
                modalInnhold={endreUtgifterInnhold}
            />
        </>
    );
};

export default EndreInkluderingsutgifter;
