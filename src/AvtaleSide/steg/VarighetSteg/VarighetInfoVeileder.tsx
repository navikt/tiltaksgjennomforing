import React from 'react';
import { Column, Row } from '@/komponenter/NavGrid/Grid';
import { Alert, BodyShort } from '@navikt/ds-react';
import BEMHelper from '@/utils/bem';

interface Props {
    erNavAnsatt: boolean;
    className: string;
}

const VarighetInfoVeileder: React.FC<Props> = ({ erNavAnsatt, className }: Props) => {
    if (!erNavAnsatt) {
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
export default VarighetInfoVeileder;
