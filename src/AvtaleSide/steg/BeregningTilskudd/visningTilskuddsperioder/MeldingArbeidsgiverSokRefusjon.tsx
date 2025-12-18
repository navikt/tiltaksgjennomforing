import React, { useContext } from 'react';
import { BodyShort, Heading, Label } from '@navikt/ds-react';
import { formaterDato, NORSK_DATO_FORMAT_FULL } from '@/utils/datoUtils';
import BEMHelper from '@/utils/bem';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { Avtale } from '@/types/avtale';

interface Props {
    className: string;
    avtale: Avtale;
}

const erAutomatiskUtbetalingAvRefusjon = (avtale: Avtale) => {
    return avtale.tiltakstype === 'VTAO' || avtale.tiltakstype === 'MENTOR';
};

const MeldingArbeidsgiverSokRefusjon: React.FC<Props> = ({ className, avtale }: Props) => {
    const { rolle } = useContext(InnloggetBrukerContext);
    const sluttdato = avtale.tilskuddPeriode[0].sluttDato;
    if (rolle !== 'ARBEIDSGIVER') return null;
    if (erAutomatiskUtbetalingAvRefusjon(avtale)) return null;

    const cls = BEMHelper(className);

    return (
        <div className={cls.element('melding-arbeidsgiver')}>
            <Heading size="small">Refusjon</Heading>
            <BodyShort className={cls.element('melding-arbeidsgiver-text')} size="small">
                Som arbeidsgiver må du søke om refusjon. Du kan først søke etter at perioden er over. Når
                tilskuddsperioden er over, vil NAV sende dere et ferdig utregnet forslag til refusjon. Refusjonen regnes
                ut på bakgrunn av innhold i avtalen og innrapporterte inntekter i A-meldingen.
            </BodyShort>
            <Label>Du kan søke om refusjon fra {formaterDato(sluttdato, NORSK_DATO_FORMAT_FULL)}</Label>
        </div>
    );
};
export default MeldingArbeidsgiverSokRefusjon;
