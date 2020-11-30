import React, { FunctionComponent, useContext } from 'react';
import BEMHelper from '@/utils/bem';
import { Normaltekst, UndertekstBold } from 'nav-frontend-typografi';
import { AvtaleContext } from '@/AvtaleProvider';
import moment from 'moment';
import './tilskuddsPerioder.less';

const cls = BEMHelper('tilskuddsPerioder');

const TilskuddsPerioder: FunctionComponent = () => {
    const avtaleinnhold = useContext(AvtaleContext);

    const detErOpprettetTilskuddsPerioder = () => avtaleinnhold.avtale.tilskuddPeriode.length > 0;

    const setDatoTilOgFra = (startDato: string, sluttDato: string): string => {
        return fotmattereDatoString(sluttDato)
            .concat(' - ')
            .concat(fotmattereDatoString(sluttDato));
    };

    const fotmattereDatoString = (dato: string): string => {
        const formatt = 'DD.MMMM';
        return moment(dato).format(formatt);
    };

    const formattereTilNorskBeløp = (belop: number) =>
        new Intl.NumberFormat('no-IN', { maximumSignificantDigits: 3 }).format(belop);

    return detErOpprettetTilskuddsPerioder() ? (
        <div className={cls.className}>
            <div className={cls.element('tabell')}>
                <UndertekstBold className="periode">Periode</UndertekstBold>
                <UndertekstBold className="belop">Beløp</UndertekstBold>
                <UndertekstBold className="tid">Arbeidsgiver kan be om refusjon</UndertekstBold>
                {avtaleinnhold.avtale.tilskuddPeriode.map((periode, index) => {
                    return (
                        <React.Fragment key={index}>
                            <Normaltekst className="periode">
                                {setDatoTilOgFra(periode.startDato, periode.sluttDato)}
                            </Normaltekst>
                            <Normaltekst className="belop">{formattereTilNorskBeløp(periode.beløp)} kr</Normaltekst>
                            <Normaltekst className="tid">{periode.sluttDato}</Normaltekst>
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    ) : null;
};

export default TilskuddsPerioder;
