import type { FunctionComponent, PropsWithChildren } from 'react';
import { ExpansionCard } from '@navikt/ds-react';

interface Props {
    tittel: string;
}

export const Filter: FunctionComponent<PropsWithChildren<Props>> = (props: PropsWithChildren<Props>) => {
    return (
        <div>
            <ExpansionCard aria-label="filter" size="small" defaultOpen>
                <ExpansionCard.Header>
                    <ExpansionCard.Title size="small">{props.tittel}</ExpansionCard.Title>
                </ExpansionCard.Header>
                <ExpansionCard.Content>{props.children}</ExpansionCard.Content>
            </ExpansionCard>
        </div>
    );
};
