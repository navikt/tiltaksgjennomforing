import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import VarselTegnForModal from '@/komponenter/modal/VarselTegnForModal';
import { mentorGodkjennTaushetserklæring } from '@/services/rest-service';
import { Avtale } from '@/types/avtale';
import { UfullstendigError } from '@/types/errors';
import BEMHelper from '@/utils/bem';
import Modal from 'nav-frontend-modal';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useState } from 'react';
import { useHistory } from "react-router";
import './Taushetserklæring.less';
import TausetserklæringTekst from './TaushetserklæringTekst';

interface TaushetserklæringProps {
    open: boolean;
    avtale: Avtale;
    togglesetTaushetserklæringForMentorAvtale: (avtaleId: string) => void;
}

const TaushetserklæringModal: FunctionComponent<TaushetserklæringProps> = ({
    open,
    avtale,
    togglesetTaushetserklæringForMentorAvtale,
}) => {
    const cls = BEMHelper('etterRegistrering');
    const history = useHistory();
    const [bekrefterGodkjennerTaushetserklæring, setBekrefterGodkjennerTaushetserklæring] = useState<boolean>(false);

    const godkjennTaushetserklæring = async () => {
        if (bekrefterGodkjennerTaushetserklæring) {
            const avtaleLagret = await mentorGodkjennTaushetserklæring(avtale);
            history.push('avtale/' + avtaleLagret.id);
        } else {
            throw new UfullstendigError('Du må bekrefte at du forstår kravene før du kan godkjenne.');
        }
    };

    return (
        <Modal
            isOpen={open}
            onRequestClose={() => {
                togglesetTaushetserklæringForMentorAvtale("");
            }}
            closeButton={true}
            className={cls.element('modal-container')}
            contentLabel="Min modalrute"
        >
            <div className={cls.element('modal')}>
                <div className={cls.element('topIconContainer')}>
                    <VarselTegnForModal width={'80px'} height={'80px'} />
                </div>

                <Systemtittel className={cls.element('header')}>Signer taushetserklæring</Systemtittel>
                <p>Som mentor må du signere en taushetserklæring.</p>
                <VerticalSpacer rem={2} />
                <TausetserklæringTekst />
                <BekreftCheckboksPanel
                    key={'Taushetserklæring-BekreftCheckboksPanel' + avtale.id}
                    label="Jeg bekrefter å ha lest og forstått min taushetsplikt og har gjort meg kjent med de lovbestemmelsene som er listet opp over"
                    checked={bekrefterGodkjennerTaushetserklæring}
                    onChange={() => setBekrefterGodkjennerTaushetserklæring(!bekrefterGodkjennerTaushetserklæring)}
                />
                <LagreKnapp
                    className={'etterRegistrering__lagreKnapp'}
                    label={'Signer Taushetserklæring'}
                    lagre={godkjennTaushetserklæring}
                />
            </div>
        </Modal>
    );
};
export default TaushetserklæringModal;
