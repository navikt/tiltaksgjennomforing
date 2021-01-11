import { AvtaleContext } from '@/AvtaleProvider';
import LesMerOmTilskuddsPerioder from '@/AvtaleSide/steg/BeregningTilskudd/tilskuddsPerioder/LesMerOmTilskuddsPerioder';
import TilskuddsPerioder from '@/AvtaleSide/steg/BeregningTilskudd/tilskuddsPerioder/TilskuddsPerioder';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { pathTilAvtale } from '@/paths';
import BEMHelper from '@/utils/bem';
import { formatterDato, formatterPeriode, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { formatterPenger } from '@/utils/PengeUtils';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { EtikettInfo } from 'nav-frontend-etiketter';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Element, Innholdstittel, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './BeslutterSide.less';

const cls = BEMHelper('beslutter-side');

const BeslutterSide: FunctionComponent = () => {
    const history = useHistory();
    const avtaleContext = useContext(AvtaleContext);
    const { tilskuddsperiodeId } = useParams();

    const forsteTilskudd = avtaleContext.avtale.tilskuddPeriode.length
        ? avtaleContext.avtale.tilskuddPeriode[0]
        : undefined;

    if (forsteTilskudd) {
        if (!tilskuddsperiodeId) {
            history.replace(`${pathTilAvtale(avtaleContext.avtale.id)}/beslutte/${forsteTilskudd.id}`);
        }
    } else {
        return null;
    }

    if (!avtaleContext.avtale) {
        return null;
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
                            <EtikettInfo>Ubehandlet</EtikettInfo>
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
                                    {formatterPeriode(forsteTilskudd.startDato, forsteTilskudd.sluttDato)}
                                </Normaltekst>
                            </div>
                            <div>
                                <Element>Frist</Element>
                            </div>
                            <div>
                                <Normaltekst>{formatterDato(forsteTilskudd.startDato, NORSK_DATO_FORMAT)}</Normaltekst>
                            </div>
                            <div>
                                <Element>Lønnstilskuddsprosent</Element>
                            </div>
                            <div>
                                <Normaltekst>{avtaleContext.avtale.lonnstilskuddProsent}%</Normaltekst>
                            </div>
                            <div>
                                <Element>Beløp</Element>
                            </div>
                            <div>
                                <Normaltekst>{formatterPenger(forsteTilskudd.beløp)}</Normaltekst>
                            </div>
                        </div>
                        <VerticalSpacer rem={2} />
                        <div>
                            <Hovedknapp onClick={() => avtaleContext.godkjennTilskudd(forsteTilskudd.id)}>
                                Godkjenn tilskudd
                            </Hovedknapp>
                            <Knapp style={{ marginLeft: '0.5rem' }}>Avslå</Knapp>
                        </div>
                    </Innholdsboks>
                    <VerticalSpacer rem={1} />
                    <Ekspanderbartpanel tittel="Se avtalen">heh</Ekspanderbartpanel>
                    <VerticalSpacer rem={1} />
                    <Innholdsboks>
                        <LesMerOmTilskuddsPerioder />
                        <TilskuddsPerioder />
                    </Innholdsboks>
                </div>
            </div>
        </>
    );
};

export default BeslutterSide;
