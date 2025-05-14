import { Column, Row } from '@/komponenter/NavGrid/Grid';
import { Avtaleopphav } from '@/types';
import BEMHelper from '@/utils/bem';
import { Alert, BodyShort } from '@navikt/ds-react';
import React from 'react';

interface Props {
    erNavAnsatt: boolean;
    className: string;
    opphav: Avtaleopphav;
}

const EtterregistreringInstruks: React.FC<Props> = ({ erNavAnsatt, className, opphav }: Props) => {
    if (!erNavAnsatt) {
        return null;
    }
    if ('ARENA' === opphav) {
        return null;
    }

    const cls = BEMHelper(className);
    return (
        <Row className={cls.element('rad')}>
            <Column md="12">
                <Alert variant="info" className={cls.element('info-veileder')}>
                    <BodyShort size="small">
                        Hvis startdato er tidligere enn 7 dager tilbake i tid, må du først be beslutter om å åpne opp
                        for etterregistrering før du kan velge startdato i avtalen. Send med avtalenummeret til
                        beslutter.
                    </BodyShort>
                </Alert>
            </Column>
        </Row>
    );
};
export default EtterregistreringInstruks;
