import { AvtaleContext } from '@/AvtaleProvider';
import Avtaleparter from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/Avtaleparter/Avtaleparter';
import OppsummeringLonnstilskudd from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringLonnstilskudd/OppsummeringLonnstilskudd';
import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import BeslutterTilskuddsPerioder from '@/BeslutterSide/BeslutterTilskuddsperioder';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { avtaleTittel } from '@/messages';
import { pathTilAvtale } from '@/paths';
import BEMHelper from '@/utils/bem';
import { formatterDato, formatterPeriode, NORSK_DATO_FORMAT, NORSK_DATO_OG_TID_FORMAT } from '@/utils/datoUtils';
import { formatterProsent } from '@/utils/formatterProsent';
import { formatterPenger } from '@/utils/PengeUtils';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Knapp } from 'nav-frontend-knapper';
import { Element, Innholdstittel, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { TilskuddPeriodeStatus } from '../types/avtale';
import './BeslutterSide.less';
import EtikettStatus from './EtikettStatus';

const cls = BEMHelper('beslutter-side');

const BeslutterSide: FunctionComponent = () => {
    const history = useHistory();
    const avtaleContext = useContext(AvtaleContext);
    const { tilskuddsperiodeId } = useParams();
    const [clsName, setClsName] = useState<string>();

    if (avtaleContext.avtale.tilskuddPeriode.length === 0) {
        return <div>Ingen tilskuddsperioder</div>;
    }

    if (!tilskuddsperiodeId) {
        const tilskuddsperiode = avtaleContext.avtale.tilskuddPeriode[0];
        history.replace(`${pathTilAvtale(avtaleContext.avtale.id)}/beslutte/${tilskuddsperiode.id}`);
        return null;
    }

    const tilskuddsperiode = avtaleContext.avtale.tilskuddPeriode.find(periode => periode.id === tilskuddsperiodeId);

    if (!tilskuddsperiode) {
        throw Error('Ugyldig tilskuddsperiode');
    }

    const tittel: { [key in TilskuddPeriodeStatus]: string } = {
        AVSLÅTT: 'Tilskudd er avslått',
        GODKJENT: 'Tilskudd er godkjent',
        UBEHANDLET: 'Tilskudd som skal godkjennes',
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
                    <Innholdstittel>Tilskudd om midlertidig lønnstilskudd</Innholdstittel>
                    <VerticalSpacer rem={1} />
                    <div className={clsName} style={{ transition: 'all 0.3s ease-in-out 0s' }}>
                        <Innholdsboks>
                            <div className={cls.element('tittel')}>
                                <Undertittel>{tittel[tilskuddsperiode.status]}</Undertittel>
                                <EtikettStatus tilskuddsperiodestatus={tilskuddsperiode.status} />
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
                                        {formatterPeriode(tilskuddsperiode.startDato, tilskuddsperiode.sluttDato)}
                                    </Normaltekst>
                                </div>
                                <div>
                                    <Element>Frist</Element>
                                </div>
                                <div>
                                    <Normaltekst>
                                        {formatterDato(tilskuddsperiode.startDato, NORSK_DATO_FORMAT)}
                                    </Normaltekst>
                                </div>
                                <div>
                                    <Element>Lønnstilskuddsprosent</Element>
                                </div>
                                <div>
                                    <Normaltekst>
                                        {formatterProsent(avtaleContext.avtale.lonnstilskuddProsent)}
                                    </Normaltekst>
                                </div>
                                <div>
                                    <Element>Beløp</Element>
                                </div>
                                <div>
                                    <Normaltekst>{formatterPenger(tilskuddsperiode.beløp)}</Normaltekst>
                                </div>
                            </div>
                            <VerticalSpacer rem={2} />
                            {!tilskuddsperiode.godkjentTidspunkt && (
                                <div>
                                    <LagreKnapp
                                        lagre={() => avtaleContext.godkjennTilskudd(tilskuddsperiode.id)}
                                        label="Godkjenn tilskudd"
                                    />
                                    <Knapp style={{ marginLeft: '0.5rem' }}>Avslå</Knapp>
                                </div>
                            )}
                            {tilskuddsperiode.godkjentTidspunkt && tilskuddsperiode.godkjentAvNavIdent && (
                                <Normaltekst>
                                    Tilskuddsperioden ble godkjent av <b>{tilskuddsperiode.godkjentAvNavIdent}</b> den{' '}
                                    {formatterDato(tilskuddsperiode.godkjentTidspunkt, NORSK_DATO_OG_TID_FORMAT)}
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
