import React from 'react';
import { erDatoTilbakeITid } from '@/utils/datoUtils';
import { Alert, ErrorMessage } from '@navikt/ds-react';
import BEMHelper from '@/utils/bem';
import { erNil } from '@/utils/predicates';

interface Props {
    startDato: string | undefined;
    erArbeidsgiverOgUfordelt: boolean;
    className: string;
    sommerjobbDeltakerOver30VedStartdato: boolean;
}

const VarighetTilbakeTidAlert: React.FC<Props> = ({
    startDato,
    erArbeidsgiverOgUfordelt,
    className,
    sommerjobbDeltakerOver30VedStartdato,
}: Props) => {
    const cls = BEMHelper(className);

    return (
        <div className={cls.element('rad')}>
            {sommerjobbDeltakerOver30VedStartdato && (
                <Alert variant="warning" className={cls.element('sommerjobb-deltaker-over30-alert')}>
                    Deltaker kan ikke ha fylt 30 år før startdatoen. Det vil ikke være mulig å starte opp avtalen.
                </Alert>
            )}
            {!erNil(startDato) && erDatoTilbakeITid(startDato) && (
                <>
                    {erArbeidsgiverOgUfordelt && (
                        <ErrorMessage className={cls.element('er-arbeidsgiver-ufordelt')}>
                            Dato kan ikke være tilbake i tid
                        </ErrorMessage>
                    )}
                    {!erArbeidsgiverOgUfordelt && (
                        <Alert variant="info" className={cls.element('er-arbeidsgiver-ikke-ufordelt')}>
                            Obs! Datoen er tilbake i tid.
                        </Alert>
                    )}
                </>
            )}
        </div>
    );
};
export default VarighetTilbakeTidAlert;
