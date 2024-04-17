import React from 'react';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Heading } from '@navikt/ds-react';

const StatusPanel: React.FunctionComponent<{
    header: string;
    body?: JSX.Element;
}> = ({ header, body }) => {
    return (
        <Innholdsboks ariaLabel={header}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {header.length > 36 ? (
                    <Heading level="2" size="medium">
                        {header}
                    </Heading>
                ) : (
                    <Heading level="2" size="large">
                        {header}
                    </Heading>
                )}
            </div>

            <VerticalSpacer rem={1} />
            {body}
        </Innholdsboks>
    );
};

export default StatusPanel;
