import React from 'react';
import { Heading } from '@navikt/ds-react';
import './SkjemaTittel.less';

const SkjemaTittel: React.FunctionComponent = (props) => {
    const { children, ...other } = props;
    return (
        <Heading size="medium" className="skjema-tittel" {...other}>
            {children}
        </Heading>
    );
};

export default SkjemaTittel;
