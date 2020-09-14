import React, { useState } from 'react';
import { Menyknapp } from 'nav-frontend-ikonknapper';
import { UndertekstBold } from 'nav-frontend-typografi';
import Popover, { PopoverOrientering } from 'nav-frontend-popover';
import OppgaveLenker from '@/AvtaleSide/Oppgavelinje/OppgaveLenker';
import BEMHelper from '@/utils/bem';
import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';

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

    return (
        <div className={cls.element('meny-wrapper')}>
            <TilbakeTilOversiktLenke />
            <Menyknapp
                className={cls.element('popover-knapp')}
                id="menyKnapp"
                onClick={e => toggleMenu(e)}
                aria-expanded={dropdown !== undefined}
                aria-controls={dropdownId}
                aria-haspopup="menu"
            >
                <UndertekstBold>Dropdown Meny</UndertekstBold>
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
