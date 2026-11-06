import { AvtaleContext } from '@/AvtaleProvider';
import InkluderingstilskuddIngress from '@/AvtaleSide/steg/InkluderingstilskuddSteg/InkluderingstilskuddIngress';
import Tilskuddsbeskrivelse from '@/AvtaleSide/steg/InkluderingstilskuddSteg/Tilskuddsbeskrivelse';
import TilskuddsutgiftTabell from '@/AvtaleSide/steg/InkluderingstilskuddSteg/TilskuddsutgiftTabell';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { endreInkluderingstilskudd } from '@/services/rest-service';
import { formaterPenger } from '@/utils';
import { Ingress, Label, Link } from '@navikt/ds-react';
import type { FunctionComponent } from 'react';
import { useContext, useState } from 'react';
import { TasklistIcon } from '@navikt/aksel-icons';
import { useUlagredeUtgifter } from '@/AvtaleSide/steg/InkluderingstilskuddSteg/inkluderingstilskuddsUtils';
import OpprettEnTilskuddsutgift from '@/AvtaleSide/steg/InkluderingstilskuddSteg/OpprettEnTilskuddsutgift';

const EndreInkluderingsutgifter: FunctionComponent = () => {
    const [modalApen, setModalApen] = useState(false);
    const { avtale, hentAvtale } = useContext(AvtaleContext);
    const { utgifter, total, ledigeTyper, leggTil, slett, tilbakestill } = useUlagredeUtgifter(
        avtale.gjeldendeInnhold.inkluderingstilskuddsutgift,
    );
    const [iRedigermodus, setIRedigermodus] = useState(false);

    const lukkModal = () => {
        setModalApen(false);
    };
    const endreUtgifter = async () => {
        await endreInkluderingstilskudd(avtale, utgifter);
        await hentAvtale();
        setModalApen(false);
    };

    return (
        <>
            <Link
                style={{ display: 'flex', alignItems: 'center' }}
                onClick={(event) => {
                    event.stopPropagation();
                    tilbakestill(avtale.gjeldendeInnhold.inkluderingstilskuddsutgift);
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
                        leggTilTilskuddsutgift={leggTil}
                        ledigeInkluderingstilskuddtyper={ledigeTyper}
                        setIRedigeringsmodus={setIRedigermodus}
                        iRegideringsmodus={iRedigermodus}
                        tilskuddsutgift={utgifter}
                        totalBeløp={total}
                        inkluderingstilskuddSats={avtale.gjeldendeInnhold.inkluderingstilskuddSats}
                    />
                    <VerticalSpacer rem={2} />

                    <div>
                        <TilskuddsutgiftTabell
                            utgifter={utgifter}
                            redigerbar={true}
                            skalKunneSlette={false}
                            slett={slett}
                        />
                    </div>
                    <VerticalSpacer rem={2} />
                    <div>
                        <Label>Totalt kostnadsoverslag:</Label>
                        <Ingress>{formaterPenger(total)}</Ingress>
                    </div>
                </div>
            </BekreftelseModal>
        </>
    );
};

export default EndreInkluderingsutgifter;
