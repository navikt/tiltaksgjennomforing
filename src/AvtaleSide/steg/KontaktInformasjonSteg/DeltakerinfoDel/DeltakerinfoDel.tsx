import { Input } from 'nav-frontend-skjema';
import * as React from 'react';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import TelefonnummerInput from '@/komponenter/TelefonnummerInput/TelefonnummerInput';
import { Avtaleparter, Deltakerinfo } from '@/types/avtale';
import { InputStegProps } from '@/AvtaleSide/input-steg-props';
import { Column, Container, Row } from 'nav-frontend-grid';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import { FunctionComponent, useContext } from 'react';
import { AvtaleContext } from '@/NyAvtaleProvider';

const DeltakerinfoDel: FunctionComponent = () => {
    const avtaleContext: InputStegProps<Deltakerinfo & Avtaleparter> = useContext(AvtaleContext);
    return (
        <Container fluid={true}>
            <Row className="">
                <Column md="12">
                    <SkjemaTittel>Informasjon om deltaker</SkjemaTittel>
                </Column>
            </Row>
            <Row className="">
                <Column md="6">
                    <Input label="Fødselsnummer" value={avtaleContext.avtale.deltakerFnr} disabled={true} />
                </Column>
            </Row>
            <Row className="">
                <Column md="6">
                    <PakrevdInput
                        label="Fornavn"
                        verdi={avtaleContext.avtale.deltakerFornavn}
                        settVerdi={verdi => avtaleContext.settAvtaleVerdi('deltakerFornavn', verdi)}
                    />
                </Column>
                <Column md="6">
                    <PakrevdInput
                        label="Etternavn"
                        verdi={avtaleContext.avtale.deltakerEtternavn}
                        settVerdi={verdi => avtaleContext.settAvtaleVerdi('deltakerEtternavn', verdi)}
                    />
                </Column>
            </Row>
            <Row className="">
                <Column md="6">
                    <TelefonnummerInput
                        label="Telefonnummer"
                        verdi={avtaleContext.avtale.deltakerTlf}
                        settVerdi={verdi => avtaleContext.settAvtaleVerdi('deltakerTlf', verdi)}
                    />
                </Column>
            </Row>
        </Container>
    );
};

export default DeltakerinfoDel;
