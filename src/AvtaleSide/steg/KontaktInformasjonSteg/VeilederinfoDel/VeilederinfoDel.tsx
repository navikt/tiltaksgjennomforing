import { AvtaleContext } from '@/AvtaleProvider';
import { InputStegProps } from '@/AvtaleSide/input-steg-props';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import TelefonnummerInput from '@/komponenter/TelefonnummerInput/TelefonnummerInput';
import { Veilederinfo } from '@/types/avtale';
import { Column, Container, Row } from 'nav-frontend-grid';
import * as React from 'react';
import { useContext } from 'react';

const VeilederinfoDel = () => {
    const avtaleContext: InputStegProps<Veilederinfo> = useContext(AvtaleContext);

    return (
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
                        verdi={avtaleContext.avtale.veilederFornavn}
                        settVerdi={verdi => avtaleContext.settAvtaleVerdi('veilederFornavn', verdi)}
                    />
                </Column>
                <Column md="6">
                    <PakrevdInput
                        label="Etternavn"
                        verdi={avtaleContext.avtale.veilederEtternavn}
                        settVerdi={verdi => avtaleContext.settAvtaleVerdi('veilederEtternavn', verdi)}
                    />
                </Column>
            </Row>
            <Row className="">
                <Column md="12">
                    <TelefonnummerInput
                        label="Telefonnummer"
                        verdi={avtaleContext.avtale.veilederTlf}
                        settVerdi={verdi => avtaleContext.settAvtaleVerdi('veilederTlf', verdi)}
                    />
                </Column>
            </Row>
        </Container>
    );
};

export default VeilederinfoDel;
