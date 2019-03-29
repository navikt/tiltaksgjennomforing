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

export const SjekkOmInputEksisterer = (
    input: string,
    fontType: string,
    clsName: string,
    label?: string
): React.ReactNode => {
    const classN = BEMHelper(clsName);

    if (sjekkStrengVerdi(input)) {
        switch (fontType) {
            case 'UnderTittel':
                return (
                    <Undertittel className={classN.element('navn')}>
                        {label} {input}
                    </Undertittel>
                );
            case 'Normaltekst':
                return (
                    <Normaltekst className={classN.element('navn')}>
                        {label} {input}
                    </Normaltekst>
                );
            case 'Element':
                return (
                    <Element className={classN.element('navn')}>
                        {label} {input}
                    </Element>
                );

            default:
                return (
                    <Normaltekst className={classN.element('navn')}>
                        {label} {input}
                    </Normaltekst>
                );
        }
    }
    return (
        <Normaltekst className={classN.element('navn', 'ikkeFyltUt')}>
            Ikke fylt ut
        </Normaltekst>
    );
};

const sjekkNavnForConCatOmBeggeEksisterer = (
    navn: string,
    etternavn: string,
    concatSymbol?: string
): string => {
    const symbol = concatSymbol || '';
    if (sjekkStrengVerdi(navn) && sjekkStrengVerdi(etternavn)) {
        const deltakerNavn = `${navn} ${symbol} ${etternavn}`;
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
            tittel="Kontaktinformasjon"
            ikon={<AvtalepartnerHeaderIkon />}
        >
            <FellesRad
                clsNameModifier="farge-gronn"
                labelTittel="Deltaker"
                navn={deltakerFornavn}
                etternavn={deltakerEtternavn}
                labelinfoTittel="F.nr:"
                info={deltakerFnr}
            />

            <div className={cls.element('content2', 'farge-lysblaa')}>
                <Normaltekst>Arbeidsgiver</Normaltekst>

                {SjekkOmInputEksisterer(
                    sjekkNavnForConCatOmBeggeEksisterer(
                        bedriftNavn,
                        sjekkNavnForConCatOmBeggeEksisterer(
                            arbeidsgiverFornavn,
                            arbeidsgiverEtternavn
                        ),
                        'v/'
                    ),
                    'UnderTittel',
                    'avtaleparter'
                )}

                {SjekkOmInputEksisterer(
                    bedriftNr,
                    'Normaltekst',
                    'avtaleparter',
                    'Org:'
                )}
                {SjekkOmInputEksisterer(
                    arbeidsgiverTlf,
                    'Normaltekst',
                    'avtaleparter',
                    'Tlf:'
                )}
            </div>

            <FellesRad
                clsNameModifier="farge-graa"
                labelTittel="NAV-veileder"
                navn={veilederFornavn}
                etternavn={veilederEtternavn}
                labelinfoTittel="Telefonnummer:"
                info={veilederTlf}
            />
        </Stegoppsummering>
    );
};

const FellesRad = ({
    clsNameModifier,
    labelTittel,
    navn,
    etternavn,
    labelinfoTittel,
    info,
}: {
    clsNameModifier?: string;
    labelTittel: string;
    navn: string;
    etternavn: string;
    labelinfoTittel: string;
    info: string;
}) => {
    return (
        <div className={cls.element('content2', clsNameModifier)}>
            <Normaltekst>{labelTittel}</Normaltekst>

            {SjekkOmInputEksisterer(
                sjekkNavnForConCatOmBeggeEksisterer(navn, etternavn),
                'UnderTittel',
                'avtaleparter'
            )}
            {SjekkOmInputEksisterer(
                info,
                'Normaltekst',
                'avtaleparter',
                labelinfoTittel
            )}
        </div>
    );
};

export default Avtaleparter;
