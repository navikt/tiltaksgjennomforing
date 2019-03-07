import * as React from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import { Avtale } from '../../../avtale';
import './Avtaleparter.less';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import AvtalepartnerHeaderIkon from './AvtalepartnerHeaderIkon';
import BEMHelper from '../../../../utils/bem';

interface Props {
    avtale: Avtale;
}

const cls = BEMHelper('avtaleparter');

const HarData = (input: string): React.ReactNode => {
    if (input) {
        if (input.length > 0 && input !== 'null null' && input !== null) {
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
        <Element>{radTittel}</Element>
    </div>
);

const AvtaleRad = ({
    labelKolEn,
    navnKolEn,
    labelKolTo,
    navnKolTo,
}: {
    labelKolEn: string;
    navnKolEn: string;
    labelKolTo: string;
    navnKolTo: string;
}) => {
    return (
        <div className={cls.element('content')}>
            <div className={cls.element('rad')}>
                <div className={cls.element('element')}>
                    <Normaltekst className={cls.element('label')}>
                        {labelKolEn}
                    </Normaltekst>
                    {HarData(navnKolEn)}
                </div>
                <div className={cls.element('element')}>
                    <Normaltekst className={cls.element('label')}>
                        {labelKolTo}
                    </Normaltekst>
                    {HarData(navnKolTo)}
                </div>
            </div>
        </div>
    );
};

export default Avtaleparter;
