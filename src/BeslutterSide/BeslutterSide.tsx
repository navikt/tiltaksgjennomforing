import { AvtaleContext } from '@/AvtaleProvider';
import Avtaleparter from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/Avtaleparter/Avtaleparter';
import OppsummeringLonnstilskudd from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringLonnstilskudd/OppsummeringLonnstilskudd';
import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import BeslutterTilskuddsPerioder from '@/BeslutterSide/BeslutterTilskuddsperioder';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { avtaleTittel, tilskuddsperiodeAvslagTekst, tiltakstypeTekst } from '@/messages';
import BEMHelper from '@/utils/bem';
import { formatterDato, formatterPeriode, NORSK_DATO_OG_TID_FORMAT } from '@/utils/datoUtils';
import { formatterProsent } from '@/utils/formatterProsent';
import { formatterPenger } from '@/utils/PengeUtils';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Knapp } from 'nav-frontend-knapper';
import { Checkbox, SkjemaGruppe } from 'nav-frontend-skjema';
import { Element, Innholdstittel, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext, useState } from 'react';
import { Avslagsårsaker, TilskuddPeriodeStatus } from '@/types/avtale';
import './BeslutterSide.less';
import EtikettStatus from './EtikettStatus';

const cls = BEMHelper('beslutter-side');

