import { Input } from 'nav-frontend-skjema';
import * as React from 'react';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import TelefonnummerInput from '@/komponenter/TelefonnummerInput/TelefonnummerInput';
import { Avtaleparter, Deltakerinfo } from '@/types/avtale';
import { InputStegProps } from '@/AvtaleSide/input-steg-props';
import { Column, Container, Row } from 'nav-frontend-grid';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';

const DeltakerinfoDel = (props: InputStegProps<Deltakerinfo & Avtaleparter>) => (
    <Container fluid={true}>
        <Row className="">
            <Column md="12">
                <SkjemaTittel>Informasjon om deltaker</SkjemaTittel>
            </Column>
        </Row>
        <Row className="">
            <Column md="6">
                <Input label="Fødselsnummer" value={props.avtale.deltakerFnr} disabled={true} />
            </Column>
        </Row>
        <Row className="">
            <Column md="6">
                <PakrevdInput
                    label="Fornavn"
                    verdi={props.avtale.deltakerFornavn}
                    settVerdi={verdi => props.settAvtaleVerdi('deltakerFornavn', verdi)}
                />
            </Column>
            <Column md="6">
                <PakrevdInput
                    label="Etternavn"
                    verdi={props.avtale.deltakerEtternavn}
                    settVerdi={verdi => props.settAvtaleVerdi('deltakerEtternavn', verdi)}
                />
            </Column>
        </Row>
        <Row className="">
            <Column md="6">
                <TelefonnummerInput
                    label="Telefonnummer"
                    verdi={props.avtale.deltakerTlf}
                    settVerdi={verdi => props.settAvtaleVerdi('deltakerTlf', verdi)}
                />
            </Column>
        </Row>
    </Container>
);

export default DeltakerinfoDel;
