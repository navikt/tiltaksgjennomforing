import { Avtaleopphav, TiltaksType } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { Alert, BodyShort } from '@navikt/ds-react';
import { isBefore } from 'date-fns';
import React from 'react';
import { formaterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';

interface Props {
    tiltakstype: TiltaksType;
    startDato: string;
    erRyddeAvtale: boolean;
    erNavAnsatt: boolean;
    className: string;
    opphav: Avtaleopphav;
}

const migreringsdatoForTiltakstype = (tiltakstype: TiltaksType): string | null => {
    if (['MIDLERTIDIG_LONNSTILSKUDD', 'VARIG_LONNSTILSKUDD'].includes(tiltakstype)) {
        return '2023-02-01';
    } else if (tiltakstype === 'VTAO') {
        return '2025-07-01';
    } else {
        return null;
    }
};

const InfoArenaOppryddingAlert: React.FC<Props> = ({
    tiltakstype,
    startDato,
    erRyddeAvtale,
    erNavAnsatt,
    className,
    opphav,
}: Props) => {
    const migreringsdato: string | null = migreringsdatoForTiltakstype(tiltakstype);

    const skalViseAlert =
        migreringsdato &&
        startDato &&
        isBefore(startDato, migreringsdato) &&
        !erRyddeAvtale &&
        'ARENA' !== opphav &&
        erNavAnsatt;

    if (!skalViseAlert) {
        return null;
    }

    const norskMigreringsdato = formaterDato(migreringsdato, NORSK_DATO_FORMAT);

    const cls = BEMHelper(className);
    return (
        <Alert variant="warning" className={cls.element('info-arena-opprydding-alert')}>
            <div className={cls.element('info-arena-opprydding-alert-innhold')}>
                <BodyShort size="small">Du har oppgitt en startdato som er før {norskMigreringsdato}</BodyShort>
                <BodyShort size="small">
                    Du må sjekke om det er utbetalt refusjon i Arena før {norskMigreringsdato} for å forhindre dobbel
                    utbetaling av tilskudd. Dersom det allerede er refundert tilskudd, må startdato i avtalen tidligst
                    være dagen etter siste refunderte tilskuddsperiode. Hvis det ligger en avsluttet avtale fra
                    tidligere så anbefales det at du gjenåpner («forleng avtale») istedenfor å opprette en ny.
                </BodyShort>
            </div>
        </Alert>
    );
};
export default InfoArenaOppryddingAlert;
