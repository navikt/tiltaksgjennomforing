import * as React from 'react';
import { Normaltekst, Element, Undertittel } from 'nav-frontend-typografi';
import { Avtale } from '../../../avtale';
import './Avtaleparter.less';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import AvtalepartnerHeaderIkon from './AvtalepartnerHeaderIkon';
import BEMHelper from '../../../../utils/bem';

interface Props {
    avtale: Avtale;
}

const cls = BEMHelper('avtaleparter');

export const HarData = (input: string): React.ReactNode => {
    if (sjekkStrengVerdi(input)) {
        return (
            <Normaltekst className={cls.element('navn')}>{input}</Normaltekst>
        );
    }
    return (
        <Normaltekst className={cls.element('navn--ikkeFyltUt')}>
            Ikke fylt ut
        </Normaltekst>
    );
};

const sjekkNavnForConCatOmBeggeEksisterer = (
    navn: string,
    etternavn: string
): string => {
    if (sjekkStrengVerdi(navn) && sjekkStrengVerdi(etternavn)) {
        const deltakerNavn = `${navn} ${etternavn}`;
        return deltakerNavn;
    }
    return '';
};

const sjekkStrengVerdi = (streng: string): boolean => {
    if (streng) {
        if (streng.length > 0 && streng.search('null') && streng !== null) {
            return true;
        }
    }
    return false;
};

const Avtaleparter = (props: Props) => {
    const {
        deltakerFornavn,
        deltakerEtternavn,
        bedriftNavn,
        arbeidsgiverFornavn,
        arbeidsgiverEtternavn,
        veilederFornavn,
        veilederEtternavn,
        deltakerFnr,
        bedriftNr,
        veilederTlf,
        arbeidsgiverTlf,
    } = props.avtale;

    return (
        <Stegoppsummering
            tittel="Avtalens parter"
            ikon={<AvtalepartnerHeaderIkon />}
        >
            <RadTittel radTittel="Deltaker" clsName="radtittel--first" />

            <AvtaleRad
                labelKolEn="Navn"
                navnKolEn={sjekkNavnForConCatOmBeggeEksisterer(
                    deltakerFornavn,
                    deltakerEtternavn
                )}
                labelKolTo="Fødselsnummer"
                navnKolTo={deltakerFnr}
            />

            <RadTittel radTittel="Arbeidsgiver" clsName="radtittel " />
            <AvtaleRad
                labelKolEn="Bedriftens navn"
                navnKolEn={bedriftNavn}
                labelKolTo="Bedriftsnummer"
                navnKolTo={bedriftNr}
            />
            <AvtaleRad
                labelKolEn="Kontaktperson for avtalen"
                navnKolEn={sjekkNavnForConCatOmBeggeEksisterer(
                    arbeidsgiverFornavn,
                    arbeidsgiverEtternavn
                )}
                labelKolTo="Telefonnummer"
                navnKolTo={arbeidsgiverTlf}
            />
            <RadTittel
                radTittel="Kontaktperson i NAV"
                clsName="radtittel"
            />
            <AvtaleRad
                labelKolEn="Kontaktperson"
                navnKolEn={sjekkNavnForConCatOmBeggeEksisterer(
                    veilederFornavn,
                    veilederEtternavn
                )}
                labelKolTo="Telefonnummer"
                navnKolTo={veilederTlf}
            />
        </Stegoppsummering>
    );
};

const RadTittel = ({
    radTittel,
    clsName,
}: {
    radTittel: string;
    clsName: string;
}) => (
    <div className={cls.element(clsName)}>
        <Undertittel>{radTittel}</Undertittel>
    </div>
);

export const AvtaleRad = ({
    clsName,
    labelKolEn,
    navnKolEn,
    labelKolTo,
    navnKolTo,
}: {
    clsName?: string;
    labelKolEn: string;
    navnKolEn: string;
    labelKolTo: string;
    navnKolTo: string;
}) => {
    const avtaleRadCls = BEMHelper(clsName ? clsName : 'avtaleparter');
    return (
        <div className={avtaleRadCls.element('content')}>
            <div className={avtaleRadCls.element('rad')}>
                <div className={avtaleRadCls.element('element')}>
                    <Element className={avtaleRadCls.element('label')}>
                        {labelKolEn}
                    </Element>
                    {HarData(navnKolEn)}
                </div>
                <div className={avtaleRadCls.element('element', 'ytterrad')}>
                    <Element className={avtaleRadCls.element('label')}>
                        {labelKolTo}
                    </Element>
                    {HarData(navnKolTo)}
                </div>
            </div>
        </div>
    );
};

export default Avtaleparter;
