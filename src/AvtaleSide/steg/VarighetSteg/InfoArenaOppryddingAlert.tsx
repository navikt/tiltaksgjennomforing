import React from 'react';
import moment from 'moment/moment';
import { Alert, BodyShort } from '@navikt/ds-react';
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
                    <BodyShort size="small">Du har oppgitt en startdato som er før 01.02.2023</BodyShort>
                </div>
                <div className={cls.element('info-arena-opprydding-avsnitt')}>
                    <BodyShort size="small">
                        Du må sjekke om det er utbetalt refusjon i Arena før 01.02.2023 for å forhindre dobbel
                        utbetaling av tilskudd. Dersom det allerede er refundert tilskudd, må startdato i avtalen
                        tidligst være dagen etter siste refunderte tilskuddsperiode. Hvis det ligger en avsluttet avtale
                        fra tidligere så anbefales det at du gjenåpner («forleng avtale») istedenfor å opprette en ny.
                    </BodyShort>
                </div>
            </div>
        </Alert>
    );
};
export default InfoArenaOppryddingAlert;
