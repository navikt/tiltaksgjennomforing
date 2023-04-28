import React from 'react';
import { TiltaksType } from '@/types/avtale';
import { BodyShort } from '@navikt/ds-react';
import BEMHelper from '@/utils/bem';

interface Props {
    tiltakstype: TiltaksType;
    className: string;
}

const VarighetIngress: React.FC<Props> = ({ tiltakstype, className }: Props) => {
    const cls = BEMHelper(className);
    return (
        <BodyShort size="small" className={cls.element('ingress')}>
            {['SOMMERJOBB'].includes(tiltakstype) ? (
                <>
                    Tiltaket må ha oppstart i perioden 1/6 - 31/8. Fyll ut startdato og forventet sluttdato. Veileder
                    kan sette startdato 7 dager før dagens dato, mens beslutter kan åpne opp for etterregistrering
                    lenger tilbake i tid.
                </>
            ) : (
                <>Fyll ut startdato og forventet sluttdato. Bare veileder kan sette dato før dagens dato.</>
            )}
            <> Hvor lenge det er behov for tiltaket må vurderes underveis i perioden.</>
            {['MIDLERTIDIG_LONNSTILSKUDD', 'VARIG_LONNSTILSKUDD'].includes(tiltakstype) && (
                <>
                    {' '}
                    Godkjent tilskuddsperiode er styrende i henhold til økonomisk forpliktelse fra NAV og kan avvike fra
                    avtalt periode for tiltaksgjennomføringen.
                </>
            )}
        </BodyShort>
    );
};
export default VarighetIngress;
