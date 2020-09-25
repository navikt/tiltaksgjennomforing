import { Rolle } from '@/AvtaleContext';
import { InputStegProps } from '@/AvtaleSide/input-steg-props';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import TelefonnummerInput from '@/komponenter/TelefonnummerInput/TelefonnummerInput';
import { Arbeidsgiverinfo, AvtaleMetadata, Avtaleparter, Bedriftinfo, RelasjonerInfo } from '@/types/avtale';
import { Column, Container, Row } from 'nav-frontend-grid';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import * as React from 'react';
import Relasjoner from './Relasjoner';

const ArbeidsgiverinfoDel = (
    props: InputStegProps<Avtaleparter & Bedriftinfo & Arbeidsgiverinfo & RelasjonerInfo & AvtaleMetadata> & {
        rolle: Rolle;
    }
) => (
    <Container fluid={true}>
        <Row className="">
            <Column md="12">
                <SkjemaTittel>Informasjon om arbeidsgiver</SkjemaTittel>
            </Column>
        </Row>
        <SkjemaGruppe title="Om bedriften">
            <Row className="">
                <Column md="6">
                    <PakrevdInput
                        label="Bedriftens navn"
                        verdi={props.avtale.bedriftNavn}
                        settVerdi={verdi => props.settAvtaleVerdi('bedriftNavn', verdi)}
                    />
                </Column>
                <Column md="6">
                    <Input label="Bedriftsnummer" value={props.avtale.bedriftNr} disabled={true} />
                </Column>
            </Row>
        </SkjemaGruppe>
        <VerticalSpacer twentyPx={true} />
        <SkjemaGruppe title="Kontaktperson for avtalen">
            <Row className="">
                <Column md="6">
                    <PakrevdInput
                        label="Fornavn"
                        verdi={props.avtale.arbeidsgiverFornavn}
                        settVerdi={verdi => props.settAvtaleVerdi('arbeidsgiverFornavn', verdi)}
                    />
                </Column>
                <Column md="6">
                    <PakrevdInput
                        label="Etternavn"
                        verdi={props.avtale.arbeidsgiverEtternavn}
                        settVerdi={verdi => props.settAvtaleVerdi('arbeidsgiverEtternavn', verdi)}
                    />
                </Column>
            </Row>
            <Row className="">
                <Column md="12">
                    <TelefonnummerInput
                        label="Telefonnummer"
                        verdi={props.avtale.arbeidsgiverTlf}
                        settVerdi={verdi => props.settAvtaleVerdi('arbeidsgiverTlf', verdi)}
                    />
                </Column>
            </Row>
            <VerticalSpacer rem={2} />
            {['MIDLERTIDIG_LONNSTILSKUDD', 'VARIG_LONNSTILSKUDD'].includes(props.avtale.tiltakstype) && (
                <Relasjoner {...props} />
            )}
        </SkjemaGruppe>
    </Container>
);

export default ArbeidsgiverinfoDel;
