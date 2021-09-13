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
    navn?: string;
}

const OppdatereKostnadssted: FunctionComponent = () => {
    const cls = BEMHelper('oppdatere-kostnadssted');
    const { avtale } = useContext(AvtaleContext);
    const finnKostnadssted = (): Kostnadssted => {
        const tilskuddsEnhet = avtale.tilskuddPeriode.find((periode) => periode.enhet !== null);
        if (tilskuddsEnhet?.enhet) {
            return { enhet: tilskuddsEnhet.enhet, navn: undefined };
        } else if (avtale.enhetOppfolging) {
            return { enhet: avtale.enhetOppfolging, navn: avtale.enhetsnavnOppfolging };
        } else if (avtale.enhetGeografisk) {
            return { enhet: avtale.enhetGeografisk, navn: avtale.enhetsnavnGeografisk };
        }
        return { enhet: '', navn: '' };
    };
    const [kostnadssted, setKostnadssted] = useState<Kostnadssted>(finnKostnadssted());
    const [nyttKostnadssted, setNyttKostnadssted] = useState<Kostnadssted>(kostnadssted);

    const sendInnNyttKostnadssted = async () => {
        try {
            const reponse = await oppdatereKostnadsstedet(avtale.id, nyttKostnadssted);
            setKostnadssted(reponse);
        } catch (err) {
            console.warn('oppdatering av kostnadssted feilet. ', err);
        }
    };

    return (
        <div className={cls.className}>
            <Undertittel>Kostnadssted</Undertittel>
            <SkjemaGruppe>
                <div className={cls.element('input-wrapper')}>
                    <Input
                        value={nyttKostnadssted.enhet}
                        onChange={(event) =>
                            setNyttKostnadssted((prevState) => ({
                                ...prevState,
                                enhet: event.target.value,
                                navn: undefined,
                            }))
                        }
                        bredde="S"
                    />
                    <Knapp
                        mini={true}
                        onClick={() => void 0 /* bytt med sendInnNyttKostnadssted() naar backend er koblet paa*/}
                    >
                        Oppdater
                    </Knapp>
                </div>
                <Normaltekst className={cls.element('input-undertekst')}>
                    <span>Kostnadssted er valgt til </span>
                    <span>{kostnadssted.navn ? kostnadssted.navn : kostnadssted.enhet}</span>
                </Normaltekst>
            </SkjemaGruppe>
        </div>
    );
};
export default OppdatereKostnadssted;