const BeslutterSide: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);
    const [clsName, setClsName] = useState<string>();

    const [avslagsforklaring, setAvslagsforklaring] = useState('');
    const [avslagsårsaker, setAvslagsårsaker] = useState(new Set<Avslagsårsaker>());
    const [visAvslag, setVisAvslag] = useState(false);
    const { gjeldendeTilskuddsperiode } = avtaleContext.avtale;

    if (!gjeldendeTilskuddsperiode) {
        return <div>Ingen tilskuddsperioder</div>;
    }

    const tittel: { [key in TilskuddPeriodeStatus]: string } = {
        AVSLÅTT: 'Tilskuddsperiode er avslått',
        GODKJENT: 'Tilskuddsperiode er godkjent',
        UBEHANDLET: 'Tilskuddsperiode som skal godkjennes',
        UTBETALT: 'Tilskuddsperiode er utbetalt',
        ANNULLERT: 'Tilskuddsperiode er annullert',
    };

    const fadeInOut = () => {
        setClsName(cls.element('fade'));
        setTimeout(() => {
            setClsName(undefined);
        }, 300);
    };

    return (
        <>
            <VerticalSpacer rem={2} />
            <div className={cls.element('container')}>
                <div className={cls.element('innhold')}>
                    <TilbakeTilOversiktLenke />
                    <VerticalSpacer rem={1} />
                    <Innholdstittel>Tilskudd om {tiltakstypeTekst[avtaleContext.avtale.tiltakstype]}</Innholdstittel>
                    <VerticalSpacer rem={1} />
                    <div className={clsName} style={{ transition: 'all 0.3s ease-in-out 0s' }}>
                        <Innholdsboks>
                            <div className={cls.element('tittel')}>
                                <Undertittel>{tittel[gjeldendeTilskuddsperiode.status]}</Undertittel>
                                <EtikettStatus tilskuddsperiodestatus={gjeldendeTilskuddsperiode.status} />
                            </div>
                            <VerticalSpacer rem={2} />
                            <div className={cls.element('grid-container')}>
                                <div>
                                    <Element>Deltaker</Element>
                                </div>
                                <div>
                                    <Normaltekst>
                                        {avtaleContext.avtale.deltakerFornavn} {avtaleContext.avtale.deltakerEtternavn}
                                    </Normaltekst>
                                </div>
                                <div>
                                    <Element>Arbeidsgiver</Element>
                                </div>
                                <div>
                                    <Normaltekst>{avtaleContext.avtale.bedriftNavn}</Normaltekst>
                                </div>
                                <div>
                                    <Element>Periode</Element>
                                </div>
                                <div>
                                    <Normaltekst>
                                        {formatterPeriode(
                                            gjeldendeTilskuddsperiode.startDato,
                                            gjeldendeTilskuddsperiode.sluttDato
                                        )}
                                    </Normaltekst>
                                </div>
                                <div>
                                    <Element>Tilskuddsprosent</Element>
                                </div>
                                <div>
                                    <Normaltekst>
                                        {formatterProsent(gjeldendeTilskuddsperiode.lonnstilskuddProsent)}
                                    </Normaltekst>
                                </div>
                                <div>
                                    <Element>Beløp</Element>
                                </div>
                                <div>
                                    <Normaltekst>{formatterPenger(gjeldendeTilskuddsperiode.beløp)}</Normaltekst>
                                </div>
                            </div>
                            <VerticalSpacer rem={2} />
                            {gjeldendeTilskuddsperiode.status === 'UBEHANDLET' && (
                                <div>
                                    <LagreKnapp
                                        lagre={() =>
                                            avtaleContext.godkjennTilskudd(avtaleContext.avtale.enhetOppfolging || '')
                                        }
                                        label="Godkjenn tilskuddsperiode"
                                    />{' '}
                                    <Knapp onClick={() => setVisAvslag(!visAvslag)}>Avslå</Knapp>
                                </div>
                            )}

                            <VerticalSpacer rem={1} />
                            {visAvslag && (
                                <div className={cls.element('avslag-boks')}>
                                    <div className={cls.element('avslag-input')}>
                                        <div>
                                            <Element>Årsak til avslag</Element>
                                            <VerticalSpacer rem={1} />
                                            <SkjemaGruppe>
                                                {Object.entries(tilskuddsperiodeAvslagTekst).map(([kode, tekst]) => {
                                                    const avslagskode = kode as Avslagsårsaker;
                                                    return (
                                                        <Checkbox
                                                            key={kode}
                                                            label={tekst}
                                                            checked={avslagsårsaker.has(avslagskode)}
                                                            onChange={event => {
                                                                const årsaker = new Set<Avslagsårsaker>(avslagsårsaker);
                                                                if (event.currentTarget.checked) {
                                                                    årsaker.add(avslagskode);
                                                                } else {
                                                                    årsaker.delete(avslagskode);
                                                                }
                                                                setAvslagsårsaker(årsaker);
                                                            }}
                                                        />
                                                    );
                                                })}
                                            </SkjemaGruppe>
                                        </div>
                                        <div>
                                            <PakrevdTextarea
                                                className={cls.element('avslagsforklaring')}
                                                label="Forklaring"
                                                maxLengde={1000}
                                                verdi={avslagsforklaring}
                                                settVerdi={verdi => setAvslagsforklaring(verdi)}
                                            />
                                        </div>
                                    </div>
                                    <VerticalSpacer rem={1} />
                                    <LagreKnapp
                                        label="Send avslag"
                                        lagre={async () => {
                                            await avtaleContext.avslåTilskudd(avslagsårsaker, avslagsforklaring);
                                            setVisAvslag(false);
                                        }}
                                    />
                                </div>
                            )}

                            {gjeldendeTilskuddsperiode.status === 'GODKJENT' && (
                                <Normaltekst>
                                    Tilskuddsperioden ble godkjent av{' '}
                                    <b>{gjeldendeTilskuddsperiode.godkjentAvNavIdent}</b> den{' '}
                                    {formatterDato(
                                        gjeldendeTilskuddsperiode.godkjentTidspunkt!,
                                        NORSK_DATO_OG_TID_FORMAT
                                    )}
                                </Normaltekst>
                            )}
                            {gjeldendeTilskuddsperiode.status === 'AVSLÅTT' && (
                                <Normaltekst>
                                    Tilskuddsperioden ble avslått av{' '}
                                    <b>{gjeldendeTilskuddsperiode.avslåttAvNavIdent}</b> den{' '}
                                    {formatterDato(
                                        gjeldendeTilskuddsperiode.avslåttTidspunkt!,
                                        NORSK_DATO_OG_TID_FORMAT
                                    )}{' '}
                                    med følgende årsak(er):
                                    <ul>
                                        {Array.from(gjeldendeTilskuddsperiode.avslagsårsaker).map(årsak => (
                                            <li>{tilskuddsperiodeAvslagTekst[årsak]}</li>
                                        ))}
                                    </ul>
                                    med forklaringen: {gjeldendeTilskuddsperiode.avslagsforklaring}
                                </Normaltekst>
                            )}
                        </Innholdsboks>
                    </div>
                    <VerticalSpacer rem={1} />
                    <Ekspanderbartpanel tittel="Se avtalen">
                        <Innholdsboks>
                            <Innholdstittel>{avtaleTittel[avtaleContext.avtale.tiltakstype]}</Innholdstittel>
                            <VerticalSpacer rem={2} />
                            <Avtaleparter {...avtaleContext.avtale} />
                            <OppsummeringLonnstilskudd avtaleinnhold={avtaleContext.avtale} />
                        </Innholdsboks>
                    </Ekspanderbartpanel>
                    <VerticalSpacer rem={1} />
                    <Innholdsboks>
                        <BeslutterTilskuddsPerioder startAnimering={fadeInOut} />
                    </Innholdsboks>
                </div>
            </div>
        </>
    );
};

export default BeslutterSide;
