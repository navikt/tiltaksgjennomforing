import { AvtaleContext } from '@/AvtaleProvider';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { oppdatereMålInformasjon } from '@/services/rest-service';
import { Maalkategori } from '@/types/maalkategorier';
import { Notes } from '@navikt/ds-icons/cjs';
import Lenke from 'nav-frontend-lenker';
import React, { FunctionComponent, useContext, useState } from 'react';
import EtMaal from '../../../MaalSteg/MaalNy/EtMaal';
import { useMål } from '../../../MaalSteg/MaalNy/maalUtils';
import OpprettMaal from '../../../MaalSteg/MaalNy/OpprettMaal';

const EndreMaal: FunctionComponent = () => {
    const [modalApen, setModalApen] = useState(false);
    const avtaleContext = useContext(AvtaleContext);
    //const [maal, setMaal] = useState(avtaleContext.avtale.maal);

    const { målListe, leggTilMål, ledigeMålkategorier, endreMål, sletteMål } = useMål(avtaleContext.avtale.maal);

    const lukkModal = () => {
        setModalApen(false);
    };
    const lagreEndredeMaal = async () => {
        await oppdatereMålInformasjon(avtaleContext.avtale, målListe);
        await avtaleContext.hentAvtale();
        setModalApen(false);
    };

    const endreMaalInnnhold = (
        <>
            <OpprettMaal målListe={målListe} leggTilMål={leggTilMål} ledigeMålkategorier={ledigeMålkategorier} />
            {målListe.map((maal, index) => (
                <div key={index} style={{ border: '1px solid #C6C2BF', borderRadius: '5px', marginBottom: '1rem' }}>
                    <EtMaal
                        key={maal.beskrivelse}
                        maal={maal}
                        slett={() => sletteMål(index)}
                        endre={(beskrivelse: string, kategori: Maalkategori) => endreMål(index, beskrivelse, kategori)}
                        ledigeMålkategorier={ledigeMålkategorier}
                    />
                </div>
            ))}
        </>
    );

    return (
        <>
            <div>
                <Lenke
                    onClick={event => {
                        event.stopPropagation();
                        setModalApen(true);
                    }}
                    href="#"
                    role="menuitem"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <div aria-hidden={true}>
                        <Notes style={{ marginRight: '0.5rem' }} />
                    </div>
                    Endre mål
                </Lenke>
            </div>

            <BekreftelseModal
                style={{ maxWidth: '100%', minHeight: '20rem', minWidth: '40rem' }}
                avbrytelseTekst="Avbryt"
                bekreftelseTekst="Lagre målendringer"
                oversiktTekst="Endre mål"
                modalIsOpen={modalApen}
                bekreftOnClick={lagreEndredeMaal}
                lukkModal={lukkModal}
                varselTekst={endreMaalInnnhold}
            />
        </>
    );
};

export default EndreMaal;
