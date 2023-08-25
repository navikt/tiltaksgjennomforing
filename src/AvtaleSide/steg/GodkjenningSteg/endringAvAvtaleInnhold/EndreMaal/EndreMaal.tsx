import React, { FunctionComponent, useContext, useState } from 'react';
import { AvtaleContext } from '@/AvtaleProvider';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import VarselTegnForModal from '@/komponenter/modal/VarselTegnForModal';
import { oppdatereMålInformasjon } from '@/services/rest-service';
import { Maalkategori } from '@/types/maalkategorier';
import BEMHelper from '@/utils/bem';
import { Notes } from '@navikt/ds-icons/cjs';
import { Heading, Link, Modal, Button } from '@navikt/ds-react';
import EtMaal from '../../../MaalSteg/Maal/EtMaal';
import { useMål } from '../../../MaalSteg/Maal/maalUtils';
import OpprettMaal from '../../../MaalSteg/Maal/OpprettMaal';

const EndreMaal: FunctionComponent = () => {
    const [modalApen, setModalApen] = useState(false);
    const avtaleContext = useContext(AvtaleContext);
    const [iRedigersmodus, setIRedigersmodus] = useState(false);

    const { målListe, leggTilMål, ledigeMålkategorier, endreMål, sletteMål } = useMål(
        avtaleContext.avtale.gjeldendeInnhold.maal
    );

    const lukkModal = () => {
        setModalApen(false);
    };
    const lagreEndredeMaal = async () => {
        await oppdatereMålInformasjon(avtaleContext.avtale, målListe);
        await avtaleContext.hentAvtale();
        setModalApen(false);
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
            <div>
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
            </div>

            <div className={cls.className}>
                <Modal
                    //style={{ body: { maxWidth: '100%', minHeight: '20rem', minWidth: '40rem' } }}
                    open={modalApen}
                    className="modal__wrapper"
                    aria-label={'bekrefte valgt handling'}
                    onClose={lukkModal}
                    //closeButton={false}
                    aria-modal={true}
                    aria-labelledby="Endre mål"
                >
                    <Modal.Body>
                        <div className={cls.element('topIconContainer')}>
                            <VarselTegnForModal width={'80px'} height={'80px'} />
                        </div>
                        <div style={{ maxHeight: '80rem' }} className={cls.element('body')}>
                            <div className={cls.element('knappRad')} />
                            <div className={cls.element('innhold')}>
                                <div className={cls.element('tittel')}>
                                    <Heading size="medium" id={'Endre mål'}>
                                        {'Endre mål'}
                                    </Heading>
                                </div>
                                <div className={cls.element('varselTekst')}>{endreMaalInnnhold}</div>
                            </div>
                            <div className={cls.element('knapper')}>
                                <div>
                                    <LagreKnapp
                                        disabled={iRedigersmodus}
                                        className={cls.element('knapp')}
                                        lagre={() => lagreEndredeMaal()}
                                        label="Lagre målendringer"
                                    />
                                </div>
                                <Button
                                    role="button"
                                    aria-label={'Avbryt'.concat(' og lukk modalen')}
                                    aria-labelledby={'Lukker dialog for'.concat('Endre mål')}
                                    variant="tertiary"
                                    className={cls.element('knapp')}
                                    onClick={lukkModal}
                                >
                                    {'Avbryt'}
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
};

export default EndreMaal;
