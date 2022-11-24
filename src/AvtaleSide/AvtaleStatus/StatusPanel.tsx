import React, { SVGProps } from 'react';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Heading } from '@navikt/ds-react';

const StatusPanel: React.FunctionComponent<{
    ikon: React.ComponentType<SVGProps<any>>;
    header: string;
    body?: JSX.Element;
}> = ({ ikon, header, body }) => {
    const Ikon = ikon;
    return (
        <Innholdsboks ariaLabel={header}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Ikon style={{ height: '40px', width: '40px' }} />
                <VerticalSpacer rem={1} />
                {header.length > 36 ? (
                    <Heading size="medium">{header}</Heading>
                ) : (
                    <Heading size="large">{header}</Heading>
                )}
            </div>

            <VerticalSpacer rem={1} />
            {body}
        </Innholdsboks>
    );
};

export default StatusPanel;
