import * as _ from 'lodash';
import { Input } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import TelefonnummerInput from '@/komponenter/TelefonnummerInput/TelefonnummerInput';
import './DeltakerinfoDel.less';
import { Avtaleparter, Deltakerinfo } from '@/types/avtale';
import { InputStegProps } from '@/AvtaleSide/input-steg-props';
import { Column, Container, Row } from 'nav-frontend-grid';

const DeltakerinfoDel = (props: InputStegProps<Deltakerinfo & Avtaleparter>) => (
    <Container fluid={true}>
        <Row className="">
            <Column>
                <Systemtittel className="deltakerinfo__tittel">Informasjon om deltaker</Systemtittel>
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
                    settVerdi={_.partial(props.settAvtaleVerdi, 'deltakerFornavn')}
                />
            </Column>
            <Column md="6">
                <PakrevdInput
                    label="Etternavn"
                    verdi={props.avtale.deltakerEtternavn}
                    settVerdi={_.partial(props.settAvtaleVerdi, 'deltakerEtternavn')}
                />
            </Column>
        </Row>
        <Row className="">
            <Column md="6">
                <TelefonnummerInput
                    label="Telefonnummer"
                    verdi={props.avtale.deltakerTlf}
                    settVerdi={_.partial(props.settAvtaleVerdi, 'deltakerTlf')}
                />
            </Column>
        </Row>
    </Container>
);

export default DeltakerinfoDel;
