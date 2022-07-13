import StatusPanel from '@/AvtaleSide/AvtaleStatus/StatusPanel';
import { ReactComponent as VarselIkon } from '@/assets/ikoner/varsel.svg';
import React, { useState } from 'react';
import BEMHelper from '@/utils/bem';
import TausetserklæringTekst from './TaushetserklæringTekst';
import Modal from 'nav-frontend-modal';
import { formatterDato } from '@/utils/datoUtils';

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
                ikon={VarselIkon}
                header="Tausetserklæring"
                body={
                    <>
                        {/*<Link
                            to={''}
                            //className={cls.element('lenke')}
                            onClick={() => setVisTaushetserklæringPanel(true)}
                        >
                            <div aria-hidden={true}></div>
                            {'Taushetserklæring'}
                </Link>*/}
                        <nav onClick={() => setVisTaushetserklæringPanel(true)}>
                            Taushetserklæring signert {signertTidspunkt ? formatterDato(signertTidspunkt) : ''}{' '}
                        </nav>
                        {visTaushetserklæringPanel && (
                            <Modal
                                isOpen={visTaushetserklæringPanel}
                                onRequestClose={() => setVisTaushetserklæringPanel(!visTaushetserklæringPanel)}
                                closeButton={true}
                                className={cls.element('modal-container')}
                                contentLabel="Min modalrute"
                            >
                                <div>
                                    {/*<Taushetserklæring open={visTaushetserklæringPanel} avtale={avtale}/>*/}
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
