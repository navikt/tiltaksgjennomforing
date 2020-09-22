import { AvtaleContext } from '@/AvtaleContext';
import OppgaveLenker from '@/AvtaleSide/Oppgavelinje/OppgaveLenker';
import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import { ApiError } from '@/types/errors';
import BEMHelper from '@/utils/bem';
import { Menyknapp } from 'nav-frontend-ikonknapper';
import Popover, { PopoverOrientering } from 'nav-frontend-popover';
import React, { useContext, useState } from 'react';

const cls = BEMHelper('avtaleside');

const OppgavelinjeMobil: React.FunctionComponent<{}> = () => {
    const dropdownId = 'menyvalg';
    const [dropdown, setDropdown] = useState<HTMLElement | undefined>(undefined);
    const IsDropdownDefined = () => dropdown !== undefined;
    const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (IsDropdownDefined()) {
            return setDropdown(undefined);
        }
        return setDropdown(event.currentTarget);
    };

    const context = useContext(AvtaleContext);

    const lagreEndringer = async () => {
        if (context.harUlagredeEndringer()) {
            try {
                await context.lagreAvtale();
            } catch (error) {
                if (error instanceof ApiError) {
                    return context.visFeilmelding(error.message);
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
                aria-controls={dropdownId}
                aria-haspopup="menu"
            >
                Meny
            </Menyknapp>
            <Popover
                id={dropdownId}
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
