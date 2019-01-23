import React from 'react';
import './Banner.less';
import { Innholdstittel } from 'nav-frontend-typografi';

interface Props {
    tekst: string;
}

const Banner: React.FunctionComponent<Props> = props => {
    return (
        <div className="banner">
            <Innholdstittel>{props.tekst}</Innholdstittel>
        </div>
    );
};

export default Banner;
