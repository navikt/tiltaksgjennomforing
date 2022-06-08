import { AvtaleContext, Context } from '@/AvtaleProvider';
import { formatterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { formatterProsent } from '@/utils/formatterProsent';
import { formatterPenger } from '@/utils/PengeUtils';
import React, { FunctionComponent, useContext, useState } from 'react';
import EtikettStatus from '../EtikettStatus';
import BEMHelper from '@/utils/bem';
import './beslutterTilskuddsperioder.less';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import HorizontalSpacer from '@/komponenter/layout/HorizontalSpacer';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { Periode, TilskuddsperiodeContext } from '@/BeslutterSide/BeslutterSide';
import { Avslagsårsaker, TilskuddsPeriode } from '@/types/avtale';
import { tilskuddsperiodeAvslagTekst } from '@/messages';
import TilskuddsperiodeVisAvslag from '@/BeslutterSide/beslutterPanel/TilskuddsperiodeVisAvslag';

interface Props {
    startAnimering: () => void;
}

const BeslutterTilskuddsPerioder: FunctionComponent<Props> = (props) => {
    const { avtale, godkjennTilskudd } = useContext<Context>(AvtaleContext);
    const { enhet, setEnhetFeil, setVisAvslag } = useContext<Periode>(TilskuddsperiodeContext);
    const { gjeldendeTilskuddsperiode } = avtale;
    const [godkjennModalÅpen, setGodkjennModalÅpen] = useState<boolean>(false);

    const cls = BEMHelper('beslutter-tilskuddsperioder');

    if (avtale.tilskuddPeriode.length < 1) return null;

    const localDateTimeFormat = (date: string): string => {
        const datetime = new Date(date);
        if (datetime.toDateString() === 'Invalid Date') return '';
        return datetime.toLocaleDateString('no-NO', { year: '2-digit', month: '2-digit', day: '2-digit' });
    };

    const settStylingForTabellrad = (periode: TilskuddsPeriode): string => {
        if (periode.løpenummer === gjeldendeTilskuddsperiode?.løpenummer) return 'gjeldende';
        if (periode.status === 'AVSLÅTT') return 'avslatt';
        return '';
    };

    const hentAvslagsArsaker = (periode: TilskuddsPeriode): string =>
        new Array(Object.values(periode.avslagsårsaker))
            .map((e) => e)
            .join(', ')
            .split(',')
            .map((e) => tilskuddsperiodeAvslagTekst[e.trim() as Avslagsårsaker])
            .join(', ');

    const hentAvslattInfoTilskuddsperiode = (periode: TilskuddsPeriode): JSX.Element => {
        return (
            <>
                <Normaltekst>
                    Tilskuddsperioden ble avslått av
                    <span className={cls.element('bold')}>{' ' + periode.avslåttAvNavIdent + ' '}</span> den
                    <span className={cls.element('bold')}>
                        {' ' + formatterDato(periode.avslåttTidspunkt ?? '', NORSK_DATO_FORMAT) + ' '}
                    </span>
                    med følgende årsak(er):
                    <span className={cls.element('bold')}>
                        {' ' + hentAvslagsArsaker(periode) + ' '}
                        {''}
                    </span>
                    med forklaringen:
                    <span className={cls.element('bold')}>{' ' + periode.avslagsforklaring}</span>
                </Normaltekst>
            </>
        );
    };

    return (
        <div className={cls.className}>
            <Undertittel className={cls.element('tittel')}>Tilskudd som skal godkjennes</Undertittel>
            <div className={cls.element('container')}>
                <table className={'tabell'}>
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
                        {avtale.tilskuddPeriode.map((periode, index) => {
                            const gjeldende = periode.løpenummer === gjeldendeTilskuddsperiode?.løpenummer;
                            return (
                                <React.Fragment key={index}>
                                    <tr
                                        key={index}
                                        className={cls.element(
                                            'tilskuddsperiode-rad',
                                            settStylingForTabellrad(periode)
                                        )}
                                    >
                                        <td>{periode.løpenummer}</td>
                                        <td
                                            aria-label={`Startdato ${periode.startDato} og sluttdato ${periode.sluttDato}`}
                                        >
                                            {localDateTimeFormat(periode.startDato)} -
                                            {localDateTimeFormat(periode.sluttDato)}
                                        </td>
                                        <td>{formatterPenger(periode.beløp)}</td>
                                        <td>{formatterProsent(periode.lonnstilskuddProsent)}</td>
                                        <td>{formatterDato(periode.kanBesluttesFom, NORSK_DATO_FORMAT)}</td>
                                        <td>{periode.status === 'GODKJENT' ? periode.enhet : enhet}</td>
                                        <td>
                                            <EtikettStatus tilskuddsperiodestatus={periode.status} />
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
                                        <tr className={cls.element('knapp-row')}>
                                            <td colSpan={7} className={cls.element('knapp-data')}>
                                                <>
                                                    {periode.status === 'AVSLÅTT' &&
                                                        hentAvslattInfoTilskuddsperiode(periode)}
                                                    {periode.status === 'UBEHANDLET' && (
                                                        <>
                                                            <Hovedknapp
                                                                onClick={() => {
                                                                    if (!enhet.match(/\d{4}/)) {
                                                                        setEnhetFeil('Enhet må bestå av 4 siffer');
                                                                        return;
                                                                    }
                                                                    setGodkjennModalÅpen(true);
                                                                }}
                                                            >
                                                                Godkjenn tilskuddsperiode
                                                            </Hovedknapp>
                                                            <HorizontalSpacer rem={1} />
                                                            <Knapp onClick={() => setVisAvslag(true)}>
                                                                Avslå med forklaring
                                                            </Knapp>
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
            <TilskuddsperiodeVisAvslag />
            <BekreftelseModal
                bekreftOnClick={async () => {
                    await godkjennTilskudd(enhet);
                    setGodkjennModalÅpen(false);
                }}
                modalIsOpen={godkjennModalÅpen}
                oversiktTekst="Godkjenn tilskuddsperiode"
                varselTekst="Du kan ikke gjøre endringer etter at du har godkjent tilskuddsperioden."
                bekreftelseTekst="Godkjenn tilskuddsperiode"
                avbrytelseTekst="Avbryt"
                lukkModal={() => setGodkjennModalÅpen(false)}
            />
        </div>
    );
};

export default BeslutterTilskuddsPerioder;
