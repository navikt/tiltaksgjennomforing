import React, { FunctionComponent } from 'react';
import { Accordion } from '@navikt/ds-react';

type Props = {
    tittel: string;
};

export const Filter: FunctionComponent<Props> = (props) => {
    return (
        <div>
            <Accordion style={{ border: '1px solid #c6c2bf', backgroundColor: 'white' }} role="radiogroup">
                <Accordion.Item defaultOpen>
                    <Accordion.Header style={{ backgroundColor: 'white' }}>{props.tittel}</Accordion.Header>
                    <Accordion.Content>{props.children}</Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};
