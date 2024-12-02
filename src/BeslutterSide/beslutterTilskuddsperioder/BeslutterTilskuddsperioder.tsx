import { AvtaleContext, Context } from '@/AvtaleProvider';
import { formatterDato, formatterPeriode, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { formatterProsent } from '@/utils/formatterProsent';
import { formatterPenger } from '@/utils/PengeUtils';
import React, { FunctionComponent, useContext, useRef, useState, useEffect } from 'react';
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
import moment from 'moment';

interface Props {
    startAnimering: () => void;
}

const BeslutterTilskuddsPerioder: FunctionComponent<Props> = (props) => {
    const { avtale, godkjennTilskudd } = useContext<Context>(AvtaleContext);
    const { enhet, setVisEnhetFeil, setVisReturModal: setVisAvslag } = useContext<Periode>(TilskuddsperiodeContext);
    const { gjeldendeTilskuddsperiode } = avtale;
    const [godkjennModalÅpen, setGodkjennModalÅpen] = useState<boolean>(false);
    const gjeldendeTilskuddsperiodeRef = useRef<HTMLTableRowElement | null>(null);

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
                    {' ' + formatterDato(periode.avslåttTidspunkt ?? '', NORSK_DATO_FORMAT) + ' '}
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
        const gjeldendeStartDato = moment(gjeldendeTilskuddsperiode.startDato).format('YYYY-MM-DD');
        const datoSeksMånederFremITid = moment(new Date()).add(6, 'months').format('YYYY-MM-DD');
        const godkjentlist = avtale.tilskuddPeriode.filter((tilskuddPeriode) => tilskuddPeriode.status === 'GODKJENT');
        if (godkjentlist.length > 0) {
            const sisteGodkjente = godkjentlist[godkjentlist.length - 1].startDato;
            filter = avtale.tilskuddPeriode.filter(
                (tilskuddPeriode) =>
                    moment(tilskuddPeriode.startDato).add(1, 'months').format('YYYY-MM-DD') >= gjeldendeStartDato &&
                    tilskuddPeriode.startDato <= moment(sisteGodkjente).add(6, 'months').format('YYYY-MM-DD'),
            );
            setFirstStartdato(moment(filter[0].startDato).format('YYYY-MM-DD'));
            setLastStartdato(filter[filter.length - 1].startDato);
            return filter;
        }
        setFirstStartdato(gjeldendeStartDato);
        setLastStartdato(moment(gjeldendeTilskuddsperiode.startDato).add(6, 'months').format('YYYY-MM-DD'));
        filter = avtale.tilskuddPeriode.filter(
            (tilskuddPeriode) =>
                moment(tilskuddPeriode.startDato).add(6, 'months').format('YYYY-MM-DD') >= gjeldendeStartDato &&
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
                            <th>Sats</th>
                            <th>Besluttes f.o.m.</th>
                            <th>Kostnadssted</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentFilter().map((periode) => {
                            const gjeldende = periode.løpenummer === gjeldendeTilskuddsperiode?.løpenummer;
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
                                            {formatterPeriode(periode.startDato, periode.sluttDato, 'DD.MM.YY')}
                                        </td>
                                        <td>{formatterPenger(periode.beløp)}</td>
                                        <td>{formatterProsent(periode.lonnstilskuddProsent)}</td>
                                        <td>{formatterDato(periode.kanBesluttesFom, NORSK_DATO_FORMAT)}</td>
                                        <td>{periode.status === 'GODKJENT' ? periode.enhet : enhet}</td>
                                        <td>
                                            <EtikettStatus
                                                tilskuddsperiodestatus={periode.status}
                                                refusjonStatus={periode.refusjonStatus}
                                                godkjentAv={periode.godkjentAvNavIdent}
                                            />
                                        </td>
                                    </tr>
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
                            setFirstStartdato(moment(firstStartdato).subtract(3, 'months').format('YYYY-MM-DD'));
                        }}
                    >
                        Se tilskudd tilbake i tid
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setLastStartdato(moment(lastStartdato).add(3, 'months').format('YYYY-MM-DD'));
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
