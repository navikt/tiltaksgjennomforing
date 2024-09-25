import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import VarselTegnForModal from '@/komponenter/modal/VarselTegnForModal';
import { mentorGodkjennTaushetserklæring } from '@/services/rest-service';
import { UfullstendigError } from '@/types/errors';
import BEMHelper from '@/utils/bem';
import { Modal, Heading } from '@navikt/ds-react';
import BekreftCheckboksPanel from '@/komponenter/BekreftCheckboksPanel/BekreftCheckboksPanel';
import React, { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router';
import './Taushetserklæring.less';
import TausetserklæringTekst from './TaushetserklæringTekst';

interface TaushetserklæringProps {
    open: boolean;
    avtaleId: string;
    sistEndret: string;
    togglesetTaushetserklæringForMentorAvtale: (avtaleId: string) => void;
}

const TaushetserklæringModal: FunctionComponent<TaushetserklæringProps> = ({
    open,
    avtaleId,
    sistEndret,
    togglesetTaushetserklæringForMentorAvtale,
}) => {
    const cls = BEMHelper('taushetserklæring');
    const navigate = useNavigate();
    const [bekrefterGodkjennerTaushetserklæring, setBekrefterGodkjennerTaushetserklæring] = useState<boolean>(false);

    const godkjennTaushetserklæring = async () => {
        if (bekrefterGodkjennerTaushetserklæring) {
            const avtaleLagret = await mentorGodkjennTaushetserklæring(avtaleId, sistEndret);
            navigate('avtale/' + avtaleLagret.id);
        } else {
            throw new UfullstendigError('Du må bekrefte at du forstår kravene før du kan godkjenne.');
        }
    };

    return (
        <Modal
            open={open}
            onClose={() => togglesetTaushetserklæringForMentorAvtale(avtaleId)}
            width="medium"
            aria-label="Min modalrute"
            className={cls.element('modal')}
        >
            <Modal.Header>
                <div className={cls.element('topIconContainer')}>
                    <VarselTegnForModal width={'80%'} height={'80px'} />
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className={cls.element('modal')}>
                    <Heading level="2" size="medium" className={cls.element('header')}>
                        Signer taushetserklæring
                    </Heading>
                    <p>Som mentor må du signere en taushetserklæring.</p>
                    <VerticalSpacer rem={2} />
                    <TausetserklæringTekst />
                    <BekreftCheckboksPanel
                        legend=""
                        key={'Taushetserklæring-BekreftCheckboksPanel' + avtaleId}
                        className={cls.element('bekreftelse')}
                        checked={bekrefterGodkjennerTaushetserklæring}
                        onChange={() => setBekrefterGodkjennerTaushetserklæring(!bekrefterGodkjennerTaushetserklæring)}
                    >
                        Jeg bekrefter å ha lest og forstått min taushetsplikt og har gjort meg kjent med de
                        lovbestemmelsene som er listet opp over
                    </BekreftCheckboksPanel>
                    <div className={cls.element('knapper-container')}>
                        <LagreKnapp className={'taushetserklæring__lagreKnapp'} lagre={godkjennTaushetserklæring}>
                            Signer Taushetserklæring
                        </LagreKnapp>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};
export default TaushetserklæringModal;
