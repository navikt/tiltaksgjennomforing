import { AvtaleContext } from '@/AvtaleProvider';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import VarselTegnForModal from '@/komponenter/modal/VarselTegnForModal';
import { oppdatereMålInformasjon } from '@/services/rest-service';
import { Maalkategori } from '@/types/maalkategorier';
import BEMHelper from '@/utils/bem';
import { Notes } from '@navikt/ds-icons/cjs';
import KnappBase from 'nav-frontend-knapper';
import { Link } from '@navikt/ds-react';
import Modal from 'nav-frontend-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext, useState } from 'react';
import EtMaal from '../../../MaalSteg/MaalNy/EtMaal';
import { useMål } from '../../../MaalSteg/MaalNy/maalUtils';
import OpprettMaal from '../../../MaalSteg/MaalNy/OpprettMaal';

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

            <div className={'bekreftelseModal'}>
                <Modal
                    style={{ content: { maxWidth: '100%', minHeight: '20rem', minWidth: '40rem' } }}
                    isOpen={modalApen}
                    className="modal__wrapper"
                    contentLabel={'bekrefte valgt handling'}
                    onRequestClose={lukkModal}
                    closeButton={false}
                    aria={{ modal: true, labelledby: 'Endre mål' }}
                    ariaHideApp={true}
                >
                    <div className={cls.element('topIconContainer')}>
                        <VarselTegnForModal width={'80px'} height={'80px'} />
                    </div>
                    <div style={{ maxHeight: '80rem' }} className={cls.element('body')}>
                        <div className={cls.element('knappRad')} />
                        <div className={cls.element('innhold')}>
                            <div className={cls.element('tittel')}>
                                <Systemtittel id={'Endre mål'}>{'Endre mål'}</Systemtittel>
                            </div>
                            <div className={cls.element('varselTekst')}>{endreMaalInnnhold}</div>
                        </div>
                        <div className={cls.element('knapper')}>
                            <div>
                                <LagreKnapp
                                    disabled={iRedigersmodus}
                                    className={cls.element('knapp lenkeknapp')}
                                    lagre={() => lagreEndredeMaal()}
                                    label="Lagre målendringer"
                                />
                            </div>
                            <KnappBase
                                role="button"
                                aria-label={'Avbryt'.concat(' og lukk modalen')}
                                aria-labelledby={'Lukker dialog for'.concat('Endre mål')}
                                type="flat"
                                className={cls.element('knapp lenkeknapp')}
                                onClick={lukkModal}
                            >
                                {'Avbryt'}
                            </KnappBase>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );
};

export default EndreMaal;
