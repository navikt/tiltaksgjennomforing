import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import * as React from 'react';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import TelefonnummerInput from '@/komponenter/TelefonnummerInput/TelefonnummerInput';
import { Arbeidsgiverinfo, Bedriftinfo } from '@/types/avtale';
import { InputStegProps } from '@/AvtaleSide/input-steg-props';
import { Column, Container, Row } from 'nav-frontend-grid';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';

const ArbeidsgiverinfoDel = (props: InputStegProps<Bedriftinfo & Arbeidsgiverinfo>) => (
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
        </SkjemaGruppe>
    </Container>
);

export default ArbeidsgiverinfoDel;
