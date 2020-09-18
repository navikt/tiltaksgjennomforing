import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { Innholdstittel } from 'nav-frontend-typografi';
import React, { useContext } from 'react';
import nyheter from '../NyttIAppen/nyheter';
import Nytt from '../NyttIAppen/Nytt';
import './Banner.less';

interface Props {
    tekst: string;
}

const Banner: React.FunctionComponent<Props> = props => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    return (
        <div className="banner">
            <Innholdstittel>{props.tekst}</Innholdstittel>
            {innloggetBruker.erNavAnsatt && (
                <div style={{ position: 'absolute', right: '1rem' }}>
                    <Nytt
                        åpneVedFørsteBesøk
                        nyheter={nyheter}
                        title="Nytt i tiltaksgjennomføring"
                        navn="Tiltaksgjennomføring"
                    />
                </div>
            )}
        </div>
    );
};

export default Banner;
