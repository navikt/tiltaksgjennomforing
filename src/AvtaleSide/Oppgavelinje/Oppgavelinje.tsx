import React from 'react';
import BEMHelper from '@/utils/bem';
import MediaQuery from 'react-responsive';
import OppgavelinjeMobil from '@/AvtaleSide/Oppgavelinje/OppgavelinjeMobil';
import OppgaveLenker from '@/AvtaleSide/Oppgavelinje/OppgaveLenker';

const cls = BEMHelper('avtaleside');

const OppgaveLinje: React.FunctionComponent<{}> = () => {
    return (
        <>
            <MediaQuery maxWidth={768}>
                <OppgavelinjeMobil />
            </MediaQuery>
            <MediaQuery minWidth={768}>
                <div className={cls.element('lenkerlinje')}>
                    <OppgaveLenker />
                </div>
            </MediaQuery>
        </>
    );
};

export default OppgaveLinje;
