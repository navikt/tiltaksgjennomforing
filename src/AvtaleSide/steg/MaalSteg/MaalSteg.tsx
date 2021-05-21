import { AvtaleContext } from '@/AvtaleProvider';
import { Avtale } from '@/types/avtale';
import { Maalkategori } from '@/types/maalkategorier';
import * as React from 'react';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import EtMaal from './MaalNy/EtMaal';
import { useMål } from './MaalNy/maalUtils';
import OpprettMaal from './MaalNy/OpprettMaal';

const MaalSteg: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);
    const [avtalee, setAvtalee] = useState<Avtale>();

    const { målListe, leggTilMål, ledigeMålkategorier, endreMål, sletteMål } = useMål(avtaleContext.avtale.maal);

    useEffect(() => {
        console.log(målListe);
        setAvtalee(avtaleContext.avtale);
    }, [avtaleContext.avtale.maal]);

    const nyttMål = (beskrivelse: string, kategori: Maalkategori) => {
        const nyMålListe = leggTilMål(beskrivelse, kategori);
        avtaleContext.settAvtaleVerdier({ maal: nyMålListe }, true);
    };
    const slett = (id: string) => {
        const nyMålListe = sletteMål(id);
        avtaleContext.settAvtaleVerdier({ maal: nyMålListe }, true);
    };
    const endre = (id: string, beskrivelse: string, kategori: Maalkategori) => {
        const nyMålListe = endreMål(id, beskrivelse, kategori);
        avtaleContext.settAvtaleVerdier({ maal: nyMålListe }, true);
    };

    return (
        <div role="main">
            <div>
                {/* <OppretteNyttMaal /> */}
                {/* {context.avtale.maal.map((maal, index) => (
                <MaalKort key={index} maal={maal} />
            ))} */}
                {/* {målListe.map(maal => (
                <EtMaal maal={maal} slettMål={sletteMål} målListe={målListe} />
            ))} */}
                {/* <OpprettMaal
                målListe={avtaleContext.avtale.maal}
                leggTilMål={nyttMål}
                ledigeMålkategorier={ledigeMålkategorier}
            /> */}
                {/* <AlleMål
                målListe={målListe}
                endreMål={endreMål}
                sletteMål={sletteMål}
                ledigeMålkategorier={ledigeMålkategorier}
            /> */}
            </div>

            <OpprettMaal målListe={målListe} leggTilMål={nyttMål} ledigeMålkategorier={ledigeMålkategorier} />
            {målListe.map(maal => (
                <EtMaal
                    key={maal.beskrivelse}
                    maal={maal}
                    slett={slett}
                    endre={endre}
                    ledigeMålkategorier={ledigeMålkategorier}
                />
            ))}
        </div>
    );
};

export default MaalSteg;
