import { AvtaleContext, Context } from '@/AvtaleProvider';
import { formaterDato, formaterPeriode, NORSK_DATO_FORMAT_FULL, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { formaterProsent } from '@/utils/formaterProsent';
import { formaterPenger } from '@/utils/PengeUtils';
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

interface Props {
    startAnimering: () => void;
}

const BeslutterTilskuddsPerioder: FunctionComponent<Props> = (props) => {
    const { avtale, godkjennTilskudd } = useContext<Context>(AvtaleContext);
    const { enhet, setVisEnhetFeil, setVisReturModal: setVisAvslag } = useContext<Periode>(TilskuddsperiodeContext);
    const { gjeldendeTilskuddsperiode } = avtale;
    const [godkjennModalÅpen, setGodkjennModalÅpen] = useState<boolean>(false);
    const gjeldendeTilskuddsperiodeRef = useRef<HTMLTableRowElement | null>(null);

    const cls = BEMHelper('beslutter-tilskuddsperioder');
    useEffect(() => {
        if (gjeldendeTilskuddsperiodeRef.current) {
            gjeldendeTilskuddsperiodeRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
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
                        {avtale.tilskuddPeriode.map((periode) => {
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
                                            {formaterPeriode(periode.startDato, periode.sluttDato, 'dd.MM.yy')}
                                        </td>
                                        <td>{formaterPenger(periode.beløp)}</td>
                                        <td>{formaterProsent(periode.lonnstilskuddProsent)}</td>
                                        <td>{formaterDato(periode.kanBesluttesFom, NORSK_DATO_FORMAT)}</td>
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
