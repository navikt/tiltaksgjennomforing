import { AvtaleContext } from '@/AvtaleProvider';
import InkluderingstilskuddIngress from '@/AvtaleSide/steg/InkluderingstilskuddSteg/InkluderingstilskuddIngress';
import Tilskuddsbeskrivelse from '@/AvtaleSide/steg/InkluderingstilskuddSteg/Tilskuddsbeskrivelse';
import TilskuddsutgiftTabell from '@/AvtaleSide/steg/InkluderingstilskuddSteg/TilskuddsutgiftTabell';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { endreInkluderingstilskudd } from '@/services/rest-service';
import { InkluderingstilskuddsutgiftType } from '@/types/avtale';
import { formaterPenger } from '@/utils/PengeUtils';
import { Ingress, Label, Link } from '@navikt/ds-react';
import type { FunctionComponent } from 'react';
import { useContext, useState } from 'react';
import { TasklistIcon } from '@navikt/aksel-icons';
import { useTilskuddsutgift } from '@/AvtaleSide/steg/InkluderingstilskuddSteg/inkluderingstilskuddsUtils';
import OpprettEnTilskuddsutgift from '@/AvtaleSide/steg/InkluderingstilskuddSteg/OpprettEnTilskuddsutgift';
import EnTilskuddsutgift from '@/AvtaleSide/steg/InkluderingstilskuddSteg/EnTilskuddsutgift';

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
        resettListe,
    } = useTilskuddsutgift(
        avtale.gjeldendeInnhold.inkluderingstilskuddsutgift,
        avtale.gjeldendeInnhold.inkluderingstilskuddTotalBeløp,
    );
    const [iRedigermodus, setIRedigermodus] = useState(false);

    const lukkModal = () => {
        setModalApen(false);
    };
    const endreUtgifter = async () => {
        await endreInkluderingstilskudd(avtale, inkluderingstilskuddsutgiftListe);
        await hentAvtale();
        setModalApen(false);
    };

    return (
        <>
            <Link
                style={{ display: 'flex', alignItems: 'center' }}
                onClick={(event) => {
                    event.stopPropagation();
                    resettListe(avtale.gjeldendeInnhold.inkluderingstilskuddsutgift);
                    setModalApen(true);
                }}
                href="#"
                role="menuitem"
            >
                <div style={{ marginRight: '0.5rem' }} aria-hidden={true}>
                    <TasklistIcon />
                </div>
                Legg til inkluderingstilskudd
            </Link>
            <BekreftelseModal
                style={{ maxWidth: '40rem' }}
                avbrytelseTekst="Avbryt"
                bekreftelseTekst="Endre"
                oversiktTekst="Legg til inkluderingstilskudd"
                modalIsOpen={modalApen}
                bekreftOnClick={endreUtgifter}
                lukkModal={lukkModal}
            >
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
                        inkluderingstilskuddSats={avtale.gjeldendeInnhold.inkluderingstilskuddSats}
                    />
                    <VerticalSpacer rem={2} />

                    <div>
                        <TilskuddsutgiftTabell redigerbar={true}>
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
                        <Label>Totalt kostnadsoverslag:</Label>
                        <Ingress>{formaterPenger(inkluderingstilskuddTotal)}</Ingress>
                    </div>
                </div>
            </BekreftelseModal>
        </>
    );
};

export default EndreInkluderingsutgifter;
