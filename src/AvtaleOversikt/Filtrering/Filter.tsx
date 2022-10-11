import React, { FunctionComponent } from 'react';
import { Accordion } from '@navikt/ds-react';

type Props = {
    tittel: string;
};

export const Filter: FunctionComponent<Props> = (props) => {
    return (
        <div>
            <Accordion className="accordion" role="radiogroup">
                <Accordion.Item defaultOpen>
                    <Accordion.Header>{props.tittel}</Accordion.Header>
                    <Accordion.Content>{props.children}</Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};
