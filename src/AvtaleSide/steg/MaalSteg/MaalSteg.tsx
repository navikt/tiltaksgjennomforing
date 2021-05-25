import { AvtaleContext } from '@/AvtaleProvider';
import { Maalkategori } from '@/types/maalkategorier';
import React, { FunctionComponent, useContext } from 'react';
import EtMaal from './MaalNy/EtMaal';
import { useMål } from './MaalNy/maalUtils';
import OpprettMaal from './MaalNy/OpprettMaal';

const MaalSteg: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);

    const { målListe, leggTilMål, ledigeMålkategorier, endreMål, sletteMål } = useMål(avtaleContext.avtale.maal);

    const nyttMål = (beskrivelse: string, kategori: Maalkategori) => {
        const nyMålListe = leggTilMål(beskrivelse, kategori);
        avtaleContext.settAvtaleVerdier({ maal: nyMålListe }, true);
    };
    const slett = (index: number) => {
        const nyMålListe = sletteMål(index);
        avtaleContext.settAvtaleVerdier({ maal: nyMålListe }, true);
    };
    const endre = (index: number, beskrivelse: string, kategori: Maalkategori) => {
        const nyMålListe = endreMål(index, beskrivelse, kategori);
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
            {avtaleContext.avtale.maal.map((maal, index) => (
                <EtMaal
                    key={maal.beskrivelse}
                    maal={maal}
                    slett={() => slett(index)}
                    endre={(beskrivelse: string, kategori: Maalkategori) => endre(index, beskrivelse, kategori)}
                    ledigeMålkategorier={ledigeMålkategorier}
                />
            ))}
        </div>
    );
};

export default MaalSteg;
