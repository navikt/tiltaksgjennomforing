import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BEMHelper from '@/utils/bem';
import { Heading } from '@navikt/ds-react';
import React from 'react';
import HvemHarGodkjentModal from './HvemHarGodkjentModal';
import './StatusPanel.less';

const cls = BEMHelper('statusPanel');

const StatusPanel: React.FunctionComponent<{
    header: string;
    body?: JSX.Element;
}> = ({ header, body }) => {
    return (
        <Innholdsboks ariaLabel={header} style={{ backgroundColor: '#FFECCC' }}>
            <div className={cls.className}>
                <Heading level="2" size="large">
                    {header}
                </Heading>
                <VerticalSpacer rem={1} />
                {body}
                <HvemHarGodkjentModal />
            </div>
        </Innholdsboks>
    );
};

export default StatusPanel;
