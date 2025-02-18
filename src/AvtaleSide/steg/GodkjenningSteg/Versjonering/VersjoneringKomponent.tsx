import TidligereVersjoner from '@/AvtaleSide/steg/GodkjenningSteg/Versjonering/TidligereVersjoner';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { Avtale } from '@/types/avtale';
import React from 'react';
import MediaQuery from 'react-responsive';
import { useHentVersjoner } from '@/services/use-rest';

interface Props {
    avtale: Avtale;
}

const VersjoneringKomponent = (props: Props) => {
    const { avtale } = props;
    const versjoner = useHentVersjoner(avtale);

    if (versjoner.length <= 1) {
        return null;
    }

    return (
        <MediaQuery print={false}>
            <Innholdsboks>
                <TidligereVersjoner versjoner={versjoner} tiltakstype={avtale.tiltakstype} />
            </Innholdsboks>
        </MediaQuery>
    );
};
export default VersjoneringKomponent;
