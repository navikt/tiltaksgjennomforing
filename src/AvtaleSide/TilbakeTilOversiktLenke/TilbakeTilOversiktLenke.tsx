import VenstreChevron from 'nav-frontend-chevron/lib/venstre-chevron';
import React, { FunctionComponent, useContext } from 'react';
import { Link } from 'react-router-dom';
import { pathTilOversikt } from '@/paths';
import { ApiError } from '@/types/errors';
import { AvtaleContext } from '@/AvtaleContext';
import './TilbakeTilOversiktLenke.less';

const TilbakeTilOversiktLenke: FunctionComponent<{}> = () => {
    const context = useContext(AvtaleContext);

    const tilbakeTilOversikt = async () => {
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
        <Link to={pathTilOversikt} className="lenke" onClick={tilbakeTilOversikt}>
            <VenstreChevron className="tilbaketiloversikt__chevron" />
            Tilbake til oversikt
        </Link>
    );
};

export default TilbakeTilOversiktLenke;
