import { AvtaleContext, Context } from '@/AvtaleProvider';
import { formaterDato, formaterPeriode, NORSK_DATO_FORMAT, NORSK_DATO_FORMAT_FULL } from '@/utils/datoUtils';
import { formaterProsent } from '@/utils/formaterProsent';
import { formaterPenger, IKKE_NOE_BELOP_TEGN } from '@/utils/PengeUtils';
import React, { FunctionComponent, useContext, useEffect, useRef, useState } from 'react';
import EtikettStatus from '../EtikettStatus';
import BEMHelper from '@/utils/bem';
import './beslutterTilskuddsperioder.less';
import { BodyShort, Button, Heading } from '@navikt/ds-react';
import HorizontalSpacer from '@/komponenter/layout/HorizontalSpacer';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { Periode, TilskuddsperiodeContext } from '@/BeslutterSide/BeslutterSide';
import { Returårsaker, TilskuddsPeriode } from '@/types/avtale';
import { tilskuddsperiodeReturÅrsakTekst } from '@/messages';
import TilskuddsperiodeReturModal from '@/BeslutterSide/beslutterPanel/TilskuddsperiodeVisAvslag';
import { addDays, addMonths, isWithinInterval } from 'date-fns';
import { erNil } from '@/utils/predicates';

const BeslutterTilskuddsPerioder: FunctionComponent = () => {
    const { avtale, godkjennTilskudd } = useContext<Context>(AvtaleContext);
    const { enhet, setVisEnhetFeil, setVisReturModal: setVisAvslag } = useContext<Periode>(TilskuddsperiodeContext);
    const { gjeldendeTilskuddsperiode } = avtale;
    const [godkjennModalÅpen, setGodkjennModalÅpen] = useState<boolean>(false);
    const gjeldendeTilskuddsperiodeRef = useRef<HTMLTableRowElement | null>(null);

    const skalViseSats =
        avtale.tiltakstype === 'SOMMERJOBB' ||
        avtale.tiltakstype === 'VARIG_LONNSTILSKUDD' ||
        avtale.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD';

    // Gjeldende tilskuddsperiode er "behandlet" når den har status "godkjent".
    // Statuser som "annullert" og "behandlet i arena" vil føre til at en tilskuddsperiode
    // ikke er gjeldende, og behøver derfor ikke å kontrolleres mot.
    const gjeldendeErBehandlet = gjeldendeTilskuddsperiode?.status === 'GODKJENT';

    const [firstStartdato, setFirstStartdato] = useState<any>('');
    const [lastStartdato, setLastStartdato] = useState<any>('');

    const cls = BEMHelper('beslutter-tilskuddsperioder');

    useEffect(() => {
        loadingFilter();
    }, []);

    if (avtale.tilskuddPeriode.length < 1) return null;

    const settStylingForTabellrad = (periode: TilskuddsPeriode): string => {
        if (periode.løpenummer === gjeldendeTilskuddsperiode?.løpenummer) return 'gjeldende';
        if (periode.status === 'AVSLÅTT') return 'avslatt';
        return '';
    };

    const hentReturÅrsaker = (periode: TilskuddsPeriode): string =>
        new Array(Object.values(periode.avslagsårsaker))
            .map((e) => e.map((o) => tilskuddsperiodeReturÅrsakTekst[o?.toString().trim() as Returårsaker]).join(', '))
            .join(', ');

    const hentAvslattInfoTilskuddsperiode = (periode: TilskuddsPeriode): JSX.Element => {
        return (
            <BodyShort size="small">
                Tilskuddsperioden ble returnert av
                <span className={cls.element('bold')}>{' ' + periode.avslåttAvNavIdent + ' '}</span> den
                <span className={cls.element('bold')}>
                    {' ' + formaterDato(periode.avslåttTidspunkt ?? '', NORSK_DATO_FORMAT_FULL) + ' '}
                </span>
                med følgende årsak(er):
                <span className={cls.element('bold')}>{' ' + hentReturÅrsaker(periode) + ' '}</span>
                med forklaringen:
                <span className={cls.element('bold')}>{' ' + periode.avslagsforklaring}</span>
            </BodyShort>
        );
    };

    const loadingFilter = () => {
        let filter;
        if (!gjeldendeTilskuddsperiode) return [];
        const gjeldendeStartDato = formaterDato(gjeldendeTilskuddsperiode.startDato, 'yyyy-MM-dd');
        const datoSeksMånederFremITid = formaterDato(addMonths(new Date(), 6), 'yyyy-MM-dd');
        const godkjentlist = avtale.tilskuddPeriode.filter((tilskuddPeriode) => tilskuddPeriode.status === 'GODKJENT');
        if (godkjentlist.length > 0) {
            const sisteGodkjente = godkjentlist[godkjentlist.length - 1].startDato;
            filter = avtale.tilskuddPeriode.filter(
                (tilskuddPeriode) =>
                    formaterDato(addMonths(tilskuddPeriode.startDato, 1), 'yyyy-MM-dd') >= gjeldendeStartDato &&
                    tilskuddPeriode.startDato <= formaterDato(addMonths(sisteGodkjente, 6), 'yyyy-MM-dd'),
            );
            setFirstStartdato(formaterDato(filter[0].startDato, 'yyyy-MM-dd'));
            setLastStartdato(filter[filter.length - 1].startDato);
            return filter;
        }
        setFirstStartdato(gjeldendeStartDato);
        setLastStartdato(formaterDato(addMonths(gjeldendeTilskuddsperiode.startDato, 6), 'yyyy-MM-dd'));
        filter = avtale.tilskuddPeriode.filter(
            (tilskuddPeriode) =>
                formaterDato(addMonths(tilskuddPeriode.startDato, 6), 'yyyy-MM-dd') >= gjeldendeStartDato &&
                tilskuddPeriode.startDato <= datoSeksMånederFremITid,
        );
        return filter;
    };

    const currentFilter = () => {
        if (!gjeldendeTilskuddsperiode) return [];
        return avtale.tilskuddPeriode.filter(
            (tilskuddPeriode) =>
                tilskuddPeriode.startDato >= firstStartdato && tilskuddPeriode.startDato <= lastStartdato,
        );
    };

    // Tilskuddsperioder som er etter en oppfølgingsfrist er låst inntil veileder har utført oppfølging.
    const periodeKreverOppfølging = (periode: TilskuddsPeriode) => {
        if (erNil(avtale.kommendeOppfolging)) return false;
        return isWithinInterval(addDays(avtale.kommendeOppfolging.oppfolgingsfrist, 1), {
            start: periode.startDato,
            end: periode.sluttDato,
        });
    };

    return (
        <div className={cls.className}>
            <Heading level="2" size="small" className={cls.element('tittel')}>
                Tilskudd som skal godkjennes
            </Heading>
            <div className={cls.element('container')}>
                <table className={cls.element('tabell')}>
                    <thead>
                        <tr>
                            <th>Nr</th>
                            <th>Periode</th>
                            <th>Beløp</th>
                            {skalViseSats && <th>Sats</th>}
                            <th>Besluttes f.o.m.</th>
                            <th>Kostnadssted</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentFilter().map((periode) => {
                            const gjeldende = periode.løpenummer === gjeldendeTilskuddsperiode?.løpenummer;
                            const kreverOppfølging = periodeKreverOppfølging(periode);
                            return (
                                <React.Fragment key={periode.id}>
                                    <tr
                                        className={cls.element(
                                            'tilskuddsperiode-rad',
                                            settStylingForTabellrad(periode),
                                        )}
                                    >
                                        <td>{periode.løpenummer}</td>
                                        <td
                                            aria-label={`Startdato ${periode.startDato} og sluttdato ${periode.sluttDato}`}
                                        >
                                            {formaterPeriode(periode.startDato, periode.sluttDato, 'dd.MM.yy')}
                                        </td>
                                        <td>{formaterPenger(periode.beløp, IKKE_NOE_BELOP_TEGN)}</td>
                                        {skalViseSats && <td>{formaterProsent(periode.lonnstilskuddProsent)}</td>}
                                        <td>{formaterDato(periode.kanBesluttesFom, NORSK_DATO_FORMAT)}</td>
                                        <td>{periode.status === 'GODKJENT' ? periode.enhet : enhet}</td>
                                        <td>
                                            <EtikettStatus
                                                tilskuddsperiodestatus={
                                                    kreverOppfølging ? 'OPPFØLGING_KREVES' : periode.status
                                                }
                                                refusjonStatus={periode.refusjonStatus}
                                                godkjentAv={periode.godkjentAvNavIdent}
                                            />
                                        </td>
                                    </tr>
                                    {kreverOppfølging && gjeldendeErBehandlet && (
                                        <tr className={cls.element('knapp-row')}>
                                            <td
                                                colSpan={7}
                                                className={cls.element('knapp-data', settStylingForTabellrad(periode))}
                                            >
                                                Tilskuddsperioden ble stanset av systemet med følgende årsak: Veileder
                                                må følge opp tiltaket før de neste tilskuddene kan behandles.
                                            </td>
                                        </tr>
                                    )}

                                    {!gjeldende && periode.status === 'AVSLÅTT' && (
                                        <tr className={cls.element('knapp-row')}>
                                            <td
                                                colSpan={7}
                                                className={cls.element('knapp-data', settStylingForTabellrad(periode))}
                                            >
                                                {hentAvslattInfoTilskuddsperiode(periode)}
                                            </td>
                                        </tr>
                                    )}
                                    {gjeldende && (
                                        <tr className={cls.element('knapp-row')} ref={gjeldendeTilskuddsperiodeRef}>
                                            <td colSpan={7} className={cls.element('knapp-data')}>
                                                <>
                                                    {periode.status === 'AVSLÅTT' &&
                                                        hentAvslattInfoTilskuddsperiode(periode)}
                                                    {periode.status === 'UBEHANDLET' && (
                                                        <>
                                                            <Button
                                                                disabled={!enhet || !periode.kanBehandles}
                                                                onClick={() => {
                                                                    if (enhet) {
                                                                        setGodkjennModalÅpen(true);
                                                                    } else {
                                                                        setVisEnhetFeil(true);
                                                                    }
                                                                }}
                                                            >
                                                                Godkjenn tilskuddsperiode
                                                            </Button>
                                                            <HorizontalSpacer rem={1} />
                                                            <Button
                                                                variant="secondary"
                                                                onClick={() => setVisAvslag(true)}
                                                            >
                                                                Send i retur med forklaring
                                                            </Button>
                                                        </>
                                                    )}
                                                </>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
                <div style={{ display: 'flex', justifyContent: 'space-around', gap: '30px' }}>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            currentFilter();
                            setFirstStartdato(formaterDato(addMonths(firstStartdato, -3), 'yyyy-MM-dd'));
                        }}
                    >
                        Se tilskudd tilbake i tid
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setLastStartdato(formaterDato(addMonths(lastStartdato, 3), 'yyyy-MM-dd'));
                            currentFilter();
                        }}
                    >
                        Se tilskudd frem i tid
                    </Button>
                </div>
            </div>
            <TilskuddsperiodeReturModal tiltakstype={avtale.tiltakstype} />
            <BekreftelseModal
                bekreftOnClick={async () => {
                    if (enhet) {
                        await godkjennTilskudd(enhet);
                        setGodkjennModalÅpen(false);
                    }
                }}
                modalIsOpen={godkjennModalÅpen}
                oversiktTekst="Godkjenn tilskuddsperiode"
                bekreftelseTekst="Godkjenn tilskuddsperiode"
                avbrytelseTekst="Avbryt"
                lukkModal={() => setGodkjennModalÅpen(false)}
            >
                Du kan ikke gjøre endringer etter at du har godkjent tilskuddsperioden.
            </BekreftelseModal>
        </div>
    );
};

export default BeslutterTilskuddsPerioder;
