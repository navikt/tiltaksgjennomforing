import React, { FunctionComponent, PropsWithChildren, ReactNode, useEffect, useRef, useState } from 'react';
import Artikkel from './Artikkel';
import { Popover } from '@navikt/ds-react';
import Ikon from './Ikon';
import './Nytt.less';
import useAntallUlesteNyheter from './useAntallUlesteNyheter';

export type Nyhet = {
    dato: Date;
    tittel: string;
    innhold: ReactNode;
};

interface Props {
    tittel: string;
    navn: string;
    nyheter: Nyhet[];
    åpneVedFørsteBesøk?: boolean;
    onÅpneNyheter?: (antallUlesteNyheter: number) => void;
}

const Nytt: FunctionComponent<Props> = (props: PropsWithChildren<Props>) => {
    const { navn, nyheter, åpneVedFørsteBesøk = false, onÅpneNyheter, tittel } = props;

    const [popoverAnker, setPopoverAnker] = useState<Element | null>(null);
    const [erÅpnet, setErÅpnet] = useState<boolean>(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const onFørsteBesøk = () => {
        if (åpneVedFørsteBesøk) {
            toggleNyheter();
        }
    };

    const [antallUlesteNyheter, antallUlesteVedSidelast, markerSomLest] = useAntallUlesteNyheter(
        nyheter,
        onFørsteBesøk
    );

    const toggleNyheter = () => {
        if (popoverAnker) {
            setPopoverAnker(null);
        } else if (buttonRef.current) {
            setPopoverAnker(buttonRef.current);

            if (onÅpneNyheter) {
                onÅpneNyheter(antallUlesteNyheter);
            }

            if (!erÅpnet) {
                setErÅpnet(true);
            }
        }
    };

    useEffect(() => {
        if (erÅpnet) {
            markerSomLest();
        }
    }, [erÅpnet, markerSomLest]);

    return (
        <div className="nytt">
            <button ref={buttonRef} onClick={toggleNyheter} className="nytt__knapp" aria-label={'Oppdatere'}>
                <Ikon navn={navn} />
                {antallUlesteNyheter > 0 && <div className="nytt__notifikasjon" />}
            </button>
            <Popover open={erÅpnet} onClose={() => setPopoverAnker(null)} anchorEl={popoverAnker} title={tittel}>
                <Popover.Content>
                    <div className="nytt__popover">
                        <h2 className="nytt__tittel">Nytt i {navn}</h2>
                        <section className="nytt__nyheter">
                            {nyheter.map((nyhet, index) => (
                                <Artikkel
                                    key={`${nyhet.dato}-${nyhet.tittel}`}
                                    ulest={index < antallUlesteVedSidelast}
                                    nyhet={nyhet}
                                />
                            ))}
                        </section>
                    </div>
                </Popover.Content>
            </Popover>
        </div>
    );
};

export default Nytt;
