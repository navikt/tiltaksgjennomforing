import { AvtaleContext } from '@/AvtaleProvider';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { oppdatereOppfølgingAvAvtale } from '@/services/rest-service';
import BEMHelper from '@/utils/bem';
import { Neutral } from '@navikt/ds-icons/cjs';
import { BodyShort, Link } from '@navikt/ds-react';
import { FunctionComponent, useContext, useState } from 'react';

const OppfølgingGjennomført: FunctionComponent = () => {
    const cls = BEMHelper('endreKontaktInformasjon');
    const { avtale, hentAvtale } = useContext(AvtaleContext);

    const [modalApen, setModalApen] = useState(false);

    const bekrefterOppgfølgingAvAvtale = async (): Promise<void> => {
        await oppdatereOppfølgingAvAvtale(avtale);
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
                Oppfølging VTA-O gjennomført
            </Link>
            <BekreftelseModal
                avbrytelseTekst="Avbryt"
                bekreftelseTekst="Fortsett"
                oversiktTekst="Oppfølging VTA-O gjennomført"
                modalIsOpen={modalApen}
                bekreftOnClick={bekrefterOppgfølgingAvAvtale}
                lukkModal={() => setModalApen(false)}
            >
                <BodyShort size="small">
                    Jeg bekrefter at det har blitt foretatt oppfølging av avtalen og vurdert at tiltaket skal fortsette.
                </BodyShort>
            </BekreftelseModal>
        </>
    );
};

export default OppfølgingGjennomført;
