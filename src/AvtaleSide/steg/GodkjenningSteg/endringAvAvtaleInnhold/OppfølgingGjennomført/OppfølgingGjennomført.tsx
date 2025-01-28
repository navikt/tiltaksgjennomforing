import { AvtaleContext } from '@/AvtaleProvider';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { oppdatereOppfølgingAvDeltaker } from '@/services/rest-service';
import { TiltaksType } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { Neutral } from '@navikt/ds-icons/cjs';
import { BodyShort, Link } from '@navikt/ds-react';
import React, { FunctionComponent, useContext, useState } from 'react';

const OppfølgingGjennomført: FunctionComponent = () => {
    const cls = BEMHelper('endreKontaktInformasjon');
    const { avtale, hentAvtale, settAvtaleInnholdVerdi } = useContext(AvtaleContext);
    const vtao = avtale.gjeldendeInnhold.vtao;

    const [modalApen, setModalApen] = useState(false);

    const type: TiltaksType = avtale.tiltakstype;
    const endreRefusjonInfo: boolean =
        type === 'MIDLERTIDIG_LONNSTILSKUDD' || type === 'VARIG_LONNSTILSKUDD' || type === 'SOMMERJOBB';

    const bekrefterOppgfølgingAvDeltaker = async (): Promise<void> => {
        await oppdatereOppfølgingAvDeltaker(avtale);
        setModalApen(false);
        await hentAvtale(avtale.id);
    };

    return (
        <>
            <Link
                onClick={(event) => {
                    event.stopPropagation();
                    setModalApen(true);
                }}
                href="#"
                role="menuitem"
                className={cls.element('link')}
            >
                <div aria-hidden={true}>
                    <Neutral className={cls.element('ikon')} />
                </div>
                Oppfølging VTA-O Gjennomført
            </Link>
            <BekreftelseModal
                avbrytelseTekst="Avbryt"
                bekreftelseTekst="Fortsett"
                oversiktTekst="Oppfølging VTA-O Gjennomført"
                modalIsOpen={modalApen}
                bekreftOnClick={bekrefterOppgfølgingAvDeltaker}
                lukkModal={() => setModalApen(false)}
            >
                <BodyShort size="small">
                    Jeg bekrefter at det har blitt foretatt oppfølging av deltaker og vurdert at tiltaket skal
                    fortsette.
                </BodyShort>
            </BekreftelseModal>
        </>
    );
};

export default OppfølgingGjennomført;
