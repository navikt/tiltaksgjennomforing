import React, { FunctionComponent, useContext, useState } from 'react';
import BEMHelper from '@/utils/bem';
import './oppdatereKostnadssted.less';
import { AvtaleContext } from '@/AvtaleProvider';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import { oppdatereKostnadsstedet } from '@/services/rest-service';
import { Feilkode, Feilmeldinger } from '@/types/feilkode';

export interface Kostnadssted {
    enhet: string;
    enhetsnavn?: string;
}

const OppdatereKostnadssted: FunctionComponent = () => {
    const cls = BEMHelper('oppdatere-kostnadssted');
    const { avtale } = useContext(AvtaleContext);
    const [feilmelding, setFeilmelding] = useState<string | undefined>(undefined);

    const finnKostnadssted = (): Kostnadssted => {
        if (avtale.gjeldendeTilskuddsperiode?.enhet) {
            return {
                enhet: avtale.gjeldendeTilskuddsperiode.enhet,
                enhetsnavn: avtale.gjeldendeTilskuddsperiode.enhetsnavn ?? '',
            };
        } else if (avtale.enhetOppfolging) {
            return { enhet: avtale.enhetOppfolging, enhetsnavn: avtale.enhetsnavnOppfolging ?? '' };
        } else {
            return { enhet: avtale.enhetGeografisk ?? '', enhetsnavn: avtale.enhetsnavnGeografisk ?? '' };
        }
    };
    const [kostnadssted, setKostnadssted] = useState<Kostnadssted>(finnKostnadssted());
    const [nyttKostnadssted, setNyttKostnadssted] = useState<Kostnadssted>(kostnadssted);

    const sendInnNyttKostnadssted = async () => {
        setFeilmelding(undefined);
        try {
            const enhet: Kostnadssted = await oppdatereKostnadsstedet(avtale.id, nyttKostnadssted);
            setKostnadssted(enhet);
        } catch (err) {
            setFeilmelding((err as string).toString().split(':')?.[1].trim());
            console.warn('oppdatering av kostnadssted feilet. ', err);
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
