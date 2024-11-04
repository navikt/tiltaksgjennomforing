import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { mentorGodkjennTaushetserklæring } from '@/services/rest-service';
import { UfullstendigError } from '@/types/errors';
import BEMHelper from '@/utils/bem';
import { Heading, BodyShort } from '@navikt/ds-react';
import BekreftCheckboksPanel from '@/komponenter/BekreftCheckboksPanel/BekreftCheckboksPanel';
import React, { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router';
import './Taushetserklæring.less';
import TaushetserklæringTekst from './TaushetserklæringTekst';
import InfoModal from '@/komponenter/modal/InfoModal';

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
        <InfoModal
            width="medium"
            open={open}
            confirmText="Signér taushetserklæring"
            onConfirm={godkjennTaushetserklæring}
            onClose={() => togglesetTaushetserklæringForMentorAvtale('')}
        >
            <Heading level="1" size="medium" className={cls.element('header')}>
                Signér taushetserklæring
            </Heading>
            <BodyShort size="small">Som mentor må du signere en taushetserklæring.</BodyShort>
            <VerticalSpacer rem={2} />
            <TaushetserklæringTekst />
            <BekreftCheckboksPanel
                legend=""
                size="small"
                key={'Taushetserklæring-BekreftCheckboksPanel' + avtaleId}
                checked={bekrefterGodkjennerTaushetserklæring}
                onChange={() => setBekrefterGodkjennerTaushetserklæring(!bekrefterGodkjennerTaushetserklæring)}
            >
                Jeg bekrefter at jeg har lest og forstått taushetsplikten min, og de aktuelle lovbestemmelsene
            </BekreftCheckboksPanel>
        </InfoModal>
    );
};
export default TaushetserklæringModal;
