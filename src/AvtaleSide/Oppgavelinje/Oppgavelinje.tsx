import React, { useEffect, useState } from 'react';
import BEMHelper from '@/utils/bem';
import OppgavelinjeMobil from '@/AvtaleSide/Oppgavelinje/OppgavelinjeMobil';
import OppgaveLenker from '@/AvtaleSide/Oppgavelinje/OppgaveLenker';
import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';

interface Props {
    enableScreenSizeCheck: boolean;
}

const cls = BEMHelper('avtaleside');

const OppgaveLinje: React.FunctionComponent<Props> = props => {
    const checksize: boolean = props.enableScreenSizeCheck ? window.innerWidth < 768 : !props.enableScreenSizeCheck;
    const [isMobile, setIsMobile] = useState<boolean>(checksize);

    useEffect(() => {
        document.addEventListener('resize', () => setIsMobile(checksize));
        return () => {
            document.removeEventListener('resize', () => setIsMobile(checksize));
        };
    }, [props.enableScreenSizeCheck, checksize]);

    return (
        <>
            {isMobile && <OppgavelinjeMobil />}
            {!isMobile && (
                <>
                    <div className={cls.element('lenkerlinje')}>
                        <TilbakeTilOversiktLenke />
                        <div className={cls.element('avbrytOgDelLenk')}>
                            <OppgaveLenker />
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default OppgaveLinje;
