import * as React from 'react';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import TelefonnummerInput from '@/komponenter/TelefonnummerInput/TelefonnummerInput';
import { Veilederinfo } from '@/types/avtale';
import { InputStegProps } from '@/AvtaleSide/input-steg-props';
import { Column, Container, Row } from 'nav-frontend-grid';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';

const VeilederinfoDel = (props: InputStegProps<Veilederinfo>) => (
    <Container fluid={true}>
        <Row className="">
            <Column md="12">
                <SkjemaTittel>Kontaktperson i NAV</SkjemaTittel>
            </Column>
        </Row>
        <Row className="">
            <Column md="6">
                <PakrevdInput
                    label="Fornavn"
                    verdi={props.avtale.veilederFornavn}
                    settVerdi={verdi => props.settAvtaleVerdi('veilederFornavn', verdi)}
                />
            </Column>
            <Column md="6">
                <PakrevdInput
                    label="Etternavn"
                    verdi={props.avtale.veilederEtternavn}
                    settVerdi={verdi => props.settAvtaleVerdi('veilederEtternavn', verdi)}
                />
            </Column>
        </Row>
        <Row className="">
            <Column md="12">
                <TelefonnummerInput
                    label="Telefonnummer"
                    verdi={props.avtale.veilederTlf}
                    settVerdi={verdi => props.settAvtaleVerdi('veilederTlf', verdi)}
                />
            </Column>
        </Row>
    </Container>
);

export default VeilederinfoDel;
