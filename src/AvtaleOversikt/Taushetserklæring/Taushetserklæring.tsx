import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import VarselTegnForModal from '@/komponenter/modal/VarselTegnForModal';
import { mentorGodkjennTaushetserklæring } from '@/services/rest-service';
import { Avtale } from '@/types/avtale';
import { UfullstendigError } from '@/types/errors';
import BEMHelper from '@/utils/bem';
import { Modal, Heading } from '@navikt/ds-react';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import React, { FunctionComponent, useState } from 'react';
import { useHistory } from 'react-router';
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
    const cls = BEMHelper('taushetserklæring');
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
            open={open}
            onClose={() => {
                togglesetTaushetserklæringForMentorAvtale('');
            }}
            closeButton={true}
            className={cls.element('modal-container')}
            aria-label="Min modalrute"
        >
            <Modal.Content>
                <div className={cls.element('modal')}>
                    <div className={cls.element('topIconContainer')}>
                        <VarselTegnForModal width={'80%'} height={'80px'} />
                    </div>

                    <Heading size="medium" className={cls.element('header')}>
                        Signer taushetserklæring
                    </Heading>
                    <p>Som mentor må du signere en taushetserklæring.</p>
                    <VerticalSpacer rem={2} />
                    <TausetserklæringTekst />
                    <BekreftCheckboksPanel
                        key={'Taushetserklæring-BekreftCheckboksPanel' + avtale.id}
                        className={cls.element('bekreftelse')}
                        label="Jeg bekrefter å ha lest og forstått min taushetsplikt og har gjort meg kjent med de lovbestemmelsene som er listet opp over"
                        checked={bekrefterGodkjennerTaushetserklæring}
                        onChange={() => setBekrefterGodkjennerTaushetserklæring(!bekrefterGodkjennerTaushetserklæring)}
                    />
                    <LagreKnapp
                        className={'taushetserklæring__lagreKnapp'}
                        label={'Signer Taushetserklæring'}
                        lagre={godkjennTaushetserklæring}
                    />
                </div>
            </Modal.Content>
        </Modal>
    );
};
export default TaushetserklæringModal;
