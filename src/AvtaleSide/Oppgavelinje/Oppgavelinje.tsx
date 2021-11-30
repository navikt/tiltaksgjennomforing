import { AvtaleContext } from '@/AvtaleProvider';
import OppgaveLenker from '@/AvtaleSide/Oppgavelinje/OppgaveLenker';
import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import { FeilVarselContext } from '@/FeilVarselProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { ApiError } from '@/types/errors';
import BEMHelper from '@/utils/bem';
import { Menyknapp } from 'nav-frontend-ikonknapper';
import Popover, { PopoverOrientering } from 'nav-frontend-popover';
import React, { useContext, useState } from 'react';
import Varsellogg from '../Varsellogg/Varsellogg';

const cls = BEMHelper('avtaleside');

const OppgaveLinje: React.FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const avtaleContext = useContext(AvtaleContext);
    const [dropdown, setDropdown] = useState<HTMLElement | undefined>(undefined);

    const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (dropdown) {
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

    const visKunHendelseslog = avtaleContext.avtale.annullertTidspunkt || innloggetBruker.rolle !== 'VEILEDER';

    return (
        <>
            <VerticalSpacer rem={1} />
            <div className={cls.element('meny-wrapper')}>
                <TilbakeTilOversiktLenke onClick={lagreEndringer} />
                {visKunHendelseslog && (
                    <div>
                        <Varsellogg />
                    </div>
                )}
                {!visKunHendelseslog && (
                    <>
                        <Menyknapp
                            className={cls.element('popover-knapp')}
                            id="menyKnapp"
                            onClick={(e) => toggleMenu(e)}
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
                    </>
                )}
            </div>
            <VerticalSpacer rem={1} />
        </>
    );
};

export default OppgaveLinje;
