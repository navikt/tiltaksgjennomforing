import React from 'react';
import moment from 'moment/moment';
import { Alert, BodyShort } from '@navikt/ds-react';
import { formatterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { TiltaksType } from '@/types/avtale';
import BEMHelper from '@/utils/bem';

interface Props {
    tiltakstype: TiltaksType;
    startDato: string | undefined;
    erRyddeAvtale: boolean;
    erNavAnsatt: boolean;
    className: string;
}

const InfoArenaOppryddingAlert: React.FC<Props> = ({
    tiltakstype,
    startDato,
    erRyddeAvtale,
    erNavAnsatt,
    className,
}: Props) => {
    const skalViseAlert =
        ['MIDLERTIDIG_LONNSTILSKUDD', 'VARIG_LONNSTILSKUDD'].includes(tiltakstype) &&
        moment(startDato).isBefore('2023-02-01') &&
        !erRyddeAvtale &&
        erNavAnsatt;

    if (!skalViseAlert) {
        return null;
    }

    const cls = BEMHelper(className);
    return (
        <Alert variant="warning" className={cls.element('info-arena-opprydding-alert')}>
            <div className={cls.element('info-arena-opprydding-container')}>
                <div className={cls.element('info-arena-opprydding-avsnitt')}>
                    <BodyShort size="small">
                        Du har oppgitt startdato som er før 01.02.2023 uten å huke av for at avtalen skal overføres fra
                        arena. Dette vil dermed bli behandlet som en ny avtale, som aldri har vært behandlet i Arena
                        før, med tilsagn/tilskuddsperioder fra {formatterDato(startDato!, NORSK_DATO_FORMAT)}.
                    </BodyShort>
                </div>
                <div className={cls.element('info-arena-opprydding-avsnitt')}>
                    <BodyShort size="small">
                        Hvis dette er en avtale som tidligere har vært behandlet i Arena, må du annullere denne og
                        opprette en ny, hvor du huker av for at avtalen skal overføres fra Arena.
                    </BodyShort>
                </div>
            </div>
        </Alert>
    );
};
export default InfoArenaOppryddingAlert;
