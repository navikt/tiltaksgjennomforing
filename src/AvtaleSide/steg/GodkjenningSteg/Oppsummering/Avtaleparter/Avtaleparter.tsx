import { Avtale } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { storForbokstav } from '@/utils/stringUtils';
import EtikettFokus from 'nav-frontend-etiketter/lib/etikettfokus';
import { Normaltekst, Undertekst, Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent } from 'react';
import HvaManglerOppsummering from '../HvaManglerOppsummering';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import './Avtaleparter.less';
import AvtaleparterHeaderIkon from './AvtalepartnerHeaderIkon';

const cls = BEMHelper('avtaleparter');

interface Felt {
    felt: string;
    verdi: string;
}

interface Props {
    navnFelter: Felt[];
    tilleggFelter: Felt[];
    overskrift: string;
    borderFarge: string;
    skjulHvaMangler: boolean;
}

export const Avtalepart: FunctionComponent<Props> = props => {
    const alleFelter = props.navnFelter.concat(props.tilleggFelter);
    const hvaMangler = props.skjulHvaMangler ? [] : alleFelter.filter(felt => !felt.verdi).map(felt => felt.felt);

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
                <Undertittel>{props.navnFelter.map(felt => felt.verdi).join(' ')}</Undertittel>
                <Normaltekst>
                    {props.tilleggFelter
                        .map(felt => storForbokstav(felt.felt) + ': ' + (felt.verdi || ''))
                        .reduce(
                            (beholder: any, element) =>
                                beholder === null ? [element] : [...beholder, <br key={element} />, element],
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

const Avtaleparter: FunctionComponent<Avtale> = ({
    deltakerFornavn,
    deltakerEtternavn,
    arbeidsgiverFornavn,
    arbeidsgiverEtternavn,
    veilederFornavn,
    veilederEtternavn,
    deltakerFnr,
    deltakerTlf,
    veilederTlf,
    arbeidsgiverTlf,
    bedriftNr,
    bedriftNavn,
    erLaast,
    harFamilietilknytning,
    familietilknytningForklaring,
    tiltakstype,
}) => (
    <Stegoppsummering tittel="Avtalens parter" ikon={<AvtaleparterHeaderIkon />}>
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
                    {
                        felt: 'telefon',
                        verdi: deltakerTlf,
                    },
                ]}
                overskrift="Deltaker"
                borderFarge="farge-gronn"
                skjulHvaMangler={erLaast}
            />
            <Avtalepart
                navnFelter={[
                    {
                        felt: 'bedriftnavn',
                        verdi: bedriftNavn,
                    },
                    {
                        felt: 'fornavn',
                        verdi: arbeidsgiverFornavn && 'v/ ' + arbeidsgiverFornavn,
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
                overskrift="Arbeidsgiver"
                borderFarge="farge-graa"
                skjulHvaMangler={erLaast}
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
                skjulHvaMangler={erLaast}
            />

            {['MIDLERTIDIG_LONNSTILSKUDD', 'VARIG_LONNSTILSKUDD'].includes(tiltakstype) && (
                <div className={cls.element('content', 'farge-graa')}>
                    <Undertekst>Relasjoner</Undertekst>
                    <HvaManglerOppsummering
                        avhengigFelter={{
                            harFamilietilknytning: harFamilietilknytning !== null,
                            familietilknytningForklaring: harFamilietilknytning ? familietilknytningForklaring : 'true',
                        }}
                    >
                        <Normaltekst>
                            Er det familiære eller økonomiske relasjoner mellom arbeidsgiveren og deltakeren?
                        </Normaltekst>
                        <Normaltekst>{harFamilietilknytning ? 'Ja' : ' Nei'}</Normaltekst>
                        {familietilknytningForklaring && (
                            <Normaltekst>Forklaring: {familietilknytningForklaring}</Normaltekst>
                        )}
                    </HvaManglerOppsummering>
                </div>
            )}
        </div>
    </Stegoppsummering>
);

export default Avtaleparter;
