import React, { FunctionComponent, useContext, useState } from 'react';
import { AvtaleContext } from '@/AvtaleProvider';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { oppdatereMålInformasjon } from '@/services/rest-service';
import { Maalkategori } from '@/types/maalkategorier';
import BEMHelper from '@/utils/bem';
import { Notes } from '@navikt/ds-icons/cjs';
import { Link } from '@navikt/ds-react';
import EtMaal from '../../../MaalSteg/Maal/EtMaal';
import { useMål } from '../../../MaalSteg/Maal/maalUtils';
import OpprettMaal from '../../../MaalSteg/Maal/OpprettMaal';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';

const EndreMaal: FunctionComponent = () => {
    const [modalApen, setModalApen] = useState(false);
    const avtaleContext = useContext(AvtaleContext);
    const [iRedigersmodus, setIRedigersmodus] = useState(false);

    const { målListe, leggTilMål, ledigeMålkategorier, endreMål, sletteMål } = useMål(
        avtaleContext.avtale.gjeldendeInnhold.maal
    );

    const lagreEndredeMaal = async () => {
        if (!iRedigersmodus) {
            await oppdatereMålInformasjon(avtaleContext.avtale, målListe);
            await avtaleContext.hentAvtale();
            setModalApen(false);
        }
    };

    const cls = BEMHelper('bekreftelseModal');

    const endreMaalInnnhold = (
        <>
            <OpprettMaal
                iRedigermodus={iRedigersmodus}
                setIRedigermodus={setIRedigersmodus}
                målListe={målListe}
                leggTilMål={leggTilMål}
                ledigeMålkategorier={ledigeMålkategorier}
            />
            <VerticalSpacer rem={3} />
            {målListe.map((maal, index) => (
                <div key={index} style={{ border: '1px solid #C6C2BF', borderRadius: '5px', marginBottom: '1rem' }}>
                    <EtMaal
                        iRegideringsmodus={iRedigersmodus}
                        setIRedigeringsmodus={setIRedigersmodus}
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
            <Link
                onClick={(event) => {
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
            </Link>
            <BekreftelseModal
                avbrytelseTekst="avbryt"
                bekreftelseTekst="Lagre målendringer"
                oversiktTekst="Endre Mål"
                modalIsOpen={modalApen}
                bekreftOnClick={lagreEndredeMaal}
                lukkModal={() => setModalApen(false)}
            >
                <div style={{ maxHeight: '80rem' }} className={cls.element('body')}>
                    <div className={cls.element('innhold')}>
                        <div className={cls.element('varselTekst')}>{endreMaalInnnhold}</div>
                    </div>
                </div>
            </BekreftelseModal>
        </>
    );
};

export default EndreMaal;
