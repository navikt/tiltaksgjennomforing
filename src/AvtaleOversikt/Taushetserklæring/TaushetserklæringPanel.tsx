import { ReactComponent as CheckIkon } from '@/assets/ikoner/check.svg';
import StatusPanel from '@/AvtaleSide/AvtaleStatus/StatusPanel';
import BEMHelper from '@/utils/bem';
import { formatterDato } from '@/utils/datoUtils';
import Lenke from 'nav-frontend-lenker';
import Modal from 'nav-frontend-modal';
import React, { useState } from 'react';
import TausetserklæringTekst from './TaushetserklæringTekst';

interface TaushetserklæringPanelProps {
    signertTidspunkt: string | undefined;
}

const TaushetserklæringPanel: React.FunctionComponent<TaushetserklæringPanelProps> = ({ signertTidspunkt }) => {
    const cls = BEMHelper('etterRegistrering');

    const [visTaushetserklæringPanel, setVisTaushetserklæringPanel] = useState<boolean>(false);

    if (signertTidspunkt) {
        formatterDato(signertTidspunkt);
    }

    return (
        <>
            <StatusPanel
                ikon={CheckIkon}
                header="Tausetserklæring"
                body={
                    <>
                        <Lenke onClick={() => setVisTaushetserklæringPanel(true)} href={'#'}>
                            Taushetserklæring signert {signertTidspunkt ? formatterDato(signertTidspunkt) : ''}{' '}
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
                                    <TausetserklæringTekst />
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
