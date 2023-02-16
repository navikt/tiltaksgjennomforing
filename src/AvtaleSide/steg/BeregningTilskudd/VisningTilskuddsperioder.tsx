import { AvtaleContext } from '@/AvtaleProvider';
import EtikettStatus from '@/BeslutterSide/EtikettStatus';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BEMHelper from '@/utils/bem';
import { formatterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { formatterPenger } from '@/utils/PengeUtils';
import { Accordion, BodyShort, Button, Heading, Label } from '@navikt/ds-react';
import { FunctionComponent, useContext, useState } from 'react';
import './visningTilskuddsperioder.less';

const VisningTilskuddsperioder: FunctionComponent = () => {
    const [visAllePerioder, setVisAllePerioder] = useState(false);
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { avtale } = useContext(AvtaleContext);
    const cls = BEMHelper('visning-tilskuddsperioder');

    if (avtale.tilskuddPeriode.length === 0) {
        return null;
    }

    const antallAktiveTilskuddsperioder = avtale.tilskuddPeriode.filter((p) => p.aktiv).length;
    var gjeldendeTilskuddsperiodeIndex = 0;
    if(avtale.gjeldendeTilskuddsperiode) {
        var i = 0;
        avtale.tilskuddPeriode.forEach(periode => {
            if(avtale.gjeldendeTilskuddsperiode && avtale.gjeldendeTilskuddsperiode.id === periode.id) {
                gjeldendeTilskuddsperiodeIndex = i;
            }
            i++;
        });
    }
    var startIndexVisning = gjeldendeTilskuddsperiodeIndex - 6;
    if (startIndexVisning < 0) {
        startIndexVisning = 0;
    }
    var sluttIndexVisning = gjeldendeTilskuddsperiodeIndex + 6;
    if(visAllePerioder) {
        startIndexVisning = 0;
        sluttIndexVisning = antallAktiveTilskuddsperioder;
    }
    return (
        <div className={cls.className}>
            <Accordion className={'accordion'}>
                <Accordion.Item defaultOpen>
                    <Accordion.Header>Oversikt over tilskudd i perioder</Accordion.Header>
                    <Accordion.Content>
                        <div className={cls.element('container')}>
                            <div className={cls.element('header')}>
                                <Label>Utregning</Label>
                                <BodyShort size="small">
                                    Utregningen baserer seg på lønn for en måned. Dagsatsen får du ved å dele "sum
                                    tilskudd for en måned" på snitt antall dager i en måned (365,25 / 12 = 30,4375) og
                                    ganger med antall dager i perioden.
                                </BodyShort>
                                {avtale.gjeldendeInnhold.datoForRedusertProsent && (
                                    <>
                                        <VerticalSpacer rem={1} />
                                        <Label>Reduksjon av tilskuddsprosent</Label>
                                        {avtale.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' && (
                                            <BodyShort size="small">
                                                Tilskuddsprosenten reduseres med 10% etter{' '}
                                                {avtale.gjeldendeInnhold.lonnstilskuddProsent === 60
                                                    ? '1 år'
                                                    : '6 måneder'}
                                                . Datoen for ny redusert sats er{' '}
                                                <b>
                                                    {formatterDato(
                                                        avtale.gjeldendeInnhold.datoForRedusertProsent,
                                                        NORSK_DATO_FORMAT
                                                    )}
                                                </b>
                                                .
                                            </BodyShort>
                                        )}

                                        {avtale.tiltakstype === 'VARIG_LONNSTILSKUDD' && (
                                            <BodyShort size="small">
                                                Tilskuddsprosenten reduseres til 67% etter 1 år om tilskuddsprosenten er
                                                eller over 68%. Datoen for ny redusert sats er{' '}
                                                <b>
                                                    {formatterDato(
                                                        avtale.gjeldendeInnhold.datoForRedusertProsent,
                                                        NORSK_DATO_FORMAT
                                                    )}
                                                </b>
                                                .
                                            </BodyShort>
                                        )}
                                    </>
                                )}
                            </div>
                            <div className={cls.element('tabell')}>
                                <div className={cls.element('tabell-ingress')}>
                                    <Label>Tilskudd for periode</Label>
                                    {innloggetBruker.erNavAnsatt && <Label>Status</Label>}
                                    <Label>Tilskuddsprosent</Label>
                                    <Label>Inntil</Label>
                                </div>
                                {avtale.tilskuddPeriode
                                    .filter((p) => p.aktiv)
                                    .map((periode, index) => {
                                        const nyProsent =
                                            index > 0
                                                ? avtale.tilskuddPeriode[index - 1].lonnstilskuddProsent !==
                                                  periode.lonnstilskuddProsent
                                                : false;
                                        if (index < startIndexVisning || index > sluttIndexVisning) {
                                            return null;
                                        } else if (index !== 0 && (index === startIndexVisning || index === sluttIndexVisning)) {
                                            return (
                                                <div key={index} className={cls.element('tabell-innslag')}>
                                                    ...
                                                </div>
                                            )
                                        }
                                        return (
                                            <>
                                                <div
                                                    key={index}
                                                    className={cls.element('tabell-innslag')}
                                                    style={{
                                                        borderTop: nyProsent ? '2px solid gray' : 'undefined',
                                                    }}
                                                >
                                                    <BodyShort size="small">
                                                        {formatterDato(periode.startDato, NORSK_DATO_FORMAT)} -{' '}
                                                        {formatterDato(periode.sluttDato, NORSK_DATO_FORMAT)}
                                                    </BodyShort>
                                                    {innloggetBruker.erNavAnsatt && (
                                                        <BodyShort>
                                                            <EtikettStatus
                                                                tilskuddsperiodestatus={periode.status}
                                                                size="small"
                                                            />
                                                        </BodyShort>
                                                    )}
                                                    <BodyShort size="small">
                                                        {periode.lonnstilskuddProsent}%
                                                    </BodyShort>
                                                    <BodyShort size="small" style={{ minWidth: '4rem' }}>
                                                        {formatterPenger(periode.beløp)}
                                                    </BodyShort>
                                                </div>
                                            </>
                                        );
                                    })}
                                {avtale.gjeldendeInnhold.startDato && avtale.gjeldendeInnhold.sluttDato && (
                                    <>
                                        <div className={cls.element('tabell-innslag')}>
                                            Avtalen varer fra{' '}
                                            {formatterDato(avtale.gjeldendeInnhold.startDato, NORSK_DATO_FORMAT)} til{' '}
                                            {formatterDato(avtale.gjeldendeInnhold.sluttDato, NORSK_DATO_FORMAT)}. Det
                                            tilsvarer {antallAktiveTilskuddsperioder} tilskuddsperioder.
                                        </div>
                                        {!visAllePerioder &&
                                            <Button size="small" onClick={() => setVisAllePerioder(true)}>
                                                Vis alle perioder
                                            </Button>
                                        }
                                    </>
                                )}
                            </div>
                            <VerticalSpacer rem={1} />
                            {innloggetBruker.rolle === 'ARBEIDSGIVER' && (
                                <>
                                    <Heading size="small">Refusjon</Heading>
                                    <VerticalSpacer rem={1} />
                                    <BodyShort size="small">
                                        Som arbeidsgiver må du søke om refusjon. Du kan først søke etter at perioden er
                                        over. Når tiltaket er over, vil NAV sende dere et ferdig utregnet forslag til
                                        refusjon. Refusjonen regnes ut på bakgrunn av innhold i avtalen og
                                        innrapporterte inntekter i A-meldingen.
                                    </BodyShort>
                                    <VerticalSpacer rem={1} />
                                    <Label>
                                        Du kan søke om refusjon fra{' '}
                                        {formatterDato(avtale.tilskuddPeriode[0].sluttDato, NORSK_DATO_FORMAT)}
                                    </Label>
                                </>
                            )}
                            <VerticalSpacer rem={1} />
                        </div>
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};
export default VisningTilskuddsperioder;
