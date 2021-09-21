import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import BEMHelper from '@/utils/bem';
import './oppdatereKostnadssted.less';
import { AvtaleContext } from '@/AvtaleProvider';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import { oppdatereKostnadsstedet } from '@/services/rest-service';
import { Feilkode, Feilmeldinger } from '@/types/feilkode';
import { Avtale } from '@/types/avtale';
import { finnKostnadssted } from '@/utils/kostnadsstedUtils';

export interface Kostnadssted {
    enhet: string;
    enhetsnavn?: string;
}

const OppdatereKostnadssted: FunctionComponent = () => {
    const cls = BEMHelper('oppdatere-kostnadssted');
    const { avtale, oppdatereAvtaleContext } = useContext(AvtaleContext);
    const [feilmelding, setFeilmelding] = useState<string | undefined>(undefined);
    const [kostnadssted, setKostnadssted] = useState<Kostnadssted>(finnKostnadssted(avtale));
    const [nyttKostnadssted, setNyttKostnadssted] = useState<Kostnadssted>(kostnadssted);

    useEffect(() => {
        setKostnadssted(finnKostnadssted(avtale));
    }, [avtale]);

    const sendInnNyttKostnadssted = async () => {
        setFeilmelding(undefined);
        if (nyttKostnadssted.enhet !== kostnadssted.enhet) {
            try {
                const oppdatertAvtale: Avtale = await oppdatereKostnadsstedet(avtale.id, nyttKostnadssted);
                oppdatereAvtaleContext(oppdatertAvtale);
            } catch (err) {
                setFeilmelding((err as string).toString().split(':')?.[1].trim());
                console.warn('oppdatering av kostnadssted feilet. ', err);
            }
        } else {
            setFeilmelding('KOSTNADSSTED_LIK_OPPFOLGINGSENHET');
        }
    };
    const visningEnhetsnavntekst = kostnadssted.enhetsnavn ? 'Kostnadssted er valgt til ' : '';

    return avtale.gjeldendeTilskuddsperiode ? (
        <div className={cls.className}>
            <Undertittel>Kostnadssted</Undertittel>
            <SkjemaGruppe feil={Feilmeldinger[feilmelding as Feilkode]}>
                <div className={cls.element('input-wrapper')}>
                    <Input
                        value={nyttKostnadssted.enhet}
                        onChange={(event) =>
                            setNyttKostnadssted((prevState) => ({
                                ...prevState,
                                enhet: event.target.value,
                                enhetsnavn: undefined,
                            }))
                        }
                        bredde="S"
                    />
                    <Knapp mini={true} onClick={sendInnNyttKostnadssted}>
                        Oppdater
                    </Knapp>
                </div>
                <Normaltekst className={cls.element('input-undertekst')}>
                    <span>{visningEnhetsnavntekst}</span>
                    <span>{kostnadssted.enhetsnavn ?? 'Enhetsnavn ikke funnet'}</span>
                </Normaltekst>
            </SkjemaGruppe>
        </div>
    ) : null;
};
export default OppdatereKostnadssted;
