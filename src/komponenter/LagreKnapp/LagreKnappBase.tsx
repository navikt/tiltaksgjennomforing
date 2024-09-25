import React, { useState, useRef, useEffect } from 'react';
import { Button, ButtonProps } from '@navikt/ds-react';

import { handterFeil } from '@/utils/apiFeilUtils';
import { Feilkode } from '@/types/feilkode';
import LagreKnappVarsel from '@/komponenter/LagreKnapp/LagreKnappVarsel';

import './LagreKnapp.less';

interface ComponentProps {
    isLaster: boolean;
    varsel?: string;
    onTilbakestill: () => void;
    isSuksess: boolean;
}

interface EffectOpts {
    suksessmelding?: string;
    onFeil?: (value: Feilkode) => void;
}

type Props = Partial<ComponentProps> & ButtonProps;

export const useLagreKnapp = (func: () => Promise<any>, opts?: EffectOpts): [() => Promise<void>, ComponentProps] => {
    const { suksessmelding, onFeil } = opts || {};

    const [isLaster, setLaster] = useState(false);
    const [isSuksess, setSuksess] = useState(false);
    const [varsel, setVarsel] = useState<string>();

    const onLagre = async () => {
        setLaster(true);
        try {
            await func();
            setVarsel(suksessmelding);
            setSuksess(true);
        } catch (error: any) {
            try {
                if (onFeil) {
                    onFeil(error.message);
                }
                handterFeil(error, setVarsel);
            } catch (er) {
                setVarsel('Det skjedde en uventet feil');
            }
            setSuksess(false);
        } finally {
            setLaster(false);
        }
    };

    const onTilbakestill = () => {
        setVarsel('');
    };

    return [onLagre, { varsel, isLaster, isSuksess, onTilbakestill }];
};

function LagreKnappBase(props: Props) {
    const { disabled, isLaster, varsel, onTilbakestill, isSuksess, ...restProps } = props;

    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (varsel === '' && buttonRef && buttonRef.current) {
            buttonRef.current.focus();
        }
    }, [buttonRef, varsel]);

    return (
        <>
            {varsel && (
                <LagreKnappVarsel
                    kanLukkes={!isSuksess}
                    timeout={isSuksess ? 5000 : undefined}
                    type={isSuksess ? 'success' : 'warning'}
                    onLukkVarsel={onTilbakestill}
                >
                    {varsel}
                </LagreKnappVarsel>
            )}
            <Button ref={buttonRef} disabled={isLaster || disabled} loading={isLaster} {...restProps} />
        </>
    );
}

export default LagreKnappBase;
