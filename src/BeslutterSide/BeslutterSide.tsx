import { AvtaleContext } from '@/AvtaleProvider';
import Avtaleparter from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/Avtaleparter/Avtaleparter';
import OppsummeringLonnstilskudd from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringLonnstilskudd/OppsummeringLonnstilskudd';
import BeslutterTilskuddsPerioder from '@/BeslutterSide/BeslutterTilskuddsperioder';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { avtaleTittel, tilskuddsperiodeStatusTekst } from '@/messages';
import { pathTilAvtale } from '@/paths';
import BEMHelper from '@/utils/bem';
import { formatterDato, formatterPeriode, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { formatterProsent } from '@/utils/formatterProsent';
import { formatterPenger } from '@/utils/PengeUtils';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { EtikettInfo } from 'nav-frontend-etiketter';
import { Knapp } from 'nav-frontend-knapper';
import { Element, Innholdstittel, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './BeslutterSide.less';

const cls = BEMHelper('beslutter-side');

const BeslutterSide: FunctionComponent = () => {
    const history = useHistory();
    const avtaleContext = useContext(AvtaleContext);
    const { tilskuddsperiodeId } = useParams();

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

    return (
        <>
            <VerticalSpacer rem={2} />
            <div className={cls.element('container')}>
                <div className={cls.element('innhold')}>
                    <Innholdstittel>Tilskudd om midlertidig lønnstilskudd</Innholdstittel>
                    <VerticalSpacer rem={1} />
                    <Innholdsboks>
                        <div className={cls.element('tittel')}>
                            <Undertittel>Tilskudd som skal godkjennes</Undertittel>
                            <EtikettInfo>{tilskuddsperiodeStatusTekst[tilskuddsperiode.status]}</EtikettInfo>
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
                                <Normaltekst>{formatterProsent(avtaleContext.avtale.lonnstilskuddProsent)}</Normaltekst>
                            </div>
                            <div>
                                <Element>Beløp</Element>
                            </div>
                            <div>
                                <Normaltekst>{formatterPenger(tilskuddsperiode.beløp)}</Normaltekst>
                            </div>
                        </div>
                        <VerticalSpacer rem={2} />
                        <div>
                            <LagreKnapp
                                lagre={() => avtaleContext.godkjennTilskudd(tilskuddsperiode.id)}
                                label="Godkjenn tilskudd"
                            />
                            <Knapp style={{ marginLeft: '0.5rem' }}>Avslå</Knapp>
                        </div>
                    </Innholdsboks>
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
                        <BeslutterTilskuddsPerioder />
                    </Innholdsboks>
                </div>
            </div>
        </>
    );
};

export default BeslutterSide;
