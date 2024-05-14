import React from 'react';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Heading } from '@navikt/ds-react';
import './StatusPanel.less';
import BEMHelper from '@/utils/bem';

const cls = BEMHelper('statusPanel');

const StatusPanel: React.FunctionComponent<{
    header: string;
    body?: JSX.Element;
}> = ({ header, body }) => {
    return (
        <Innholdsboks ariaLabel={header} style={{ backgroundColor: '#FFECCC' }}>
            <div className={cls.className}>
                {header.length > 36 ? (
                    <Heading level="2" size="medium">
                        {header}
                    </Heading>
                ) : (
                    <Heading level="2" size="large">
                        {header}
                    </Heading>
                )}
                <VerticalSpacer rem={1} />
                {body}
            </div>
        </Innholdsboks>
    );
};

export default StatusPanel;
