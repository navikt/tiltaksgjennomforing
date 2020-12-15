import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';

type Props = {
    tittel: string;
};

const Dokumenttittel: FunctionComponent<Props> = props => {
    return <Helmet title={`${props.tittel} - NAV`} />;
};

export default Dokumenttittel;
