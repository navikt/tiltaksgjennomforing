import { AvtaleContext } from '@/AvtaleProvider';
import OppgaveLenker from '@/AvtaleSide/Oppgavelinje/OppgaveLenker';
import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import { FeilVarselContext } from '@/FeilVarselProvider';
import { ApiError } from '@/types/errors';
import BEMHelper from '@/utils/bem';
import { Menyknapp } from 'nav-frontend-ikonknapper';
import Popover, { PopoverOrientering } from 'nav-frontend-popover';
import React, { useContext, useState } from 'react';

const cls = BEMHelper('avtaleside');

const OppgavelinjeMobil: React.FunctionComponent<{}> = () => {
    const [dropdown, setDropdown] = useState<HTMLElement | undefined>(undefined);
    const isDropdownDefined = dropdown !== undefined;

    const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isDropdownDefined) {
            return setDropdown(undefined);
        }
        return setDropdown(event.currentTarget);
    };

    const { ulagredeEndringer, lagreAvtale } = useContext(AvtaleContext);
    const visFeilmelding = useContext(FeilVarselContext);

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
        <div className={cls.element('meny-wrapper')}>
            <TilbakeTilOversiktLenke onClick={lagreEndringer} />
            <Menyknapp
                className={cls.element('popover-knapp')}
                id="menyKnapp"
                onClick={e => toggleMenu(e)}
                aria-expanded={dropdown !== undefined}
                aria-controls={'menyvalg'}
                aria-haspopup="menu"
            >
                Meny
            </Menyknapp>
            <Popover
                id={'menyvalg'}
                ankerEl={dropdown}
                onRequestClose={() => setDropdown(undefined)}
                orientering={PopoverOrientering.UnderVenstre}
                autoFokus={false}
                tabIndex={-1}
                utenPil={true}
            >
                <OppgaveLenker />
            </Popover>
        </div>
    );
};

export default OppgavelinjeMobil;
