import React, { FunctionComponent, PropsWithChildren } from 'react';
import { Accordion } from '@navikt/ds-react';

interface Props {
    tittel: string;
}

export const Filter: FunctionComponent<PropsWithChildren<Props>> = (props: PropsWithChildren<Props>) => {
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
