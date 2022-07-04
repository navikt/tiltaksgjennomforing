import { AvtaleContext } from '@/AvtaleProvider';
import InkluderingstilskuddIngress from '@/AvtaleSide/steg/InkluderingstilskuddSteg/InkluderingstilskuddIngress';
import Tilskuddsbeskrivelse from '@/AvtaleSide/steg/InkluderingstilskuddSteg/Tilskuddsbeskrivelse';
import TilskuddsutgiftTabell from '@/AvtaleSide/steg/InkluderingstilskuddSteg/TilskuddsutgiftTabell';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { endreInkluderingstilskudd } from '@/services/rest-service';
import { InkluderingstilskuddsutgiftType } from '@/types/avtale';
import { Task } from '@navikt/ds-icons/cjs';
import Lenke from 'nav-frontend-lenker';
import React, { FunctionComponent, useContext, useState } from 'react';
import EnTilskuddsutgift from '../../../InkluderingstilskuddSteg/EnTilskuddsutgift';
import { useTilskuddsutgift } from '../../../InkluderingstilskuddSteg/inkluderingstilskuddsUtils';
import OpprettEnTilskuddsutgift from '../../../InkluderingstilskuddSteg/OpprettEnTilskuddsutgift';

const EndreInkluderingsutgifter: FunctionComponent = () => {
    const [modalApen, setModalApen] = useState(false);
    const avtaleContext = useContext(AvtaleContext);
    const inkluderingsutgiftUtils = useTilskuddsutgift(avtaleContext.avtale.gjeldendeInnhold.inkluderingstilskuddsutgift);
    const [iRedigermodus, setIRedigermodus] = useState(false);

    const lukkModal = () => {
        setModalApen(false);
    };
    const endreUtgifter = async () => {
        await endreInkluderingstilskudd(avtaleContext.avtale, inkluderingsutgiftUtils.inkluderingstilskuddsutgiftListe);
        await avtaleContext.hentAvtale();
        setModalApen(false);
    };

    const endreUtgifterInnhold = (
        <div>
            <InkluderingstilskuddIngress />
            <VerticalSpacer rem={2} />
            <Tilskuddsbeskrivelse åpen={false} />
            <VerticalSpacer rem={2} />

            <OpprettEnTilskuddsutgift
                leggTilTilskuddsutgift={inkluderingsutgiftUtils.leggTilInkluderingstilskuddsutgift}
                ledigeInkluderingstilskuddtyper={inkluderingsutgiftUtils.ledigeInkluderingstilskuddstyper}
                setIRedigeringsmodus={setIRedigermodus}
                iRegideringsmodus={iRedigermodus}
                tilskuddsutgift={inkluderingsutgiftUtils.inkluderingstilskuddsutgiftListe}
                totalBeløp={avtaleContext.avtale.gjeldendeInnhold.inkluderingstilskuddTotalBeløp}
            />
            <VerticalSpacer rem={2} />

            <div>
                <TilskuddsutgiftTabell>
                    {inkluderingsutgiftUtils.inkluderingstilskuddsutgiftListe.map((tilskuddsutgift, index) => (
                        <EnTilskuddsutgift
                            key={index}
                            tilskuddsutgift={tilskuddsutgift}
                            endre={(beløp: number, type: InkluderingstilskuddsutgiftType) => inkluderingsutgiftUtils.endreInkluderingstilskuddsutgift(index, beløp, type)}
                            slett={() => inkluderingsutgiftUtils.sletteInkluderingstilskuddsutgift(index)}
                            ledigeInkluderingstilskuddtyper={inkluderingsutgiftUtils.ledigeInkluderingstilskuddstyper}
                            setIRedigeringsmodus={setIRedigermodus}
                            iRegideringsmodus={iRedigermodus}
                        />
                    ))}
                </TilskuddsutgiftTabell>
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
                Endre inkluderingstilskudd
            </Lenke>
            <BekreftelseModal
                style={{ maxWidth: '40rem' }}
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
