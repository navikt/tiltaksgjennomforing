import React, { FunctionComponent, useContext, useState } from 'react';
import BEMHelper from '@/utils/bem';
import './oppdatereKostnadssted.less';
import { AvtaleContext } from '@/AvtaleProvider';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import { oppdatereKostnadsstedet } from '@/services/rest-service';

export interface Kostnadssted {
    enhet: string;
    enhetsnavn?: string;
}

const OppdatereKostnadssted: FunctionComponent = () => {
    const cls = BEMHelper('oppdatere-kostnadssted');
    const { avtale } = useContext(AvtaleContext);
    const [feilmelding, setFeilmelding] = useState<string | undefined>(undefined);

    const finnKostnadssted = (): Kostnadssted => {
        const tilskuddsEnhet = avtale.tilskuddPeriode.find((periode) => periode.enhet !== null);
        if (tilskuddsEnhet?.enhet) {
            return { enhet: tilskuddsEnhet.enhet, enhetsnavn: tilskuddsEnhet.enhetsnavn ?? '' };
        } else if (avtale.enhetOppfolging) {
            return { enhet: avtale.enhetOppfolging, enhetsnavn: avtale.enhetsnavnOppfolging ?? '' };
        } else if (avtale.enhetGeografisk) {
            return { enhet: avtale.enhetGeografisk, enhetsnavn: avtale.enhetsnavnGeografisk ?? '' };
        }
        return { enhet: '', enhetsnavn: '' };
    };
    const [kostnadssted, setKostnadssted] = useState<Kostnadssted>(finnKostnadssted());
    const [nyttKostnadssted, setNyttKostnadssted] = useState<Kostnadssted>(kostnadssted);

    const sendInnNyttKostnadssted = async () => {
        setFeilmelding(undefined);
        try {
            const enhet = await oppdatereKostnadsstedet(avtale.id, nyttKostnadssted);
            setKostnadssted(enhet);
        } catch (err) {
            setFeilmelding((err as any).toString().split(':')?.[1]);
            console.warn('oppdatering av kostnadssted feilet. ', err);
        }
    };

    return avtale.gjeldendeTilskuddsperiode ? (
        <div className={cls.className}>
            <Undertittel>Kostnadssted</Undertittel>
            <SkjemaGruppe feil={feilmelding}>
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
                    <span>Kostnadssted er valgt til </span>
                    <span>{kostnadssted.enhetsnavn ?? 'test'}</span>
                </Normaltekst>
            </SkjemaGruppe>
        </div>
    ) : null;
};
export default OppdatereKostnadssted;
