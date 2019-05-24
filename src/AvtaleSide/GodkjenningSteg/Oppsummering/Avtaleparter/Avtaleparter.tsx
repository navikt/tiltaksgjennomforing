import EtikettFokus from 'nav-frontend-etiketter/lib/etikettfokus';
import { Normaltekst, Undertittel, Undertekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent } from 'react';
import BEMHelper from '../../../../utils/bem';
import {
    Arbeidsgiverinfo,
    Bedriftinfo,
    Deltakerinfo,
    Veilederinfo,
} from '../../../avtale';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import './Avtaleparter.less';
import AvtaleparterHeaderIkon from './AvtalepartnerHeaderIkon';

const cls = BEMHelper('avtaleparter');

const storForbokstav = (streng: string) =>
    streng.charAt(0).toUpperCase() + streng.slice(1);

interface Felt {
    felt: string;
    verdi: string;
}

interface Props {
    navnFelter: Felt[];
    tilleggFelter: Felt[];
    overskrift: string;
    borderFarge: string;
}

const Avtalepart: FunctionComponent<Props> = props => {
    const alleFelter = props.navnFelter.concat(props.tilleggFelter);
    const hvaMangler = alleFelter
        .filter(felt => !felt.verdi)
        .map(felt => felt.felt);

    let innhold;
    if (hvaMangler.length > 0) {
        innhold = (
            <EtikettFokus className={cls.element('etikettInfo')}>
                {storForbokstav(hvaMangler.join(', ') + ' er ikke fylt ut')}
            </EtikettFokus>
        );
    } else {
        innhold = (
            <>
                <Undertittel>
                    {props.navnFelter.map(felt => felt.verdi).join(' ')}
                </Undertittel>
                <Normaltekst>
                    {props.tilleggFelter
                        .map(
                            felt =>
                                storForbokstav(felt.felt) + ': ' + felt.verdi
                        )
                        .reduce(
                            (beholder: any, element) =>
                                beholder === null
                                    ? [element]
                                    : [...beholder, <br />, element],
                            null
                        )}
                </Normaltekst>
            </>
        );
    }

    return (
        <div className={cls.element('content', props.borderFarge)}>
            <Undertekst>{props.overskrift}</Undertekst>
            {innhold}
        </div>
    );
};

const Avtaleparter: FunctionComponent<
    Deltakerinfo & Arbeidsgiverinfo & Veilederinfo & Bedriftinfo
> = ({
    deltakerFornavn,
    deltakerEtternavn,
    arbeidsgiverFornavn,
    arbeidsgiverEtternavn,
    veilederFornavn,
    veilederEtternavn,
    deltakerFnr,
    veilederTlf,
    arbeidsgiverTlf,
    bedriftNr,
    bedriftNavn,
}) => (
    <Stegoppsummering
        tittel="Avtalens parter"
        ikon={<AvtaleparterHeaderIkon />}
    >
        <div>
            <Avtalepart
                navnFelter={[
                    { felt: 'fornavn', verdi: deltakerFornavn },
                    { felt: 'etternavn', verdi: deltakerEtternavn },
                ]}
                tilleggFelter={[
                    {
                        felt: 'fødselsnummer',
                        verdi: deltakerFnr,
                    },
                ]}
                overskrift="deltaker"
                borderFarge="farge-gronn"
            />
            <Avtalepart
                navnFelter={[
                    {
                        felt: 'bedriftnavn',
                        verdi: bedriftNavn,
                    },
                    {
                        felt: 'fornavn',
                        verdi:
                            arbeidsgiverFornavn && 'v/ ' + arbeidsgiverFornavn,
                    },
                    { felt: 'etternavn', verdi: arbeidsgiverEtternavn },
                ]}
                tilleggFelter={[
                    {
                        felt: 'bedriftsnummer',
                        verdi: bedriftNr,
                    },
                    {
                        felt: 'telefon',
                        verdi: arbeidsgiverTlf,
                    },
                ]}
                overskrift="arbeidsgiver"
                borderFarge="farge-graa"
            />
            <Avtalepart
                navnFelter={[
                    { felt: 'fornavn', verdi: veilederFornavn },
                    { felt: 'etternavn', verdi: veilederEtternavn },
                ]}
                tilleggFelter={[
                    {
                        felt: 'telefon',
                        verdi: veilederTlf,
                    },
                ]}
                overskrift="NAV-veileder"
                borderFarge="farge-lysblaa"
            />
        </div>
    </Stegoppsummering>
);

export default Avtaleparter;
