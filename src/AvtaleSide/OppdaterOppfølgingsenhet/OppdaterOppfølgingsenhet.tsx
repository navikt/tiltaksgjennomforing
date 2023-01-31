import { AvtaleContext } from '@/AvtaleProvider';
import React, { FunctionComponent, useState, useContext } from 'react';
import './OppdaterOppfølgingsenhet.less';
import BEMHelper from '@/utils/bem';
import { AvtaleMetadata } from '@/types/avtale';
import { BodyShort, Heading, Link, Modal, Loader } from '@navikt/ds-react';
import { oppdaterOppfølgingsEnhet } from '@/services/rest-service';
import KnappBase from 'nav-frontend-knapper';
import { Notes } from '@navikt/ds-icons/cjs';

export type OppdaterOppfølgingEnhet = Pick<AvtaleMetadata, 'enhetOppfolging' | 'enhetsnavnOppfolging'>;

const OppdaterOppfølgingsenhet: FunctionComponent = () => {
    const cls = BEMHelper('oppdaterOppfølgingsenhet');
    const avtaleContext = useContext(AvtaleContext);
    const { enhetOppfolging, enhetsnavnOppfolging } = avtaleContext.avtale;
    const [modalApen, setModalApen] = useState(false);
    const [laster, setLaster] = useState(false);
    const hentNyesteOppfølgingsEnhet = async (): Promise<void> => {
        setLaster(true);
        const nyAvtale = await oppdaterOppfølgingsEnhet(avtaleContext.avtale);
        avtaleContext.oppdatereAvtaleContext(nyAvtale);
        setLaster(false);
    };

    const oppdatereOppfølgingsenhetInnhold = (
        <div className={cls.className}>
            <div className={cls.element('tittel')}>
                {
                    <Heading level="2" size="small">
                        Oppdater oppfølgingsenhet
                    </Heading>
                }
            </div>
            <div>
                {laster === true ? (
                    <div style={{ margin: '0 auto 1rem auto', width: '64px' }}>
                        <Loader size="2xlarge" title="Henter enhet..." />
                    </div>
                ) : (
                    <>
                        {enhetOppfolging === null && laster === false ? (
                            <BodyShort size="small"> Finner ikke oppfølgningsenhet for denne avtalen.</BodyShort>
                        ) : (
                            <div>
                                <p>Vi har nå hentet oppfølgengsenhet automatisk.</p>
                                <p> Følgenede enhet har nå blitt lagret.</p>
                                <BodyShort className={cls.element('enhetOppfølging')}>
                                    {enhetsnavnOppfolging} - {enhetOppfolging}
                                </BodyShort>
                            </div>
                        )}
                    </>
                )}
            </div>
            <KnappBase className={cls.element('knapp')} onClick={(event) => setModalApen(false)}>
                Lukk
            </KnappBase>
        </div>
    );

    return (
        <>
            <Link
                onClick={(event) => {
                    event.stopPropagation();
                    hentNyesteOppfølgingsEnhet();
                    setModalApen(true);
                }}
                href="#"
                role="menuitem"
                className={cls.element('lenke')}
            >
                <div aria-hidden={true}>
                    <Notes style={{ marginRight: '0.5rem' }} />
                </div>
                Oppdater oppfølgingsenhet
            </Link>
            <Modal
                open={modalApen}
                onClose={() => setModalApen(false)}
                closeButton={true}
                aria-label="Oppdater Oppfølgingsenhet"
                className={cls.element('modal')}
                aria-modal={modalApen}
                aria-labelledby="heading"
                aria-describedby="varsellogg for endringsaktiviteter i applikasjonen"
            >
                <Modal.Content>{oppdatereOppfølgingsenhetInnhold}</Modal.Content>
            </Modal>
        </>
    );
};

export default OppdaterOppfølgingsenhet;
