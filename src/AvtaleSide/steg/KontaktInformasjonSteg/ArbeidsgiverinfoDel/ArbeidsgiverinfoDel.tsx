import { AvtaleContext } from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import TelefonnummerInput from '@/komponenter/TelefonnummerInput/TelefonnummerInput';
import { Column, Container, Row } from 'nav-frontend-grid';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import * as React from 'react';
import { useContext } from 'react';
import Relasjoner from './Relasjoner';

const ArbeidsgiverinfoDel = () => {
    const { avtale, settAvtaleVerdi } = useContext(AvtaleContext);
    return (
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
                            verdi={avtale.bedriftNavn}
                            settVerdi={verdi => settAvtaleVerdi('bedriftNavn', verdi)}
                        />
                    </Column>
                    <Column md="6">
                        <Input label="Bedriftsnummer" value={avtale.bedriftNr} disabled={true} />
                    </Column>
                </Row>
            </SkjemaGruppe>
            <VerticalSpacer twentyPx={true} />
            <SkjemaGruppe title="Kontaktperson for avtalen">
                <Row className="">
                    <Column md="6">
                        <PakrevdInput
                            label="Fornavn"
                            verdi={avtale.arbeidsgiverFornavn}
                            settVerdi={verdi => settAvtaleVerdi('arbeidsgiverFornavn', verdi)}
                        />
                    </Column>
                    <Column md="6">
                        <PakrevdInput
                            label="Etternavn"
                            verdi={avtale.arbeidsgiverEtternavn}
                            settVerdi={verdi => settAvtaleVerdi('arbeidsgiverEtternavn', verdi)}
                        />
                    </Column>
                </Row>
                <Row className="">
                    <Column md="12">
                        <TelefonnummerInput
                            label="Telefonnummer"
                            verdi={avtale.arbeidsgiverTlf}
                            settVerdi={verdi => settAvtaleVerdi('arbeidsgiverTlf', verdi)}
                        />
                    </Column>
                </Row>
                <VerticalSpacer rem={2} />
                {['MIDLERTIDIG_LONNSTILSKUDD', 'VARIG_LONNSTILSKUDD'].includes(avtale.tiltakstype) && <Relasjoner />}
            </SkjemaGruppe>
        </Container>
    );
};

export default ArbeidsgiverinfoDel;
