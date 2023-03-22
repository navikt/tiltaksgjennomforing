import { AvtaleContext } from '@/AvtaleProvider';
import OppgaveLenker from '@/AvtaleSide/Oppgavelinje/OppgaveLenker';
import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import { FeilVarselContext } from '@/FeilVarselProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { ApiError } from '@/types/errors';
import BEMHelper from '@/utils/bem';
import { Button } from '@navikt/ds-react';
import { Expand } from '@navikt/ds-icons';

import { Popover } from '@navikt/ds-react';
import React, { useContext, useState } from 'react';
import Varsellogg from '../Varsellogg/Varsellogg';

const cls = BEMHelper('avtaleside');

const OppgaveLinje: React.FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const avtaleContext = useContext(AvtaleContext);
    const [dropdown, setDropdown] = useState<HTMLElement | null>(null);
    const [erÅpnet, setErÅpnet] = useState<boolean>(false);

    const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>): void => {
        if (dropdown) {
            setErÅpnet(false);
            return setDropdown(null);
        }
        setErÅpnet(true);
        return setDropdown(event.currentTarget);
    };

    const { ulagredeEndringer, lagreAvtale } = useContext(AvtaleContext);
    const visFeilmelding = useContext(FeilVarselContext);

    const lagreEndringer = async (): Promise<void> => {
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
                        <Button
                            icon={<Expand />}
                            iconPosition="right"
                            variant="secondary"
                            className={cls.element('popover-knapp')}
                            id="menyKnapp"
                            onClick={(e) => toggleMenu(e)}
                            aria-expanded={dropdown !== undefined}
                            aria-controls={'menyvalg'}
                            aria-haspopup="menu"
                        >
                            Meny
                        </Button>
                        <Popover
                            placement="bottom-end"
                            open={erÅpnet}
                            anchorEl={dropdown}
                            onClose={() => setDropdown(null)}
                        >
                            <Popover.Content>
                                <OppgaveLenker />
                            </Popover.Content>
                        </Popover>
                    </>
                )}
            </div>
            <VerticalSpacer rem={1} />
        </>
    );
};

export default OppgaveLinje;
