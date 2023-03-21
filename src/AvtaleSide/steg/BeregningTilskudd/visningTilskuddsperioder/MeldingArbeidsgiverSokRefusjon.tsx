import React, { useContext } from 'react';
import { BodyShort, Heading, Label } from '@navikt/ds-react';
import { formatterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import BEMHelper from '@/utils/bem';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';

interface Props {
    className: string;
    sluttdato: string;
}

const MeldingArbeidsgiverSokRefusjon: React.FC<Props> = ({ className, sluttdato }: Props) => {
    const { rolle } = useContext(InnloggetBrukerContext);
    if (rolle !== 'ARBEIDSGIVER') return null;

    const cls = BEMHelper(className);

    return (
        <div className={cls.element('melding-arbeidsgiver')}>
            <Heading size="small">Refusjon</Heading>
            <BodyShort className={cls.element('melding-arbeidsgiver-text')} size="small">
                Som arbeidsgiver må du søke om refusjon. Du kan først søke etter at perioden er over. Når tiltaket er
                over, vil NAV sende dere et ferdig utregnet forslag til refusjon. Refusjonen regnes ut på bakgrunn av
                innhold i avtalen og innrapporterte inntekter i A-meldingen.
            </BodyShort>
            <Label>Du kan søke om refusjon fra {formatterDato(sluttdato, NORSK_DATO_FORMAT)}</Label>
        </div>
    );
};
export default MeldingArbeidsgiverSokRefusjon;
