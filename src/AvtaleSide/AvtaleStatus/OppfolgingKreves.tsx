import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { formaterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { Alert, BodyShort, Heading, Label } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

interface Props {
    avtaleInngått?: string;
    startDato?: string;
    gjeldendeTilskuddsPeriodeSluttdato?: string;
}

const OppfolgingKreves: FunctionComponent<Props> = ({ gjeldendeTilskuddsPeriodeSluttdato }) => {
    return (
        <Innholdsboks /* ariaLabel={header} style={{ backgroundColor: '#FFECCC' }} */>
            <Heading level="2" size="medium">
                Oppfølging av deltaker og arbeidsgiver kreves
            </Heading>
            <VerticalSpacer rem={1} />
            <BodyShort size="small">
                Tiltaket har pågått i 6 måneder hvor arbeidsgiver har fått utbetalt refusjoner automatisk. Det må
                foretas en oppfølging av tiltaket med deltaker og arbeidsgiver og gjøres en vurdering om tiltaket skal
                fortsette for de neste 6 månedene.
            </BodyShort>
            <VerticalSpacer rem={1} />
            <Alert variant="warning" /*className={cls.element('alert')}*/>
                <Label size="small">
                    Oppfølging kreves innen {formaterDato(gjeldendeTilskuddsPeriodeSluttdato!, NORSK_DATO_FORMAT)}
                </Label>
                <VerticalSpacer rem={0.5} />
                <BodyShort size="small">
                    Hvis tiltaket skal avsluttes så må avtalen avsluttes. Hvis oppfølging av tiltaket har blitt
                    gjennomført og det er vurdert at tiltaket skal fortsette så trykk på «fortsett tiltak» i menyen.
                </BodyShort>
            </Alert>
        </Innholdsboks>
    );
};

export default OppfolgingKreves;
