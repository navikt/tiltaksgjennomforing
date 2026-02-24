import { Column, Row } from '@/komponenter/NavGrid/Grid';
import BEMHelper from '@/utils/bem';
import { Alert } from '@navikt/ds-react';
import React from 'react';

interface Props {
    className: string;
}

const EtterregistreringInstruks: React.FC<Props> = ({ className }: Props) => {
    const cls = BEMHelper(className);
    return (
        <Row className={cls.element('rad')}>
            <Column md="12">
                <Alert variant="info" className={cls.element('info-veileder')} size="small">
                    Hvis startdato er tidligere enn 7 dager tilbake i tid, må du først be beslutter om å åpne opp for
                    etterregistrering før du kan velge startdato i avtalen. Send med avtalenummeret til beslutter.
                </Alert>
            </Column>
        </Row>
    );
};
export default EtterregistreringInstruks;
