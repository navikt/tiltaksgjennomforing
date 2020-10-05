import { AvtaleContext } from '@/NyAvtaleProvider';
import OppgaveLenker from '@/AvtaleSide/Oppgavelinje/OppgaveLenker';
import OppgavelinjeMobil from '@/AvtaleSide/Oppgavelinje/OppgavelinjeMobil';
import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import { ApiError } from '@/types/errors';
import BEMHelper from '@/utils/bem';
import React, { useContext, useEffect, useState } from 'react';
import { FeilVarselContext } from '@/FeilVarselProvider';

interface Props {
    enableScreenSizeCheck: boolean;
}

const cls = BEMHelper('avtaleside');

const OppgaveLinje: React.FunctionComponent<Props> = props => {
    const checksize: boolean = props.enableScreenSizeCheck ? window.innerWidth < 768 : !props.enableScreenSizeCheck;
    const [isMobile, setIsMobile] = useState<boolean>(checksize);
    const { ulagredeEndringer, lagreAvtale } = useContext(AvtaleContext);
    const visFeilmelding = useContext(FeilVarselContext);

    useEffect(() => {
        document.addEventListener('resize', () => setIsMobile(checksize));
        return () => {
            document.removeEventListener('resize', () => setIsMobile(checksize));
        };
    }, [props.enableScreenSizeCheck, checksize]);

    const lagreEndringer = async () => {
        if (ulagredeEndringer) {
            try {
                await lagreAvtale();
            } catch (error) {
                if (error instanceof ApiError) {
                    return visFeilmelding(error.message);
                }
                throw error;
            }
        }
    };

    return (
        <>
            {isMobile && <OppgavelinjeMobil />}
            {!isMobile && (
                <>
                    <div className={cls.element('lenkerlinje')}>
                        <TilbakeTilOversiktLenke onClick={lagreEndringer} />
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
