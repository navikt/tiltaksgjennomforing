import { Rolle } from '@/AvtaleContext';
import BEMHelper from '@/utils/bem';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import React, { useState } from 'react';
import { StegInfo } from '../AvtaleSide';
import Hendelselogg from '../Hendelselogg/Hendelselogg';
import TilbakeTilOversiktLenke from '../TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import { Menyknapp } from 'nav-frontend-ikonknapper';
import Popover, { PopoverOrientering } from 'nav-frontend-popover';
import { UndertekstBold } from 'nav-frontend-typografi';

interface Props {
    avtaleSteg: StegInfo[];
    rolle: Rolle;
    varsler?: JSX.Element[];
    tilbakeTilOversiktKlikk: () => void;
}

const cls = BEMHelper('avtaleside');

const MobilAvtaleSide: React.FunctionComponent<Props> = props => {
    const [dropdown, setDropdown] = useState<HTMLElement | undefined>(undefined);
    const menyId = 'menyKnapp';
    const dropdownId = 'menyvalg';
    const IsDropdownDefined = () => dropdown !== undefined;
    const pop = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (IsDropdownDefined()) {
            return setDropdown(undefined);
        }
        return setDropdown(event.currentTarget);
    };

    const ekspanderbartPanel = props.avtaleSteg.map(steg => (
        <div className="avtaleside__ekspanderbart-panel" key={steg.id}>
            <Ekspanderbartpanel tittel={steg.label}>{steg.komponent}</Ekspanderbartpanel>
        </div>
    ));

    return (
        <>
            <div className={cls.element('lenkerlinje')}></div>
            <Menyknapp
                className={cls.element('popover-knapp')}
                id={menyId}
                onClick={e => pop(e)}
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
                <div className={cls.element('popover-lenke')}>
                    <TilbakeTilOversiktLenke onClick={props.tilbakeTilOversiktKlikk} />
                </div>
                <Hendelselogg />
            </Popover>
            {props.varsler}
            <form>{ekspanderbartPanel}</form>
        </>
    );
};

export default MobilAvtaleSide;
