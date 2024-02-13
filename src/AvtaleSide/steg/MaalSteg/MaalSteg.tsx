import { AvtaleContext } from '@/AvtaleProvider';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { Maalkategori } from '@/types/maalkategorier';
import React, { FunctionComponent, useContext, useState } from 'react';
import EtMaal from './Maal/EtMaal';
import { useMål } from './Maal/maalUtils';
import OpprettMaal from './Maal/OpprettMaal';

const MaalSteg: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);
    const [iRedigermodus, setIRedigermodus] = useState(false);

    const { målListe, leggTilMål, ledigeMålkategorier, endreMål, sletteMål } = useMål(
        avtaleContext.avtale.gjeldendeInnhold.maal,
    );

    const nyttMål = (beskrivelse: string, kategori: Maalkategori) => {
        const nyMålListe = leggTilMål(beskrivelse, kategori);
        avtaleContext.settAvtaleInnholdVerdier({ maal: nyMålListe }, true);
    };
    const slett = (index: number) => {
        const nyMålListe = sletteMål(index);
        avtaleContext.settAvtaleInnholdVerdier({ maal: nyMålListe }, true);
    };
    const endre = (index: number, beskrivelse: string, kategori: Maalkategori) => {
        const nyMålListe = endreMål(index, beskrivelse, kategori);
        avtaleContext.settAvtaleInnholdVerdier({ maal: nyMålListe }, true);
    };

    return (
        <>
            <Innholdsboks utfyller="veileder">
                <OpprettMaal
                    iRedigermodus={iRedigermodus}
                    setIRedigermodus={setIRedigermodus}
                    målListe={målListe}
                    leggTilMål={nyttMål}
                    ledigeMålkategorier={ledigeMålkategorier}
                />
            </Innholdsboks>

            {avtaleContext.avtale.gjeldendeInnhold.maal.map((maal, index) => (
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
        </>
    );
};

export default MaalSteg;
