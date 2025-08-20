import BurgerMenyIkon from '@/assets/ikoner/burgermeny.svg?react';
import { AvtaleContext } from '@/AvtaleProvider';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { hentVarsellogg } from '@/services/rest-service';
import { Nettressurs, Status } from '@/types/nettressurs';
import { Varsel } from '@/types/varsel';
import BEMHelper from '@/utils/bem';
import { Alert, BodyShort, Heading, Link, Loader, Modal } from '@navikt/ds-react';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import './Varsellogg.less';
import VarselTabell from './VarselTabell';
import { isBefore } from 'date-fns';

const cls = BEMHelper('varsellogg');

const Varsellogg: FunctionComponent = () => {
    const [varselLoggModalApen, setVarselLoggModalApen] = useState<boolean>(false);
    const [varsler, setVarsler] = useState<Nettressurs<Varsel[]>>({ status: Status.IKKE_LASTET });
    const avtaleContext = useContext(AvtaleContext);

    useEffect(() => {
        setVarsler({ status: Status.LASTER_INN });
        // Hent nye varselr når loggen åpnes.
        if (varselLoggModalApen) {
            hentVarsellogg(avtaleContext.avtale.id)
                .then((data: Varsel[]) => setVarsler({ status: Status.LASTET, data }))
                .catch((error: Error) => setVarsler({ status: Status.FEIL, error: error }));
        }
    }, [avtaleContext.avtale.id, varselLoggModalApen]);

    return (
        <>
            <Link
                id="varsellogglenke"
                onClick={() => setVarselLoggModalApen(true)}
                href="#"
                className={cls.element('menylenke')}
                role="menuitem"
            >
                <div aria-hidden={true}>
                    <BurgerMenyIkon className={cls.element('burger-ikon')} />
                </div>
                Hendelselogg
            </Link>
            <Modal
                open={varselLoggModalApen}
                onClose={() => setVarselLoggModalApen(false)}
                aria-label="Varselloggmodal"
                className={cls.element('modal')}
                aria-modal={varselLoggModalApen}
                aria-describedby="varsellogg for endringsaktiviteter i applikasjonen"
            >
                <Modal.Header>
                    <Heading size="medium" level="2">
                        Hendelselogg
                    </Heading>
                </Modal.Header>
                <Modal.Body>
                    {isBefore(avtaleContext.avtale.opprettetTidspunkt, '2020-09-10') && (
                        <>
                            <Alert variant="info">
                                Denne avtalen ble opprettet før hendelsesloggen ble innført og vil være mangelfull.
                            </Alert>
                            <VerticalSpacer rem={1} />
                        </>
                    )}
                    {varsler.status === Status.LASTET && varsler.data.length > 0 && (
                        <VarselTabell varsler={varsler.data} />
                    )}
                    {varsler.status === Status.LASTER_INN && (
                        <Loader variant="neutral" size="xlarge" className={cls.element('spinner')} />
                    )}
                    {varsler.status === Status.FEIL && (
                        <BodyShort size="small">Klarte ikke hente hendelselogg. Prøv igjen senere.</BodyShort>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Varsellogg;
