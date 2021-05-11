import React, { SVGProps } from 'react';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Innholdstittel, Systemtittel } from 'nav-frontend-typografi';

const StatusPanel: React.FunctionComponent<{
    ikon: React.ComponentType<SVGProps<any>>;
    header: string;
    body?: JSX.Element;
}> = ({ ikon, header, body }) => {
    const Ikon = ikon;
    return (
        <Innholdsboks>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Ikon style={{ height: '40px', width: '40px' }} />
                <VerticalSpacer rem={1} />
                {header.length > 36 ? <Systemtittel>{header}</Systemtittel> : <Innholdstittel>{header}</Innholdstittel>}
            </div>

            <VerticalSpacer rem={1} />
            {body}
        </Innholdsboks>
    );
};

export default StatusPanel;
