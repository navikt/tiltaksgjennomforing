import { AvtaleContext } from '@/AvtaleProvider';
import InkluderingstilskuddIngress from '@/AvtaleSide/steg/InkluderingstilskuddSteg/InkluderingstilskuddIngress';
import Tilskuddsbeskrivelse from '@/AvtaleSide/steg/InkluderingstilskuddSteg/Tilskuddsbeskrivelse';
import TilskuddsutgiftTabell from '@/AvtaleSide/steg/InkluderingstilskuddSteg/TilskuddsutgiftTabell';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { endreInkluderingstilskudd } from '@/services/rest-service';
import { InkluderingstilskuddsutgiftType } from '@/types/avtale';
import { formatterPenger } from '@/utils/PengeUtils';
import { Task } from '@navikt/ds-icons/cjs';
import Lenke from 'nav-frontend-lenker';
import { Element, Ingress } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext, useState } from 'react';
import EnTilskuddsutgift from '../../../InkluderingstilskuddSteg/EnTilskuddsutgift';
import { useTilskuddsutgift } from '../../../InkluderingstilskuddSteg/inkluderingstilskuddsUtils';
import OpprettEnTilskuddsutgift from '../../../InkluderingstilskuddSteg/OpprettEnTilskuddsutgift';

const EndreInkluderingsutgifter: FunctionComponent = () => {
    const [modalApen, setModalApen] = useState(false);
    const { avtale, hentAvtale } = useContext(AvtaleContext);
    const {
        inkluderingstilskuddTotal,
        inkluderingstilskuddsutgiftListe,
        ledigeInkluderingstilskuddstyperInngåttAvtale,
        leggTilInkluderingstilskuddsutgift,
        endreInkluderingstilskuddsutgift,
        sletteInkluderingstilskuddsutgift,
    } = useTilskuddsutgift(
        avtale.gjeldendeInnhold.inkluderingstilskuddsutgift,
        avtale.gjeldendeInnhold.inkluderingstilskuddTotalBeløp
    );
    const [iRedigermodus, setIRedigermodus] = useState(false);

    console.log(
        avtale.gjeldendeInnhold.inkluderingstilskuddsutgift,
        avtale.gjeldendeInnhold.inkluderingstilskuddTotalBeløp
    );

    const lukkModal = () => {
        setModalApen(false);
    };
    const endreUtgifter = async () => {
        await endreInkluderingstilskudd(avtale, inkluderingstilskuddsutgiftListe);
        await hentAvtale();
        setModalApen(false);
    };

    const endreUtgifterInnhold = (
        <div>
            <InkluderingstilskuddIngress />
            <VerticalSpacer rem={2} />
            <Tilskuddsbeskrivelse åpen={false} />
            <VerticalSpacer rem={2} />

            <OpprettEnTilskuddsutgift
                leggTilTilskuddsutgift={leggTilInkluderingstilskuddsutgift}
                ledigeInkluderingstilskuddtyper={ledigeInkluderingstilskuddstyperInngåttAvtale}
                setIRedigeringsmodus={setIRedigermodus}
                iRegideringsmodus={iRedigermodus}
                tilskuddsutgift={inkluderingstilskuddsutgiftListe}
                totalBeløp={inkluderingstilskuddTotal}
            />
            <VerticalSpacer rem={2} />

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
            </div>
            <VerticalSpacer rem={2} />
            <div>
                <Element>Totalt kostnadsoverslag:</Element>
                <Ingress>{formatterPenger(inkluderingstilskuddTotal)}</Ingress>
            </div>
        </div>
    );

    return (
        <>
            <Lenke
                style={{ display: 'flex', alignItems: 'center' }}
                onClick={(event) => {
                    event.stopPropagation();
                    setModalApen(true);
                }}
                href="#"
                role="menuitem"
            >
                <div style={{ marginRight: '0.5rem' }} aria-hidden={true}>
                    <Task />
                </div>
                Legg til inkluderingstilskudd
            </Lenke>
            <BekreftelseModal
                style={{ maxWidth: '40rem' }}
                avbrytelseTekst="Avbryt"
                bekreftelseTekst="Endre"
                oversiktTekst="Legg til inkluderingstilskudd"
                modalIsOpen={modalApen}
                bekreftOnClick={endreUtgifter}
                lukkModal={lukkModal}
                modalInnhold={endreUtgifterInnhold}
            />
        </>
    );
};

export default EndreInkluderingsutgifter;
