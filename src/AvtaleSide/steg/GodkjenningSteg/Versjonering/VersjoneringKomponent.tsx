import TidligereVersjoner from '@/AvtaleSide/steg/GodkjenningSteg/Versjonering/TidligereVersjoner';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { Avtale } from '@/types/avtale';
import { Rolle } from '@/types/innlogget-bruker';
import React from 'react';
import MediaQuery from 'react-responsive';
import { useHentVersjoner } from '@/services/use-rest';

interface Props {
    rolle: Rolle;
    avtale: Avtale;
}

const VersjoneringKomponent: React.FunctionComponent<Props> = (props) => {
    const versjoner = useHentVersjoner(props.avtale.id);

    const finnesKunEnVersjon = versjoner.length === 1;
    if (finnesKunEnVersjon) {
        return null;
    }

    return (
        <MediaQuery print={false}>
            <Innholdsboks>
                <TidligereVersjoner versjoner={versjoner} tiltakstype={props.avtale.tiltakstype} />
            </Innholdsboks>
        </MediaQuery>
    );
};
export default VersjoneringKomponent;
