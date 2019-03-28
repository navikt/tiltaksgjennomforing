import * as React from 'react';
import TypografiBase, {
    Normaltekst,
    Undertittel,
} from 'nav-frontend-typografi';
import { Avtale } from '../../../avtale';
import './Avtaleparter.less';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import AvtalepartnerHeaderIkon from './AvtalepartnerHeaderIkon';
import BEMHelper from '../../../../utils/bem';
import EtikettFokus from 'nav-frontend-etiketter/lib/etikettfokus';

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
        return (
            <TypografiBase type={fontType} className={classN.element('navn')}>
                {label} {input}
            </TypografiBase>
        );
    }
    return (
        <div>
            <EtikettFokus>Ikke fylt ut</EtikettFokus>
        </div>
    );
};

const sjekkStrengVerdi = (streng: any) => {
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
            <div>
                {settInnRad(
                    [deltakerFornavn, deltakerEtternavn],
                    ['F.nr', deltakerFnr],
                    'Deltaker',
                    'farge-gronn'
                )}
                {settInnRad(
                    [bedriftNavn, arbeidsgiverFornavn, arbeidsgiverEtternavn],
                    ['Org:', bedriftNr, 'Tlf:', arbeidsgiverTlf],
                    'Arbeidsgiver',
                    'farge-graa'
                )}
                {settInnRad(
                    [veilederFornavn, veilederEtternavn],
                    ['Tlf:', veilederTlf],
                    'NAV veileder',
                    'farge-lysblaa'
                )}
            </div>
        </Stegoppsummering>
    );
};

const sjekkOmAlleInputfeltErFyltUt = (
    nameRad: string[],
    tilleggInfoVedrorendeAktorRad: string[]
) => {
    return (
        nameRad.every(sjekkStrengVerdi) &&
        tilleggInfoVedrorendeAktorRad.every(sjekkStrengVerdi)
    );
};

const settInnRad = (
    nameRad: string[],
    tilleggInfoVedrorendeAktorRad: string[],
    headertxt: string,
    borderFarge: string
) => {
    if (sjekkOmAlleInputfeltErFyltUt(nameRad, tilleggInfoVedrorendeAktorRad)) {
        if (erDetFellesRad(nameRad)) {
            return (
                <div className={cls.element('content', borderFarge)}>
                    <Normaltekst>{headertxt}</Normaltekst>
                    <Undertittel>
                        {nameRad.map(inputFelt => {
                            return `${inputFelt} `;
                        })}
                    </Undertittel>
                    <Normaltekst>
                        {tilleggInfoVedrorendeAktorRad.map(inputFelt => {
                            return `${inputFelt} `;
                        })}
                    </Normaltekst>
                </div>
            );
        } else {
            return (
                <div className={cls.element('content', borderFarge)}>
                    <Normaltekst>{headertxt}</Normaltekst>
                    <Undertittel>
                        {nameRad.map((inputFelt, index) => {
                            return index === 1
                                ? `v/ ${inputFelt}`
                                : `${inputFelt} `;
                        })}
                    </Undertittel>
                    <Normaltekst>
                        {tilleggInfoVedrorendeAktorRad.map(
                            (inputFelt, index) => {
                                return index < 2 ? `${inputFelt} ` : null;
                            }
                        )}
                    </Normaltekst>
                    <Normaltekst>
                        {tilleggInfoVedrorendeAktorRad.map(
                            (inputFelt, index) => {
                                return index > 1 ? `${inputFelt} ` : null;
                            }
                        )}
                    </Normaltekst>
                </div>
            );
        }
    } else {
        return FormaterFeilBeskjedPaManglendeFelt(
            nameRad,
            tilleggInfoVedrorendeAktorRad,
            headertxt,
            borderFarge
        );
    }
};

const FormaterFeilBeskjedPaManglendeFelt = (
    nameRad: string[],
    tilleggInfoVedrorendeAktorRad: string[],
    headertxt: string,
    borderFarge: string
) => {
    const hvaMangler = [];
    if (erDetFellesRad(nameRad)) {
        if (!(sjekkStrengVerdi(nameRad[0]) || sjekkStrengVerdi(nameRad[1]))) {
            hvaMangler.push('navn');
        }
        if (!sjekkStrengVerdi(tilleggInfoVedrorendeAktorRad[1])) {
            hvaMangler.push('tlfnr');
        }
    } else {
        if (!sjekkStrengVerdi(nameRad[0])) {
            hvaMangler.push('bedriftnavn');
        }
        if (!(sjekkStrengVerdi(nameRad[1]) || sjekkStrengVerdi(nameRad[2]))) {
            hvaMangler.push('navn');
        }
        if (!sjekkStrengVerdi(tilleggInfoVedrorendeAktorRad[1])) {
            hvaMangler.push('orgnr');
        }
        if (!sjekkStrengVerdi(tilleggInfoVedrorendeAktorRad[3])) {
            hvaMangler.push('tlfnr');
        }
    }

    if (hvaMangler.length > 1) {
        return (
            <div className={cls.element('content', borderFarge)}>
                <Normaltekst>{headertxt}</Normaltekst>
                <EtikettFokus className={cls.element('etikettInfo')}>
                    {hvaMangler.map((element, index) => {
                        if (index === 0) {
                            return `${element}`;
                        } else if (index === hvaMangler.length - 1) {
                            return ` og ${element}`;
                        } else {
                            return `, ${element}`;
                        }
                    })}
                    {' er ikke fylt ut'}
                </EtikettFokus>
            </div>
        );
    } else {
        return (
            <div className={cls.element('content', borderFarge)}>
                <Normaltekst>{headertxt}</Normaltekst>
                <nav />
                <EtikettFokus
                    className={cls.element('etikettInfo')}
                >{`${hvaMangler} er ikke fylt ut`}</EtikettFokus>
            </div>
        );
    }
};

const erDetFellesRad = (nameRad: string[]) => {
    return nameRad.length < 3;
};

export default Avtaleparter;
