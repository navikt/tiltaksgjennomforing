import { AvtaleContext } from '@/AvtaleProvider';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { Maalkategori } from '@/types/maalkategorier';
import React, { FunctionComponent, useContext, useState } from 'react';
import EtMaal from './MaalNy/EtMaal';
import { useMål } from './MaalNy/maalUtils';
import OpprettMaal from './MaalNy/OpprettMaal';

const MaalSteg: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);
    const [iRedigermodus, setIRedigermodus] = useState(false);

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
            <Innholdsboks utfyller="veileder">
                <OpprettMaal
                    iRedigermodus={iRedigermodus}
                    setIRedigermodus={setIRedigermodus}
                    målListe={målListe}
                    leggTilMål={nyttMål}
                    ledigeMålkategorier={ledigeMålkategorier}
                />
            </Innholdsboks>

            {avtaleContext.avtale.maal.map((maal, index) => (
                <EtMaal
                    iRegideringsmodus={iRedigermodus}
                    setIRedigeringsmodus={setIRedigermodus}
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
