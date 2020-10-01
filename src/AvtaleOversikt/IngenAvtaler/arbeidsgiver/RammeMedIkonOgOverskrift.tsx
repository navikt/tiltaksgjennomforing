import * as React from 'react';
import { FunctionComponent } from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import { ReactComponent as InfoIkon } from '@/assets/ikoner/info.svg';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';

interface Props {
    overskrift: string;
}

const RammeMedIkonOgOverskrift: FunctionComponent<Props> = props => {
    return (
        <div style={{ padding: '4rem 2.5rem', backgroundColor: 'white', borderRadius: '4px' }}>
            <Systemtittel>
                <InfoIkon
                    width="24px"
                    style={{ display: 'inline-block', verticalAlign: '-0.45rem', marginRight: '0.8rem' }}
                />
                {props.overskrift}
            </Systemtittel>
            <VerticalSpacer rem={2} />
            {props.children}
        </div>
    );
};

export default RammeMedIkonOgOverskrift;
