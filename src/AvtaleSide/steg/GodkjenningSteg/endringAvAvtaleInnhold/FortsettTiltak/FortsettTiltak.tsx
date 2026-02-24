import { AvtaleContext } from '@/AvtaleProvider';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { hentVarsellogg, oppdatereOppfølgingAvAvtale } from '@/services/rest-service';
import { Varsel } from '@/types/varsel';
import BEMHelper from '@/utils/bem';
import { formaterDato, NORSK_DATO_FORMAT_FULL, NORSK_DATO_OG_TID_FORMAT_FULL } from '@/utils/datoUtils';
import { erNil } from '@/utils/predicates';
import { sortBy } from '@/utils';
import { Neutral } from '@navikt/ds-icons/cjs';
import { BodyShort, Link } from '@navikt/ds-react';
import { FunctionComponent, useContext, useEffect, useState } from 'react';

const FortsettTiltak: FunctionComponent = () => {
    const cls = BEMHelper('endreKontaktInformasjon');
    const { avtale, hentAvtale } = useContext(AvtaleContext);
    const [sisteOppfolgingVarsel, setSisteOppfolgingVarsel] = useState<Varsel | undefined>(undefined);

    const [modalApen, setModalApen] = useState(false);
    const harKommendeOppfolging = !erNil(avtale.kommendeOppfolging);
    const oppfolgingKanUtfores = avtale.kommendeOppfolging?.oppfolgingKanUtfores ?? false;

    useEffect(() => {
        if (modalApen) {
            hentVarsellogg(avtale.id).then((data: Varsel[]) => {
                const maybeVarsel = sortBy(
                    data.filter((v) => v.hendelseType === 'OPPFØLGING_AV_TILTAK_UTFØRT'),
                    ['tidspunkt'],
                ).findLast((x) => x);
                setSisteOppfolgingVarsel(maybeVarsel);
            });
        }
    }, [avtale.id, modalApen]);

    const bekrefterOppfølgingAvAvtale = async (): Promise<void> => {
        await oppdatereOppfølgingAvAvtale(avtale);
        setModalApen(false);
        await hentAvtale(avtale.id);
    };

    const sisteOppfølgingTekst = sisteOppfolgingVarsel ? (
        <BodyShort size="small" spacing>
            Oppfølging av avtalen ble sist gjennomført den{' '}
            {formaterDato(sisteOppfolgingVarsel.tidspunkt, NORSK_DATO_OG_TID_FORMAT_FULL)} av{' '}
            {sisteOppfolgingVarsel.utførtAv}.
        </BodyShort>
    ) : null;

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
                Fortsett tiltak
            </Link>
            <BekreftelseModal
                avbrytelseTekst="Lukk"
                bekreftelseTekst="Fortsett tiltak"
                oversiktTekst="Fortsett tiltak"
                modalIsOpen={modalApen}
                bekreftOnClick={oppfolgingKanUtfores ? bekrefterOppfølgingAvAvtale : undefined}
                lukkModal={() => setModalApen(false)}
            >
                {oppfolgingKanUtfores && (
                    <>
                        {sisteOppfølgingTekst}
                        <BodyShort size="small">
                            Jeg bekrefter at det har blitt foretatt oppfølging av avtalen og vurdert at tiltaket skal
                            fortsette.
                        </BodyShort>
                    </>
                )}
                {!oppfolgingKanUtfores && (
                    <>
                        <BodyShort size="small" spacing>
                            Det er ikke nødvendig å følge opp avtalen enda.
                        </BodyShort>
                        {sisteOppfølgingTekst}
                        {harKommendeOppfolging && (
                            <BodyShort size="small" spacing>
                                Neste oppfølging kan utføres fra og med{' '}
                                {formaterDato(avtale.kommendeOppfolging.oppfolgingstarter, NORSK_DATO_FORMAT_FULL)} og
                                må utføres innen{' '}
                                {formaterDato(avtale.kommendeOppfolging.oppfolgingsfrist, NORSK_DATO_FORMAT_FULL)}
                            </BodyShort>
                        )}
                    </>
                )}
            </BekreftelseModal>
        </>
    );
};

export default FortsettTiltak;
