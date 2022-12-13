import { ReactComponent as InfoIkon } from '@/assets/ikoner/info.svg';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Heading } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import { useMediaQuery } from 'react-responsive';

interface Props {
    overskrift: string;
}

const RammeMedIkonOgOverskrift: FunctionComponent<Props> = props => {
    const boksenSkalHaMyePadding = useMediaQuery({ minWidth: '55rem' });

    return (
        <div
            style={{
                padding: boksenSkalHaMyePadding ? '4rem 2.5rem' : '2rem 1rem',
                backgroundColor: 'white',
                borderRadius: '4px',
            }}
        >
            <Heading size="medium" style={{ display: 'flex', alignItems: 'center' }}>
                <InfoIkon width="24px" style={{ marginRight: '0.8rem' }} />
                {props.overskrift}
            </Heading>
            <VerticalSpacer rem={2} />
            {props.children}
        </div>
    );
};

export default RammeMedIkonOgOverskrift;