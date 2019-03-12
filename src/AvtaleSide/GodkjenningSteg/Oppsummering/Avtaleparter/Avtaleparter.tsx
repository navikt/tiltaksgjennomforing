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
    if (input) {
        if (input.length > 0 && input.search('null') && input !== null) {
            return (
                <Normaltekst className={cls.element('navn')}>
                    {input}
                </Normaltekst>
            );
        }
    }
    return (
        <Normaltekst className={cls.element('navn--ikkeFyltUt')}>
            Ikke fylt ut
        </Normaltekst>
    );
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
    } = props.avtale;

    const deltakerNavn = `${deltakerFornavn} ${deltakerEtternavn}`;
    const kontaktperson = `${arbeidsgiverFornavn} ${arbeidsgiverEtternavn}`;
    const veilederNavn = `${veilederFornavn} ${veilederEtternavn}`;

    return (
        <Stegoppsummering
            tittel="Avtalens parter"
            ikon={<AvtalepartnerHeaderIkon />}
        >
            <RadTittel radTittel="Deltaker" clsName="radtittel--first" />

            <AvtaleRad
                labelKolEn="navn"
                navnKolEn={deltakerNavn}
                labelKolTo="Fødselsnummer"
                navnKolTo={deltakerFnr}
            />

            <RadTittel radTittel="Arbeidsgiver" clsName="radtittel " />
            <AvtaleRad
                labelKolEn="Bedriftens navn"
                navnKolEn={bedriftNavn}
                labelKolTo="bedriftsnummer"
                navnKolTo={bedriftNr}
            />
            <AvtaleRad
                labelKolEn="Kontaktperson for avtalen"
                navnKolEn={kontaktperson}
                labelKolTo="Telefonnummer"
                navnKolTo={bedriftNr}
            />
            <RadTittel
                radTittel="kontaktperson for avtalen"
                clsName="radtittel"
            />
            <AvtaleRad
                labelKolEn="Kontaktperson"
                navnKolEn={veilederNavn}
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
                <div className={avtaleRadCls.element('element')}>
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
