import { ReactComponent as CheckIkon } from '@/assets/ikoner/check.svg';
import StatusPanel from '@/AvtaleSide/AvtaleStatus/StatusPanel';
import { Rolle } from '@/types/innlogget-bruker';
import BEMHelper from '@/utils/bem';
import { formatterDato } from '@/utils/datoUtils';
import Lenke from 'nav-frontend-lenker';
import Modal from 'nav-frontend-modal';
import React, { useState } from 'react';
import TausetserklæringTekst from './TaushetserklæringTekst';

interface TaushetserklæringPanelProps {
    signertTidspunkt: string | undefined;
    rolle: Rolle
}

const TaushetserklæringPanel: React.FunctionComponent<TaushetserklæringPanelProps> = ({ signertTidspunkt, rolle }) => {
    const cls = BEMHelper('etterRegistrering');

    const [visTaushetserklæringPanel, setVisTaushetserklæringPanel] = useState<boolean>(false);

    if (signertTidspunkt) {
        formatterDato(signertTidspunkt);
    }
    const lenkeTekst = rolle === 'MENTOR' ? 'Taushetserklæring signert' : 'Mentors taushetserklæring signert';
    return (
        <>
            <StatusPanel
                ikon={CheckIkon}
                header="Tausetserklæring"
                body={
                    <>
                        <Lenke onClick={() => setVisTaushetserklæringPanel(true)} href={'#'}>
                            {lenkeTekst} {' '} {signertTidspunkt ? formatterDato(signertTidspunkt) : ''}{' '}
                        </Lenke>
                        {visTaushetserklæringPanel && (
                            <Modal
                                isOpen={visTaushetserklæringPanel}
                                onRequestClose={() => setVisTaushetserklæringPanel(!visTaushetserklæringPanel)}
                                closeButton={true}
                                className={cls.element('modal-container')}
                                contentLabel="Min modalrute"
                            >
                                <div>
                                    <TausetserklæringTekst  viseVarselTegn={true}/>
                                </div>
                            </Modal>
                        )}
                    </>
                }
            />
        </>
    );
};
export default TaushetserklæringPanel;
