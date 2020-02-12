import * as React from 'react';
import { FunctionComponent } from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

type Props = {
    tittel: string;
};

export const Filter: FunctionComponent<Props> = props => {
    return (
        <Ekspanderbartpanel tittel={props.tittel} tittelProps={'element'} apen={true}>
            {props.children}
        </Ekspanderbartpanel>
    );
};
